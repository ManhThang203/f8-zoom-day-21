// Create Foreach 2 function
console.log("========== Create Foreach 2 function ==========")
Array.prototype.forEach2 = function(cb,thisArg) {
    const length = this.length;
    for(let i = 0; i < length;i++){
        if(i in this){
            // thisArg to be {id:123}
            if(thisArg !== undefined){
                cb.call(thisArg,this[i],i,this);
            }
            else{
                cb(this[i],i,this);
            }
        }
    }
}

// For example 1
console.log("========== For example 1 ==========");
const colors = ["Red","Green","Blue"];
colors.forEach2(function(color,index,arr){
    console.log(color,index,arr);
    console.log(this);
},{id:123})

// For example 2
console.log("========== For example 2 ==========");
const sparseArr = [1, , 3]; 
sparseArr.forEach2(function(value, index){
    console.log(`Value: ${value}, Index: ${index}`);
});

// For example 3 
console.log("========== For example 3 ==========");
const numbers = [10,20,30];
numbers.forEach2(function(number){
    console.log(`số ${number} nhân với ${this.multiplier} = ${number * this.multiplier}`);
},{multiplier: 5})

// For example 4

const obj = {
    numbers: [1,2,3],
    add(number){
        // this to be obj
        this.numbers.push(number);
    },
    // numbers to be  [6,7,8]
    import(numbers){
        // this.add to be obj.add 
        // this top be obj
        // method 1 
        numbers.forEach2(this.add,this);
        // method 2
        // where is arrow function no function call but depends on the context of the function
        // this live import là obj
        //  numbers.forEach((number) => this.add(number));
    }
}


obj.add(4);
obj.add(5);
obj.import([6,7,8]);

console.log(obj.numbers);

// Create Find()2 function
console.log("========== Create Find 2 function ==========")
Array.prototype.find2 = function(cb,thisArg) {
    const length = this.length;
    for(let i = 0; i < length;i++){
        if(i in this){
            if(cb.call(thisArg,this[i],i,this)){
                return this[i];
            }
        }
    }
    return undefined;
}

console.log("========== For example 1 ==========");
const arr = [1, 2, 3, 4, 5];
const result = arr.find2((value, index, array) => {
    return value % 3 === 0;
});

console.log(result); // 3

console.log("========== For example 2 ==========");
const thresholdObj = { threshold: 4 };
const resultWithThisArg = arr.find2(function(value) {
    return value > this.threshold;
}, thresholdObj);

console.log(resultWithThisArg); // 5

console.log("========== For example 3 ==========");
const numberArr = [1, , 3]; // Có phần tử trống
const sparseResult = numberArr.find2((value) => value > 2);

console.log(sparseResult); // 3

// Create findIndex2 function
console.log("========== Create findIndex 2 function ==========")

Array.prototype.findIndex2 = function(callback, thisArg) {
    const length = this.length;
    for(let i = 0; i < length; i++){
        if(i in this){
            if(callback.call(thisArg,this[i],i,this)){
                return i;
            }
        }
    }
    return -1;
};

console.log("========== For example 1 ==========");
const arr2 = [1, 2, 3, 4, 5];

const index = arr2.findIndex2((value, index, array) => {
    return value % 3 === 0;
});

console.log(index); // 2

console.log("========== For example 2 ==========");
const thresholdObj1 = { threshold: 4 };
const indexWithThisArg = arr.findIndex2(function(value) {
    return value > this.threshold;
}, thresholdObj1);

console.log(indexWithThisArg); // 4

console.log("========== For example 3 ==========");
const sparseArr1 = [1, , 3];
const sparseIndex = sparseArr1.findIndex2((value) => value > 2);

console.log(sparseIndex); // 2

// Create  filter2  function
console.log("========== Create  filter2  function ==========")

Array.prototype.filter2 = function(callback, thisArg) {
    const length = this.length;
    const arr = [];
    for(let i = 0;i < length; i++){
        if(i in this){
            if(callback.call(thisArg,this[i], i, this)){
                arr.push(this[i]);
            }
        }
    }
    return arr;
};

console.log("========== For example 1 ==========");
const arr3 = [1, 2, 3, 4, 5];
const result1 = arr.filter2((value) => {
    return value % 2 !== 0;
});

console.log(result1); // [1, 3, 5]

console.log("========== For example 2 ==========");
let products = [
  { name: "laptop", price: 1000, stock: 4 },
  { name: "phone", price: 500, stock: 10 },
  { name: "tablet", price: 700, stock: 0 }
];
let result2 = products.filter2(p => p.price <= 800 && p.stock > 0);

console.log(result2);

console.log("========== For example 3 ==========");

let items = [
  "apple",
  "banana",
  "apple",
  "orange",
  "banana",
  "orange"
];
let result3 = items.filter2((item, index, array) => {
  return array.indexOf(item) === index;
});

console.log(result3);



// Create map2 function
console.log("========== Create map 2 function ==========")
Array.prototype.map2 = function (callback, thisArg) {
      const length = this.length;
      const arr = new Array(length);
      for(let i = 0; i < length; i++){
        if(i in this){
            arr[i] = callback.call(thisArg, this[i], i, this);
        } 
      }
      return arr;
};

// Sample usage

console.log("========== For example 1 ==========");
const arr1 = [1, 2, 3, 4, 5];
const result4 = arr1.map2((value) => value * 2);

console.log(result4); // [2, 4, 6, 8, 10]
console.log(result4.length); // 5

console.log("========== For example 2 ==========");
const arr4 = [1, , , , 5]; // Có phần tử trống
const result5 = arr4.map2((value) => value * 2);

console.log(result5); // [2, empty, empty, empty, 10]
console.log(result5.length); // 5

console.log("========== For example 3 ==========");
const prices = [100, 150, 200];
const taxRate = 0.1; // 10%

const resul6 = prices.map2(price => price + price * taxRate);

console.log(resul6);


// Create every2 function
console.log("========== Create every 2 function ==========")
Array.prototype.every2 = function(callback, thisArg) {
    const length = this.length;
    for(let i = 0; i < length; i++){
        if(i in this){
            // !true khác true
            if(!callback.call(thisArg, this[i],i,this)){
                return false;
            }
        }
    }
    return true;
}
console.log("========== For example 1 ==========");
const ages = [18, 20, 30, 40];

// Kiểm tra toàn bộ phần tử có từ 18 trở lên không
const result6 = ages.every2(age => age >= 18);

console.log(result6);

console.log("========== For example 2 ==========");
const products1 = [
  { name: "Apple", stock: 10 },
  { name: "Cherry", stock: 5 },
  { name: "Banana", stock: 0 }
];

const result7 = products1.every2(product => product.stock > 0);

console.log(result7);

console.log("========== For example 3 ==========");
const members = [
  { name: "Bob", age: 10 },
  { name: "John", age: 20 },
  { name: "Alice", age: 18 }
];

const result8 = members.every2(member => member.age >= 18);

console.log(result8);


// Create some2 function
console.log("========== Create some 2 function ==========")
Array.prototype.some2 = function(callback, thisArg) {
    const length = this.length;
    for(let i = 0; i < length; i++){
        if(i in this){
            // true
            if(callback.call(thisArg, this[i],i,this)){
                return true;
            }
        }
    }
    return false;
}
console.log("========== For example 1 ==========");
const numbers1 = [1, 5, 2, 7, 8, 10];

// Kiểm tra trong mảng có chứa số chẵn không
const result9 = numbers1.some2(number => number % 2 === 0);

console.log(result9);

console.log("========== For example 2 ==========");
const students = [
  { name: 'John', score: 55 },
  { name: 'Bob', score: 80 },
  { name: 'Alice', score: 45 }
];

const result10 = students.some2(student=> student.score >= 60);

console.log(result10);

console.log("========== For example 3 ==========");
const products2 = [
  { name: 'Tablet', stock: 10 },
  { name: 'Laptop', stock: 0 },
  { name: 'Phone', stock: 5 }
];

const result11 = products2.some2(product => product.stock === 0);

console.log(result11);


console.log("========== Create reduce 2 function ==========")
Array.prototype.reduce2 = function(cb, initialValue) {
    const length = this.length;
    // initialValue to be undefined , null -> this[0];
    // initialValue != undefined , null -> initialValue
    let accValue = initialValue ?? this[0];
    let startIndex = initialValue !== undefined ? 0 : 1;
    for(let i = startIndex; i < length ; i++){
        if(i in this){
            accValue = cb(accValue,this[i],i,this);
        }
    }
    return accValue;
}

console.log("========== For example 1 ==========");
const numbers2 = [1, 2, 3, 4];
const sum = numbers2.reduce2((total, number, index, arr) => {
    console.log(`Index ${index}: total = ${total}, number = ${number}`);
    return total + number;
}, 0); // initialValue là 0

console.log(sum); // Kết quả: 10


console.log("========== For example 2 ==========");
const products3 = [
  { name: "iPhone", price: 100 },
  { name: "iPad", price: 200 },
  { name: "Macbook", price: 300 }
];

const total = products3.reduce((sum, product) => {
  return sum + product.price;
}, 0);

console.log(total);

console.log("========== For example 3 ==========");
const items1 = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];

const count = items1.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1;
  return acc;
}, {});

console.log(count);


// Create reverse2 function
console.log("========== Create reverse 2 function ==========");
// const numbers = [1, 2, 3, 4, 5];
// for(let i = 0; i < Math.floor(numbers.length/2); i++) {
//   [numbers[i], numbers[numbers.length-1-i]] = [numbers[numbers.length-1-i], numbers[i]]
// }