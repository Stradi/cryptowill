// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "./Ownable.sol";
import "./IERC20.sol";

contract CryptoWill is Ownable {
    event PayeeAdded(address indexed _payer, address indexed _payee);
    event PayeeNameChanged(address indexed _payer, address indexed _payee, string _newName);
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
        string name;
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
    
    //TODO: Make this function payable.
    function addPayee(address _payeeAddress, string memory name) alive public {
        require(payeeToPayerID[_payeeAddress][msg.sender] == 0, "already a payee");
        require(_payeeAddress != msg.sender, "can't add self payee");
        
        uint256 idx = payerToPayee[msg.sender].length;
        payerToPayee[msg.sender].push();
        
        Payee storage payee = payerToPayee[msg.sender][idx];
        payee.self = _payeeAddress;
        payee.name = name;
        payee.isConfirmed = false;
        payee.isWithdrawed = false;
        
        payeeToPayerID[_payeeAddress][msg.sender] = idx + 1;
        
        emit PayeeAdded(msg.sender, _payeeAddress);
    }
    
    function setNameOfPayee(address _payeeAddress, string memory _newName) alive public {
        uint256 payeeId = payeeToPayerID[_payeeAddress][msg.sender];
        Payee storage payeeObject = payerToPayee[msg.sender][payeeId - 1];
        
        require(payeeId > 0, "not a payee");
        require(_payeeAddress == payeeObject.self, "payeeAddress mismatch");
        
        payeeObject.name = _newName;
        
        emit PayeeNameChanged(msg.sender, _payeeAddress, _newName);
    }
    
    //TODO: Handle approving before setting share.
    function setShareOfPayee(address _payeeAddress, address _coinAddress, uint256 _percentage) alive public {
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

        if(!isPayerApprovedCoin(msg.sender, _coinAddress)) {
            setCoinApproved(_coinAddress);
        }
        
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
        uint256 payeeId = payeeToPayerID[msg.sender][_payer];
        Payee storage payeeObject = payerToPayee[_payer][payeeId - 1];
        
        require(payeeObject.isConfirmed == false, "already confirmed");
        
        payerToConfirmationCount[_payer] = payerToConfirmationCount[_payer] + 1;
        payeeObject.isConfirmed = true;
        
        emit PayeeConfirmation(_payer, msg.sender);
        
        if(!isPayerAlive(_payer) && !payerToRIP[_payer]) {
            // Rest in Piece, Payer... You will be remembered.
            payerToRIP[_payer] = true;
            emit PayerDeathConfirmed(_payer);
        }
    }
    
    function withdrawFromPayer(address _payer) onlyPayeeOf(_payer) public {
        uint256 payeeId = payeeToPayerID[msg.sender][_payer];
        Payee storage payeeObject = payerToPayee[_payer][payeeId - 1];
        
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
                token.transferFrom(_payer, msg.sender, amountToTransfer);
                
                emit TransferredToPayee(_payer, payeeObject.self, tokenAddress, amountToTransfer);
            }
        }
    }
    
    function setCoinApproved(address _coinAddress) public {
        if(!isPayerApprovedCoin(msg.sender, _coinAddress)) {
            payerToApprovedCoins[msg.sender].push(_coinAddress);
        }
    }
    
    //TODO: Special case for payeeCount < 3.
    function isPayerAlive(address _payer) public view returns(bool) {
        uint256 payeeCount = getPayeeCount(_payer);
        uint256 confirmationCount = payerToConfirmationCount[_payer];
        
        // little trick due to lack of floating points
        uint256 ratio = confirmationCount * 10 / payeeCount;
        return !(ratio >= 5);
    }
    
    function isPayerApprovedCoin(address _payer, address _coinAddress) public view returns(bool) {
        for(uint256 i = 0; i < payerToApprovedCoins[_payer].length; i++) {
           if(payerToApprovedCoins[msg.sender][i] == _coinAddress) {
               return true;
           }
        }
        
        return false;
    }
    
    function getPayeeCount(address _payer) public view returns(uint256) {
        return payerToPayee[_payer].length;
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