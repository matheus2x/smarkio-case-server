import * as dotenv from "dotenv";
import { resolve } from "path";

const envFound = dotenv.config({
  path: resolve(__dirname, "..", "..", ".env"),
});

if (!envFound) {
  throw new Error('[Server Error]: Environment File ".env" Not Found.');
}

export default {
  nodePort: process.env.NODE_PORT || 3333,
};
