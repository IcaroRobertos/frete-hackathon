import {Request, Response} from 'express';

export class RootController {
	public static async healthCheck(_req: Request, res: Response) {
		return res.status(200).json({healthy: true});
	}
}
