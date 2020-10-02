import EventMesseger, { Create, CreateEvent } from '../Core/Event';

const messeger = EventMesseger.getInstance();
export const exemple = Create({
    key: 'exemple',
    description: 'exemple of a new event',
    onMessage: async (event) => {
        console.log('event:exemple', event.message);
    }
});

export default {
    test: (msg: string) => messeger.send({
        origin: 'exemple',
        status: 200,
        message: msg,
        content: {},
    })
}