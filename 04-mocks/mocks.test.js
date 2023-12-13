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