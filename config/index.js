const configValues = require("./config.json");

module.exports = {
  getDbConnectionString: () => {
    return `mongodb+srv://${configValues.username}:${configValues.pwd}@cluster0.lldvg.mongodb.net/?retryWrites=true&w=majority`;
  },
};
