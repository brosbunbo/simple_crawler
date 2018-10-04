const Crawler = require('crawler');
const categoriesCrawler = require('./src/CategoriesCrawler');
const booksCrawler = require('./src/BooksCrawler');
const singleBookCrawler = require('./src/SingleBookCrawler');

class SimpleCrawler {
  constructor(options) {
    this._categoriesCrawler = new categoriesCrawler.CategoriesCrawler(options);
    this._booksCrawler = new booksCrawler.BooksCrawler(options);
    this._singleBookCrawler = new singleBookCrawler.SingleBookCrawler(options);

    this._crawler = new Crawler({
      maxConnections: 1
    });
  }

  crawlCategories() {
    return new Promise((resolve, reject) => {
      let uri = this._categoriesCrawler.buildCrawlUri();

      this._crawler.queue({
        uri: uri,
        callback: (error, res, done) => {
          if (error) {
            reject(error);
          } else {
            let data;
            if (404 == res.statusCode) {
              data = [];
            } else {
              data = this._categoriesCrawler.parseHtml(res.$);
            }

            resolve(data);
          }

          done();
        }
      });
    })
  }

  async crawlBooks(page, category) {
    let listBooks = await new Promise(async (resolve, reject) => {
      let uri = this._booksCrawler.buildCrawlUri(page, category);
      console.log('crawlBooks', uri);

      this._crawler.queue({
        uri: uri,
        callback: (error, res, done) => {
          if (error) {
            reject(error);
          } else {
            let data;
            if (404 == res.statusCode) {
              data = [];
            } else {
              data = this._booksCrawler.parseHtml(res.$);
            }

            resolve(data);
          }

          done();
        }
      });
    });

    let books = [];
    for (const item of listBooks) {
      let bookData = await this._crawlSingleBook(item);

      if (bookData) {
        books.push(bookData);
      }
    }

    return books;
  }

  _crawlSingleBook(data) {
    console.log('crawling single book', data);
    return new Promise(async (resolve, reject) => {
      let uri = this._singleBookCrawler.buildCrawlUri(data.path);
      let path = data.path.split('_');
      let originalId = path.pop();

      this._crawler.queue({
        uri: uri,
        callback: (error, res, done) => {
          if (error) {
            reject(error);
          } else {
            let book;
            if (404 == res.statusCode) {
              book = null;
            } else {
              book = this._singleBookCrawler.parseHtml(res.$);
              book.original_id = originalId;
            }

            resolve(book);
          }

          done();
        }
      });
    });
  }
}

module.exports.SimpleCrawler = SimpleCrawler;
