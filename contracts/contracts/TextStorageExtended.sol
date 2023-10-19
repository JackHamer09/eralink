// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TextStorageExtended is Initializable {
  struct TextEntry {
    address creator;
    string text;
    uint256 timestamp;
  }
  mapping(string => TextEntry) public textLookupTable;

  event TextStored(string text, string slug, address owner);

  function initialize() public initializer {
    // nothing to initialize
  }

  function storeText(string memory _slug, string memory _text) public {
    require(bytes(_text).length >= 3, "Text is too short");
    
    require(bytes(textLookupTable[_slug].text).length == 0, "Slug already exists");
    
    textLookupTable[_slug] = TextEntry(msg.sender, _text, block.timestamp);
    
    // emit TextStored(_text, _slug, msg.sender);
  }

  function getEntry(string memory _slug) public view returns (address, uint256, string memory) {
    return (textLookupTable[_slug].creator, textLookupTable[_slug].timestamp, textLookupTable[_slug].text);
  }
}
