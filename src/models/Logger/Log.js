import {
  LOG_LVL_TRACE,
  LOG_LVL_DEBUG,
  LOG_LVL_INFO,
  LOG_LVL_WARN,
  LOG_LVL_ERROR,
  LOG_LVL_FATAL,
  LOG_COLOR_TRACE,
  LOG_COLOR_DEBUG,
  LOG_COLOR_INFO,
  LOG_COLOR_WARN,
  LOG_COLOR_ERROR,
  LOG_COLOR_FATAL,
  LOG_PREFIX_TRACE,
  LOG_PREFIX_DEBUG,
  LOG_PREFIX_INFO,
  LOG_PREFIX_WARN,
  LOG_PREFIX_ERROR,
  LOG_PREFIX_FATAL,
} from "../../constants/log";
import moment from "moment";
import chalk from "chalk";
import { Color } from "../../constants/theme";

const ctx = new chalk.Instance({ level: 3 });

const Log = (message = "") => {
  let state = {
    date: moment().format("DD/MM/YY hh:mm:ss "),
    message: message,
    prefix: LOG_PREFIX_DEBUG,
    level: LOG_LVL_DEBUG,
    color: LOG_COLOR_DEBUG,
  };

  const behavior = (state) => ({
    ...canHandleLogData(state),
    ...canHandleLevel(state),
    ...canHandleLogFormat(state),
  });
  Object.assign(state, behavior(state));
  return state;
};

const canHandleLogFormat = (state) => ({
  format: () => {
    let string = state.message;
    if (typeof string !== "string") {
      string = JSON.stringify(state.message, null, 2);
    }
    const date = ctx.hex(Color.trace)(state.date);
    const prefix = ctx.hex(state.color).bgBlack(state.prefix);
    const message = ctx.hex(state.color).bgBlack(string);
    const formated = `${date} ${prefix} ${message}`;
    return formated;
  },
});

const canHandleLevel = (state) => ({
  trace: () => {
    state.setLevel(LOG_LVL_TRACE);
    state.setColor(LOG_COLOR_TRACE);
    state.setPrefix(LOG_PREFIX_TRACE);
    return state;
  },
  debug: () => {
    state.setLevel(LOG_LVL_DEBUG);
    state.setColor(LOG_COLOR_DEBUG);
    state.setPrefix(LOG_PREFIX_DEBUG);
    return state;
  },
  info: () => {
    state.setLevel(LOG_LVL_INFO);
    state.setColor(LOG_COLOR_INFO);
    state.setPrefix(LOG_PREFIX_INFO);
    return state;
  },
  warning: () => {
    state.setLevel(LOG_LVL_WARN);
    state.setColor(LOG_COLOR_WARN);
    state.setPrefix(LOG_PREFIX_WARN);
    return state;
  },
  error: () => {
    state.setLevel(LOG_LVL_ERROR);
    state.setColor(LOG_COLOR_ERROR);
    state.setPrefix(LOG_PREFIX_ERROR);
    return state;
  },
  fatal: () => {
    state.setLevel(LOG_LVL_FATAL);
    state.setColor(LOG_COLOR_FATAL);
    state.setPrefix(LOG_PREFIX_FATAL);
    return state;
  },
});

const canHandleLogData = (state) => ({
  getDate: () => state.date,
  getMessage: () => state.message,
  getLevel: () => state.level,
  getColor: () => state.color,
  getPrefix: () => state.prefix,

  setDate: (v) => {
    state.date = v;
    return state;
  },
  setMessage: (v) => {
    state.message = v;
    return state;
  },
  setLevel: (v) => {
    state.level = v;
    return state;
  },
  setColor: (v) => {
    state.color = v;
    return state;
  },
  setPrefix: (v) => {
    state.prefix = v;
    return state;
  },
});

export default Log;
