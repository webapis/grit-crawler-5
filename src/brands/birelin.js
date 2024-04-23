import autoScroll from "../utils/autoscroll.js"
const pSelector = '.ProductListContent '

const phref = '.navigation a'

const url = ['https://www.birelin.com/']


export { pSelector, phref, url }


export default async function fever({ page }) {
    await autoScroll(page, 50)
    debugger
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {

            try {
                return {
                    image: [document.querySelector('[data-original]').getAttribute('data-original')],
                    title: document.querySelector('.productName.detailUrl').innerText,
                    price: document.querySelector('.discountPrice').innerText.replace('₺', ''),
                    link: document.querySelector('.productName.detailUrl a').href,
                    currency: 'USD'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })

    })

    debugger
    return data

}

