import autoScroll from "../utils/autoscroll.js"
const pSelector = '.collection__window'

const phref = '.header__links.header__links-primary a'

const url = ['https://silkandcashmere.com/']


export { pSelector, phref, url }


export default async function silkandcashmere({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
       
            try {
                return {
                    image: ['https:'+ document.querySelector(".image__img[srcset]").getAttribute("srcset").split(",")[10].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product-item__product-title a').innerText,
                    price: document.querySelector('.product-item__price .money').innerText.replace('₺',''),
                    link: document.querySelector('.product-item__product-title a').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })

    })

    debugger
    return data

}

