import knex from "knex";

import { mysqlHost, mysqlUser, mysqlPass, mysqlDB } from "./environment";

export const connectionConfig = {
	client: "mysql2",
	connection: {
		host: mysqlHost,
		user: mysqlUser,
		password: mysqlPass,
		database: mysqlDB,
	},
};

export const connection = knex(connectionConfig);
