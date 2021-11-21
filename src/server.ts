import express, { Request, Response, Application } from "express";
import cors from 'cors';

import { PostController } from "./controller/post.controller";
import { createConnection } from "typeorm";

class Server {
    private postController: PostController;
    private app: Application;

    constructor() {
        this.app = express();
        this.configuration();
        this.routes();
    }

    public configuration() {
        this.app.set("port", process.env.PORT || 3000);
        this.app.use(cors());
        this.app.use(express.json());
    }

    public async routes() {
        await createConnection({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "blog",
            entities: [__dirname + "/database/entities/*{.ts,.js}"],
            synchronize: true,
            name: "blog"
        });

        this.postController = new PostController();

        this.app.use("/api/posts/", this.postController.router);
        this.app.get("/", (req: Request, resp: Response) => {
            resp.send("Hello World");
        });
    }

    public start() {
        const port = this.app.get("port");
        this.app.listen(port, () => {
            console.log(`Server is listening ${port} port`);
        });
    }

    public getApp() {
        return this.app;
    }
}

export const server = new Server();
server.start();