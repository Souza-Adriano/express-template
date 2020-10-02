import { Server as Overnigth } from '@overnightjs/core';
import 'express-async-errors';
import { Server } from './Server.model';
import EventMesseger, { EventHandler } from '../Event';
import { NextFunction, Request, RequestHandler, Response } from 'express';

type ErrorHandler =  (err: any, request: Request, response: Response, next: NextFunction) => Promise<void>

export interface ServerConfig {
    port: number;
    routes: any[];
    attachments: RequestHandler[];
    events: EventHandler[];
    failHandler?: ErrorHandler;
    logHandler?: RequestHandler;
}

export default class extends Overnigth {
    messeger: EventMesseger = EventMesseger.getInstance();

    constructor(private readonly config: ServerConfig) {
        super()
    }

    protected default = {
        fail: async  (err: any, request: Request, response: Response, next: NextFunction): Promise<void> => {
            if(err.status) { response.status(err.status).json({status: 'error', message: err.message || 'Unknow error'}) }
            else { console.error(err); response.status(500).json({status: 'error', message: 'Internal server error'}) }
        }
    }

    protected init = {
        log: async () => this.config.logHandler && this.app.use(this.config.logHandler),
        routes: async () => this.addControllers(this.config.routes.map(Route => new Route())),
        attachments: async () => this.config.attachments.forEach(handler => this.app.use(handler)),
        events: async () => this.messeger.onMessage(this.config.events),
    }

    public async start(): Promise<void> {
        await this.init.log();
        await this.init.routes();
        await this.init.attachments();
        await this.init.events();

        this.app.use(this.config.failHandler || this.default.fail);
        this.app.listen(this.config.port, () => {
            console.log(`Server Online ${this.config.port}`)
        })
    }
}