import * as configValues from "./config.json";

const getDbConnectionString = (): string => {
  return `mongodb+srv://${configValues.username}:${configValues.pwd}@cluster0.lldvg.mongodb.net/?retryWrites=true&w=majority`;
};

export default getDbConnectionString;
