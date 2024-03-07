<template>
  <div>
    <!-- 表尾列设置 -->
    <el-form label-width="80px" :model="activeElement" size="mini" class="kr-form" v-if="activeElement.lastTrConfig">
      <el-row>
        <el-col :span="12">
          <el-form-item label="启用表尾">
            <el-switch v-model="activeElement.showFooter"
              :active-value="true" :inactive-value="false"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="列">
            {{ activeElement.lastTrConfig[activeElement.tindex].title }}
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="合并列数">
            <el-input-number :disabled="disabled" v-model="activeElement.lastTrConfig[activeElement.tindex].colspan" controls-position="right" :min="0"
              class="min-input" @change="colspanChange"></el-input-number>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="类型">
            <el-select :disabled="disabled" clearable v-model="activeElement.lastTrConfig[activeElement.tindex].tdata"
              class="min-input">
              <el-option v-for="val in statisticTypeArray" :key="val.value" :label="val.label" :value="val.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="格式">
            <el-select :disabled="disabled" v-model="activeElement.lastTrConfig[activeElement.tindex].format"
              class="min-input">
              <el-option v-for="val in formatTypeArray" :key="val.value" :label="val.label" :value="val.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getFormatType, getStatisticType } from '../../libs/props.js'

export default {
  name: 'tablecColumn',
  data() {
    return {
      formatTypeArray: getFormatType(),
      statisticTypeArray: getStatisticType(),
    }
  },
  computed: {
    activeElement() {
      const activeElement = this.$vptd.state.activeElement
      this.generateConfig(activeElement)
      return activeElement
    },
    disabled() {
      return !this.$vptd.state.activeElement.showFooter
    },
  },
  methods: {
    tdataChange(tdata) {
      let content = '#'
      if (!tdata) {
        content = ''
      }
      console.log(tdata);
      console.log(content);
      this.$vptd.state.activeElement.lastTrConfig[this.activeElement.tindex].content = content
      this.$set(this.$vptd.state.activeElement, 'lastTrConfig', this.activeElement.lastTrConfig)
      console.log(this.activeElement.lastTrConfig);
    },
    generateConfig(activeElement) {
      const tmp = []
      if (activeElement.type === 'braid-table' && !activeElement.lastTrConfig) {
        activeElement.columns.forEach((item) => {
          tmp.push({...item, colspan: 1, tdata: '', content: '', format: '0'})
        })
        this.$set(activeElement, 'lastTrConfig', tmp)
      }
    }
  },
}
</script>
<style lang="scss" scoped>
</style>
