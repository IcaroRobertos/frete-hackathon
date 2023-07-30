import {Request} from 'express';

export interface GetFlowFromSpeechRequestDTO extends Request {
  body: {
    audioAddress: string
  }
}

export interface GetFlowFromSpeechResponseDTO {
  flow: string | null
}

export interface GetFlowFromTextRequestDTO extends Request {
  body: {
    text: string
  }
}

export interface GetFlowFromTextResponseDTO {
  flow: string | null
}
