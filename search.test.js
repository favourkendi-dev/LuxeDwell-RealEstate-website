// 1. Import the logic from your index.js
// This works because of the module.exports we added to index.js
const { properties, filterProperties } = require('./index.js');

describe('LuxeDwell Search Logic', () => {

    // TEST 1: Check if the search is case-insensitive
    test('Should find "Westlands" regardless of capital letters', () => {
        const mockData = [
            { title: "Villa A", location: "Westlands" },
            { title: "Villa B", location: "Karen" }
        ];
        
        const results = filterProperties(mockData, "WESTLANDS");
        
        expect(results.length).toBe(1);
        expect(results[0].title).toBe("Villa A");
    });

    // TEST 2: Check if it handles empty searches
    test('Should return all properties if search term is empty', () => {
        const mockData = [{ location: "A" }, { location: "B" }];
        const results = filterProperties(mockData, "");
        
        expect(results.length).toBe(2);
    });

    // TEST 3: Check your REAL data (the properties array in index.js)
    test('Real properties array should have at least one luxury home', () => {
        expect(properties.length).toBeGreaterThan(0);
        expect(properties[0]).toHaveProperty('location');
    });

});