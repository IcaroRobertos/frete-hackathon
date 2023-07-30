import '@environment';
import {ExpressWebServer} from '@io/webservers/express';

async function bootstrap() {
	ExpressWebServer.initServer();
}

bootstrap();
