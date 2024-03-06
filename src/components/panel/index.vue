<template>
  <div class="kr-collapse">
    <el-collapse v-model="activeNames">
      <el-collapse-item title name="1">
        <template slot="title">
          <span>页面参数</span>
        </template>
        <page />
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span>样式</span>
        </template>
        <appearance class="pd-l-10" />
      </el-collapse-item>
      <el-collapse-item name="3" v-if="isTable">
        <template slot="title">
          <span>表尾列设置</span>
        </template>
        <tablecColumn />
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <span>组件</span>
        </template>
        <options />
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <span>已加组件</span>
        </template>
        <layers />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import page from './page.vue'
import style from './style.vue'
import options from './options/index.vue'
import layers from './layers.vue'
import tablecColumn from './tablecColumn.vue'

export default {
  components: {
    page,
    appearance: style,
    options,
    layers,
    tablecColumn,
  },
  watch: {
    '$vptd.state.page.tempItems': {
      handler(tempItems) {
        this.hasTable(tempItems)
      },
      immediate: true, // 初始化立即执行
    }
  },
  data() {
    return {
      isTable: false,
      activeNames: ['1', '2', '3', '4', '5'],
    }
  },
  methods: {
    hasTable(tempItems) {
      this.isTable = tempItems.some(item => item.type === 'braid-table')
    }
  }
}
</script>
