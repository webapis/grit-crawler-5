import autoScroll from "../utils/autoscroll.js"
const pSelector = '[class^="product-list_container"]'

const phref = '[class^="navbar-item_content"] a'

const url = ['https://dressweden.com/tasarim-kadin-giyim-modelleri']


export { pSelector, phref, url }


export default async function dressweden({ page }) {
    await autoScroll(page,250)
    debugger
    const data = await page.$$eval('[class^="product-list_productContainerFourthLayout"]', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('[class^="product-card_image__"]').src],
                title: document.querySelector('[class^="product-card_name"]').innerText,
                price: document.querySelector('[class^="product-card_price__"]').innerText.replace('₺',''),
                link: document.querySelector('[class^="product-card_name"]').href,
                currency:'TL'
            }
        })

    })

    debugger
    return data

}



