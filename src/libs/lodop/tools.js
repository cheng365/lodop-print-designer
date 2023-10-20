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
export const tableTempTohtml = (columns, data, style) => {

  // 表格全局样式
  let styleStr = 'text-align:' + style.Alignment + ';'
  styleStr += 'font-size:' + style.FontSize + 'pt;'
  styleStr += 'color:' + style.FontColor + ';'


  let html = '<style> table td,table th {word-break: break-all;box-sizing:border-box;border:1px solid ' + style.BorderColor + '}</style>'
  html += '<table border=1 width=\'100%\' cellspacing=\'0\' frame="box" cellpadding=\'2\' style=\'border-collapse:collapse;' + styleStr + '\' bordercolor=\'' + style.BorderColor + '\'>'
  // 解析表头
  html += '<thead><tr>'
  columns.forEach(column => {

    if (column.name === '_seq') { // 序号列
      html += '<th width="30">'
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
export const htmlTempTohtml = (val, style) => {
  // 表格全局样式
  let styleStr = 'text-align:' + style.Alignment + ';'
  styleStr += 'font-size:' + style.FontSize + 'pt;'
  styleStr += 'color:' + style.FontColor + ';'
  let html = '<span style=\'' + styleStr + '\'>'
  html += val
  html += '</span>'
  // console.log(html)
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
