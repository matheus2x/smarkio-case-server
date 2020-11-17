import { resolve } from "path";
import { connectionConfig } from "./mysql";

module.exports = {
  client: connectionConfig.client,
  connection: connectionConfig.connection,
  migrations: {
    directory: resolve(__dirname, "..", "database", "migrations"),
  },
};
