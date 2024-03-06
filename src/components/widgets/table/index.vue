<template>
  <div
    class="widgets"
    :style="{
      left: val.left + 'px',
      top: val.top + 'px',
      width: val.width + 'px',
      height: val.height + 'px',
      textAlign: val.style.Alignment,
      fontSize: val.style.FontSize + 'pt',
      color: val.style.FontColor
    }"
    style="position: absolute; overflow: hidden"
  >
    <table
      :id="tid"
      border="1"
      width="100%"
      cellspacing="0"
      cellpadding="2"
      style="border-collapse: collapse; font-size: 12px"
      bordercolor="#000000"
      :key="indexKey"
    >
      <tr>
        <th
          v-for="item in columns"
          :id="item.thid"
          :key="item.name"
          :width="setTableColWidth(item)"
          contenteditable="true"
          @blur="modifyTitle(item, $event)"
        >
          {{ item.title }}
        </th>
        <!-- <th v-for="item in columns" :key="item.name" :width="item.name === '_seq' ? 40 : ''">{{ item.title }}</th> -->
      </tr>
      <tr>
        <td v-for="item in columns" :key="item.name">{{ item.value }}</td>
      </tr>
      <tr v-if="val.showFooter">
        <td
          v-for="(item, index) in val.lastTrConfig"
          :contenteditable="true"
          :key="item.name"
          @click="handleColumn(index)"
          @blur="contentBlur(item, $event)"
        >
          <template>{{ item.tdata ? '#' : item.content }}</template>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { resizeTableCol, getUUID } from '../../../utils/tools.js'

const WIDGET_NAME = 'braid-table'

export default {
  name: WIDGET_NAME,
  setting: {
    type: WIDGET_NAME,
    isEdit: false, // 是否可编辑
    dragable: true, // 是否可拖拽
    resizable: true, // 尺寸是否可变
    width: 240,
    height: 60,
    left: 50,
    top: 10,
    title: '表格',
    value: [],
    defaultValue: [],
    tabelHtml: '',
    columnsAttr: [], // 表格列选项
    columns: [], // 已选表格列表
    selectCol: [], // 已选表格列name数组（用于多选框双向绑定）
    name: '',
    style: {
      zIndex: 0,
      Alignment: 'left', // 对齐方式 1--左靠齐 2--居中 3--右靠齐
      FontSize: 9,
      FontColor: '#000000',
      BorderColor: '#000000',
      AutoHeight: false, // 高度自动（模板在该元素位置以下的元素都关联打印）
      BottomMargin: 0 // 距离下边距
    },
    tindex: 0,
    showFooter: false
  },
  props: [
    'val' // 文本对象
  ],
  watch: {
    'val.lastTrConfig': {
      handler() {
        this.indexKey++
      },
      deep: true // 深度监听
    }
  },
  data() {
    return {
      indexKey: 1,
      tid: 'table-' + getUUID(8)
    }
  },
  computed: {
    // 去掉type='row'的数据
    columns() {
      let col = this.val.columns || []
      for (const item of col) {
        item.thid = 'thid-' + getUUID(6)
      }
      return col
    },
    activeElement() {
      return this.$vptd.state.activeElement
    },
  },
  mounted() {
    this.$nextTick(() => {
      // 调整表格列宽
      resizeTableCol(this.tid, (resizeTd) => {
        this.$vptd.commit('pauseMove', resizeTd !== null)
        if (resizeTd) {
          // 实时保存列宽，用作保存后回显
          const result = this.columns.find((item) => item.thid === resizeTd.id)
          result['width'] = resizeTd.width
        } else {
          // 拖动结束
          this.convertWidth()
        }
      })
      this.convertWidth()
    })
  },
  methods: {
    // 将表格列宽由原来的px转换为百分比
    convertWidth() {
      // 获取表格的所有 th 元素
      const thElements = document.querySelectorAll(`#${this.tid} th`)
      // 循环遍历每个 th 元素
      thElements.forEach((item, i) => {
        // 获取原始宽度值（以像素为单位）
        const originalWidth = item.offsetWidth

        // 计算百分比值
        const percentage = (originalWidth / item.parentElement.offsetWidth) * 100

        // 将每个 th 元素的宽度设置为百分比
        this.columns[i].widthPercent = percentage + '%'
      })
    },
    modifyTitle(cur, e) {
      cur.title = e.target.innerText
    },
    handleColumn(index) {
      this.activeElement.tindex = index
    },
    // 设置表格列宽
    setTableColWidth(item) {
      if (item.width) {
        return item.width
      } else {
        if (item.name === '_seq') {
          return 30
        }
      }
      return ''
    },
    contentBlur(item, e) {
      item.content = e.target.innerHTML
      e.target.innerHTML = item.content
    },
  }
}
</script>
