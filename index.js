var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var engine = require('./public/game')

var gameInterval, updateInterval

function pirateName() {
  var names = [
    'Hemanth','Raina','Kohli',
    'Micheal','Anirudh','Pooja',
    'Sharms','Rohit','William',
    'GVP','Harris'
  ]
  return names[Math.floor(Math.random()*names.length)]
}
function gameLoop() {

  Object.keys(engine.players).forEach((playerId) => {
    let player = engine.players[playerId]
    engine.movePlayer(playerId)
  })
}

app.use(express.static('public'))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

function emitUpdates()
{
  io.emit('gameStateUpdate', { players: engine.players, doubloon: engine.doubloon });
}

io.on('connection', function(socket){
  console.log('User connected: ', socket.id)
  if (Object.keys(engine.players).length == 0) {
    engine.shuffleDoubloon()
  	gameInterval = setInterval(gameLoop, 25)
    updateInterval = setInterval(emitUpdates, 40)
	}
  var posX = 0
  var posY = 0
  while (!engine.isValidPosition({ x: posX, y: posY }, socket.id)) {
    posX = Math.floor(Math.random() * Number(engine.gameSize) - 100) + 10
    posY = Math.floor(Math.random() * Number(engine.gameSize) - 100) + 10
  }
  engine.players[socket.id] = {
  	accel: {
  		x: 0,
  		y: 0
  	},
  	x: posX,
    y: posY,
  	colour: engine.stringToColour(socket.id),
  	score: 0,
    name: pirateName()
  }

  socket.on('disconnect', function() {
  	delete engine.players[socket.id]

  	if (Object.keys(engine.players).length > 0) {
    	io.emit('gameStateUpdate', engine.players);
  	} else {
  		clearInterval(gameInterval)
      clearInterval(updateInterval)
  	}
  })

  socket.on('up', function(msg){
    engine.accelPlayer(socket.id, 0, -1)
  });

  socket.on('down', function(msg) {
    engine.accelPlayer(socket.id, 0, 1)
  })

  socket.on('left', function(msg){
    engine.accelPlayer(socket.id, -1, 0)
  });

  socket.on('right', function(msg) {
    engine.accelPlayer(socket.id, 1, 0)
  })
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000', process.env.PORT);
});
