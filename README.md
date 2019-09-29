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
*  Reward burns: When the amount of his account is less than that of the recommended member, the node reward is calculated on the basis of the amount of his account. When the amount of his account is greater than or equal to that of the recommended member, the node reward is calculated on the basis of the amount of the recommended member. In addition, node rewards need to be multiplied by membership grade coefficient, V1 is 20%, V2 is 40%, V3 is 60%，V4 is 50%. 
```Solidity
For example: A recommended B, A shares 5ETH, B shares 15ETH, then A gets a daily bonus of (5*1/100)*50%*30%.
```
*  3.5% of the share will be automatically allocated to a special account, 1..5% of which will be used for ecological application development and construction, 1% for market development, 1% for incentives for founding teams, and 70% of the monthly income will be used to counter-supplement the dividend-sharing game.
*  Dividends and nodal incentives are issued automatically, if the amount is greater than or equal to 0.1, it will be issued automatically, otherwise, it will accumulate in the account and be issued automatically after the amount is greater than or equal to 0.1.
*  Restart mechanism: If the contract balance is 0, the restart mechanism will be automatically started. When restart, all accounts will be returned to 0, but the node relationship remains unchanged, and a new round of games will be started.
# Rules Analysis

# Source code analysis
