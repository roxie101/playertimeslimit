import Ib from '@stoqey/ib';
import { stock } from '@stoqey/ib/dist/contract/stock';
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });
let connected = false;

const options = { port: 4001 };
const connection = new Ib(options);

const contract = stock('AAPL', undefined, 'USD');

connection.on('connected', () => {
    connected = true;
    console.log('Connected!');
});

connection.on('disconnected', () => {
    connected = false;
    console.log('Disconnected!');
});

c