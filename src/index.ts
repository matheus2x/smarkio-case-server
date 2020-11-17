import app from "./app";
import { env } from "./config";

app.listen(env.nodePort, () => {
  console.log(`[Server]: Listening ${env.nodePort}`);
});
