
const pSelector = '.product-list-inner-container'
const dpSelector = '.product-detail-container'
const phref = '.megamenu__submenu a'
const dphref = '.prod-card a'
const url = ['https://www.yargici.com/']


export { pSelector, dpSelector, phref, dphref, url }



export default async function yargici ({page}){
    debugger
        const data = await page.evaluate(() => {
            try {

                const obj =JSON.parse(document.querySelector('[data-enhanced-productdetail]').getAttribute('data-enhanced-productdetail'))
                const image = Array.from(document.querySelectorAll('img.thumb-image')).map(m=>m.src.replace('/100/100/','/500/500/'))
                const title = obj.name
                const price =obj.price.replace('TL','')
                const color=obj.variant
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
