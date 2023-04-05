const getCurrencyPrice = (price, currency) => {
    const tasas = {
      USD: 0.0047,
      ARS: 1,
    };
  
    switch (currency) {
      case "USD":
        return price * tasas.USD;
      case "ARS":
        return price * tasas.ARS;
    }
};
  
export default getCurrencyPrice;