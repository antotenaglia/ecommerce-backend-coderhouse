import {faker} from "https://cdn.skypack.dev/@faker-js/faker"

faker.locale = "es";

const productsPool = document.getElementById("productsPool");
const productData = [];

for (let i = 1; i <= 5; i++) {
    productData.push({
      title: faker.commerce.product(),
      price: faker.commerce.price(),
      thumbnail: faker.image.image(),
    });
}

const htmlProductsPool = productData.map((productInfo) => {
  return `
    <tbody> 
      <tr>
        <th>${productInfo.title}</th>
        <th>${productInfo.price}</th>
        <th><img src="${productInfo.thumbnail}" width="150"></img></th>
      </tr>
    </tbody>`;
});

productsPool.innerHTML = htmlProductsPool.join(" ");