
const pSelector = '.product-list-wrapper'
const dpSelector = ''
const phref = '.sitemap-row a'
const dphref = ''
const url = ['https://www.wcollection.com.tr/site-haritasi']


export { pSelector, dpSelector, phref, dphref, url }


export default async function wcollection ({page}){
debugger
    const data = await page.evaluate(() => {
  const productItems = Array.from(document.querySelectorAll('.product-item'))

  return  productItems.map(item=>{
    return {
        image:Array.from(item.querySelectorAll('swiper-slide img')).map(m=>m.src),
        title:document.querySelector('.product-title h3').innerText,
        price:document.querySelector('.product-item__price--retail').innerText.replace('₺',''),
        link:document.URL

    }
  })

    })


    return { ...data}

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