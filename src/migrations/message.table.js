import knex from "knex";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = {
    client: "sqlite3",
    connection: { 
        filename: path.resolve(__dirname, "../database/coderhouse.sqlite")
    },
    useNullAsDefault: true,
};

const database = knex(config);

const createMessageTable = async () => {
    try {
        await database.schema.dropTableIfExists("message")
        await database.schema.createTable("message", (messageTable) => {
            messageTable.increments("id").primary();
            messageTable.string("username", 100).notNullable();
            messageTable.string("message", 500).notNullable();
            messageTable.string("fyh", 250).notNullable();
        });
        console.log("Message table created");
        database.destroy();
    } catch (error) {
        console.log("Error:", error);
        database.destroy();
    };
};

createMessageTable();