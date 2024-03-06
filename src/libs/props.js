export const getDefaultProps = () => ({
  uuid: "",
  type: "braid-txt",
  name: "",
  isEdit: true,
  dragable: true, // 是否可拖拽
  resizable: true, // 尺寸是否可变
  width: 120,
  height: 40,
  left: 50,
  top: 0,
  value: "自定义文本",
  title: "自定义文本",
  defaultValue: "自定义文本",
  style: { zIndex: 1 }
});

export const getCodeTypeArray = () => [
  "128A",
  "128B",
  "128C",
  "128Auto",
  "EAN8",
  "EAN13",
  "EAN128A",
  "EAN128B",
  "EAN128C",
  "Code39",
  "39Extended",
  "2_5interleaved",
  "2_5industrial",
  "2_5matrix",
  "UPC_A",
  "UPC_E0",
  "UPC_E1",
  "UPCsupp2",
  "UPCsupp5",
  "Code93",
  "93Extended",
  "MSI",
  "PostNet",
  "Codabar",
  "QRCode",
  "PDF417"
];

export const getItemTypeArray = () => [
  { label: "普通项", value: 0 },
  { label: "页眉页脚", value: 1 },
  { label: "页号项", value: 2 },
  { label: "页数项", value: 3 },
  { label: "多页项", value: 4 }
];

export const getLineStyle = () => [
  { label: "实线", value: 0, type: "solid" },
  { label: "虚线", value: 2, type: "dashed" }
];

export const getStatisticType = () => [
  { label: "求和", value: 'Sum' },
  { label: "最大值", value: 'AllMax' },
  { label: "最小值", value: 'AllMin' },
];
export const getFormatType = () => [
  { label: "0", value: '0' },
  { label: "0.00", value: '0.00' },
  { label: "#.##", value: '#.##' },
  { label: "#,##0.00", value: '#,##0.00' },
  { label: "0.000E+00", value: '0.000E+00' },
  { label: "大写金额", value: 'UpperMoney' },
  { label: "中文数字", value: 'ChineseNum' },
];
