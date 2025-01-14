import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({});

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    const emailExists = User.findOne({ email });

    if (emailExists) {
      return res
        .status(404)
        .send({ message: "email da dang ki, vui long dang nhap" });
    }
    const hashPassword = bcryptjs.hashSync(password, 10);

    const newUser = await User.create({
      email,
      username,
      password,
      role: role || "member",
    });
    return res.status(200).send({ message: "dang ki thanh cong", newUser });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error!", error: error.message || "Error!" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.status(404).send({
      message: "tai khoan ko ton tai , vui long dang ki tai khoan moi",
    });
  }

  const checkPassword = bcryptjs.compareSync(password, userExists.password);

  if (!checkPassword) {
    return res.status(404).send({ message: "mat khau ko chinh xac" });
  }

  const accessToken = jwt.sign({ _id: userExists._id }, SECRET_KEY, {
    expiresIn: "10d",
  });

  userExists.password = undefined;
  return res.status(200).send({
    message: "dang nhap thanh cong",
    accessToken,
    user: userExists,
  });
};

export { register, login };
