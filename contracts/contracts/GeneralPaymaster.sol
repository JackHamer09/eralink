// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IPaymaster, ExecutionResult, PAYMASTER_VALIDATION_SUCCESS_MAGIC} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymaster.sol";
import {IPaymasterFlow} from "@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IPaymasterFlow.sol";
import {TransactionHelper, Transaction} from "@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol";

import "@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

/// @author Matter Labs
/// @notice This contract does not include any validations other than using the paymaster general flow.
contract GeneralPaymaster is IPaymaster, Ownable {
	address public TextStorageAddress;
	bytes4 public storeTextSelector = bytes4(keccak256("storeText(string,string)"));

	modifier onlyBootloader() {
		require(
			msg.sender == BOOTLOADER_FORMAL_ADDRESS,
			"Only bootloader can call this method"
		);
		// Continue execution if called from the bootloader.
		_;
	}

	constructor(address _textStorageAddress) {
		TextStorageAddress = _textStorageAddress;
	}

	function setTextStorageAddress(address _textStorageAddress) public onlyOwner {
		TextStorageAddress = _textStorageAddress;
	}

	function validateAndPayForPaymasterTransaction(
		bytes32,
		bytes32,
		Transaction calldata _transaction
	)
		external
		payable
		onlyBootloader
		returns (bytes4 magic, bytes memory context)
	{
		// By default we consider the transaction as accepted.
		magic = PAYMASTER_VALIDATION_SUCCESS_MAGIC;
		require(
			_transaction.paymasterInput.length >= 4,
			"The standard paymaster input must be at least 4 bytes long"
		);

		require(
			_transaction.to == uint256(uint160(TextStorageAddress)),
			"Transaction target address is not allowed"
		);
		require(
			_transaction.data.length >= 4,
			"Transaction data is too short"
		);
		
		require(
			bytes4(_transaction.data[0:4]) == storeTextSelector,
			"Transaction method is not allowed"
		);

		// Decode the transaction data to get _text and _slug
		// (string memory _slug, string memory _text) = abi.decode(_transaction.data[4:], (string, string));

		// Check the lengths of _text and _slug to prevent abuse of the storage
		// require(bytes(_text).length <= 1500, "Text exceeds the 1500 bytes limit");
		// require(bytes(_slug).length <= 50, "Slug exceeds the 50 bytes limit");

		bytes4 paymasterInputSelector = bytes4(
			_transaction.paymasterInput[0:4]
		);
		if (paymasterInputSelector == IPaymasterFlow.general.selector) {
			uint256 requiredETH = _transaction.gasLimit *
				_transaction.maxFeePerGas;

			// The bootloader never returns any data, so it can safely be ignored here.
			(bool success, ) = payable(BOOTLOADER_FORMAL_ADDRESS).call{
				value: requiredETH
			}("");
			require(
				success,
				"Failed to transfer tx fee to the Bootloader. Paymaster balance might not be enough."
			);
		} else {
			revert("Unsupported paymaster flow in paymasterParams.");
		}
	}

	function postTransaction(
		bytes calldata _context,
		Transaction calldata _transaction,
		bytes32,
		bytes32,
		ExecutionResult _txResult,
		uint256 _maxRefundedGas
	) external payable override onlyBootloader {}

	function withdraw(address payable _to) external onlyOwner {
		uint256 balance = address(this).balance;
		(bool success, ) = _to.call{value: balance}("");
		require(success, "Failed to withdraw funds from paymaster.");
	}

	receive() external payable {}
}
