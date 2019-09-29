![ev5game.github.io](ev5game-logo.png)
# ev5game.github.io
The game is running in the blockchain, if you want to learn more of the game, please see https://ev5game.github.io 

# EV5 Game's Rules
*  Invest Interval: 1-30ETH, the amount of Invest must be the integer.
*  The principal is thawed after 3 days of the share-holding period. No dividends are calculated after thawing. Node rewards are normally calculated and can be withdrawn at any time. Node rewards are not calculated after withdrawal.
*  Membership level is V1, V2, V3, V4（V4+)
```Solidity
*  1-5   ETH is V1
*  6-10  ETH is V2
*  11-15 ETH is V3
*  16-30 ETH is V4 {more 30 ETH is V4 Plus (It's a surprise)}
```
*  Income from equity
```Solidity
*  daily dividend of V1 is 0.5%
*  daily dividend of V2 is 0.7%
*  daily dividend of V3 is 1%
*  daily dividend of V4 is 1%
```
*  Node reward: 
```Solidity
*  V1：only get the first generation reward, 50% of the daily dividend of the first generation；
*  V2：only get the second generation reward, 50% of the daily dividend of the first generation, 30% of the daily dividend of the second generation,；
*  V3：get the unlimited generation reward, 100% of the daily dividend of the first generation, 70% of the daily dividend of the second generation, 50% of the daily dividend of the third generation, 8% of the daily dividend of the fourth generation to the tenth generation, 3% of the daily dividend of the eleven generation to the twenty generation, more than Twenty generation  0.5% of the daily dividend；
*  V4：get the unlimited generation reward, 120% of the daily dividend of the first generation, 80% of the daily dividend of the second generation, 60% of the daily dividend of the third generation, 10% of the daily dividend of the fourth generation to the tenth generation, 5% of the daily dividend of the eleven generation to the twenty generation, more than Twenty generation  1% of the daily dividend；
```
*  Reward burns: When the amount of his account is less than that of the recommended member, the node reward is calculated on the basis of the amount of his account.
<br>When the amount of his account is greater than or equal to that of the recommended member, the node reward is calculated on the basis of the amount of the recommended member. 
<br>In addition, node rewards need to be multiplied by membership grade coefficient, V1 is 20%, V2 is 40%, V3 is 60%，V4 is 50%. 
```Solidity
For example:
A recommended B, A shares 5 ETH, B shares 15 ETH, then A gets a daily bonus of (5*1/100) * 50% * 20%
```
*  3.5% of the share will be automatically allocated to a special account.
```Solidity
*  2% of which will be used for tecological application development and construction,and 70% of the monthly income will be used to counter-supplement the dividend-sharing game.
*  1% for Eth's Gas Fee
*  0.5% for market development
```
*  Dividends and nodal rewards are put into the waiting proceeds to be withdrawn after the contract is settled, and the player can withdraw them at any time.if the amount is greater than or equal to 0.1 ETH, it can be paid out in wallet. otherwise, it will accumulate in the account and be issued after the amount is greater than or equal to 0.1 ETH.
*  Restart mechanism: If the balance of the contract is 0, excluding the public trust fund, the restart mechanism will be automatically started. When restart, all accounts will be returned to 0, but the node relationship remains unchanged, and a new round of games will be started after three days.

# Source code analysis
## V3 Upgrade V4, Sync to New Contract's Function
```Solidity
    function upgrade(address _addr) public {
        (,,,uint frozenCoin,uint lineCoin,uint freeFunds,,uint32  readyTime,uint8 level,uint8 linelevel,,,) = db.nodeMapping(_addr);
        ndb.updateCoinLevel(_addr,frozenCoin.add(lineCoin), freeFunds, level, linelevel, 1,1,1,1);
        ndb.updateLockCoin(_addr,0,0,0,readyTime,0,0,0,1);
        
        updateUserCoin(_addr);
        updateOrder(_addr);
        updateMapping[_addr] = 1;
    }
```
## In QueueLine Player Reward income calculation
```Solidity
    function getReferRo(uint _linelevel,uint _era) external pure returns(uint){
        if(_linelevel == 1 && _era == 1){
            return 500;
        }if(_linelevel == 2 && _era == 1){
            return 500;
        }if(_linelevel == 2 && _era == 2){
            return 300;
        }if(_linelevel == 3) {
            if(_era == 1){
                return 1000;
            }if(_era == 2){
                return 700;
            }if(_era == 3){
                return 500;
            }if(_era >= 4 && _era <= 10){
                return 80;
            }if(_era >= 11 && _era <= 20){
                return 30;
            }if(_era >= 21){
                return 5;
            }
        }if(_linelevel == 4 || _linelevel == 5) {
            if(_era == 1){
                return 1200;
            }if(_era == 2){
                return 800;
            }if(_era == 3){
                return 600;
            }if(_era >= 4 && _era <= 10){
                return 100;
            }if(_era >= 11 && _era <= 20){
                return 50;
            }if(_era >= 21){
                return 10;
            }
        }
        return 0;
    }
```
*  According to the amount of players'betting, the time of betting and the number of subordinate players, the node reward and leadership reward are calculated.

## Invest into Contract's Intelligent judgement 
```Solidity
      if(userAddress == address(0)) {
            db.createUser(msg.sender, msg.value, 0, level, queueLevel, uint32(now), _ip);
      } else {
            require(frozenCoin.add(msg.value) <= env.maxCoin()*ethWei, "Max Coin is maxCoin ETH");
            frozenCoin = frozenCoin.add(msg.value);
            level = uint8(env.getLv(frozenCoin));
            queueLevel = uint8(env.getQueueLv(frozenCoin.add(freeCoin)));
            db.updateCoinLevel(msg.sender,frozenCoin,0,level,queueLevel,1,0,1,1);
      }
 ``` 
*  The new betting and additional betting of the same wallet are intelligently judged according to the player's rank, on-the-way situation and the amount of money already invested, and then written into ETH's intelligent contract.
 
 ## WithDraw Function
```Solidity
    function userWithDrawPro()
        public
        payable
        isHuman()
        isOpen
        returns(bool)
    {
        require(!reEntrancyMutex);
        (,,,,,uint frozenCoin,uint freeCoin,,,,,) = db.getUserMapping(msg.sender);
        
        bool success = false;
        uint rltCoin;
        (success,rltCoin) = isEnough(freeCoin, false);
        
        if(success == true){
            if(rltCoin > 0){
                transferTo(msg.sender, rltCoin);
                uint8 level = uint8(env.getLv(frozenCoin));
                uint8 queueLevel = uint8(env.getQueueLv(frozenCoin));
                db.updateCoinLevel(msg.sender,0,0,level,queueLevel,0,1,1,1);
            }
            return true;
        }
        return false;  
    }
 ``` 
