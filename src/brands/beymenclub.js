import searchObject from "../utils/searchObject"
const pSelector = '.o-productList '

const phref = '[data-navbar-item] a'

const url = ['https://www.beymenclub.com/']


export { pSelector, phref, url }


export default async function beymenclub({ page,addRequests }) {

     //  await getUrls(page,addRequests)

    debugger
    const data = await page.$$eval('.o-productList__item', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('.m-productCard__photo a img').getAttribute('data-src').replace('/339/','/500/') ],
                title: document.querySelector('.m-productCard__desc').innerText,
                price: document.querySelector('.m-productCard__newPrice') ? document.querySelector('.m-productCard__newPrice').innerText.replace('TL','') : document.querySelector('.m-productCard__lastPrice').childNodes[1].textContent.replace('TL', ''),
                link: document.querySelector('.m-productCard__photo a').href,
                currency: 'TL'
            }
        })

    })


 
    return data.filter(f=> searchObject(f,['kadin','kadın','bayan','woman']) )

}



async function getUrls(page,addRequests) {
    const url = await page.url()
    debugger;
    await page.waitForSelector('.o-productList__top--breadcrumbCount span')
    const productCount = await page.$eval('.o-productList__top--breadcrumbCount span', element => parseInt(element.textContent))
    debugger;
    const totalPages = Math.ceil(productCount / 48)
    const pageUrls = []

    let pagesLeft = totalPages
    for (let i = 2; i <= totalPages; i++) {

        pageUrls.push(`${url}?sayfa=` + i)
        --pagesLeft

    }
    if(pageUrls.length>0){
        await addRequests(pageUrls)
    }

    return { pageUrls, productCount, pageLength: pageUrls.length + 1 }
}