
const pSelector = '#eln-product-products'

const phref = '.navbar a'

const url = ['https://www.dagi.com.tr/kadin/kadin-corap-modelleri','https://www.dagi.com.tr/erkek','https://www.dagi.com.tr/cocuk']


export { pSelector, phref, url }


export default async function adl({ page, enqueueLinks,request,log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });

    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('.photo-swapper.active').getAttribute('data-src')],
                title: document.querySelector('.product-item-link').innerHTML,
                price:document.querySelector('.special-price .price')? document.querySelector('.special-price .price'):document.querySelector('.price.parent').innerText.replace('₺',''),
                link: document.querySelector('.product-item-link').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



