import { expect } from "chai";
import supertest from "supertest";
import generateProduct from "../lib/faker.lib.js";

let request;
let createdProduct;
describe('Test of Products', () => {

    before(() => {
        request = supertest("http://localhost:3000");
    });

    describe("- POST /products/loading", async () => {
        const productToCreate = generateProduct();
        it("Should response with products properties", async () => {
            const response = await request.post("/products/loading").send(productToCreate);
            
            createdProduct = response.request._data;
            
            expect(createdProduct).to.keys("id", "title", "price", "stock", "thumbnail");
        });
    });

    describe("- GET /products", async () => {
        it("Should response with 200 status code", async () => {
            const response = await request.get("/products");
            
            expect(response.status).to.eql(200);
        });
    });    

    describe("- DELETE /products/delete", async () => {
        it("Should response with 200 status code", async () => {
            const id = createdProduct.id;
            const deletedProduct = await request.delete(`/products/delete/${id}?username=anto@anto.com`);
            
            expect(deletedProduct.status).to.eql(200);
        });
    });

});

