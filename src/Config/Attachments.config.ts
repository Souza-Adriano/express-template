import * as bodyParser from 'body-parser';
import Cors from 'cors';

export default [
    Cors(),
    bodyParser.json(),
    bodyParser.urlencoded(),
];