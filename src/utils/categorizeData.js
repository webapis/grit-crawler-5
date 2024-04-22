
import { createRequire } from 'module';
import { Dataset } from 'crawlee';
import fs from 'fs'

import searchObject from './searchObject.js';

const require = createRequire(import.meta.url);
require("dotenv").config();

// const top = require('./data/top.json')
// const bottom =require('./data/bottom.json')
// const dis =require('./data/dis.json')
// const bag =require('./data/bag.json')
// const ayakkabi =require('./data/ayakkabi.json')

// const gender =require('./data/gender.json')
// const color =require('./data/color.json')
const dataDataset = await Dataset.open('products');
const { items } = await dataDataset.getData();

// const data = items.map(m => {

//          //gender
//          const colorArray = color.map(m => m.keywords).flat()
//          const colorKeyword = searchObject(m, colorArray)
//          const colorName = color.find(f => f.keywords.includes(colorKeyword))

//       //gender
//       const genderArray = gender.map(m => m.keywords).flat()
//       const genderKeyword = searchObject(m, genderArray)
//       const genderName = gender.find(f => f.keywords.includes(genderKeyword))
//     //kategori
//     const kategoryArray = [...top,...bottom,...dis,...bag,...ayakkabi].map(m => m.keywords).flat()
//     const kategoryKeyword = searchObject(m, kategoryArray)
//     const kategoryName = [...top,...bottom,...dis,...bag,...ayakkabi].find(f => f.keywords.includes(kategoryKeyword))

//     return { ...m,
//         color: colorKeyword ? colorName.name : "diğer",
//         gender: genderKeyword ? genderName.name : "diğer",
//         category: kategoryKeyword ? kategoryName.name : "diğer",group: kategoryKeyword ? kategoryName.group : "diğer"
    
//     }

// })

fs.writeFileSync('./data.json', JSON.stringify(items))
debugger



function getDomainWithoutWwwAndTld(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?([^.]+)\..*/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }