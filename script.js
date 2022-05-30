let num = 266219;
let nums = num.toString().split("");
console.log(nums);
let multi = nums.reduce((total, amount) => total * amount);
console.log(multi);
console.log((multi ** 3).toString().slice(0, 2));
