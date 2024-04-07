// function generateLineMapping(pl0Code, jsCode) {
//   // 假设PL0和JS代码都是以行为单位分隔的
//   const pl0Lines = pl0Code.split("\n");
//   const jsLines = jsCode.split("\n");
//   const mapping = {};

//   // 解析JS代码中的每一行查找注释中的PL0行号
//   jsLines.forEach((line, index) => {
//     const match = line.match(/\/\/(\d+)$/);
//     if (match) {
//       const pl0Line = parseInt(match[1], 10);
//       // JS的行号是从0开始的，因此index + 1给出正确的行号
//       mapping[pl0Line] = index + 1;
//     }
//   });

//   return mapping;
// }
// function findClosestJsLine(pl0Line, lineMapping) {
//   if (lineMapping[pl0Line]) {
//     return lineMapping[pl0Line];
//   } else {
//     // 如果直接找不到，寻找最近的前一个有效行
//     let closestLine = null;
//     Object.keys(lineMapping).forEach((mappedLine) => {
//       const mappedLineInt = parseInt(mappedLine, 10);
//       if (mappedLineInt < pl0Line) {
//         closestLine = mappedLineInt;
//       }
//     });

//     return closestLine ? lineMapping[closestLine] : null;
//   }
// }

// const str1 =
//   "var x;\r\nbegin\r\n    x := 7;\r\n    if x > 10 then\r\n        begin\r\n        x := x+1;\r\n        write x;\r\n        end;\r\n    else if x = 5 then\r\n        write x;\r\n    else if x < 10 then\r\n        begin\r\n        x := x-1;\r\n        write x;\r\n        end;\r\n    else\r\n        begin\r\n        x := x*x;\r\n        write x;\r\n        end;\r\n    end;\r\nend.";
// const str2 =
//   "  let x;//1\n  x = 7;//3\nif (x > 10) {//5\n  x = x + 1;//6\n  write(x);//7\n} else if (x == 5) {//9\n  write(x);//10\n} else if (x < 10) {//11\n  x = x - 1;//13\n  write(x);//14\n} else {//18\n  x = x * x;//18\n  write(x);//19\n}//5\n";
// // console.log(generateLineMapping(str1, str2));
// const res = generateLineMapping(str1, str2);
// console.log(findClosestJsLine(19, res));

// function extractVariableNames(symbolTable) {
//   let variableNames = [];
//   for (const [key, value] of Object.entries(symbolTable)) {
//     if (value.type === "VarDeclaration") {
//       variableNames.push(key);
//     }
//     // 如果还有嵌套的符号表，可以在这里递归调用extractVariableNames
//   }
//   return variableNames;
// }
// const obj = {
//   i: { type: "VarDeclaration", value: null },
//   sum: { type: "VarDeclaration", value: null },
// };
// console.log(extractVariableNames(obj));

function countLines(str) {
  return str.split("\\n").length;
}

const pl0Code =
  "var i, sum;\\r\\nbegin\\r\\n    sum := 0;\\r\\n    for i := 1 to 5 do\\r\\n        begin\\r\\n            sum := sum + i;\\r\\n            write sum;\\r\\n        end;\\r\\n    end;\\r\\nend.";
console.log(countLines(pl0Code));
