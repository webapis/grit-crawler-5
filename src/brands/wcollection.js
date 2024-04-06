
const pSelector = 'wcollection-list-item'
const dpSelector = ''
const phref = 'nav w-generic-link a'
const dphref = ''
const url = ['https://www.wcollection.com.tr/site-haritasi']


export { pSelector, dpSelector, phref, dphref, url }


export default async function wcollection({ page,enqueueLinks }) {
    debugger

    await enqueueLinks({
        selector:'a.page',
        label: 'list',
    });
    const data = await page.$$eval('wcollection-list-item', (documents) => {

        return documents.map(document => {
            return {
                image: Array.from(document.querySelectorAll('swiper-slide img')).map(m => m.src),
                title: document.querySelector('.product-title h3').innerText,
                price: document.querySelector('.product-item__price--retail').innerText,//.replace('₺', ''),
                link: document.querySelectorAll('a')[1].href
            }
        })

    })

debugger
    return data

}





