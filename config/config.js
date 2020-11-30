import {
  APP_ENV_DEVELOPPEMENT,
  APP_ENV_INTEGRATION,
  APP_ENV_PRODUCTION,
  APP_ENV_RECIPE,
} from "../src/constants/app";
import {
  LOG_LVL_TRACE,
  LOG_LVL_DEBUG,
  LOG_LVL_INFO,
  LOG_LVL_WARN,
  LOG_LVL_ERROR,
  LOG_LVL_FATAL,
  LOG_LVL_OFF,
} from "../src/constants/log";

const AppConfig = {
  env: APP_ENV_DEVELOPPEMENT,
  formAutofill: true,
  logLevel: LOG_LVL_TRACE,
  version: "0.0.1",
};

export { AppConfig };
