import app from './app';
import { PORT } from "./config.js";
import './database';

app.listen(PORT);
console.log('Hello World in port 3000', app.get("port"));