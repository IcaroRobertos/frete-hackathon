interface IAppError {
  kind: string
  message: string
  code: number
  path?: string
}

export interface AppErrorDTO {
  error: IAppError
}

export class AppError {
	private error: IAppError;

	constructor(error: IAppError) {
		this.error = error;
	}

	public getError(): IAppError {
		return {
			...this.error,
		};
	}
}
