// 1. Function Declaration

function addNumbers(num1, num2) {
    return num1 + num2;
}
const sum = addNumbers(10, 20);
console.log("Sum =", sum);


// 2. Function with Parameters & Return Value

function calculateArea(length, width) {
    return length * width;
}
const length = 10;
const width = 5;
const area = calculateArea(length, width);
console.log("Length =", length);
console.log("Width =", width);
console.log("Area =", area);


// 3. Function Expression
const greetUser = function(name) {
    return "Welcome " + name + "!";
};
console.log(greetUser("John"));

// 4. Arrow Function - Basic
const multiplyNumbers = (num1, num2) => {
    return num1 * num2;
};
console.log("Result =", multiplyNumbers(4, 5));


// 5. Arrow Function - Multiple Parameters

const getUserInfo = (name, age) => {
    return name + " is " + age + " years old";
};
console.log(getUserInfo("John", 25));

// 6. Arrow Function with Array

const numbers = [10, 20, 30, 40, 50];
const calculateTotal = (numbers) => {
    let total = 0;

    numbers.forEach((number) => {
        total = total + number;
    });

    return total;
};
console.log("Total =", calculateTotal(numbers));


// Users array used for map(), filter(), find() and forEach()

const users = [
    { name: "John", age: 25 },
    { name: "David", age: 30 },
    { name: "Sam", age: 20 }
];

// 7. map() with Arrow Function

const userNames = users.map((user) => {      //map() creates a new array by transforming each element.
    return user.name;
});
console.log(userNames);


// 8. filter() with Arrow Function

const olderUsers = users.filter((user) => {      // filter() creates a new array containing only elements that satisfy the condition.
    return user.age > 25;
});

console.log(olderUsers);

// 9. find() with Arrow Function

const userDavid = users.find((user) => {     //find() returns the first element that satisfies the condition.
    return user.name === "David";
});

console.log(userDavid);

// 10. forEach() with Arrow Function

users.forEach((user) => {                      //forEach() executes a function for every element.
    console.log(user.name + " - " + user.age);
});

// 11. Callback Function

const processUser = (name, callback) => {         
    callback(name);                                //Pass a function to another function
};
processUser("John", (name) => {
    console.log("Processing user:", name);
});

// 12. Promise

const userDataPromise = new Promise((resolve) => {      //A Promise represents a value that may be available now,later, or may fail.

    setTimeout(() => {
        resolve("User data received successfully");
    }, 2000);

});

// 13. Async/Await

const getUser = async () => {

    try {
        console.log("Fetching user data...");

        const result = await userDataPromise;

        console.log(result);

    } catch (error) {
        console.log("Error:", error);
    }
};

getUser();