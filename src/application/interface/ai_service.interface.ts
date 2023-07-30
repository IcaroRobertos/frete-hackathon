import {AppError} from '@errors';

export interface IAIRepository {
  speechToText(_speech: Buffer): Promise<string | AppError>
  getIntentionFromText(_text: string): Promise<string | AppError>
}
