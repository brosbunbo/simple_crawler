const BaseCrawler = require('./BaseCrawler');

class BooksCrawler extends BaseCrawler.BaseCrawler {
  buildCrawlUri(page, category) {
    let uri = [
      this._options.base_url,
      'catalogue'
    ];

    if (category) {
      uri.push('category', category.path);
    }

    uri.push(`page-${page}.html`);

    return uri.join('/');
  }

  parseHtml($) {
    let data = [];

    let books = $('.product_pod');
    _.forEach(books, (item) => {
      let toInsert = this._parseItem($, item);

      data.push(toInsert);
    });

    return data;
  }

  _parseItem($, item) {
    let href = $(item).find('h3 >a').attr('href');
    href = href.split('/');
    href.pop();
    let path = href.pop();

    return {path};
  }
}

module.exports.BooksCrawler = BooksCrawler;
