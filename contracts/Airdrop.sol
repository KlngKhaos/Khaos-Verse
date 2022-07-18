
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

pragma solidity ^0.8.0;


contract Airdrop is Ownable {
    using SafeMath for uint;

    IERC20 public tokenContract;

    event EtherTransfer(address beneficiary, uint amount);

    constructor(address _tokenAddr) public {
        tokenContract = IERC20(_tokenAddr);
    }

    function dropTokens(address[] memory _recipients, uint256[] memory _amount) public onlyOwner returns (bool) {
       
        for (uint i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0));
            require(tokenContract.transfer(_recipients[i], _amount[i]));
        }

        return true;
    }

    function dropEther(address[] memory _recipients, uint256[] memory _amount) public payable onlyOwner returns (bool) {
        uint total = 0;

        for(uint j = 0; j < _amount.length; j++) {
            total = total.add(_amount[j]);
        }

        require(total <= msg.value);
        require(_recipients.length == _amount.length);


        for (uint i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0));

            payable(_recipients[i]).transfer(_amount[i]);

            emit EtherTransfer(_recipients[i], _amount[i]);
        }

        return true;
    }

    function updateTokenAddress(IERC20 newTokenAddr) public onlyOwner {
        tokenContract = newTokenAddr;

    }

    function withdrawTokens(address beneficiary) public onlyOwner {
        require(tokenContract.transfer(beneficiary, tokenContract.balanceOf(address(this))));
    }

    function withdrawEther(address payable beneficiary) public onlyOwner {
        beneficiary.transfer(address(this).balance);
    }
}