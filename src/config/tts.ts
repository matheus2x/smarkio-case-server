import { IamAuthenticator } from "ibm-watson/auth";
import TextToSpeechV1 = require("ibm-watson/text-to-speech/v1");

import { ttsApiKey, ttsUrl } from "./environment";

export const tts = new TextToSpeechV1({
	authenticator: new IamAuthenticator({
		apikey: ttsApiKey,
	}),
	serviceUrl: ttsUrl,
});
