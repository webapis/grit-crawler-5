
const pSelector = '.product-item'

const phref = '#main-menu a'

const url = ['https://www.ayyildiz.com.tr/']


export { pSelector, phref, url }


export default async function ayyildiz({ page, enqueueLinks,request,log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });
 await enqueueLinks({
        selector:'.pagination a',
        label: 'list',
    });
debugger
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('img.swiper-lazy').src],
                title: document.querySelector('.product-title').innerText,
                price: document.querySelector('.product-price').innerText,
                link: document.querySelector('.product-title').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



