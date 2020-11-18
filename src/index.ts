import 'reflect-metadata'
// require('dotenv').config();
import createConnection from './lib/server/createConnection'

const PORT: string = '3500'

void createConnection(PORT)
