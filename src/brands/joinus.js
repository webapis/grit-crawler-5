
const pSelector = '.product-collection'

const phref = '.sidebar-link-lv1 a'

const url = ['https://joinus.com.tr/collections/kadin-yeni-sezon']


export { pSelector, phref, url }
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function joinus({ page, enqueueLinks, request, log }) {
    debugger
    const title = await page.title();
    log.info(`COLLECT ${title}`, { url: request.loadedUrl });



    //const links = await page.$$('.dropdown.mega-menu');

    debugger
    if (request.loadedUrl === 'https://joinus.com.tr/collections/kadin-yeni-sezon') {
    //     for (let link of links) {

    //         await link.hover();
    //         await enqueueLinks({
    //             selector: '.pagination a',
    //             label: 'list',
    //         });
    //         // Wait for a short time to allow the sub-links to appear, adjust this timing as needed
    //         await delay(3000)// Adjust the time as per your requirements
      }


    // }
    debugger
    const data = await page.$$eval('.grid-item', (documents) => {

        return documents.map(document => {
            const priceRegular = document.querySelector('.price-regular') ? document.querySelector('.price-regular').innerText.replace('₺', '').trim() : null
            const specialprice = document.querySelector('.special-price') ? document.querySelector('.special-price').innerText.replace('₺', '').trim() : null
            return {
                image: ['https:' + document.querySelector('[data-srcset]').getAttribute('data-srcset')],
                title: document.querySelector('.product-title').innerText,
                price: priceRegular ? priceRegular : specialprice,
                link: document.querySelector('.product-title').href,
                currency: 'TL'
            }
        })

    })

    debugger
    return data

}



