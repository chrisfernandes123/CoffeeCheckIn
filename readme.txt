Left off with trying to add chat, and pop up for new user.  
In the process I broke the connected viewers section.  Chris connects.  Tanya connects. 
connected viewers shows only Tanya.

Added core functionality for multiplayer game play via Firebase.
Additional functionality includes:
1) The ability to store your "career" wins and losses via your name and 4 digit code combination. 
2) The name and 4 digit code combination is stored in local storage so when the player returns to the page, it will be conveniently retrieved. 
3) Dynamic Game Status messaging in case the players disconnect from the game. 
4) When a player 1 makes a selection, the image is changed to a check mark to let the player 2 know that player 1 has made a selection and vice versa.  
5) Added 3 second timeout delay after each round to show the results.  
6) The display of the results included displaying applicable images (rock, paper, or scissors) based on the player's selection.
a) The applicable images that are displayed are color coded.  For example, if rock won in the round, the rock image would be green.  If rock tied in the round, the rock image would be yellow.  If rock lost in the round, the rock image would be red, etc.
7) Updated the player's data in Firebase with the Firebase connection's unique identifer.  This is used to identify the player connected. Updated the Firebase connection's unique identifer with the player's name. 
8) When player disconnects, data in Firebase is deleted automatically.
9) Dynamic display of connected viewers.

If I had more time / Future ideas:
1) Build a queuing system so that additional players can connect and wait their turn to play the winner.
2) Set a maximum number of rounds.  Currently the rounds are unlimited between 2 players. 
3) Build a timer per round.  Currently players have unlimited time to make a selection. 