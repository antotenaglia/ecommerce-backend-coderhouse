import { faker } from "@faker-js/faker";

faker.locale = "es";

function generateProduct () {
    return {
        id: faker.datatype.number(),
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        stock: faker.datatype.number(),
        thumbnail: faker.image.imageUrl(),
    }
}

export default generateProduct;




