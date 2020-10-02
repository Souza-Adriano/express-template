import { EventEmitter } from 'events'

export interface Emitter {
    send(event: Event): void;
    onMessage(handlers: EventHandler[]): void;
}

export interface Event {
    origin: string;
    status: number;
    message: string;
    content: any;
}

export interface EventHandler {
    description: string;
    key: string;
    onMessage(event: Event): Promise<void>
}

export default class Messeger implements Emitter {
    private static instance: Messeger;
    private messeger: EventEmitter;

    private constructor() {
        this.messeger = new EventEmitter();
    }

    public static getInstance(): Messeger {
        if(!this.instance) { this.instance = new Messeger() }
        return this.instance;
    }

    public onMessage(handlers: EventHandler[]) {
        handlers.forEach(handler => this.messeger.on(handler.key, handler.onMessage))
    }

    public send(event: Event) {
        this.messeger.emit(event.origin, event);
    }
}

export const Create = (event: EventHandler): EventHandler => event
export const CreateEvent = (event: Event) => event;