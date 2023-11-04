// import braidPic from './pic/index.vue'
import braidTxt from "./txt/index.vue";
import barCode from "./bar-code/index.vue";
import table from "./table/index.vue";
import image from "./image/index.vue";
import html from "./html/index.vue";
import verticalLine from "./line/vertical-line.vue";
import horizontalLine from "./line/horizontal-line.vue";

const install = function(Vue) {
  Vue.component(braidTxt.name, braidTxt);
  Vue.component(barCode.name, barCode);
  Vue.component(table.name, table);
  Vue.component(image.name, image);
  Vue.component(html.name, html);
  Vue.component(verticalLine.name, verticalLine);
  Vue.component(horizontalLine.name, horizontalLine);
};

const getWidgetsSetting = function() {
  return {
    [braidTxt.name]: braidTxt.setting,
    [barCode.name]: barCode.setting,
    [table.name]: table.setting,
    [image.name]: image.setting,
    [html.name]: html.setting,
    [verticalLine.name]: verticalLine.setting,
    [horizontalLine.name]: horizontalLine.setting
  };
};
export default {
  install,
  getWidgetsSetting
};
