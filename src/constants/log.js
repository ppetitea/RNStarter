import { Color } from "./theme";

export const LOG_LVL_TRACE = 0; // all informations you want keep trace
export const LOG_LVL_DEBUG = 1; // all infos usefull to debug problems
export const LOG_LVL_INFO = 2; // all infos to view user path in app
export const LOG_LVL_WARN = 3; // all infos to alert of indesirable
export const LOG_LVL_ERROR = 4; // all infos to describe functionality error
export const LOG_LVL_FATAL = 5; // all infos to describe app fatal error
export const LOG_LVL_OFF = 6; // no infos

export const LOG_COLOR_TRACE = Color.trace;
export const LOG_COLOR_DEBUG = Color.debug;
export const LOG_COLOR_INFO = Color.info;
export const LOG_COLOR_WARN = Color.warn;
export const LOG_COLOR_ERROR = Color.error;
export const LOG_COLOR_FATAL = Color.fatal;

export const LOG_PREFIX_TRACE = "Trace";
export const LOG_PREFIX_DEBUG = "Debug"; // ⚙
export const LOG_PREFIX_INFO = "Info "; // ✉
export const LOG_PREFIX_WARN = "warn "; // ⚠
export const LOG_PREFIX_ERROR = "Error"; // ‼
export const LOG_PREFIX_FATAL = "FATAL"; // ☠
