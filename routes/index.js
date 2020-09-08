const express = require('express');
const app = express.Router();
const user_controller = require('../controllers/user_controllers');

app.route('/user/login').post(user_controller.login);
app.route('/user/add').post(user_controller.addUserfunc);
app.route('/article/get').post(user_controller.getArticleDataList);
app.route('/user/category/get').get(user_controller.getCategoryList);
app.route('/category/add').post(user_controller.addCategoryFunc);
app.route('/article/add').post(user_controller.addArticleFunc);
app.route('/user/users/get').get(user_controller.getUserList);
app.route('/article/getFilterBYCategory').post(user_controller.getFilterBYCategory);
module.exports = app;
