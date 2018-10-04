const Promise = require('bluebird');
const crawler = require('./book_crawler');
const SimpleCrawler = new crawler.SimpleCrawler;

module.exports = {
  crawlCategories: async function() {
    let data = await SimpleCrawler.crawlCategories();

    for (const item of data) {
      await this._importParentCategory(item);
    }
  },

  _importParentCategory: async function(categoryData) {
    let id = await this._importCategory(categoryData);

    for (const childData of categoryData.children) {
      childData.parent_id = id;

      await this._importCategory(childData);
    }
  },

  _importCategory: async function(data) {
    let category = await DBService.getCategoryByOriginalId(data.original_id);

    if (category === null) {
      category = await DBService.createCategory(data.name, data.path, data.parent_id, data.original_id);
    } else if (
      category.parent_id != data.parent_id ||
      category.name != data.name ||
      category.path != data.path
    ) {
      await DBService.updateCategory(category.id, data.name, data.path);
    }

    return category.id;
  },

  crawlBooks: async function(page, categoryId) {
    try {
      if (this.isCrawlingBooks()) {
        return;
      }

      this._preCrawlingBooks();

      let category = null;
      if (categoryId) {
        category = await DBService.getCategoryById(categoryId);
      }

      let data = await SimpleCrawler.crawlBooks(page, category);
      let books = [];
      for (const item of data) {
        books.push(await this._importBook(item));
      }

      this._postCrawlingBooks(books);
    } catch(error) {
      this._postCrawlingBooks();
    }
  },

  _importBook: async function(data) {
    let book = await DBService.getBookByOriginalId(data.original_id);

    if (book === null) {
      book = await DBService.createBook(data.category_original_id, data.name, data.image, data.stars, data.price, data.in_stock, data.original_id);
    } else if (
      book.category_original_id != data.category_original_id ||
      book.name != data.name ||
      book.image != data.image ||
      book.stars != data.stars ||
      book.price != data.price ||
      book.in_stock != data.in_stock
    ) {
      await DBService.updateBook(book.id, data.category_original_id, data.name, data.image, data.stars, data.price, data.in_stock);
    }

    return Object.assign(book, data);
  },

  isCrawlingBooks: function() {
    return !!sails.is_crawling_books;
  },

  _preCrawlingBooks: function() {
    sails.is_crawling_books = true;

    sails.sockets.blast('crawl.start');
  },

  _postCrawlingBooks: function(books) {
    sails.is_crawling_books = false;

    sails.sockets.blast('crawl.end', books || []);
  }
};
