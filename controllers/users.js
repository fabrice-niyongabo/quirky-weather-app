const jwt = require("jsonwebtoken");
const jwdDecode = require("jwt-decode");

// models
const Users = require("../model/users");
// models

const loginOrRegister = async (req, res) => {
  try {
    const { credential } = req.body;

    // Validate user input
    if (!credential) {
      return res.status(400).send({ msg: "Invalid request" });
    }

    //decode google credentials
    const decodedData = jwdDecode(credential);

    const { email, given_name, family_name, picture } = decodedData;

    //validate decoded data
    if (!(email && given_name && family_name && picture)) {
      return res.status(400).send({
        msg: "Invalid credentials, please login with your google account",
      });
    }

    // Validate if user exist in our database
    const user = await Users.findOne({
      email,
    });
    if (!user) {
      //register user
      const user = await Users.create({
        fName: given_name,
        lName: family_name,
        email,
        image: picture,
      });
      // Create token
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          fName: user.fName,
          lName: user.lName,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        }
      );
      return res.status(200).json({
        msg: "Logged in successful",
        user,
        token,
      });
    } else {
      // Create token
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          fName: user.fName,
          lName: user.lName,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: process.env.TOKEN_EXPIRATION,
        }
      );
      // user
      return res.status(200).json({
        msg: "Logged in successful",
        user,
        token,
      });
    }
  } catch (err) {
    console.log({ err });
    return res.status(400).send({
      msg: "Something went wrong while signing you in. Please Try again later",
    });
  }
};

module.exports = {
  loginOrRegister,
};
