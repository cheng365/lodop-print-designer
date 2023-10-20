const fs = require( 'fs' )

const needCopyFile = [
  {
    sourceFile: './package.json',
    targetFile: './lodop-print-designer/package.json'
  },
  {
    sourceFile: './README.md',
    targetFile: './lodop-print-designer/README.md'
  }
]

for (const item of needCopyFile) {
  fs.copyFile(item.sourceFile, item.targetFile, function(err) {
    if(err) {
      console.log('something wrong was happened')
    } else {
      console.log(item.sourceFile + ' copy file succeed')
    }
  })
}
