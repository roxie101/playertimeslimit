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

connection.on('result', (event: any, args: any) => {
    console.log('%s --- %s', event, JSON.stringify(args));
});

connection.on('error', (err: any) => {
    console.error('error --- %s', err.message);
});

if (!connected) {
    connection.connect();
}

wss.on('connection', (ws) => {
    ws.on('message', (message: string) => {
        console.log(`Received message => ${message}`);
    });

    connection.reqHistoricalData(6000, contract, '', '3 M', '1 day', 'ADJUSTED_LAST', 1, 1, false);
    connection.reqHistoricalData(6001, contract, '', '1 W', '1 hour', 'ADJUSTED_LAST', 1, 1, false);
    connection.reqHistoricalData(6002, contract, '', '3600 S', '1 min', 'ADJUSTED_LAST', 1, 1, false);
    connection.reqRealTimeBars(6003, contract, 5, 'TRADES', true);

    connection.on('historicalData', (reqId: number, date: string, open: number, high: number, low: number, close: num