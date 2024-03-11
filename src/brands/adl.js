
const pSelector = '#ListPage'
const dpSelector = '.product-detail'
const phref = '.navigation a'
const dphref = '.product-item__body a'
const url = ['https://www.adl.com.tr/']


export { pSelector, dpSelector, phref, dphref, url }


export default async function adl ({page}){
debugger
    const data = await page.evaluate(() => {
        try {
            const image = [document.querySelector('.images [data-src]').getAttribute('data-src')]
            const title = document.querySelector('.texts__product-name').innerText
            const price = document.querySelector('.price__new').innerText.trim().replace('TL','')
            const color=document.querySelector('[data-variant-name] [data-variant-value]').getAttribute('data-variant-value')
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