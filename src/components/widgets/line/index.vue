<template>
  <div class="widgets orange-line" :style="{
    position: 'absolute',
    left: val.left + 'px',
    top: val.top + 'px',
    width: val.width + 'px',
    minHeight: val.height + 'px',
    zIndex: val.style.zIndex,
    fontSize: val.style.FontSize + 'pt',
    color: val.style.FontColor,
    textAlign: val.style.Alignment,
    fontWeight: val.style.Bold ? 'bold' : 'normal'
  }">
    <div class="line-horizontal" :style="{ border: val.style.FontSize + 'px ' + val.style.type }"></div>
  </div>
</template>

<script>
const WIDGET_NAME = 'braid-line'

export default {
  name: WIDGET_NAME,
  setting: {
    type: WIDGET_NAME,
    isEdit: true,
    dragable: true, // 是否可拖拽
    resizable: true, // 尺寸是否可变
    width: 120,
    height: 40,
    left: 50,
    top: 0,
    title: '横线',
    value: '横线',
    defaultValue: '横线',
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
