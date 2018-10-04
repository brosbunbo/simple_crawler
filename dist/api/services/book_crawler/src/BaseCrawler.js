const defaultOptions = require('./Options');
const Crawler = require('crawler');

class BaseCrawler {
  constructor(options) {
    this._options = Object.assign(defaultOptions, options || {});
  }

  buildCrawlUri() {
    throw Error('Abstract method buildCrawlUri need to be fulfilled');
  }

  parseHtml() {
    throw Error('Abstract method parseHtml need to be fulfilled');
  }
}

module.exports.BaseCrawler = BaseCrawler;
