
const pSelector = '#divIcerik'

const phref = '.ulVar a'

const url = ['https://www.ilvi.com/']


export { pSelector, phref, url }


export default async function adl({ page }) {
    debugger
    const data = await page.$$eval('.ItemOrj', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('[data-original]').getAttribute('data-original')],
                title: document.querySelector('.productName.detailUrl a').innerText,
                price: document.querySelector('.discountPrice span').innerText.replace('$',''),
                link: document.querySelector('.productName.detailUrl a').href,
                currency:'USD'
            }
        })

    })

    debugger
    return data

}



