export default class ProductDTO {
    constructor(product, currencies) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.thumbnail = product.thumbnail;

        for (const [currency, value] of Object.entries(currencies)) {
            this[currency] = value;
        }
    }
}
