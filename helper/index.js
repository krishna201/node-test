const jwt = require("jsonwebtoken");
const queryBuiler = require("../querybuilders/querybuilder");
const sql = require('../sql')
const db = new sql();
module.exports = {
  jwtTokenCreate: (userData) => {
    console.log("userData",userData);
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // expiring in 24 hrs
        id: userData[0].user_id,
        date: Date.now() / 1000,
      },
      "secret"
    );
  },
  jwtTokenVerify: async (req, res, next) => {
    try {
      let token = req.headers.token;
      var decoded = jwt.verify(token, "secret");
      const params = {
        user_id:decoded.id
      }
      const resultdata=await db.executeQuery(queryBuiler.getUser(params))
      if (resultdata && resultdata.length) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
};
