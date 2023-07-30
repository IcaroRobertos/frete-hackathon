import {AppError} from '@errors';
import {IIntentDatabase} from '@interfaces';
import intents from '@data/intents.json';

export class IntentDatabaseRepository implements IIntentDatabase {
	public async findFlowFromIntention(intention: string): Promise<string | null | AppError> {
		try {
			const intent = intents.find(i => i.keys.includes(intention));

			return intent?.flow || null;
		} catch (err) {
			return new AppError({
				code: 502,
				message: `${err}`,
				kind: 'FIND_FLOW_ERROR',
			});
		}
	}
}
