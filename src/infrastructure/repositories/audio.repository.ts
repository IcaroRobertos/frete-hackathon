import axios from 'axios';
import {AppError} from '@errors';
import {IAudioRepository} from '@interfaces';

export class AudioRepository implements IAudioRepository {
	public async downloadAudio(audioAddress: string): Promise<Buffer | AppError> {
		try {
			const {data} = await axios.get(audioAddress, {responseType: 'arraybuffer'});

			return Buffer.from(data);
		} catch (err) {
			return new AppError({
				code: 502,
				message: `${err}`,
				kind: 'DOWNLOAD_AUDIO_ERROR',
			});
		}
	}
}
