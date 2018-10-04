const SQL = {
  GET_CAT_BY_ORIGINAL_ID: 'SELECT `id` FROM `categories` WHERE `original_id` = $1',
  CREATE_CAT: 'INSERT INTO `categories` (`name`, `path`, `parent_id`, `original_id`) VALUES ($1, $2, $3, $4)',
  UPDATE_CAT: 'UPDATE `categories` SET `name` = $1, `path` = $2 WHERE `id` = $3',
  GET_ALL_CAT: 'SELECT `id`, `name` FROM `categories`',
  GET_CAT_BY_ID: 'SELECT * FROM `categories` WHERE `id` = $1',

  GET_BOOK_BY_ORIGINAL_ID: 'SELECT `id` FROM `books` WHERE `original_id` = $1',
  CREATE_BOOK: 'INSERT INTO `books` (`category_original_id`, `name`, `image`, `stars`, `price`, `in_stock`, `original_id`) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  UPDATE_BOOK: 'UPDATE `books` SET `category_original_id` = $1, `name` = $2, `image` = $3, `stars` = $4, `price` = $5, `in_stock` = $6 WHERE `id` = $7',
};

module.exports = {
  getCategoryByOriginalId: async function(originalId) {
    let category = null;
    let rawResult = await this._sendSqlQuery(SQL.GET_CAT_BY_ORIGINAL_ID, [originalId]);

    if (rawResult.rows && rawResult.rows[0]) {
      category = rawResult.rows[0];
    }

    return category;
  },

  createCategory: async function(name, path, parentId, originalId) {
    let rawResult = await this._sendSqlQuery(SQL.CREATE_CAT, [name, path, parentId, originalId]);

    return {id: rawResult.insertId};
  },

  updateCategory: async function(id, name, path) {
    await this._sendSqlQuery(SQL.UPDATE_CAT, [name, path, id]);
  },

  getAllCategories: async function() {
    let rawResult = await this._sendSqlQuery(SQL.GET_ALL_CAT);

    return rawResult.rows;
  },

  getCategoryById: async function(id) {
    let category = null;
    let rawResult = await this._sendSqlQuery(SQL.GET_CAT_BY_ID, [id]);

    if (rawResult.rows && rawResult.rows[0]) {
      category = rawResult.rows[0];
    }

    return category;
  },

  getBookByOriginalId: async function(originalId) {
    let book = null;
    let rawResult = await this._sendSqlQuery(SQL.GET_BOOK_BY_ORIGINAL_ID, [originalId]);

    if (rawResult.rows && rawResult.rows[0]) {
      book = rawResult.rows[0];
    }

    return book;
  },

  createBook: async function(categoryOriginalId, name, image, stars, price, inStock, originalId) {
    let rawResult = await this._sendSqlQuery(SQL.CREATE_BOOK, [categoryOriginalId, name, image, stars, price, inStock, originalId]);

    return {id: rawResult.insertId};
  },

  updateBook: async function(id, categoryOriginalId, name, image, stars, price, inStock) {
    await this._sendSqlQuery(SQL.UPDATE_BOOK, [categoryOriginalId, name, image, stars, price, inStock, id]);
  },

  _sendSqlQuery: function(sql, bindings) {
    return sails.sendNativeQuery(sql, bindings);
  }
};
