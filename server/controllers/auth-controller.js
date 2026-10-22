const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("this is auth controller");
        
    } catch (error) {
        console.log(error);
    }
}

                                            ////////// user registration logic //////////////

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password, email, phone } = req.body;

        const userExist = await User.findOne({ email: email });

        if (userExist) {
            return res.status(400).json({ message: "email already exist" });
        }

        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound); 
        
        const user = await User.create({ username, email, phone, password });

        res.status(201).json({msg: "registration successfull", token: await user.generateToken(), userId: user._id.toString()});
    } catch (error) {
        // res.status(500).json("inetrnal server error");
        next(error);
    }
}


                                //////////////// user login logic //////////////////////////////

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExist = await User.findOne({email});
        console.log(userExist);

        if(!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const passwordMatch = await userExist.comparePassword(password);

        if(passwordMatch) {
            res.status(200).json ({
                msg: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
            });
        }
        else {
            res.status(401).json({ message: "Invalid Credentials" });
        }

    } catch (error) {
         res.status(500).json({
            error: error.message,
            message: "internal server error"
         });
        // next(error);
    }
};



                                //////////////// to send user data -> user logic //////////////////////////////
 
const user = async (req, res) => {
  try {
    // const userData = await User.find({});
    const userData = req.user;
    console.log(userData);
    return res.status(200).json({ userData });
  } catch (error) {
    console.log(` error from user route ${error}`);
  }
};

module.exports = {home, register, login, user};