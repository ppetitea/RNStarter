import {
  LOG_LVL_ERROR,
  LOG_LVL_FATAL,
  LOG_LVL_INFO,
  LOG_LVL_TRACE,
  LOG_LVL_WARN,
} from "../../constants/log";
import { initState } from "../../utils/modelHelper";
import Log from "./Log";

const Logger = (source = {}) => {
  let state = {
    history: [],
    appConfig: null,
    transport: console.log,
  };

  initState(state, source);
  const behavior = (state) => ({
    ...canHandleLoggerData(state),
    ...canHandleLog(state),
    ...canHandleHistory(state),
  });
  Object.assign(state, behavior(state));
  return state;
};

const canHandleHistory = (state) => ({
  showHistory: () => {
    state.getHistory().map((log) => state.forceLog(log));
    return state;
  },
  resetHistory: () => {
    state.setHistory([]);
    return state;
  },
  keepLast: (n = 1) => {
    const lastNItems = state.getHistory().slice(-n);
    state.setHistory(lastNItems);
    return state;
  },
  showLast: (n = 1) => {
    const lastNItems = state.getHistory().slice(-n);
    lastNItems.map((log) => state.forceLog(log));
    return state;
  },
  showTrace: () => {
    state.getHistory().map((log) => {
      if ((log.getLevel = LOG_LVL_TRACE)) state.forceLog(log);
    });
    return state;
  },
  showDebug: () => {
    state.getHistory().map((log) => {
      if ((log.getLevel = LOG_LVL_DEBUG)) state.forceLog(log);
    });
    return state;
  },
  showInfo: () => {
    state.getHistory().map((log) => {
      if ((log.getLevel = LOG_LVL_INFO)) state.forceLog(log);
    });
    return state;
  },
  showWarn: () => {
    state.getHistory().map((log) => {
      if ((log.getLevel = LOG_LVL_WARN)) state.forceLog(log);
    });
    return state;
  },
  showError: () => {
    state.getHistory().map((log) => {
      if ((log.getLevel = LOG_LVL_ERROR)) state.forceLog(log);
    });
    return state;
  },
  showFatal: () => {
    state.getHistory().map((log) => {
      if ((log.getLevel = LOG_LVL_FATAL)) state.forceLog(log);
    });
    return state;
  },
});

const canHandleLog = (state) => ({
  forceLog: (log) => state.transport(log.format()),
  log: (log) => {
    if (log.getLevel() >= state.appConfig.getLogLevel()) {
      state.transport(log.format());
    }
    state.history.push(log);
  },
  trace: (message) => {
    const newLog = Log(message).trace();
    state.log(newLog);
  },
  debug: (message) => {
    const newLog = Log(message).debug();
    state.log(newLog);
  },
  info: (message) => {
    const newLog = Log(message).info();
    state.log(newLog);
  },
  warn: (message) => {
    const newLog = Log(message).warning();
    state.log(newLog);
  },
  error: (message) => {
    const newLog = Log(message).error();
    state.log(newLog);
  },
  fatal: (message) => {
    const newLog = Log(message).fatal();
    state.log(newLog);
  },
});

const canHandleLoggerData = (state) => ({
  getTransport: () => state.transport,
  getHistory: () => state.history,

  setTransport: (v) => {
    state.transport = v;
    return state;
  },
  setHistory: (v) => {
    state.history = v;
    return state;
  },
});

export default Logger;
