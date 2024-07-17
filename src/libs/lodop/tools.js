/**
 * 通过模板和模板数据生成打印内容
 * @param temp 打印模板
 * @param data 模板数据
 */
export const tempToPrint = (temp, data) => {
  let printContent = temp.map(item => {
    var reg = /({[^{]*})/g
    let value = item.value.replace(reg, data[item.name] || '')
    return {
      top: item.top,
      left: item.left,
      width: item.width,
      height: item.height,
      value: value
    }
  })
  return printContent
}
/**
 * braid-tabel类型的模板转换成html
 * @param columns 表格列配置信息
 * @param data 表格数据
 */
export const tableTempTohtml = (columns, data, style, tableConfig) => {
  // 表格全局样式
  let styleStr = 'text-align:' + style.Alignment + ';'
  styleStr += 'font-size:' + style.FontSize + 'pt;'
  styleStr += 'color:' + style.FontColor + ';'


  let html = '<style> table td,table th {word-break: break-all;box-sizing:border-box;border:1px solid ' + style.BorderColor + '}</style>'
  html += '<table border=1 width=\'100%\' cellspacing=\'0\' frame="box" cellpadding=\'2\' style=\'border-collapse:collapse;' + styleStr + '\' bordercolor=\'' + style.BorderColor + '\'>'
  // 解析表头
  html += '<thead><tr>'
  columns.forEach(column => {
    if (column.widthPercent) {
      html += '<th width="'+column.widthPercent+'">'
    } else {
      html += '<th>'
    }
    html += column.title
    html += '</th>'
  })

  html += '</tr></thead>'
  html += '<tbody>'
  // 解析内容
  if (Array.isArray(data)) {
    data.forEach((item, idx) => {

      html += '<tr>'
      columns.forEach(column => {
        if (column.name === '_seq') {
          html += '<td>'
          html += (idx + 1)
        } else {
          html += '<td>'
          html += item[column.name]
        }
        html += '</td>'
      })
      html += '</tr>'
    })
  }
  // 解析表尾
  if (tableConfig.showFooter) {
    html += '<tr>'
    tableConfig.lastTrConfig.forEach((config) => {
      if (config.tdata) {
        html += `<td><font tdata="${config.tdata}" format="${config.format}">##</font></td>`
      } else {
        html += `<td>${config.content}</td>`
      }
    })
    html += '</tr>'
  }
  html += '</tbody>'
  html += '</table>'
  return html
}

/**
 * braid-image类型的模板转换成html
 * @param value 图片相对地址
 */
export const imageTempTohtml = (value) => {

  let html = '<img style=\'width:100%\' src=\'' + value + '\'/>'

  return html
}

/**
 * 将字符串模板中{}内的内容替换成指定值
 * @param str 表格列配置信息
 * @param value 表格数据
 */
export const strTempToValue = (str, value) => {
  let reg = /({[^}^{]*})/g
  return str.replace(reg, value || '')
}
/**
 * 获取嵌套对象中的值
 *
 * 该函数通过一个字符串路径来访问嵌套对象的深层属性。路径中的每个点（.）表示一个嵌套级别
 * 例如，对于对象 {a: {b: {c: 42}})，路径 'a.b.c' 将返回值 42
 *
 * @param {Object} obj - 被查询的嵌套对象
 * @param {string} path - 访问嵌套属性的字符串路径
 * @returns {any} - 路径指向的值，如果路径不存在或对象为null/undefined，则返回undefined
 */
export const getNestedValue = (obj, path) => {
  // 使用点分割路径，并遍历每个部分来深入对象
  return path.split('.').reduce((o, p) => o && o[p], obj)
}
export const htmlTempTohtml = (val, style) => {
  // 表格全局样式
  let styleStr = 'text-align:' + style.Alignment + ';'
  styleStr += 'font-size:' + style.FontSize + 'pt;'
  styleStr += 'color:' + style.FontColor + ';'
  let html = '<span style=\'' + styleStr + '\'>'
  html += val
  html += '</span>'
  return html
}
/**
 * 将 Date 转化为指定格式的String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param fmt 时间格式
 * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 * (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
 */
 export const dateFormat = (fmt = 'yyyy-MM-dd hh:mm:ss') => {
  const myDate = new Date()
  var o = {
    'M+': myDate.getMonth() + 1, // 月份
    'd+': myDate.getDate(), // 日
    'h+': myDate.getHours(), // 小时
    'm+': myDate.getMinutes(), // 分
    's+': myDate.getSeconds(), // 秒
    'q+': Math.floor((myDate.getMonth() + 3) / 3), // 季度
    S: myDate.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (myDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}
/**
 * 验证IP地址合法性
 * @param ip IP地址
 */
 export const isValidIP = (ip) => {
  const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  return reg.test(ip)
}
