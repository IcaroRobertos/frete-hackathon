import {IAudioRepository, IAIRepository, IIntentDatabase} from '@interfaces';
import {AppError} from '@errors';

export class MessageUseCases {
	private readonly audioService: IAudioRepository;
	private readonly aiService: IAIRepository;
	private readonly intentDatabse: IIntentDatabase;

	constructor(audioService: IAudioRepository, aiService: IAIRepository, intentDatabse: IIntentDatabase) {
		this.audioService = audioService;
		this.aiService = aiService;
		this.intentDatabse = intentDatabse;
	}

	public async speechToText(audioAddress: string): Promise<string | AppError> {
		const file = await this.audioService.downloadAudio(audioAddress);
		if (file instanceof AppError) {
			return file;
		}

		return this.aiService.speechToText(file);
	}

	public async getIntentionsFromText(text: string): Promise<string | AppError> {
		return this.aiService.getIntentionFromText(text);
	}

	public async findFlowFromIntention(intention: string): Promise<string | null | AppError> {
		return this.intentDatabse.findFlowFromIntention(intention);
	}
}
