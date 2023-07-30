import express, {Express} from 'express';
import cors from 'cors';
import {APP_PORT} from '@variables';
import {Router} from '@http/routes/routes';

export class ExpressWebServer {
	public static server(): Express {
		const app = express();

		app.use(cors());
		app.use(express.json());
		app.use(express.urlencoded({extended: false}));

		app.use('/v1/api', Router.config());

		return app;
	}

	public static initServer(): void {
		this.server().listen(APP_PORT, () => console.log(`Server running on port ${APP_PORT}`));
	}
}
