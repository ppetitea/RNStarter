import {
  APP_ENV_DEVELOPPEMENT,
  APP_ENV_INTEGRATION,
  APP_ENV_PRODUCTION,
  APP_ENV_RECIPE,
} from "../../constants/app";
import { LOG_LVL_DEBUG, LOG_LVL_TRACE } from "../../constants/log";
import { initState } from "../../utils/modelHelper";

const Config = (source = {}) => {
  let state = {
    env: APP_ENV_DEVELOPPEMENT,
    formAutofill: true,
    logLevel: LOG_LVL_TRACE,
    version: "x.x.x",
  };

  initState(state, source);
  const behavior = (state) => ({
    ...canHandleConfigData(state),
    ...canHandleFormAutofill(state),
    ...canHandleAppEnv(state),
    ...canHandleLogLevel(state),
  });
  Object.assign(state, behavior(state));
  return state;
};

const canHandleAppEnv = (state) => ({
  switchToDevEnv: () => {
    state.setEnv(APP_ENV_DEVELOPPEMENT);
    return state;
  },
  switchToRecipeEnv: () => {
    state.setEnv(APP_ENV_RECIPE);
    return state;
  },
  switchToIntegreationEnv: () => {
    state.setEnv(APP_ENV_INTEGRATION);
    return state;
  },
  switchToProdEnv: () => {
    state.setEnv(APP_ENV_PRODUCTION);
    return state;
  },
});

const canHandleFormAutofill = (state) => ({
  enableFormAutofill: () => {
    state.setFormAutofill(true);
    return state;
  },
  disableFormAutofill: () => {
    state.setFormAutofill(false);
    return state;
  },
});

const canHandleLogLevel = (state) => ({
  enableTrace: () => {
    state.setLogLevel(LOG_LVL_TRACE);
    return state;
  },
  enableDebug: () => {
    state.setLogLevel(LOG_LVL_DEBUG);
    return state;
  },
  enableInfo: () => {
    state.setLogLevel(LOG_LVL_INFO);
    return state;
  },
  enableWarning: () => {
    state.setLogLevel(LOG_LVL_WARN);
    return state;
  },
  enableError: () => {
    state.setLogLevel(LOG_LVL_ERROR);
    return state;
  },
  enableFatal: () => {
    state.setLogLevel(LOG_LVL_FATAL);
    return state;
  },
});

const canHandleConfigData = (state) => ({
  getEnv: () => state.env,
  getFormAutofill: () => state.formAutofill,
  getLogLevel: () => state.logLevel,
  getVersion: () => state.version,

  setEnv: (v) => {
    state.env = v;
    return state;
  },
  setFormAutofill: (v) => {
    state.formAutofill = v;
    return state;
  },
  setLogLevel: (v) => {
    state.logLevel = v;
    return state;
  },
  setVersion: (v) => {
    state.version = v;
    return state;
  },
});

export default Config;
