// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TextStorage is Initializable {
  struct TextEntry {
    address creator;
    uint256 timestamp;
    string text;
  }
  mapping(string => TextEntry) public textLookupTable;
  mapping(address => string[]) public storedTexts;

  event TextStored(string text, string slug, address creator);

  function initialize() public initializer {
    // nothing to initialize
  }

  function storeText(string memory _text, string memory _slug) public {
    require(bytes(_text).length >= 3, "Text is too short");
    require(bytes(_text).length <= 1500, "Text exceeds the 1500 bytes limit");
    require(bytes(_slug).length <= 50, "Slug exceeds the 50 bytes limit");
    
    require(bytes(textLookupTable[_slug].text).length == 0, "Slug already exists");
    
    textLookupTable[_slug] = TextEntry(msg.sender, block.timestamp, _text);
    storedTexts[msg.sender].push(_slug);
    
    emit TextStored(_text, _slug, msg.sender);
  }

  function getEntry(string memory _slug) public view returns (address, uint256, string memory) {
    return (textLookupTable[_slug].creator, textLookupTable[_slug].timestamp, textLookupTable[_slug].text);
}

}