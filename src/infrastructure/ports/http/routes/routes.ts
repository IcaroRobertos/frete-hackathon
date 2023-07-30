import {Router as ExpressRouter} from 'express';
import {MessageController} from '@http/controllers/message.controller';
import {RootController} from '@http/controllers/root.controller';

export class Router {
	public static config(): ExpressRouter {
		const route = ExpressRouter();

		// Root routes
		route.get('/check', RootController.healthCheck);

		// Message routes
		route.post('/messages/flow-from-speech', MessageController.flowFromSpeech);
		route.post('/messages/flow-from-text', MessageController.flowFromText);

		return route;
	}
}
