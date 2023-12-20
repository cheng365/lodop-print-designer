<template>
  <div class="box">
    <div class="title">lodop-print-designer 打印模板设计器</div>
    <section>
      <div class="section">模板数据打印测试</div>
      <el-form ref="printForm" :model="printForm" size="small" :rules="printRules" label-width="80px">
        <el-form-item label="模板" prop="temp">
          <el-input
            type="textarea"
            :rows="6"
            v-model="printForm.temp"
            placeholder="要打印的模板，数据格式为json格式的对象"
          ></el-input>
        </el-form-item>
        <el-form-item label="数据" prop="data">
          <el-input
            type="textarea"
            :rows="6"
            v-model="printForm.data"
            placeholder="要打印的数据，数据格式为json格式的数组"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-top:10px">
          <el-button size="mini" type="primary" @click="printPreview(1)">打印预览</el-button>
          <el-button size="mini" type="success" @click="printPreview(2)">直接打印</el-button>
        </el-form-item>
        <!-- <el-form-item>
          <div>
            <el-button size="mini" type="primary" @click="printPreview(1)">打印预览</el-button>
          </div>
          <div style="margin-top:10px">
            <el-button size="mini" type="success" @click="printPreview(2)">直接打印</el-button>
          </div>
        </el-form-item> -->
      </el-form>
    </section>
    <section>
      <el-collapse>
        <el-collapse-item title="测试数据" name="1">
          <el-form ref="testData" :model="testData" size="small" :inline="true">
            <el-form-item label="模板">
              <el-input
                type="textarea"
                style="width:920px"
                :rows="8"
                v-model="testData.temp"
                placeholder="数据模板对应的数据，数据格式为json对象"
              ></el-input>
            </el-form-item>
            <el-form-item label="数据">
              <el-input
                type="textarea"
                style="width:920px"
                :rows="8"
                v-model="testData.data"
                placeholder="数据模板对应的数据，数据格式为json对象"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </section>
  </div>
</template>
<script>
import { Table, TableColumn, Dialog, MessageBox, Message } from 'element-ui'
import Vue from 'vue'
Vue.prototype.$confirm = (...args) => MessageBox.confirm(...args)
import { OutStockData } from '../data/test'
import { outStockTemp } from '../data/defaultTemp'
export default {
  data() {
    return {
      visible: false,
      printForm: {
        temp: '',
        data: '',
      },
      printRules: {
        temp: { required: true, message: '请输入测试模板' },
        data: { required: true, message: '请输入模板测试数据' },
      },
      testData: {
        temp: JSON.stringify(JSON.parse(outStockTemp)[0]),
        data: JSON.stringify(OutStockData),
      },
    }
  },
  created() {
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Dialog)
  },
  methods: {
    isJSON(str) {
      if (typeof str == 'string') {
        try {
            var obj=JSON.parse(str)
            if (typeof obj == 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch(e) {
            return false
        }
      }
    },
    /**
     * 测试打印预览/直接打印
     * flag 1:打印预览，2：直接打印
     */
    printPreview(flag) {
      this.$refs.printForm.validate((valid) => {
        if (valid) {
          const isJSONTemp = this.isJSON(this.printForm.temp)
          if (!isJSONTemp) {
            return Message.error('请输入正确格式的模板')
          }
          const isJSONData = this.isJSON(this.printForm.data)
          if (!isJSONData) {
            return Message.error('请输入正确格式的数据')
          }
          const temp = JSON.parse(this.printForm.temp)
          const data = JSON.parse(this.printForm.data)
          if (flag == 1) {
            this.$lodop.preview(temp, data)
          } else {
            this.$confirm('确认直接打印吗？', '确认信息')
              .then((isPass) => {
                if (isPass) {
                  this.$lodop.print(temp, data)
                }
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      })
    }
  },
}
</script>
<style scoped>
.box {
  width: 1000px;
  margin: auto;
  padding: 10px 0;
  font-family: Arial, Helvetica, sans-serif;
}
.title {
  text-align: center;
  font-size: 24px;
  color: #1890ff;
  margin: 20px;
  font-weight: bold;
}
.section {
  font-size: 18px;
  color: #333333;
  padding: 10px 0;
}
</style>
