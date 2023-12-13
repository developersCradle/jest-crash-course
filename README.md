# Jest Crash Course

<hr>

<p align="center">
   <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*PTXpH1wEwDViGKBj24DqUA.gif" alt="alt text" width="400"/>
</p>

<hr>

[Soruce](https://www.youtube.com/watch?v=ajiAl5UNzBU)

Jest Crash Course - Learn How to Test your JavaScript Application by Laith Academy


### TODO

- Todo go thought [Library](https://www.youtube.com/playlist?list=PLmZPx_9ZF_sB7aBEa4UV8qX3Oi3tBElpN)

### Video Progress

- [x] [Section 1](#section-1---matcher-methodsMethods) - Matcher Methods
- [x] [Section 2](#section-2----async-functions) - Async Functions
- [x] [Section 3](#) - Setting Up & Tearing Down Test
- [x] [Section 4](#) - Mocks



## Section 1 - Matcher Methods

- [Jest Homepage](https://jestjs.io/)

- Installing Jest

`npm install --save-dev jest`
`npm init -y`

- Combination with manual and automation test is recommended

- Nam of the test is the same as the thing that being tested, expect `.test` is added to the end

### Sum.js
```
function sum(num1, num2) {
    return num1 + num2;
}
```
### sum.test.js
```

const sum = require("./sum")

// Test needs to be inside test block it or test
it("Should add 1 + 2 to equal 3", () => {
    const result = sum(1,2);
    expect(result).toBe(3);
})


```

- Test needs to be inside test block **it** or **test**

- **it(1,2)** text block syntax
1. Name of test itself

- `expect(result).` expect is assertion 
- Matcher `.toBe()`, there is many other matchers!
    - Example using matcher ` expect(result).toBe(3);`


- To make test run locally, change the following

```
    scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

- To 

```
scripts": {
    "test": "jest"
  },
```

- Running test `npm run test`

- We can group different test together inside test group called `describe` block

```
describe("Some test grouping", () => {

})
```

- **.toEqual** // To compare objects or arrays
- **.toBe** // To compare primitives 

- [Many different expects](https://jestjs.io/docs/expect)

- This test will fail

```
// Differenence between .toEqual and .toBe matcher
it("Object assigment", () =>{
    const obj = {};
    expect(obj).toBe({}); // This will fail, we should use .toEqual
})
```

- `expect(n).not.toBeTruthy();` // Not changes boolean around


## Section 2 -  Async Functions

- Installing axios `npm install axios`
- We are writing test such **asynch** method

```

const fetchData = (id) => {
	const results = axios.get(
		`https://jsonplaceholder.typicode.com/todos/${id}`
	);
	return results;
};

console.log(fetchData());


module.export = fetchData;
```

- This will return to error, since we should be testing asynchronous functions

```
const axios = require('axios');

const fetchData = async (id) => {
	const results = await axios.get(
		`https://jsonplaceholder.typicode.com/todos/${id}`
	);
    console.log(results);
	return results.data;
};

fetchData(1);

module.exports = fetchData;
```

- We can test async in such way, where we add `.then` after test

```
it('should return correct todo', () => {
	fetchData(1).then((todo) => {
		expect(todo.id).toBe(1);
	});
});

```

- Better and prettier way to write such would be using `await`

```
it('should return correct todo', async () => {
	const todo = await fetchData(1);
	expect(todo.id).toBe(1);
});
```

### Section 3 - Section Setup & Teardown 


- Testing arrays

```
let animals = [
	'elephant',
	'zebra',
	'bear',
	'tiger',
];

beforeEach(() => {
	animals = [
		'elephant',
		'zebra',
		'bear',
		'tiger',
	];
});

describe('animals array', () => {
	it('should add animal to end of array', () => {
		animals.push('aligator');
		expect(animals[animals.length - 1]).toBe(
			'aligator'
		);
	});

	it('should add animal to beginning of array', () => {
		animals.unshift('monkey');
		expect(animals[0]).toBe('monkey');
	});

	it('should have initial length of 4', () => {
		expect(animals.length).toBe(4);
	});
});
```

- The last one will fail, since two tests before it will modify the test array

- `beforeEach()` Inside test block is affecting test execution of the group


### Section 4 - Mocks


- Mocks come handy when using such methods where methods output could change

```
axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`
```

- Mocking callback with **Jest** `const mockCallback = jest.fn(x => 42 + x);// Mocking fucntion from jest`

- Then we can test that `forEach([0,1], mockCallback)`


- We can mock external libraries using `spyOn` and define its behavior. For example if we don't want to use **axios** **get** call. We can add following, mocking out **axios** functionality

- One example mocking **axios** and other **functionalities**
```
jest.spyOn(axios, "get").mockReturnValueOnce({
        data : {
            id: 1, 
            todo: "Get 2m Subs"
        }
    }) // 1st(object) what we want spy on, 2nd(method) what methods we want to spy on
```

- [spyOn](https://jestjs.io/docs/jest-object#jestspyonobject-methodname)



```
const axios = require("axios");

const fetchData = async (id) => {
	const results = await axios.get(
		`https://jsonplaceholder.typicode.com/todos/${id}`
	);
	
    console.log(results);// We can look that its been Mocked
    return results.data;
};


const forEach = (items, callback) => {
    for (let i = 0; i < items.length; i++) {
        callback(items[i])
    }
}



it("mock callback", () => {
    const mockCallback = jest.fn(x => 42 + x);// Mocking fucntion from jest

    forEach([0,1], mockCallback) // calling it

    expect(mockCallback.mock.calls.length).toBe(2); // and expecting it

    expect(mockCallback.mock.calls[0][0]).toBe(0) //Expecting the first argument to be 0
    expect(mockCallback.mock.calls[1][0]).toBe(1) //Expecting the first argument to be 1

    expect(mockCallback.mock.results[0].value).toBe(42); //First iteration result value will be 42

    expect(mockCallback.mock.results[1].value).toBe(43); //First iteration result value will be 43
})

it("Mock return", () => {
    const mock = jest.fn();

    mock.mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValueOnce("Hello"); // We can just mock it to centain value
    const result = mock();
    const result2 = mock();
    const result3 = mock();

    expect(result).toBe(true);
    expect(result2).toBe(false);
    expect(result3).toBe("Hello");
})


it("mock axios", async () => {
    jest.spyOn(axios, "get").mockReturnValueOnce({
        data : {
            id: 1, 
            todo: "Get 2m Subs"
        }
    }) // 1st(object) what we want spy on, 2nd(method) what methods we want to spy on
    
    const result = await fetchData(1);

    expect(result.todo).toBe("Get 2m Subs");
})

```