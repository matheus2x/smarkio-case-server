import { createWriteStream } from "fs";
import { resolve } from "path";
import { Request, Response } from "express";

import { mysql, tts, env } from "../../config";

const commentsController = {
	async store(req: Request, res: Response) {
		try {
			const { comment, voiceLang } = req.body;

			if (voiceLang !== "1" && voiceLang !== "2") {
				return res.status(400).json({ Error: "Invalid Voice." });
			}

			if (comment.length <= 0 || comment.length > 300) {
				return res.status(400).json({ Error: "Invalid Comment." });
			}

			let voice = "pt-BR_IsabelaV3Voice";
			if (voiceLang === "2") {
				voice = "en-US_AllisonV3Voice";
			}

			const [commentId] = await mysql
				.connection("comments")
				.insert({ comment, audio: "..", lang: voice });

			const synthesizeParams = {
				text: comment,
				accept: "audio/mp3",
				voice,
			};

			const synthesizeStream = tts.tts.synthesizeUsingWebSocket(
				synthesizeParams
			);

			const speechFilePath = resolve(__dirname, "..", "..", "..", "uploads");
			const speechFile = `speech-${commentId}.mp3`;

			const endStream = new Promise<void>((resolves) => {
				synthesizeStream.pipe(
					createWriteStream(`${speechFilePath}/${speechFile}`).on(
						"finish",
						resolves
					)
				);
			});

			await endStream;

			await mysql
				.connection("comments")
				.where("id", commentId)
				.update({ audio: speechFile });

			return res.json({
				id: commentId,
				comment,
				audio: `http://localhost:${env.nodePort}/uploads/${speechFile}`,
			});
		} catch (err) {
			return res.status(500).json({ Error: "Internal Server Error" });
		}
	},

	async index(req: Request, res: Response) {
		try {
			const comments = await mysql.connection("comments").select("*");

			const serializedComments = comments.map((comment) => ({
				id: comment.id,
				comment: comment.comment,
				audio: `http://localhost:${env.nodePort}/uploads/${comment.audio}`,
			}));

			return res.json(serializedComments);
		} catch (err) {
			return res.status(500).json({ Error: "Internal Server Error" });
		}
	},
};

export default commentsController;
