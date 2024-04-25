import autoscroll from '../utils/autoscroll.js'
const pSelector = '.ProductList'

const phref = '.Drawer__Content a'

const url = ['https://tuvanam.com/']


export { pSelector, phref, url }


export default async function tuvanam({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
    await enqueueLinks({
        selector: '.Pagination a',
        label: 'list',
    });

    await autoscroll(page, 50)
    debugger
    const data = await page.$$eval('.ProductItem', (documents) => {

        return documents.map(document => {
            try {
                return {
                    image: document.querySelector('[data-srcset]') ? ['https:' + document.querySelector('[data-srcset]').getAttribute('data-srcset').split(',')[3].split(' ').filter(f => f)[0]] : [document.querySelector('[data-src]').getAttribute('data-src').replace('{width}', '600')],
                    title: document.querySelector('.ProductItem__Title').innerText,
                    price: document.querySelector('.ProductItem__Price').innerText.replace('TL', ''),
                    link: document.querySelector('.ProductItem__Title a').href,
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

