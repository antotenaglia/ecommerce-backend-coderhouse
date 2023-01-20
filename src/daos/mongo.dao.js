export class MongoDao {
    constructor(model) {
      this.model = model;
    }
  
    async getAll() {
      try {
        const response = await this.model.find();
  
        return response;
      } catch (err) {
        throw new Error("Failed to get all");
      }
    }
  
    async getById(id) {
      try {
        const response = await this.model.findById(id);
  
        return response;
      } catch (err) {
        throw new Error("Failed to get by id");
      }
    }
  
    async create(resource) {
      try {
        const response = await this.model.create(resource);
  
        return response;
      } catch (err) {
        throw new Error("Failed to create");
      }
    }
  
    async update(resource, id) {
      try {
        const response = await this.model.findByIdAndUpdate(id, resource);
  
        return response;
      } catch (err) {
        throw new Error("Failed to update");
      }
    }
  
    async delete(id) {
      try {
        const response = await this.model.findByIdAndDelete(id);
  
        return response;
      } catch (err) {
        throw new Error("Failed to delete");
      }
    }
  }