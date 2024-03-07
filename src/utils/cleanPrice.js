export default function cleanPrice(text) {

    const regex = /\d+(,\d{2})?/;

    const match = regex.exec(text);

    if (match) {
        const price = match[0]; // Extract the matched group (the price)
        return price
    } else {
        return 'price regex error'
    }
}