// models
const Weather = require("../model/weather");
// models

const getAll = async (req, res) => {
  try {
    const weather = await Weather.find({ userId: req.user._id });
    return res.status(200).send({
      weather,
    });
  } catch (err) {
    return res.status(400).send({
      msg: err.message,
    });
  }
};

const saveWeather = async (req, res) => {
  try {
    const {
      rwandanCityName,
      swedenCityName,
      rwandanCityWeatherInfo,
      swedenCityWeatherInfo,
    } = req.body;
    if (
      !(
        rwandanCityName &&
        swedenCityName &&
        rwandanCityWeatherInfo &&
        swedenCityWeatherInfo
      )
    ) {
      return res.status(400).send({ msg: "Invalid request" });
    }

    const weather = await Weather.create({
      userId: req.user._id,
      rwandanCityName,
      swedenCityName,
      rwandanCityWeatherInfo,
      swedenCityWeatherInfo,
    });

    return res.status(200).json({
      msg: "Weather info saved successfull",
      weather,
    });
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