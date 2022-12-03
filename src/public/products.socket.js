const productForm = document.getElementById("productForm");
const productNameInput = document.getElementById("productNameInput");
const productPriceInput = document.getElementById("productPriceInput");
const productThumbnailInput = document.getElementById("productThumbnailInput");
const productsPool = document.getElementById("productsPool");

//se define la función que envía productos
const sendProduct = (productInfo) => {
    //se manda mensaje al back a traves de websocket
    socket.emit("client:product", productInfo);
  };

//se define la función que muestra productos
const renderProduct = (productData) => {
    const htmlProductsPool = productData.map((productInfo) => {
      return `
        <tbody> 
          <tr>
            <th>${productInfo.productName}</th>
            <th>${productInfo.productPrice}</th>
            <th><img src="${productInfo.productThumbnail}" width="50"></img></th>
          </tr>
        </tbody>`;
    });

    productsPool.innerHTML = htmlProductsPool.join(" ")
  };

//se define la función que dispara el evento submit del form de productos
const productSubmitHandler = (event) => {
    //evita que se recargue la página
    event.preventDefault();
  
    //se definen variables del producto
    const productInfo = {
      productName: productNameInput.value,
      productPrice: productPriceInput.value,
      productThumbnail: productThumbnailInput.value
    };
  
    //se ejecuta sendProduct()
    sendProduct(productInfo);
  
    //se vacían las 3 entradas de producto   
    productNameInput.value = "";
    productPriceInput.value = "";
    productThumbnailInput.value = "";
  };

//se ejecuta el evento submit para productos 
productForm.addEventListener("submit", productSubmitHandler);

//se escuchan los eventos que vienen del server, mostrando los productos 
socket.on("server:product", renderProduct);