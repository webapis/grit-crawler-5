
const pSelector = '#ProductPageProductList'

const phref = '.navigation a'

const url = ['https://www.kulah.com.tr/']


export { pSelector, phref, url }


export default async function kulah({ page }) {
    debugger
    const breadcrumb =await page.evaluate(()=> Array.from(document.querySelectorAll('.breadcrumb a')).map(m => m.innerText).join(' '))
    const data = await page.$$eval('.ItemOrj', (documents,breadcrumb_) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('a.detailLink.detailUrl img').getAttribute('data-src')],
                title: document.querySelector('.productName.detailUrl').innerText,
                price: document.querySelector('.discountPrice span').innerText.replace('₺', ''),
                link: document.querySelector('.productName.detailUrl a').href,
                breadcrumb:breadcrumb_ ,
                currency: 'TL'
            }
        })

    },breadcrumb)

    debugger
    return data

}



