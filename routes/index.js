const express = require('express');
const app = express.Router();
const user_controller = require('../controllers/user_controllers');

app.route('/user/login').post(user_controller.login);
app.route('/user/add').post(user_controller.addUserfunc);
app.route('/user/get').post(user_controller.getUserDataList);
app.route('/user/category/get').get(user_controller.getCategoryList);
app.route('/category/add').post(user_controller.addCategoryFunc);
app.route('/product/add').post(user_controller.addProductFunc);
app.route('/user/users/get').get(user_controller.getUserList);
module.exports = app;
