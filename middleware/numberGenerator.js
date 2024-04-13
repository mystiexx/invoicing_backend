const generateRandomNumbers = () => {
    const characters = '0123456789';
    const length = 3;
    let invoiceNumber = 'IN-';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        invoiceNumber += characters[randomIndex];
    }
    const timestamp = Date.now().toString().slice(-2)

    return invoiceNumber + timestamp;
}

module.exports = {
    generateRandomNumbers
}