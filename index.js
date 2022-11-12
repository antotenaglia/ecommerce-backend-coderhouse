const fs = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async save(object) {
    const listado = await this.getAll();

    let nuevoId;

    if (listado.length == 0) {
      nuevoId = 1;
    } else {
      nuevoId = listado[listado.length - 1].id + 1;
    }

    const nuevoObjeto = { ...object, id: nuevoId };

    listado.push(nuevoObjeto);

    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify(listado, null, 2));
      return nuevoId;
    } catch (error) {
      throw new Error(`Error al guardar producto en el archivo: ${error}`);
    }
  }

  async getById(id) {
    try {
      const listado = await this.getAll();
      return listado.find((object) => object.id === id) ?? null;
    } catch (error) {
      throw new Error(`No se encuentra el producto con id: ${id}`);
    }
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.ruta, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async deleteById(id) {
    const listado = await this.getAll();
    const nuevoListado = listado.filter((object) => object.id !== id);

    try {
      await fs.promises.writeFile(
        this.ruta,
        JSON.stringify(nuevoListado, null, 2)
      );
    } catch (error) {
      throw new Error(`Error al borrar producto con id: ${id}: ${error}`);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
    } catch (error) {
      throw new Error(`Error al borrar archivo: ${error}`);
    }
  }
}

module.exports = Contenedor;
