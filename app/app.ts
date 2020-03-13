import Ib from '@stoqey/ib';
import { stock } from '@stoqey/ib/dist/contract/stock';
import WebSocket from 'ws';

const wss = new WebSocket.Server({ port: 8080 });
let con