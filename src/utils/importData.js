import { createRequire } from 'module';
import { Dataset } from 'crawlee';
import mapPrice from './mapPrice.js';
const require = createRequire(import.meta.url);
require("dotenv").config();
const algoliasearch = require("algoliasearch");
const productsDataset = await Dataset.open('products');
debugger
const { items: data } = await productsDataset.getData();
debugger
const client = algoliasearch("7JF244QSZZ", process.env.ALGOLIAKEY);
const marka = process.env.marka

// function setSettings(index) {
//   return new Promise((resolve, reject) => {
//     try {
//       index
//         .setSettings({
//           attributeForDistinct: "brand",
//           distinct: true,
//         })
//         .then(() => {
//           return resolve(true);
//         });
//     } catch (error) {
//       return reject(error);
//     }
//   });
// }

async function importLinkData({ data, brand }) {
  const linkIndex = client.initIndex("product");


  let hits = [];
  const result = await linkIndex.browseObjects({
    batch: batch => {
      hits = hits.concat(batch);
    },
    attributesToRetrieve: ["objectID"],
    query: brand
  })
  debugger
  const objectsToDelete = hits.map(m => m.objectID)
  debugger
  await linkIndex.deleteObjects(objectsToDelete)
  debugger
  //  await setSettings(linkIndex);
  return new Promise((resolve, reject) => {
    try {
      linkIndex
        .saveObjects(data, { autoGenerateObjectIDIfNotExist: true })
        .then((d) => {
          return resolve(d);
        });
    } catch (error) {
      return reject(error);
    }
  });
}



if (data.length > 0) {
  await importLinkData({ data: data.filter(f=>!f.error).map(m => { return { ...m, brand: marka, price: mapPrice(m.price,m) } }), brand: marka })
} else {
  throw 'No Items found to upload'
}



