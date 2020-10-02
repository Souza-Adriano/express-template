import { Controller, Middleware, Get as GET, Post, Put, Delete, Patch } from '@overnightjs/core';
import events from '../Events/exemple.event'
import { Request, Response } from 'express';

abstract class Abc {
    protected events = events
    constructor() {}
}

@Controller('status')
export default class Exemple extends Abc {

    @GET()
    private async exemple (request: Request, response: Response) {
        this.events.test('string')
        response.json({ message: 'servidor online' })
    }
}