// Create Foreach 2 function
console.log("========== Create Foreach 2 function ==========")
Array.prototype.forEach2 = function(cb,thisArg) {
    const length = this.length;
    for(let i = 0; i < length;i++){
        if(i in this){
            // thisArg to be {id:123}
             cb.call(thisArg,this[i],i,this);
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