require('./app');

test('capitalize word', () => {
    expect("test".capitalize()).toBe('Test')
})

test('shuffle array should not affect original array', () => {
    var original = ['one', 'two']
    var shuffled = original.shuffle()
    // Check that the original array is not changed
    expect(original).toStrictEqual(['one', 'two'])
    // Check that all the words exist in the new array, in any order
    expect(shuffled).toEqual(expect.arrayContaining(['one', 'two']))
})

test('get 2 random words', () => {
    var words = ['one', 'two', 'three', 'four']
    var randomWords = words.random(2)
    // Check that the original array is not changed
    expect(words).toStrictEqual(['one', 'two', 'three', 'four'])
    // Check that the two words exist in the original array
    expect(randomWords.length).toBe(2)
    expect(words).toEqual(expect.arrayContaining(randomWords))
});

test('get 2 random words as string', () => {
    var words = ['smerte', 'ansjos']
    var combined = words.combineAsString()
    expect(combined).toBe('Smerteansjos')
})
