# Catch the Coin Kind of Game

You can check out the game [here](https://socket-multiplayer-hems.herokuapp.com/)

Socket.io passes messages quickly between a Node.js server and a clientside script. 

## What is the game ? 
-  There's a Node.js server and a bunch of clients that talk to it via socket.io
- When a client connects, it registers a player on the server with a unique ID (same as the socket's unique ID)
-  All of the game logic and game state lives on the server, which ticks every 3
ms.
- Each tick does two things: firstly, move all the players around based on their current velocity; secondly, emit the full game state to each client as a big js object of players and coordinates
- The server listens to 'up' 'down' 'left' and 'right' events, which are emitted by each client
- The client does two things: listen for key events on the page so they can be emitted to the server and listen to game state messages.
- Maximum of 100 players can play simultaneously.

## Similar to snake game 

- Acts like a multiplayer snake game. Each player is given a point if he collects a coin. Place the snake moves in client side only, else it did crash sometimes or it was not smooth. Multiplayer implementation is the main feature - difficult feature implemented. 
- The formula for velocity deltas, interpolating frames, and other very clever ways of predicting the next game state was referred from of course, the Stackoverflow platform. 
- Here the player is just a single block instead of the conventional continual increase of size. Only the points are increased. 
- Player with most number of doubloons wins.

## DEMO LINK

https://socket-multiplayer-hems.herokuapp.com/