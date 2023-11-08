// 获取UUID
export function getUUID(n = 32) {
  var str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
  var result = "";
  for (var i = 0; i < n; i++) {
    result += str[parseInt(Math.random() * str.length)];
  }
  return result;
}
// 调整表格列宽
export function resizeTableCol(tid, callback) {
  let resizeTd = null
  const table = document.getElementById(tid)
  for (const thDom of table.rows[0].cells) {
    // onmousedown 鼠标按下
    thDom.onmousedown = function (e) {
      if (this.offsetWidth - e.offsetX < 10) {
        resizeTd = this; //保存下要操作的列
        resizeTd.initClientX = e.clientX; //保存下鼠标按下时鼠标相对该单元格x方向的偏移
        resizeTd.initWidth = resizeTd.offsetWidth; //保存下该单元格的宽度
        callback && callback(resizeTd)
      }
    };

    // onmousemove 鼠标移动
    thDom.onmousemove = function () { //更改鼠标样式
      // 当前列宽度 - 鼠标相对于事件源x轴的位置
      if (this.offsetWidth - event.offsetX < 10) {
        this.style.cursor = 'col-resize'; // 表示光标所在列可以水平调整大小
      } else {
        if (!resizeTd) {
          this.style.cursor = 'default'
        }
      }
    }
  }

  // onmouseup 鼠标松开
  document.onmouseup = function () { //不需要写在上边的for循环里面
    resizeTd = null
    callback && callback(resizeTd)
  }

  // onmousemove 鼠标移动
  table.onmousemove = function (evt) {
    if (resizeTd) {
      if (resizeTd.initWidth + (evt.clientX - resizeTd.initClientX) > 0) {
        resizeTd.width = resizeTd.initWidth + (evt.clientX - resizeTd.initClientX)
        callback && callback(resizeTd)
      }
    }
  }
}
