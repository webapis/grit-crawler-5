import autoscroll from '../utils/autoscroll.js'
const pSelector = '.ProductListContent'

const phref = '.ResimliMenu1 a'

const url = ['https://www.tubabutik.com/']


export { pSelector, phref, url }


export default async function tubabutik({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });


    await autoscroll(page, 50)
    debugger
    const data = await page.$$eval('.productItem', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: [document.querySelector('[data-src]').getAttribute('data-src')],
                    title: document.querySelector('.productName.detailUrl').innerText,
                    price: document.querySelector('.discountPrice').innerText.replace('TL', '').trim(),
                    link: document.querySelector('.productName.detailUrl a').href,
                    currency: 'TL'
                }
            } catch (error) {
                return { error: error.toString(), content: document.innerHTML }
            }

        })
        //data-src
    })

    debugger
    return data

}

