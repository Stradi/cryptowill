// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

abstract contract Ownable {
    event OwnershipTransferred(address indexed previous, address indexed _new);
    
    address private _owner;
    
    constructor() {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }
    
    function owner() public view virtual returns(address) {
        return _owner;
    }
    
    modifier onlyOwner() {
        require(owner() == msg.sender, "caller is not the owner");
        _;
    }
    
    function renounceOwnership() public virtual onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }
    
    function transferOwnership(address _new) public virtual onlyOwner {
        require(_new != address(0), "new owner is the zero address");
        emit OwnershipTransferred(_owner, _new);
        _owner = _new;
    }
    
}