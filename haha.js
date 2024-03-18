// function format(str) {
//   // 按照回车分割字符串为行数组
//   const lines = str.trim().split("\n");
//   // 遍历每一行，按照空格分割数字并转换为整数
//   const result = lines.map((line) => {
//     // 使用正则表达式匹配每行中的数字，并将其转换为整数
//     const numbers = line.trim().match(/\d+/g);
//     if (numbers) {
//       return numbers.map((num) => parseInt(num, 10));
//     } else {
//       return [];
//     }
//   });
//   return result;
// }

// let str = `
// 1 2 4342       3  4 5
// 23 4
//     1 4    5
// `;

// console.log(format(str));
