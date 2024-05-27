import autoScroll from "../utils/autoscroll.js"
const pSelector = '.infinite-scroll-component__outerdiv'

const phref = '.nav-links a'

const url = ['https://kasha.com.tr/']


export { pSelector, phref, url }


export default async function kasha({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('[data-id]', (documents) => {
            const selPrice =document.querySelector('.sell-price') ?document.querySelector('.sell-price').innerText.replace('₺','').trim():null
            const discount =document.querySelector('.discount-price')?Array.from(document.querySelector('.discount-price').querySelectorAll('span')).reverse()[0].innerText.replace('₺','').trim():null
        return documents.map(document => {

            try {
                return {
                    image: [document.querySelector('[srcset]').getAttribute('srcset').split(',')[10].split(' ').filter((f)=>f)[0]],
                    title: document.querySelector('.product-name').innerText,
                    price: selPrice? selPrice:discount,
                    link: document.querySelector('a').href,
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
