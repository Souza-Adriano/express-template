export interface Server {
    port(port: number): this
    routes(routes: any): this
    events(events: any[]): this;
    load(load: any[]): this;
    start(): Promise<void>
}

export interface Route {
    
}