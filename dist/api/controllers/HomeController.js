module.exports = {
  index: async (req, res) => {
    try {
      let categories = await DBService.getAllCategories();

      return res.view('layouts/layout', {
        layout: null,
        categories: categories,
        is_crawling_books: CrawlerService.isCrawlingBooks()
      });
    } catch(error) {
      return res.serverError(error);
    }
  },

  crawl: async (req, res) => {
    try {
      let page = req.param('page', 1);
      let categoryId = req.param('category', null);

      CrawlerService.crawlBooks(page, categoryId);

      return res.json();
    } catch(error) {
      return res.serverError(error);
    }
  }
}
