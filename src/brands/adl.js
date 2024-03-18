import autoscroll from '../utils/autoscroll.js'
const pSelector = '.products__items'

const phref = '.navigation a'

const url = ['https://www.adl.com.tr/']


export { pSelector, phref, url }


export default async function adl({ page, enqueueLinks }) {
    debugger

    await enqueueLinks({
        selector: '[href^="?category_ids=696&sorter=newcomers&page="]',
        label: 'list',
    });
    await autoscroll(page, 100)
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            return {
                image: Array.from(document.querySelectorAll('img')).map(m => m.getAttribute('data-src')).filter(f => f),
                title: document.querySelector('.product-item__name').innerText,
                price: document.querySelector('.price__new').innerText.replace('TL', ''),
                link: document.querySelector('.product-item a').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



