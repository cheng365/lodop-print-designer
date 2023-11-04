<template>
  <div class="widgets orange-line" :style="{
    position: 'absolute',
    left: val.left + 'px',
    top: val.top + 'px',
    width: val.width + 'px',
    minHeight: val.height + 'px',
    zIndex: val.style.zIndex,
    fontSize: val.style.FontSize + 'pt',
    textAlign: val.style.Alignment,
    fontWeight: val.style.Bold ? 'bold' : 'normal'
  }">
    <div :style="{ borderTop: val.style.FontSize + 'px ' + val.style.type, height: val.height + 'px' }"></div>
  </div>
</template>

<script>
const WIDGET_NAME = 'horizontal-line'

export default {
  name: WIDGET_NAME,
  setting: {
    type: WIDGET_NAME,
    isEdit: false,
    dragable: true, // 是否可拖拽
    resizable: true, // 尺寸是否可变
    width: 200,
    height: 10,
    left: 50,
    top: 10,
    title: '横线',
    value: '横线',
    defaultValue: '——',
    name: '',
    style: {
      type: 'solid',
      zIndex: 0,
      FontSize: 1,
      FontColor: '#000000',
      lineType: 0, // 0--实线 1--破折线 2--点线 3--点划线 4--双点划线
      ItemType: 0, // 打印类型 0--普通项 1--页眉页脚 2--页号项 3--页数项 4--多页项
    },
  },
  props: [
    'val', // 文本对象
  ]
}
</script>

<style scoped>
.line-horizontal {
  width: 100%;
  margin-top: 4px;
}

.boder {
  border: 1px solid;
}
</style>
