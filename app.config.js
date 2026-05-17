const dotenv = require("dotenv");

dotenv.config();

module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
  },
});
