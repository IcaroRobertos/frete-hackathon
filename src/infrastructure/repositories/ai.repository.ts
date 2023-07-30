import uniqid from 'uniqid';
import fs from 'fs';
import {AppError} from '@errors';
import {IAIRepository} from '@interfaces';
import {speechToText, getIntentionFromText} from '@io/openai/openai';

export class AIRepository implements IAIRepository {
	public async getIntentionFromText(text: string): Promise<string | AppError> {
		try {
			return getIntentionFromText(text);
		} catch (err: any) {
			return new AppError({
				code: 502,
				message: `${err}`,
				kind: 'AI_GET_INTENTS_ERROR',
			});
		}
	}

	public async speechToText(speech: Buffer): Promise<string | AppError> {
		const filename = `${uniqid()}.mp3`;
		fs.writeFileSync(filename, speech as unknown as string);

		try {
			return speechToText({
				file: filename,
				model: 'whisper-1',
				language: 'pt',
				responseFormat: 'json',
				temperature: 0,
			});
		} catch (err) {
			return new AppError({
				code: 502,
				message: `${err}`,
				kind: 'AI_CONVERT_SPEECH_TO_TEXT_ERROR',
			});
		}
	}
}
