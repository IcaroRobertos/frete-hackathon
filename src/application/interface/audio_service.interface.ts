import {AppError} from '@errors';

export interface IAudioRepository {
  downloadAudio(_audioAddress: string): Promise<Buffer | AppError>
}
