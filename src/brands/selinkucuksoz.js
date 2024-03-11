
const pSelector = '.ProductListWrapper'
const dpSelector = '[data-section-type="product"]'
const phref = '.Header__MainNav a'
const dphref = '.ProductItem__Wrapper a'
const url = ['https://selinkucuksoz.com/']


export { pSelector, dpSelector, phref, dphref, url }


export default async function selinkucuksoz ({page}){
debugger
    const data = await page.evaluate(() => {
        try {
            const image = Array.from(document.querySelectorAll('.Product__SlideItem img')).map(m=>'https:'+m.getAttribute('data-original-src'))
            const title = document.querySelector('.ProductMeta__Title ').innerText
            const price = document.querySelector('.ProductMeta__Price span').innerText.trim().replace('TL','')
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