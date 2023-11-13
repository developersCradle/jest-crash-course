const sum = require("./sum");

    // Test needs to be inside test block it or test
    it("Should add 1 + 2 to equal 3", () => {
        const result = sum(1,2);
        expect(result).toBe(3);
    });


    // Differenence between .toEqual and .toBe matcher
    it("Object assigment", () => {
        const obj = {};
        // expect(obj).toBe({}); //This would fail
        expect(obj).toEqual({});
    });


    
    describe("Truthy or Falsey", () => {
        it('Null', () => {
            const n = null;
            expect(n).toBeNull();
            expect(n).toBeDefined();
            expect(n).not.toBeUndefined();
            expect(n).not.toBeTruthy();  // Not changes boolean arround
            expect(n).toBeFalsy(); // Null value default to false, so test will pass
        });

    });

    describe("Numbers", () => {
        it('Two plus two', () => {
            const value = 2 + 2;
            expect(value).toBe(4);
            expect(value).toBeGreaterThan(3);
            expect(value).toBeGreaterThanOrEqual(3.5);
            expect(value).toBeLessThan(5);
            expect(value).toBeLessThanOrEqual(4.5);
        
            // toBe and toEqual are equivalent for numbers
            expect(value).toBe(4);
            expect(value).toEqual(4);

        });

        it('Adding floats/decimals', () => {
            const value = 0.1 + 0.2;
            expect(value).toBeCloseTo(0.29999);// Will pass
            // expect(value).toBeCloseTo(0.28999);// Will not pass, some variation 
        });
    });

    
    describe("Numbers", () => {
        it('there is no I in team', () => {
            expect('team').not.toMatch(/I/); //Regular expression
        });

        it('but there is a "stop" in Christoph', () => {
            expect('Christoph').toMatch(/stop/);
        });
    });


    describe("Arrays", () => {
        const shoppingList = [
            'diapers',
            'kleenex',
            'trash bags',
            'paper towels',
            'milk',
        ];

        it('the shopping list has milk on it', () => {
            expect(shoppingList).toContain('milk');
            expect(new Set(shoppingList)).toContain('milk');
        });
    });



    describe("Exceptions", () => {
        function compileAndroidCode() {
            throw new Error('you are using the wrong JDK');
        }

        it('compiling android goes as expected', () => {
            expect(() => compileAndroidCode()).toThrow();
            expect(() => compileAndroidCode()).toThrow(
                Error
            );

            // You can also use the exact error message or a regexp
            expect(() => compileAndroidCode()).toThrow(
                'you are using the wrong JDK'
            );
            expect(() => compileAndroidCode()).toThrow(
                /JDK/
            );
        });
    });
