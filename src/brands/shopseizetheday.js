import autoScroll from "../utils/autoscroll.js"
const pSelector = '.products'

const phref = ''

const url = ['https://www.shopseizetheday.com/shop/',"https://www.shopseizetheday.com/p-cat/fall-winter-2024/","https://www.shopseizetheday.com/p-cat/spring-summer-24/"]


export { pSelector, phref, url }


export default async function shopseizetheday({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.product', (documents) => {

        return documents.map(document => {
       
            try {
                return {
                    image: [document.querySelector("[srcset]").getAttribute("srcset").split(",")[2].split(" ").filter(f=>f)[0]],
                    title: document.querySelector(".mfn-woo-product-title").innerText,
                    price: document.querySelector(".woocommerce-Price-amount.amount bdi").childNodes[0].nodeValue,
                    link: document.querySelector(".image_wrapper a").href,
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

