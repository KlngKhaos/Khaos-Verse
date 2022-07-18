pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/**
  * @title TestToken
  * @author Developers
  */
contract TestToken is ERC20 {

    uint constant public MINT_AMOUNT  = 20000000 ether;
    /**
      * @dev Initialize the test token
      */
    constructor () ERC20("Token","SYM") public {
        _mint(msg.sender, MINT_AMOUNT);
    }

}
