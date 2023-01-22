import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

export class FirebaseDao {
    constructor(db, nameDb) {
      this.db = db;
      this.nameDb = nameDb
    }

    async getAll() {
      try {
        const response = await getDocs(collection (this.db, this.nameDb));
  
        return response;
      } catch (err) {
        throw new Error("Failed to get all");
      }
    }
  
    async getById(id) {
      try {
        const response = await getDoc(collection (this.db, this.nameDb), id)
        const data = response.data();

        return { ...data, id };
      } catch (err) {
        throw new Error("Failed to get by id");
      }
    }
  
    async create(resource) {
      try {
        const response = await addDoc(collection (this.db, this.nameDb), resource);
  
        return response;
      } catch (err) {
        throw new Error("Failed to create");
      }
    }
  
    async update(resource, id) {
      try {
        const response = await getDoc(collection (this.db, this.nameDb), id).updateDoc(resource);
  
        return response;
      } catch (err) {
        throw new Error("Failed to update");
      }
    }
  
    async delete(id) {
      try {
        const response = await deleteDoc(doc(this.db, this.nameDb[id]));
  
        return response;
      } catch (err) {
        throw new Error("Failed to delete");
      }
    }
  }