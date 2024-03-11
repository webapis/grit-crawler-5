import mapPrice from './utils/mapPrice.js'
import extractBackgroundImage from './utils/extractBackgroundImage.js'
export default async function handler({ page, title, price1, priceInBasket, price3, image, imgSrc, imgBgr, color }) {

    const data = await page.evaluate((_title, _price1, _priceInBasket, _price3, _image, _imgSrc, _imgBgr, _color) => {
        try {
            const image = _imgSrc ? Array.from(document.querySelectorAll(_image)).map((m) => m.getAttribute(_imgSrc)).filter(f => f) : null
            const image2 = _imgBgr ? Array.from(document.querySelectorAll(_image)).map((m) => m.style.backgroundImage).filter(f => f) : null
            const title = document.querySelector(_title).innerText.replaceAll('\n', '').trim().replace('TL', '')
            const price1 = document.querySelector(_price1).innerText
            const priceInBasket = (_priceInBasket && document.querySelector(_priceInBasket)) ? document.querySelector(_priceInBasket).innerText : 0
            const color = _color ? document.querySelector(_color).innerText : ''
            const link = document.URL
            return {
                image,
                image2,
                title,
                price1,
                priceInBasket,
                // price3,
                color,
                link
            }
        } catch (error) {
            return { error: error.toString(), content: document.innerHTML }
        }
    }, title, price1, priceInBasket, price3, image, imgSrc, imgBgr, color)


    return { ...data}



}

