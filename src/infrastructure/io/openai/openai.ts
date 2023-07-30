/* eslint-disable no-promise-executor-return */
import {exec} from 'node:child_process';
import {Configuration, OpenAIApi} from 'openai';
import {OPENAI_API_KEY} from '@variables';
import intents from '@data/intents.json';

type ISpeechToText = {
  file: string,
  model: string,
  prompt?: string | undefined,
  responseFormat?: string | undefined,
  temperature?: number | undefined,
  language?: string | undefined
}

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function speechToText({file}: ISpeechToText): Promise<string> {
	return new Promise((resolve, reject) => exec(`
      curl https://api.openai.com/v1/audio/transcriptions \
      -H "Authorization: Bearer ${OPENAI_API_KEY}" \
      -H "Content-Type: multipart/form-data" \
      -F model="whisper-1" \
      -F file="@/app/${file}"
    `,

	(error, stdout) => {
		if (error) {
			reject(error);
		}

		resolve(JSON.parse(stdout).text);
	}));
}

export async function getIntentionFromText(text: string): Promise<string> {
	const systemInput = `
		Comporte-se como um analista de atendimento da empresa FreteBras.
		Classifique e identifique o motivo que mais se assemelha ao texto do cliente e defina a porcentagem em formato decimal dessa semelhança.

    ${intents.map((i, index) => `
			*** Bloco ${index} ***
			${i.keys.toString()}

		`)}

		Caso não seja semelhante com nenhum dos motivos citados classifique como "Outros Assuntos".

		responda no formato JSON: "motivo" e "porcentagem"
`;

	const {data} = await openai.createChatCompletion({
		model: 'gpt-3.5-turbo',
		messages: [
			{
				role: 'system',
				content: systemInput,
			},
			{
				role: 'user',
				content: text,
			},
		],
		temperature: 0.3,
		max_tokens: 256,
		top_p: 1,
		frequency_penalty: 0,
		presence_penalty: 0,
	});

	console.log(data.choices[0].message);

	const {motivo} = JSON.parse(data.choices[0].message?.content as string);

	return motivo;
}
