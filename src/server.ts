import express, { Request, Response } from 'express';

const app = express()

app.get('/', (req: express.Request, res: express.Response) => {
    return res.json({message: 'Hello World'});
})

app.listen(3333);

