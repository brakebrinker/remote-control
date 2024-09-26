import Jimp from 'jimp';
import { httpServer } from './src/http_server/index.js';
import robot from 'robotjs';
import { emitKeypressEvents } from 'readline';
import WebSocket, { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

emitKeypressEvents(process.stdin);

if (process.stdin.isTTY) {
    process.stdin.setRawMode(true);
}

process.stdin.on('keypress', (chunk, key) => {
    console.log('xxx: ', key, robot.getMousePos());
    if (key && key.name === 'up') {
        robot.moveMouse(900, 900);
    }
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({
    port: 8080,
});

const screenSize = robot.getScreenSize();
console.log('jjjj: ', screenSize.width);

wss.on('connection', ws => {
    ws.on('message', data => {
        console.log('received %s', data);
    });
    ws.send(`something`);
});

wss.on('close', () => {
    console.log('Websocket connection is closed');
});


