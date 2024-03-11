
const pSelector = '#mainDivBody'
const dpSelector = '.product-detail-main'
const phref = '.vsv-lists a'
const dphref = '[data-testid="plp.product.figure"] a'
const url = ['https://shop.mango.com/tr/kadin']


export { pSelector, dpSelector, phref, dphref, url }


export default async function mango ({page}){
debugger
    const data = await page.evaluate(() => {
        try {
            const image = Array.from(document.querySelectorAll('.image-2')).map(m=>m.src)
            const title = document.querySelector('.product-name').innerText
            const price =document.querySelector('[itemprop="price"]').getAttribute('content')
            const color= document.querySelector('[itemprop="color"]').innerText
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