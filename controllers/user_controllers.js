const queryBuiler = require("../querybuilders/querybuilder");
const helper = require("../helper");
const sql = require("../sql");
const db = new sql();
var md5 = require("md5");
class User_controller {
  login = async (req, res) => {
    try {
      const reqData = req.body;

      const userDataData = await db.executeQuery(
        queryBuiler.getUserByEmail(reqData)
      );
      const password = md5(md5(reqData.password) + userDataData[0].username);
      if (userDataData && userDataData.length) {
        if (password === userDataData[0].password) {
          let userToken = helper.jwtTokenCreate(userDataData);
          userDataData[0].token = userToken;
          delete userDataData[0].password;
          return res.json({
            status: 1,
            msg: "User login successfully",
            data: userDataData[0],
          });
        } else {
          return res.json({ status: 0, msg: "Password incorrect" });
        }
      } else {
        return res.json({ status: 0, msg: "User not found" });
      }
    } catch (error) {
      console.log(error);
      res.json({ status: 0, msg: "Something error" });
    }
  };
  addUserfunc = async (req, res) => {
    try {
      const data = req.body;
      data.password = md5(md5(data.password) + data.username);
      await db.executeQuery(queryBuiler.insertUserFunc(data));
      return res.send({ success: 1, msg: "User add successfully." });
    } catch (error) {
      console.log(error);
      res.json({ status: 0, msg: "Something error" });
    }
  };

  getArticleDataList = async (req, res) => {
    try {
      const reqData = req.body;
      reqData.offset = Number(reqData.current - 1) * Number(reqData.pageSize);
      console.log(reqData);
      // const resultdata=await db.executeQuery(queryBuiler.getProductListing(reqData))
      const resultdata = await db.executeQuery(
        queryBuiler.getArticleListing(reqData)
      );
      const countData = await db.executeQuery(
        queryBuiler.getArticlecount(reqData)
      );

      res.json({ status: 1, data: resultdata, count: countData.length });
    } catch (error) {
      console.log(error);
      res.json({ status: 0, msg: "Something error" });
    }
  };
  getCategoryList = async (req, res) => {
    try {
      const categoryData = await db.executeQuery(queryBuiler.getCategoryList());
      return res.send({ status: 1, data: categoryData });
    } catch (error) {
      res.json({ status: 0, msg: "Something error" });
    }
  };
  getUserList = async (req, res) => {
    try {
      const usersData = await db.executeQuery(queryBuiler.getUserList());
      return res.send({ status: 1, data: usersData });
    } catch (error) {
      res.json({ status: 0, msg: "Something error" });
    }
  };
  addCategoryFunc = async (req, res) => {
    try {
      const reqData = req.body;
      let isAccess = await helper.checkAcccess(reqData);

      if (isAccess) {
        await db.executeQuery(queryBuiler.addCategoryFunc(reqData));
        return res.send({ status: 1, msg: "Category add successfully." });
      }
      return res.send({
        status: 0,
        msg: "You have not access to create article.",
      });
    } catch (error) {
      console.log(error);

      res.json({ status: 0, msg: "Something error" });
    }
  };
  addArticleFunc = async (req, res) => {
    try {
      // 1= Authors,2=articles
      const reqData = req.body;
      let isAccess = await helper.checkAcccess(reqData);
      if (isAccess) {
        await db.executeQuery(queryBuiler.addToDbArticleFunc(reqData));
        return res.send({ status: 1, msg: "Article add successfully." });
      }
      return res.send({
        status: 0,
        msg: "You have not access to create article.",
      });
    } catch (error) {
      console.log(error);
      res.json({ status: 0, msg: "Something error" });
    }
  };
}

const user_controller = new User_controller();
module.exports = user_controller;
