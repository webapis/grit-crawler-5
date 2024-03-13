import { createRequire } from 'module';

import mapPrice from './mapPrice.js';

const require = createRequire(import.meta.url);
require("dotenv").config();
const algoliasearch = require("algoliasearch");

debugger
const data =require('../../data.json')
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
  await importLinkData({ data: removeDuplicatesAndCollectTitles(data,'link').map(m => { return { ...m, brand: marka } }), brand: marka })
} else {
  throw 'No Items found to upload'
}



// function removeDuplicates(array, key) {
//   return array.filter((item, index, self) =>
//       index === self.findIndex(obj => obj[key] === item[key])
//   );
// }
function removeDuplicatesAndCollectTitles(array, key) {
  const uniqueObjects = [];
  const duplicateTitles = {};

  array.forEach((item) => {
      const index = uniqueObjects.findIndex((obj) => obj[key] === item[key]);

      if (index === -1) {
          uniqueObjects.push(item);
      } else {
          if (!duplicateTitles[item[key]]) {
              duplicateTitles[item[key]] = [uniqueObjects[index].pageTitle];
          }

          duplicateTitles[item[key]].push(item.pageTitle);
      }
  });

  return uniqueObjects.map((item) => {
      const titles = duplicateTitles[item[key]];
      return titles ? { ...item, duplicateTitles: titles } : item;
  });
}