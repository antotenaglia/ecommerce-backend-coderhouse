import knex from "knex";

const config = {
    client: "mysql",
    connection: { 
        host: "127.0.0.1",
        user: "root",
        database: "coderhouse",
    },
    pool: { min: 0, max: 7}, 
};

const database = knex(config);

const createProductTable = async () => {
    try {
        await database.schema.dropTableIfExists("product")
        await database.schema.createTable("product", (productTable) => {
            productTable.increments("id").primary();
            productTable.string("title", 50).notNullable();
            productTable.integer("price", 50).notNullable();
            productTable.string("thumbnail", 500).notNullable();
        });
        console.log("Product table created");
        database.destroy();
    } catch (error) {
        console.log("Error:", error);
        database.destroy();
    };
};

createProductTable();