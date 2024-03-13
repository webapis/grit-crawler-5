
const pSelector = '.o-productList '

const phref = '[data-navbar-item] a'

const url = ['https://www.beymenclub.com/']


export { pSelector, phref, url }


export default async function beymenclub({ page }) {
    debugger
    const data = await page.$$eval('.o-productList__item', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('.m-productCard__photo a img').getAttribute('data-src').replace('/339/','/500/') ],
                title: document.querySelector('.m-productCard__desc').innerText,
                price: document.querySelector('.m-productCard__newPrice') ? document.querySelector('.m-productCard__newPrice').innerText : document.querySelector('.m-productCard__lastPrice').childNodes[1].textContent.replace('TL', ''),
                link: document.querySelector('.m-productCard__photo a').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



