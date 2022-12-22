import knex from "knex";

class Contenedor {
    constructor(databaseConfig, tableName) {
      this.database = knex(databaseConfig);
      this.table = tableName;
    }

    async save(document) {
        try {
            const newDocument = await this.database(this.table).insert(document);
            return newDocument;
        } catch (error) {
            throw new Error(`Error saving document: ${error}`);
        }
    }

    async getAll() {
        try {
            const documents = await this.database.from(this.table).select("*");
            return documents;
        } catch (error) {
            throw new Error(`Documents not found: ${error}`);
        }
    }

    async getById(id) {
        try {
            const document = await this.database.from(this.table).select("*").where({id});
            return document;
        } catch (error) {
            throw new Error(`Documents not found: ${error}`);
        }
    }

    async deleteById(id) {
        try {
            await this.database(this.table).del().where({id});
            return console.log("Document deleted")
        } catch (error) {
            throw new Error(`Documents not found: ${error}`);
        }
    }

    async deleteAll() {
        try {
            await this.database(this.table).del();
            return console.log("Documents deleted")
        } catch (error) {
            throw new Error(`Documents not found: ${error}`);
        }
    }
}

export default Contenedor; 