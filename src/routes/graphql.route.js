import { Router } from "express";
import { productsController } from "../controllers/products.controller.js";
import { graphqlHTTP } from "express-graphql";
import schema from "../graphql/products.schema.js";

const router = Router();

router.route("/", graphqlHTTP({
    schema,
    rootValue: {
      getProducts: productsController.getProducts,
      createProduct: productsController.postProductsLoading,
      updateProduct: productsController.updateProduct,
      deleteProduct: productsController.deleteProduct,
    },
    graphiql: true,
  })
);   

export const graphqlRouter = router;