
const pSelector = '.products__items'

const phref = '.header-navigation a'

const url = ['https://www.converse.com.tr/']


export { pSelector, phref, url }


export default async function converse({ page,addRequests }) {

     //  await getUrls(page,addRequests)
    debugger
    const data = await page.$$eval('.product-item', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('.product-item__image img').getAttribute('data-src')],
                title:document.querySelector('.product-item__name').innerText,
                price:  document.querySelector('.price__new').innerText.replace('₺','').trim(),
                link: document.querySelector('.product-item__info a').href,
                currency: 'TL'
            }
        })

    })

 
    return data

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