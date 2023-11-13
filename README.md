# jest-crash-course
Jest Crash Course - Learn How to Test your JavaScript Application


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

- Test 
needs to be inside test block **it** or **test**

- **it(1,2)** text block syntax
1. Name of test
2. Test itself

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

- [Many Different Expects](https://jestjs.io/docs/expect)

- This test will fail

```
// Differenence between .toEqual and .toBe matcher
it("Object assigment", () =>{
    const obj = {};
    expect(obj).toBe({}); // This will fail, we should use .toEqual
})
```

- `expect(n).not.toBeTruthy();` // Not changes boolean around

- TOdo tee näistä  muistiin panot!
    - [tästä](https://www.youtube.com/watch?v=ajiAl5UNzBU)

ja myöhemmin [tästä](https://www.youtube.com/playlist?list=PLmZPx_9ZF_sB7aBEa4UV8qX3Oi3tBElpN)



## Async testing

- Installing axios `npm install axios`
- We are writing test such **asynch** method

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

