// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Betting{

    address public owner;
    address payable[] public players;

    constructor() {
        owner = msg.sender;
    }

    uint public game = 1;
    uint public minBet = 0.01 ether;
    uint private commission = 4; 

    function bet(uint matchID, string memory predict) public payable{
        //require((timestamp < block.timestamp), "Too late to place bet");
        require((msg.value > minBet), "Bet is too small");
        require((Amount[matchID][msg.sender] == 0), "Placed a bet already");

        players.push(payable(msg.sender));

        prediction[matchID][predict].push(msg.sender);
        Amount[matchID][msg.sender] = (msg.value);
        MatchAmount[matchID] += msg.value;
        emit BetPlaced(msg.sender, matchID, predict,msg.value);
    }
    //win and lose mappings
    mapping(uint=> mapping(string => address[])) prediction;
    mapping(uint=>mapping(address=> uint)) public Amount;
    mapping(uint=>uint) public MatchAmount;
    mapping(uint=>string) public result;

    event Winner(uint indexed matchId, address indexed winner, uint amount);
    event BetPlaced(address indexed bettor, uint indexed matchId, string team, uint amount);
    event ResultSet(uint indexed matchId, string winningTeamId);


    function Distribute(uint _matchId, string memory Finalresult) public payable onlyOwner{
        require((_matchId == game), "Distribute only for current game");
        result[_matchId] = Finalresult;
        emit ResultSet(_matchId, Finalresult);
        uint toDistribute = 3 * MatchAmount[_matchId] / commission;
        address [] memory winners = prediction[_matchId][Finalresult];
        for(uint i = 0; i<winners.length; i++){
            payable(winners[i]).transfer(toDistribute/winners.length);
        }
        game++;
    }

    function getPredictions(uint _matchId, string memory _team) public view returns (address[] memory) {
        return prediction[_matchId][_team];
    }

    function checkBalance() public view onlyOwner returns (uint256 ){
        return address(this).balance;
    }

    function getPredictionNumber(uint _matchId, string memory _team) public view returns (uint) {
        return prediction[_matchId][_team].length;
    }

    function getResult(uint _matchId) public view returns (string memory) {
        return result[_matchId];
    }

    function playerBalance() public view returns (uint) {
        return msg.sender.balance/(1 ether);
    }

    function getCurrentGame() public view returns (uint) {
        return game;
    }

    function getMatchAmount(uint matchID) public view returns (uint) {
        return MatchAmount[matchID];
    }

    modifier onlyOwner{
        require((msg.sender == owner));
        _;
    }
}