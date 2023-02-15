const random = () => {
    return Math.floor(Math.random() * (1000 - 0 + 1) + 0);
}

const getRandom = (quantity) => {
    const result = {};

    for (let i=0; i<= quantity; i++) {
        const randomNumber = random();

        result[randomNumber] = result[randomNumber] ? result[randomNumber] + 1 : 1;
    };

    return result;
}

process.on("message", (quantity) => {    
    const response = getRandom(quantity);
  
    process.send(response);
});
