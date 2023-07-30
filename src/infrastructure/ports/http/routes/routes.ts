import {Router as ExpressRouter} from 'express';
import {MessageController} from '@http/controllers/message.controller';

export class Router {
	public static config(): ExpressRouter {
		const route = ExpressRouter();

		// Message routes
		route.post('/messages/flow-from-speech', MessageController.flowFromSpeech);
		route.post('/messages/flow-from-text', MessageController.flowFromText);

		return route;
	}
}
