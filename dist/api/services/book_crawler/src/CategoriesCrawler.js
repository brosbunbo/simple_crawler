const BaseCrawler = require('./BaseCrawler');

class CategoriesCrawler extends BaseCrawler.BaseCrawler {
  buildCrawlUri() {
    return this._options.base_url;
  }

  parseHtml($) {
    let data = [];

    let parents = $('.side_categories >ul >li >a');

    _.forEach(parents, (pItem) => {
      let toInsert = this._parseParentItem($, pItem);
      toInsert.children = [];

      let children = $(pItem).siblings('ul').find('>li >a');
      _.forEach(children, (cItem) => {
        toInsert.children.push(this._parseChildItem($, cItem));
      });

      data.push(toInsert);
    });

    return data;
  }

  _parseParentItem($, item) {
    let name = _.trim($(item).text());

    let hrefArray = $(item).attr('href').split('/');
    let path = hrefArray[2];

    let pathArray = hrefArray[2].split('_');
    let original_id = pathArray[1];

    return {name, path, original_id};
  }

  _parseChildItem($, item) {
    let name = _.trim($(item).text());

    let hrefArray = $(item).attr('href').split('/');
    let path = hrefArray[2] + '/' + hrefArray[3];

    let pathArray = hrefArray[3].split('_');
    let original_id = pathArray.pop();

    return {name, path, original_id};
  }
}

module.exports.CategoriesCrawler = CategoriesCrawler;
