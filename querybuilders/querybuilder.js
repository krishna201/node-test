const util = require('util');

module.exports = {
    insertFamilyMember: (data) => {
        return util.format('INSERT INTO users (username, email, password) ' +
            'VALUES(\'%s\',\'%s\', \'%s\' )',
            data.username, data.email, data.password );
            
    },
    getZoneById: (data) => {
        return util.format(`SELECT * FROM users WHERE email = '${data.email}'`);
    },
    getProductListing: (data) => {
        return util.format(`SELECT * FROM products AS prod 
        LEFT JOIN users as users ON users.user_id = prod.user_id 
        LEFT JOIN categories AS cat ON cat.c_id = prod.c_id
        ORDER BY ${data.orderBy} ${data.sortBy}
        OFFSET '${data.offset}' LIMIT '${data.pageSize}'`);
    },
    getProductcount: () => {
        return util.format(`SELECT * FROM products AS prod 
        LEFT JOIN users as users ON users.user_id = prod.user_id 
        LEFT JOIN categories AS cat ON cat.c_id = prod.c_id`);
    },
    getCategoryList: () => {
        return util.format(`SELECT * FROM categories
       `);
    },
    getUserList: () => {
        return util.format(`SELECT * FROM users
       `);
    },
    getUser: (data) => {
        return util.format(`SELECT * FROM users WHERE user_id=${data.user_id}`);
    },
    addCategoryFunc: (data) => {
        return util.format('INSERT INTO categories (categoryname) ' +
        'VALUES(\'%s\' )',
        data.categoryname );
    },
    addProductFunc: (data) => {
        return util.format('INSERT INTO products (product_name,user_id,c_id) ' +
        'VALUES(\'%s\', \'%d\', \'%d\' )',
        data.product_name,data.user_id,data.c_id );
    },
 
}