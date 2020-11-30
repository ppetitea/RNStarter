import { Dimensions } from "react-native";
import { Color } from "../../constants/theme";
import { log } from "../../services";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const windowMax = windowWidth > windowHeight ? windowWidth : windowHeight;
const windowMin = windowWidth < windowHeight ? windowWidth : windowHeight;

const Style = (source = {}) => {
  let state = {
    styles: {},
    source,
  };

  const styles = (state) => ({
    ...canHandleFont(state),
    ...canHandleBackground(state),
    ...canHandleContainer(state),
    ...canHandleBorder(state),
    ...canHandleDimensions(state),
    ...canHandleAlignement(state),
    ...canHandleOrientation(state),
    ...handleStyle(state),
  });

  return Object.assign(state, styles(state));
};

const handleStyle = (state) => ({
  get: () => ({ ...state.styles, ...state.source }),
  merge: (style) => {
    if (style.styles) {
      state.styles = { ...state.styles, ...style.styles };
    } else {
      state.styles = { ...state.styles, ...style };
    }
    return state;
  },
  execIfExist: (methodName, methodType) => {
    if (state[methodName]) {
      state[methodName]();
      return true;
    } else {
      state.logAbsentMethod(methodType, methodName);
      return false;
    }
  },
  logAbsentMethod: (methodType, givenString) => {
    log.warn(`Unknow ${methodType} '${givenString}' detected`);
  },
});

const canHandleFontLevel = (state) => ({
  h1: () => {
    state.styles.fontSize = 18;
    return state;
  },
  h2: () => {
    state.styles.fontSize = 16;
    return state;
  },
  h3: () => {
    state.styles.fontSize = 14;
    return state;
  },
  h4: () => {
    state.styles.fontSize = 12;
    return state;
  },
  fontLevel: (lvl) => {
    state.execIfExist(lvl, "fontLevel");
    return state;
  },
});

const canHandleFontColor = (state) => ({
  color: (color = Color.black) => {
    state.styles.color = color;
    return state;
  },
});

const canHandleFontWeight = (state) => ({
  light: () => {
    state.styles.fontWeight = "100";
    return state;
  },
  normal: () => {
    state.styles.fontWeight = "normal";
    return state;
  },
  bold: () => {
    state.styles.fontWeight = "bold";
    return state;
  },
});

const canHandleFont = (state) => ({
  ...canHandleFontLevel(state),
  ...canHandleFontColor(state),
  ...canHandleFontWeight(state),
});

const canHandleBackground = (state) => ({
  bgColor: (color = Color.white) => {
    state.styles.backgroundColor = color;
    return state;
  },
});

const canHandleBorder = (state) => ({
  borderColor: (color = Color.black) => {
    state.styles.borderColor = color;
    return state;
  },
  borderRadius: (radius = 4) => {
    state.styles.borderRadius = radius;
    return state;
  },
  borderWidth: (width = 1) => {
    state.styles.borderWidth = width;
    return state;
  },
  border: (width = 1) => {
    state.borderColor().borderRadius().borderWidth(width);
    return state;
  },
  margin: (margin = 10) => {
    state.styles.margin = margin;
    return state;
  },
  marginTop: (v = 10) => {
    state.styles.marginTop = v;
    return state;
  },
  marginBottom: (v = 10) => {
    state.styles.marginBottom = v;
    return state;
  },
  marginLeft: (v = 10) => {
    state.styles.marginLeft = v;
    return state;
  },
  marginVertical: (v = 10) => {
    state.styles.marginVertical = v;
    return state;
  },
  marginHorizontal: (v = 10) => {
    state.styles.marginHorizontal = v;
    return state;
  },
  padding: (padding = 10) => {
    state.styles.padding = padding;
    return state;
  },
  paddingTop: (v = 10) => {
    state.styles.paddingTop = v;
    return state;
  },
  paddingBottom: (v = 10) => {
    state.styles.paddingBottom = v;
    return state;
  },
  paddingLeft: (v = 10) => {
    state.styles.paddingLeft = v;
    return state;
  },
  paddingRight: (v = 10) => {
    state.styles.paddingRight = v;
    return state;
  },
  paddingVertical: (v = 10) => {
    state.styles.paddingVertical = v;
    return state;
  },
  paddingHorizontal: (v = 10) => {
    state.styles.paddingHorizontal = v;
    return state;
  },
  elevation: (v = 1) => {
    state.styles.elevation = v;
    return state;
  },
});

const canHandleContainer = (state) => ({
  contained: () => {
    state.padding().margin().borderRadius();
    state.styles.backgroundColor = "white";
    state.styles.elevation = 1;
    return state;
  },
  outlined: () => {
    state.padding().margin().border();
    return state;
  },
  containMode: (mode) => {
    state.execIfExist(mode, "containMode");
    return state;
  },
});

const canHandleDimensions = (state) => ({
  flex: (n = 1) => {
    state.styles.flex = n;
    return state;
  },
  width: (v) => {
    state.styles.width = v;
    return state;
  },
  height: (v) => {
    state.styles.height = v;
    return state;
  },
  size: (v) => {
    return state.width(v).height(v);
  },
  vw: (v) => {
    state.styles.width = v * windowWidth;
    return state;
  },
  vh: (v) => {
    state.styles.height = v * windowHeight;
    return state;
  },
  vmin: (v) => {
    state.styles.width = v * windowMin;
    return state;
  },
  vmax: (v) => {
    state.styles.height = v * windowMax;
    return state;
  },
});

const canHandleAlignement = (state) => ({
  alignTop: () => {
    state.styles.marginBottom = "auto";
    return state;
  },
  alignBottom: () => {
    state.styles.marginTop = "auto";
    return state;
  },
  alignLeft: () => {
    state.styles.marginRight = "auto";
    return state;
  },
  alignRight: () => {
    state.styles.marginLeft = "auto";
    return state;
  },
  center: () => {
    state.styles.justifyContent = "center";
    state.styles.alignItems = "center";
    state.styles.alignSelf = "center";
    state.styles.textAlign = "center";
    state.alignBottom();
    state.alignTop();
    return state;
  },
  centerHorizontal: () => {
    state.styles.marginRight = "auto";
    state.styles.marginLeft = "auto";
    return state;
  },
  alignStart: () => {
    state.styles.justifyContent = "flex-start";
    state.styles.alignItems = "center";
    state.styles.alignSelf = "flex-start";
    return state;
  },
  alignEnd: () => {
    state.styles.justifyContent = "flex-end";
    state.styles.alignItems = "center";
    state.styles.alignSelf = "flex-end";
    return state;
  },
});

const canHandleOrientation = (state) => ({
  col: () => {
    state.styles.flexDirection = "column";
    return state;
  },
  row: () => {
    state.styles.flexDirection = "row";
    return state;
  },
});

export default Style;
