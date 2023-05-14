// import * as fs from 'fs';
// import logger from '../lib/logger.lib.js';

// class productsFile {
//     constructor(route) {
//       this.route = route;
//     };

//     async getAllProducts() {
//         try {
//             const product = await fs.promises.readFile(this.route, "utf-8");
//             return JSON.parse(product)
//         } catch (err) {
//             logger.error(`Error reading products for .txt:" ${err}`)
//             return [];
//         };
//     };  
// };

// export default productsFile;