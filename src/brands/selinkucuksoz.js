
const pSelector = '.ProductItem'

const phref = '.Header__MainNav a'

const url = ['https://selinkucuksoz.com/']


export { pSelector, phref, url }


export default async function beymenclub({ page,addRequests }) {

    //  await getUrls(page,addRequests)
   debugger
   const data = await page.$$eval('.ProductItem', (documents) => {

       return documents.map(document => {
           return {
               image: [document.querySelector('img.ProductItem__Image').srcset.split(',')[3].trim().split(' ')[0]],
               title: document.querySelector('.ProductItem__Title a').innerText,
               price: '',
               link: document.querySelector('.ProductItem__Title a').href,
               currency: 'TL'
           }
       })

   })


   return data

}

