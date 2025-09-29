import express, { Request, Response } from 'express';
import { router } from './routes';
import cors from 'cors';
import notFound from './middlewares/notFound';
import { globalErrorHandler } from './middlewares/globalErrorHandler';

export const app = express()

app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World")
});

app.use(globalErrorHandler);
app.use(notFound);