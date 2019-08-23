import {Request, Response} from 'express';
import * as express from 'express';

const app = express();
 
app.get('/', function (_req: Request, res: Response) {
  res.send('Hello World');
});
 
app.listen(3000);
