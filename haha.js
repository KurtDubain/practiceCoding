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

// function countLines(str) {
//   return str.split("\\n").length;
// }

// const pl0Code =
//   "var i, sum;\\r\\nbegin\\r\\n    sum := 0;\\r\\n    for i := 1 to 5 do\\r\\n        begin\\r\\n            sum := sum + i;\\r\\n            write sum;\\r\\n        end;\\r\\n    end;\\r\\nend.";
// console.log(countLines(pl0Code));
function formatAST(node, depth = 0) {
  let output = "";
  const indent = "|  ".repeat(depth);
  output += `${indent}${node.type}`;

  if (node.name) {
    output += `: ${node.name}`;
  }

  if (node.value) {
    output += `: ${node.value}`;
  }

  output += "\n";

  if (node.children) {
    node.children.forEach((child) => {
      output += formatAST(child, depth + 1);
    });
  }

  if (node.statements) {
    node.statements.forEach((statement) => {
      output += formatAST(statement, depth + 1);
    });
  }

  if (node.expression) {
    output += `${indent}|— Expression\n`;
    output += formatAST(node.expression, depth + 2);
  }

  if (node.condition) {
    output += `${indent}|— Condition\n`;
    output += formatAST(node.condition, depth + 2);
  }

  if (node.thenStatement) {
    output += `${indent}|— ThenStatement\n`;
    output += formatAST(node.thenStatement, depth + 2);
  }

  if (node.elseIfStatement) {
    node.elseIfStatement.forEach((elseif, index) => {
      output += `${indent}|— ElseIfStatement ${index + 1}\n`;
      output += formatAST(elseif, depth + 2);
    });
  }

  if (node.elseStatement) {
    output += `${indent}|— ElseStatement\n`;
    output += formatAST(node.elseStatement, depth + 2);
  }

  return output;
}

// 使用示例
const ast = {
  type: "Program",
  children: [
    {
      type: "Block",
      children: [
        {
          type: "Declaration",
          children: [{ type: "VarDeclaration", name: "x", line: 1 }],
          line: 2,
        },
        {
          type: "BeginEndBlock",
          statements: [
            {
              type: "AssignmentStatement",
              identifier: "x",
              expression: { type: "Literal", value: "7", line: 3 },
              line: 3,
            },
            {
              type: "IfStatement",
              condition: {
                type: "BinaryExpression",
                operator: ">",
                left: { type: "Identifier", name: "x", line: 4 },
                right: { type: "Literal", value: "10", line: 4 },
                line: 4,
              },
              thenStatement: {
                type: "BeginEndBlock",
                statements: [
                  {
                    type: "AssignmentStatement",
                    identifier: "x",
                    expression: {
                      type: "BinaryExpression",
                      operator: "+",
                      left: { type: "Identifier", name: "x", line: 6 },
                      right: { type: "Literal", value: "1", line: 6 },
                      line: 6,
                    },
                    line: 6,
                  },
                  {
                    type: "WriteStatement",
                    expression: { type: "Identifier", name: "x", line: 7 },
                    line: 7,
                  },
                ],
                line: 6,
              },
              elseIfStatement: [
                {
                  condition: {
                    type: "BinaryExpression",
                    operator: "=",
                    left: { type: "Identifier", name: "x", line: 9 },
                    right: { type: "Literal", value: "5", line: 9 },
                    line: 9,
                  },
                  thenStatement: {
                    type: "WriteStatement",
                    expression: { type: "Identifier", name: "x", line: 10 },
                    line: 10,
                  },
                },
                {
                  condition: {
                    type: "BinaryExpression",
                    operator: "<",
                    left: { type: "Identifier", name: "x", line: 11 },
                    right: { type: "Literal", value: "10", line: 11 },
                    line: 11,
                  },
                  thenStatement: {
                    type: "BeginEndBlock",
                    statements: [
                      {
                        type: "AssignmentStatement",
                        identifier: "x",
                        expression: {
                          type: "BinaryExpression",
                          operator: "-",
                          left: { type: "Identifier", name: "x", line: 13 },
                          right: { type: "Literal", value: "1", line: 13 },
                          line: 13,
                        },
                        line: 13,
                      },
                      {
                        type: "WriteStatement",
                        expression: { type: "Identifier", name: "x", line: 14 },
                        line: 14,
                      },
                    ],
                    line: 13,
                  },
                },
              ],
              elseStatement: {
                type: "BeginEndBlock",
                statements: [
                  {
                    type: "AssignmentStatement",
                    identifier: "x",
                    expression: {
                      type: "BinaryExpression",
                      operator: "*",
                      left: { type: "Identifier", name: "x", line: 18 },
                      right: { type: "Identifier", name: "x", line: 18 },
                      line: 18,
                    },
                    line: 18,
                  },
                  {
                    type: "WriteStatement",
                    expression: { type: "Identifier", name: "x", line: 19 },
                    line: 19,
                  },
                ],
                line: 18,
              },
              line: 5,
            },
          ],
          line: 3,
        },
      ],
      line: 22,
    },
  ],
  line: 22,
};

console.log(formatAST(ast));
