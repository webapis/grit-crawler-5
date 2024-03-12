
const pSelector = 'wcollection-list-item'
const dpSelector = ''
const phref = 'nav w-generic-link a'
const dphref = ''
const url = ['https://www.wcollection.com.tr/kadin-modasi']


export { pSelector, dpSelector, phref, dphref, url }


export default async function wcollection({ page }) {
    debugger
    const data = await page.$$eval('wcollection-list-item', (documents) => {

        return documents.map(document => {
            return {
                image: Array.from(document.querySelectorAll('swiper-slide img')).map(m => m.src),
                title: document.querySelector('.product-title h3').innerText,
                price: document.querySelector('.product-item__price--retail').innerText.replace('₺', ''),
                link: document.querySelectorAll('a')[1].href
            }
        })

    })

debugger
    return data

}





/*

export default async function wcollection ({page}){
debugger
    const data = await page.evaluate(() => {
        try {
            const image = Array.from(document.querySelectorAll('img.zoom__custom__cursor')).map(m=>m.src)
            const title = document.querySelector('.product-title-container h1').innerText
            const price = document.querySelector('.price').innerText.replace('₺','')
            const color=''
            const link = document.URL
            return {
                image,
                title,
                price,
                color,
                link
            }
        } catch (error) {
            return { error: error.toString(), content: document.innerHTML }
        }
    })


    return { ...data}

}
*/