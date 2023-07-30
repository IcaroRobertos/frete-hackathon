import {MessageUseCases} from '@usecases';
import {AudioRepository, AIRepository, IntentDatabaseRepository} from '@repositories';

export const messageUseCases = new MessageUseCases(
	new AudioRepository(),
	new AIRepository(),
	new IntentDatabaseRepository(),
);
