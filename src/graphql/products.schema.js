import { buildSchema } from "graphql";

const schema = buildSchema(`
    input ProductInput {
        title: String,
        price: Int,
        stock: Int,
        thumbnail: String,
    }

    type Product {
        title: String,
        price: Int,
        stock: Int,
        thumbnail: String,
        _id: ID!
    }

    type Query {
        getProducts: [Product],
    }
    
    type Mutation {
        createProduct(productData: ProductInput): Product,
        updateProduct(updateProductData: ProductInput, id: ID!): Product,
        deleteProduct(id: ID!): Product,
    }
`);

export default schema;




