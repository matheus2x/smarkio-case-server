import { createWriteStream } from "fs";
import { resolve } from "path";
import { Request, Response } from "express";
import { mysql, tts, env } from "../../config";

const commentsController = {
  async store(req: Request, res: Response) {
    try {
      const { comment } = req.body;

      if (comment.length <= 0 || comment.length > 4000) {
        return res.status(400).json({ Error: "Invalid Comment." });
      }

      const [commentId] = await mysql
        .connection("comments")
        .insert({ comment, audio: ".." });

      const synthesizeParams = {
        text: comment,
        accept: "audio/mp3",
        voice: "en-US_AllisonV3Voice",
      };

      const synthesizeStream = await tts.tts.synthesizeUsingWebSocket(
        synthesizeParams
      );

      const speechFilePath = resolve(__dirname, "..", "..", "..", "uploads");
      const speechFile = `speech-${commentId}.mp3`;

      await synthesizeStream.pipe(
        createWriteStream(`${speechFilePath}/${speechFile}`)
      );

      await mysql
        .connection("comments")
        .where("id", commentId)
        .update({ audio: speechFile });

      return res.json({
        id: commentId,
        comment,
        audio: speechFile,
      });
    } catch (err) {
      console.error(
        "[Server Error]: Error while inserting new comment:\n",
        err.message
      );

      return res.status(500).json({ Error: "Internal Server Error" });
    }
  },

  async index(req: Request, res: Response) {
    try {
      const comments = await mysql.connection("comments").select("*");

      const serializedComments = comments.map((comment) => {
        return {
          id: comment.id,
          comment: comment.comment,
          audio: `http://localhost:${env.nodePort}/uploads/${comment.audio}`,
        };
      });

      return res.json(serializedComments);
    } catch (err) {
      console.error(
        "Server Error]: Error while searching comments:\n",
        err.message
      );

      return res.status(500).json({ Error: "Internal Server Error" });
    }
  },
};

export default commentsController;
