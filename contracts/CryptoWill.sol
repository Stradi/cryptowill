// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Ownable.sol";
import "./IERC20.sol";

contract CryptoWill is Ownable {
    event PayeeAdded(address indexed _payer, address indexed _payee);
    event PayeeShareChanged(address indexed _payer, address indexed _payee, address indexed _coin, uint256 _newPercentage);
    event PayeeMessageChanged(address indexed _payer, address indexed _payee, string _newMessage);
    event PayeeConfirmation(address indexed _payer, address indexed _payee);
    event PayerDeathConfirmed(address indexed _payer);
    
    event TransferredToPayee(address indexed _payer, address indexed _payee, address indexed _coin, uint256 _amount);
    event DistributionCompleted(address indexed _payer);
    
    struct Payee {
        bool isConfirmed;
        bool isWithdrawed;
        address self;
        // Coin address to percentage
        mapping(address => uint256) shares;
        string message;
    }
    
    mapping(address => bool) public payerToRIP;
    mapping(address => Payee[]) public payerToPayee;
    mapping(address => mapping(address => uint256)) public payerToCoinPercentage;
    mapping(address => uint256) public payerToConfirmationCount;
    mapping(address => address[]) public payerToApprovedCoins;

    mapping(address => mapping(address => uint256)) public payeeToPayerID;

    mapping(address => mapping(address => uint256)) public coinToCoinID;
    
    // TODO: Add withdraw timer. If msg.sender has some payee's but payee's confirms the confirmDeath
    // then payee's can't withdraw money. Fraud prevention?
    
    modifier onlyPayeeOf(address _payer) {
        require(payeeToPayerID[msg.sender][_payer] > 0, "not a payee");
        _;
    }
    
    modifier alive {
        require(!payerToRIP[msg.sender], "rip");
        _;
    }
    
    function approveToken(address _coinAddress) alive public {
        require(coinToCoinID[msg.sender][_coinAddress] == 0, "coin already approved");
        IERC20 token = IERC20(_coinAddress);
        
        // Maximum value of uint256 is 2**256 - 1
        bool status = token.approve(msg.sender, 2**256 - 1);
        if(status) {
            uint256 idx = payerToApprovedCoins[msg.sender].length;
            payerToApprovedCoins[msg.sender].push(_coinAddress);
            coinToCoinID[msg.sender][_coinAddress] = idx;
        }
    }
    
    //TODO: Make this function payable.
    function addPayee(address _payeeAddress) alive public {
        require(payeeToPayerID[_payeeAddress][msg.sender] == 0, "already a payee");
        require(_payeeAddress != msg.sender, "can't add self payee");
        
        uint256 idx = payerToPayee[msg.sender].length;
        payerToPayee[msg.sender].push();
        
        Payee storage payee = payerToPayee[msg.sender][idx];
        payee.self = _payeeAddress;
        payee.isConfirmed = false;
        payee.isWithdrawed = false;
        
        payeeToPayerID[_payeeAddress][msg.sender] = idx + 1;
        
        emit PayeeAdded(msg.sender, _payeeAddress);
    }
    
    //TODO: Handle approving before setting share.
    function setShareOfPayee(address _payeeAddress, address _coinAddress, uint256 _percentage) alive public {
        uint256 coinId = coinToCoinID[msg.sender][_coinAddress];
        require(payerToApprovedCoins[msg.sender][coinId] != address(0), "token not approved");
        
        uint256 payeeId = payeeToPayerID[_payeeAddress][msg.sender];
        Payee storage payeeObject = payerToPayee[msg.sender][payeeId - 1];
        
        require(payeeId > 0, "not a payee");
        
        // This will probably never happen but i didn't test it lol.
        require(_payeeAddress == payeeObject.self, "payeeAddress mismatch");
        
        // 0 < Percentage <= 100
        require(_percentage >= 0, "percentage must be greater than 0");
        require(_percentage <= 100, "percentage must be less than 100");
        
        require(_coinAddress != address(0), "coin address is not valid");
        require(_payeeAddress != msg.sender, "can't add self payee");
        
        uint256 currentCoinPercentage = payerToCoinPercentage[msg.sender][_coinAddress];
        
        uint256 payeesCurrentShare = payeeObject.shares[_coinAddress];
        require((currentCoinPercentage - payeesCurrentShare) + _percentage <= 100, "maximum share percentage exceeded");

        payerToCoinPercentage[msg.sender][_coinAddress] = (currentCoinPercentage - payeesCurrentShare) + _percentage;
        payeeObject.shares[_coinAddress] = _percentage;
        
        emit PayeeShareChanged(msg.sender, _payeeAddress, _coinAddress, _percentage);
    }
    
    function setPayeeMessage(address _payeeAddress, string memory _newMessage) alive public {
        uint256 payeeId = payeeToPayerID[_payeeAddress][msg.sender];
        Payee storage payeeObject = payerToPayee[msg.sender][payeeId - 1];
        
        require(payeeId > 0, "not a payee");
        require(_payeeAddress == payeeObject.self, "payeeAddress mismatch");
        
        payeeObject.message = _newMessage;
        
        emit PayeeMessageChanged(msg.sender, _payeeAddress, _newMessage);
    }
    
    function confirm(address _payer) onlyPayeeOf(_payer) public {
        uint256 payeeId = payeeToPayerID[_payer][msg.sender];
        Payee storage payeeObject = payerToPayee[msg.sender][payeeId - 1];
        
        require(payeeObject.isConfirmed == false, "already confirmed");
        
        payerToConfirmationCount[_payer] = payerToConfirmationCount[_payer] + 1;
        payeeObject.isConfirmed = true;
        
        emit PayeeConfirmation(_payer, msg.sender);
        
        if(isPayerAlive(_payer) && !payerToRIP[_payer]) {
            // Rest in Piece, Payer... You will be remembered.
            payerToRIP[_payer] = true;
            emit PayerDeathConfirmed(_payer);
        }
    }
    
    function withdrawFromPayer(address _payer) onlyPayeeOf(_payer) public {
        uint256 payeeId = payeeToPayerID[msg.sender][_payer];
        Payee storage payeeObject = payerToPayee[msg.sender][payeeId - 1];
        
        require(payerToRIP[_payer], "payer is alive");
        require(!payeeObject.isWithdrawed, "already withdrawed");
        
        uint256 approvedCoinCount = payerToApprovedCoins[_payer].length;
        for(uint256 coin = 0; coin < approvedCoinCount; coin++) {
            address tokenAddress = payerToApprovedCoins[_payer][coin];
            IERC20 token = IERC20(tokenAddress);
            uint256 balanceOfToken = token.balanceOf(_payer);
            
            uint256 shareOfPayee = payeeObject.shares[tokenAddress];
            if(shareOfPayee != 0) {
                payeeObject.isWithdrawed = true;
                
                uint256 amountToTransfer = (balanceOfToken * shareOfPayee) / 100;
                token.transferFrom(_payer, payeeObject.self, amountToTransfer);
                
                emit TransferredToPayee(_payer, payeeObject.self, tokenAddress, amountToTransfer);
            }
        }
    }
    
    //TODO: Special case for payeeCount < 3.
    function isPayerAlive(address _payer) onlyPayeeOf(_payer) public view returns(bool) {
        uint256 payeeCount = getPayeeCount();
        uint256 confirmationCount = payerToConfirmationCount[_payer];
        
        // little trick due to lack of floating points
        uint256 ratio = confirmationCount * 10 / payeeCount;
        return ratio >= 5;
    }
    
    function getPayeeCount() public view returns(uint256) {
        return payerToPayee[msg.sender].length;
    }
    
    function getApprovedCoinCount() public view returns(uint256) {
        return payerToApprovedCoins[msg.sender].length;
    }
    
    function getMessage(address _payer) onlyPayeeOf(_payer) public view returns(string memory) {
        require(payerToRIP[_payer], "payer is still alive");
        return payerToPayee[_payer][payeeToPayerID[msg.sender][_payer]].message;
    }
    
    function getPayeeShareForCoin(address _payeeAddress, address _coinAddress) public view returns(uint256) {
        uint256 payeeId = payeeToPayerID[_payeeAddress][msg.sender];
        Payee storage payeeObject = payerToPayee[msg.sender][payeeId - 1];
        
        require(payeeId > 0, "not a payee");
        
        return payeeObject.shares[_coinAddress];
    }
}