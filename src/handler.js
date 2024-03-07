export default async function handler({ page, title, price1, priceInBasket, price3, image, imgSrc}) {
  
    const data = await page.evaluate((_title, _price1, _priceInBasket, _price3, _image, _imgSrc) => {
        try {
            const image = Array.from(document.querySelectorAll(_image)).map((m) => m.getAttribute(_imgSrc)).filter(f => f)
            const title = document.querySelector(_title).innerText
            const price1 = document.querySelector(_price1).innerText
            const priceInBasket = (_priceInBasket && document.querySelector(_priceInBasket)) ? document.querySelector(_priceInBasket).innerText : 0
            const link = document.URL
            return {
                image,
                title,
                price1,
                priceInBasket,
                // price3,
                link
            }
        } catch (error) {
            return { error: error.toString(), content: document.innerHTML }
        }
    }, title, price1, priceInBasket, price3, image, imgSrc)


    return data



}

