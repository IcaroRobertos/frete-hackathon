import {AppError} from '@errors';

export interface IIntentDatabase{
  findFlowFromIntention(_intention: string): Promise<string | null | AppError>
}
