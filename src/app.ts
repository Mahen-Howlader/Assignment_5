import express, { Request, Response } from 'express';
import { router } from './routes';
import cors from 'cors';

const app = express()

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
});

export default app;