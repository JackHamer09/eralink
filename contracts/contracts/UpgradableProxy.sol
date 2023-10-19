// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UpgradableProxy {
  address public implementation;
  address public admin;

  constructor(address _implementation, address _admin) {
    implementation = _implementation;
    admin = _admin;
  }

  fallback() external payable {
    address _impl = implementation;
    require(_impl != address(0));
    
    assembly {
      let ptr := mload(0x40)
      calldatacopy(ptr, 0, calldatasize())
      let result := delegatecall(gas(), _impl, ptr, calldatasize(), 0, 0)
      let size := returndatasize()
      returndatacopy(ptr, 0, size)
      switch result
        case 0 { revert(ptr, size) }
        default { return(ptr, size) }
    }
  }

  function upgrade(address newImplementation) external {
    require(msg.sender == admin, "Only admin can upgrade");
    implementation = newImplementation;
  }
}
