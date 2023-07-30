import {Response} from 'express';
import {messageUseCases} from '@ioc';
import {AppError, AppErrorDTO} from '@errors';
import {
	GetFlowFromSpeechRequestDTO,
	GetFlowFromSpeechResponseDTO,
	GetFlowFromTextRequestDTO,
	GetFlowFromTextResponseDTO,
} from '@http/dtos/message.dtos';

export class MessageController {
	public static async flowFromSpeech(
		{body: {audioAddress}}: GetFlowFromSpeechRequestDTO,
		res: Response<GetFlowFromSpeechResponseDTO | AppErrorDTO>,
	) {
		const text = await messageUseCases.speechToText(audioAddress);
		if (text instanceof AppError) {
			const error = text.getError();
			return res.status(error.code).json({error});
		}

		const intention = await messageUseCases.getIntentionsFromText(text);
		if (intention instanceof AppError) {
			const error = intention.getError();
			return res.status(error.code).json({error});
		}

		const flow = await messageUseCases.findFlowFromIntention(intention);
		if (flow instanceof AppError) {
			const error = flow.getError();
			return res.status(error.code).json({error});
		}

		return res.status(200).json({flow});
	}

	public static async flowFromText(
		{body: {text}}: GetFlowFromTextRequestDTO,
		res: Response<GetFlowFromTextResponseDTO | AppErrorDTO>,
	) {
		const intention = await messageUseCases.getIntentionsFromText(text);
		if (intention instanceof AppError) {
			const error = intention.getError();
			return res.status(error.code).json({error});
		}

		const flow = await messageUseCases.findFlowFromIntention(intention);
		if (flow instanceof AppError) {
			const error = flow.getError();
			return res.status(error.code).json({error});
		}

		return res.status(200).json({flow});
	}
}
