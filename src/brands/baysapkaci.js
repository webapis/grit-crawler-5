
const pSelector = '.p-g-b-c-wrapper'

const phref = '.navbar-nav a'

const url = ['https://www.baysapkaci.com.tr/']


export { pSelector, phref, url }


export default async function baysapkaci({ page,addRequests }) {

     //  await getUrls(page,addRequests)
    debugger
    const data = await page.$$eval('.card-product', (documents) => {

        return documents.map(document => {
            return {
                image: [document.querySelector('.image img').getAttribute('data-src') ?document.querySelector('.image img').getAttribute('data-src'): document.querySelector('.image img').src],
                title:document.querySelector('.image img').alt,
                price:  document.querySelector('.sale-price').innerText.replace('TL','').trim(),
                link: document.querySelector('a.c-p-i-link').href,
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