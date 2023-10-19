const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  rwandanCityName: { type: String, required: true },
  swedenCityName: { type: String, required: true },
  rwandanCityWeatherInfo: { type: Object, required: true },
  swedenCityWeatherInfo: { type: Object, required: true },

  //   temperature: { type: String, required: true },
  //   windSpeed: { type: String, required: true },
  //   icon: { type: String, required: true },
  //   humidity: { type: String, required: true },
  //   pressure: { type: String, required: true },
  //   description: { type: String, required: true },
  createdAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("weather", weatherSchema);
