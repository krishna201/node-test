const util = require("util");

module.exports = {
  insertUserFunc: (data) => {
    return util.format(
      "INSERT INTO users (username, email, password, user_type) " +
      "VALUES('%s','%s', '%s','%d' )",
      data.username,
      data.email,
      data.password,
      data.user_type
    );
  },
  getUserByEmail: (data) => {
    return util.format(`SELECT * FROM users WHERE email = '${data.email}'`);
  },

//   getArticleListing: (data) => {
//     return util.format(` select *, coalesce((SELECT jsonb_agg(categories) 
//         FROM  (SELECT cat.*
//                 FROM   categories as cat 
//                WHERE  cat.c_id = SOME(art.c_ids)) categories), '[]'::jsonb) AS categories 
//                 from articles as art
//  left join users as users on users.user_id = art.user_id ORDER BY ${data.orderBy} ${data.sortBy}
//  OFFSET '${data.offset}' LIMIT '${data.pageSize}'`);
//   },
  getArticleListing: (query) => {
    return util.format(` select *, coalesce((SELECT jsonb_agg(categories) 
        FROM  (SELECT cat.*
                FROM   categories as cat 
               WHERE  cat.c_id = SOME(art.c_ids)) categories), '[]'::jsonb) AS categories 
                from articles as art
 left join users as users on users.user_id = art.user_id ${query}`);
  },
  getArticlecount: () => {
    return util.format(`select *, coalesce((SELECT jsonb_agg(categories) 
        FROM  (SELECT cat.*
                FROM   categories as cat 
               WHERE  cat.c_id = SOME(art.c_ids)) categories), '[]'::jsonb) AS categories 
                from articles as art
 left join users as users on users.user_id = art.user_id`);
  },
  
  getArticleListingbyCateg: (query) => {
    return util.format(` select *, coalesce((SELECT jsonb_agg(categories) 
        FROM  (SELECT cat.*
                FROM   categories as cat 
               WHERE  cat.c_id = SOME(art.c_ids)) categories), '[]'::jsonb) AS categories 
                from articles as art
 left join users as users on users.user_id = art.user_id
 left join categories as categ on categ.c_id = any(art.c_ids) Where ${query}`);
  },
  getArticleListingbyCat: (data) => {
    return util.format(` select *, coalesce((SELECT jsonb_agg(categories) 
        FROM  (SELECT cat.*
                FROM   categories as cat 
               WHERE  cat.c_id = SOME(art.c_ids)) categories), '[]'::jsonb) AS categories 
                from articles as art
 left join users as users on users.user_id = art.user_id
 left join categories as categ on categ.c_id = any(art.c_ids) Where categ.categoryname='${data.cat_name}'
 OFFSET '${data.offset}' LIMIT '${data.pageSize}'`);
  },
  getArticleListingbyCatCount: (data) => {
    return util.format(` select *, coalesce((SELECT jsonb_agg(categories) 
        FROM  (SELECT cat.*
                FROM   categories as cat 
               WHERE  cat.c_id = SOME(art.c_ids)) categories), '[]'::jsonb) AS categories 
                from articles as art
 left join users as users on users.user_id = art.user_id
 left join categories as categ on categ.c_id = any(art.c_ids) Where categ.categoryname='${data.cat_name}'
 `);
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
    return util.format(
      "INSERT INTO categories (categoryname) " + "VALUES('%s' )",
      data.categoryname
    );
  },
  addToDbArticleFunc: (data) => {
    return util.format(
      "INSERT INTO articles (title,description,user_id,c_ids) " +
      "VALUES('%s','%s', '%d',  '{%s}' )",
      data.title,
      data.description,
      data.user_id,
      data.c_ids.join(",")
    );
  },
};
