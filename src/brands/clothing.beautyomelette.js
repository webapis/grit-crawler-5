import autoscroll from '../utils/autoscroll.js'
const pSelector = '.ProductListContent'

const phref = '.navigation a'

const url = ['https://clothing.beautyomelette.com/kadin-giyim']


export { pSelector, phref, url }


export default async function beautyomelette({ page, addRequests }) {

    //  await getUrls(page,addRequests)
    debugger
    await autoscroll(page, 50)
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('[data-original]').getAttribute('data-original')],
                title: document.querySelector('.productName.detailUrl').innerText,
                price: document.querySelector('.discountPrice').innerText.replace('₺', ''),
                link: document.querySelector('.productName.detailUrl a').href,
                currency: 'TL'
            }
        })

    })


    return data

}


