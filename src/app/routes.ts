import { Router } from "express";
import commentsController from "./controllers/commentsController";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ Message: "Hello World" });
});

routes.post("/tts", commentsController.store);

export default routes;
