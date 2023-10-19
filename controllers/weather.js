// models
const Users = require("../model/users");
// models

const getAll = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

const saveWeather = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

const deleteWeather = async (req, res) => {
  try {
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

module.exports = {
  getAll,
  saveWeather,
  deleteWeather,
};
