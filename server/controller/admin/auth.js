const Users = require("../../models/admin/users");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  if (!name || !email || !password || !cpassword) {
    res.json({
      message: "Please Fillup all Filds",
    });
  }
  if (password != cpassword) {
    return res.json({
      message: "password and conrform password doest match",
      status: 400,
    });
  }
  try {
    const getemail = await Users.findOne({ email });
    if (getemail) {
      return res.json({ message: "email already exist", status: 400 });
    }
    const user = new Users({ name, email, password });
    const userReg = await user.save();

    if (userReg) {
      return res.json({ message: "user register sucessfully", status: 200 });
    } else {
      return res.json({ message: "failed to redistered", status: 400 });
    }
  } catch (error) {
    return res.json({ message: "some thing went wrong", status: 400 });
  }
};

exports.signin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    res.json({
      message: "Please Fillup all Filds",
      status: 400,
    });
  }
  try {
    const getemail = await Users.findOne({ email });
    console.log(getemail);
    if (getemail) {
      const isMatch = await bcrypt.compare(password, getemail.password);
      if (isMatch) {
        const token = await getemail.generateToken(getemail);
        // console.log(token)
        res.cookie("jwtToken", token, {
          expires: new Date(Date.now + 25892000000), ///25892000000   means  30 days
        });
        return res.json({
          message: "signin sucessfully",
          token: token,
          user: getemail,
          status: 200,
        });
      } else {
        return res.json({ error: "password or email is invaild", status: 400 });
      }
    } else {
      return res.json({ error: "password or email is invaild", status: 400 });
    }
  } catch (error) {
    return res.json({ message: "some thing went wrong", status: 400 });
  }
};

exports.changepassword = async (req, res) => {
  console.log("hi");
  console.log(req.body);
  const { email, password, newPassword, cnewPassword } = req.body;
  if (!email || !password || !newPassword || !cnewPassword) {
    res.json({
      error: "Please Fillup all Filds",
      status: 400,
    });
  }
  if (newPassword != cnewPassword) {
    return res.json({
      error: "Password and conformPassword must be the same",
      status: 400,
    });
  }
  try {
    const getemail = await Users.findOne({ email });
    // console.log(getemail);
    if (getemail) {
      const isMatch = await bcrypt.compare(password, getemail.password);
      if (isMatch) {
        console.log("kkkk");
        const userPassupdate = await Users.findOneAndUpdate(
          { email },
          { password: newPassword }
        );
        console.log(userPassupdate)
        if (userPassupdate) {
          return res.json({ message: "password change sucessfully", status: 200 });
        }
      } else {
        return res.json({ error: "password or email is invaild", status: 400 });
      }
    } else {
      return res.json({ error: "password or email is invaild", status: 400 });
    }
  } catch (error) {
    console.log(error)
    return res.json({ message: "some thing went wrong", status: 400 });
  }
};

exports.verfyUser = async (req, res) => {
  try {
    if (req.headers.authorization) {
      const verfyToken = jwt.verify(
        req.headers.authorization,
        process.env.SECRET_JWT_KEY
      );
      console.log(verfyToken._id);
      const tokenAvalable = await Users.find({
        id: verfyToken._id,
        "tokens.token": req.headers.authorization,
      });
      console.log(tokenAvalable);
      if (tokenAvalable.length === 0) {
        return res.json({
          message: "You are not authorised person",
          status: 400,
        });
      }
      const rootUser = await Users.findOne({
        _id: verfyToken._id,
      });
      if (!rootUser) {
        return res.json({
          message: "You are not authorised person",
          status: 400,
        });
      }
      return res.json({ message: "You are authorised person", status: 200 });
    } else {
      return res.json({ message: "You are authorised person", status: 400 });
    }
  } catch (error) {
    return res.json({ message: "unauthorised token", status: 400 });
  }
};

exports.logOut = async (req, res) => {
  // console.log(req.userId.toString())
  // console.log(req.headers.authorization)
  try {
    const response = await Users.findByIdAndUpdate(
      {
        _id: req.userId.toString(),
      },
      {
        $pull: {
          tokens: {
            token: req.headers.authorization,
          },
        },
      }
    );
    if (response) {
      return res.json({
        message: "Logout Sucessfully",
        status: 200,
        data: response,
      });
    }
    return res.json({
      message: "Something Went Wrong",
      status: 400,
      data: response,
    });
  } catch (error) {}
};
