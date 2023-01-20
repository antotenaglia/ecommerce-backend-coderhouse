export class FirebaseDao {
    constructor(model) {
      this.model = model;
    }
  
    async getAll() {
      try {
        const response = await this.model.docs.get();
  
        return response;
      } catch (err) {
        throw new Error("Failed to get all");
      }
    }
  
    async getById(id) {
      try {
        const response = await this.model.doc(id).get()
        const data = response.data();

        return { ...data, id };
      } catch (err) {
        throw new Error("Failed to get by id");
      }
    }
  
    async create(resource) {
      try {
        const response = await this.model.doc.create(resource);
  
        return response;
      } catch (err) {
        throw new Error("Failed to create");
      }
    }
  
    async update(resource, id) {
      try {
        const response = await this.model.doc(id).update(resource);
  
        return response;
      } catch (err) {
        throw new Error("Failed to update");
      }
    }
  
    async delete(id) {
      try {
        const response = await this.model.doc.delete(id);
  
        return response;
      } catch (err) {
        throw new Error("Failed to delete");
      }
    }
  }