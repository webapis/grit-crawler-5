// For more information, see https://crawlee.dev/
import dotenv from 'dotenv';
import { PuppeteerCrawler, ProxyConfiguration } from 'crawlee';
import { router } from './routes.js';
import preNavigationHooks from './crawler-helper/preNavigationHooks.js';
dotenv.config({ silent: true });
debugger
const brand = process.env.marka
const {  url:startUrls } = await import(`./brands/${brand}.js`)
debugger

const crawler = new PuppeteerCrawler({
  launchContext:{
    useChrome: process.env.LOCAL==='TRUE'?true:false
  },

    //headless:false,
    // proxyConfiguration: new ProxyConfiguration({ proxyUrls: ['...'] })
    requestHandlerTimeoutSecs: 3600,
    requestHandler: router,
    // Comment this option to scrape the full website.
  //  maxRequestsPerCrawl: 0,
  maxConcurrency: 1,
    preNavigationHooks
});

await crawler.run(startUrls);
