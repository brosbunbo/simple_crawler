const BaseCrawler = require('./BaseCrawler');

class SingleBookCrawler extends BaseCrawler.BaseCrawler {
  buildCrawlUri(bookPath) {
    return `${this._options.base_url}/catalogue/${bookPath}`;
  }

  parseHtml($) {
    let image = $('#product_gallery').find('.item >img').attr('src');
    image = image.replace('../../', '');
    image = `${this._options.base_url}/${image}`;

    let name = $('.product_main').find('>h1').text();

    let stars;
    let starsEl = $('.product_main').find('.star-rating');
    if ($(starsEl).hasClass('Five')) {
      stars = 5;
    } else if ($(starsEl).hasClass('Four')) {
      stars = 4;
    } else if ($(starsEl).hasClass('Three')) {
      stars = 3;
    } else if ($(starsEl).hasClass('Two')) {
      stars = 2;
    } else if ($(starsEl).hasClass('One')) {
      stars = 1;
    } else {
      stars = 0;
    }

    let price = $('.product_main').find('.price_color').text().replace('£', '');
    let in_stock = $('.product_main').find('.instock').hasClass('availability');

    let breadcrumb = $('.breadcrumb').find('>li').toArray();
    breadcrumb.pop();
    breadcrumb = breadcrumb.pop();

    let categoryHref = $(breadcrumb).find('>a').attr('href');
    categoryHref = categoryHref.split('/');
    categoryHref.pop();

    let categoryPath = categoryHref.pop();
    categoryPath = categoryPath.split('_');
    let category_original_id = categoryPath.pop();

    return {image, name, stars, price, in_stock, category_original_id};
  }
}

module.exports.SingleBookCrawler = SingleBookCrawler;
