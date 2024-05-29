import autoScroll from "../utils/autoscroll.js"
const pSelector = '#main-collection-product-grid'

const phref = '.menu a'

const url = ['https://www.barrusglobal.com/']


export { pSelector, phref, url }


export default async function barrusglobal({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('#main-collection-product-grid product-item', (documents) => {

        return documents.map(document => {
       
            try {
                return {
                    image: ['https:'+document.querySelector('[data-srcset]').getAttribute('data-srcset').split(',')[2].split(' ').filter(f=>f)[0]],
                    title: document.querySelector('.product-collection__title a').innerText,
                    price: document.querySelector('.price').innerText.replace('TL',''),
                    link:document.querySelector('.product-collection__title a').href,
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

