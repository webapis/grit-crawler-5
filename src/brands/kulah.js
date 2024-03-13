
const pSelector = '#ProductPageProductList'

const phref = '.navigation a'

const url = ['https://www.kulah.com.tr/']


export { pSelector, phref, url }


export default async function kulah({ page }) {
    debugger
    const data = await page.$$eval('.ItemOrj', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('a.detailLink.detailUrl img').getAttribute('data-src')],
                title: document.querySelector('.productName.detailUrl').innerText,
                price: document.querySelector('.discountPrice span').innerText.replace('₺',''),
                link: document.querySelector('.productName.detailUrl a').href,
                currency:'TL'
            }
        })

    })

    debugger
    return data

}



