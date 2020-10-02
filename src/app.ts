import Server from './Core/Server';
import ServerConfig from './Config/Server.config';
import routes from './Config/Routes.config';
import attachments from './Config/Attachments.config';
import events from './Config/Events.config';
import Morgan from 'morgan';

const Application = new Server({
    port: ServerConfig.port,
    routes,
    attachments,
    events,
    logHandler: Morgan('\n[:date[clf]] \n@:method:url #:status \n:res[content-length] length \nby :user-agent')
});

Application.start()
    .catch(console.error);