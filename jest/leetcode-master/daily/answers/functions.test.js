const functions = require('./functions');


test('test findKth function', () => {
    expect(functions.findMedianSortedArrays([1,2,5],[6,7,8])).toBe(5.5);
    expect(functions.findMedianSortedArrays([1,3],[2])).toBe(2);
    expect(functions.findMedianSortedArrays([1],[])).toBe(1);
    expect(functions.findMedianSortedArrays([1,1,1,1,1],[2])).toBe(1);
    expect(functions.findMedianSortedArrays([1,2,3,8,9,10],[8])).toBe(8);
});

test('test longestCommonPrefix function', () => {
    expect(functions.longestCommonPrefix(['abc','abcae'])).toBe('abc');
    expect(functions.longestCommonPrefix(['flower','flow',"flight"])).toBe('fl');
    expect(functions.longestCommonPrefix(['dog','dgo','go'])).not.toBe('abc');          // not to be 
    expect(functions.longestCommonPrefix(['eeeeee','e',''])).toBe('');
    expect(functions.longestCommonPrefix(['efg'])).toBe('efg');
});

test('test letter combinations function', () => {
    expect(functions.letterCombinations('23')).toStrictEqual(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf']);
    expect(functions.letterCombinations('4')).toStrictEqual(['g', 'h', 'i']);       // use strict equal for reference type (eg: array)
    // 4: ghi    7: pqrs     8: tuv
    expect(functions.letterCombinations('478')).toStrictEqual(['gpt','gpu','gpv','gqt','gqu','gqv','grt','gru','grv','gst',
    'gsu','gsv','hpt','hpu','hpv','hqt','hqu','hqv','hrt','hru','hrv','hst','hsu','hsv','ipt','ipu','ipv',
    'iqt','iqu','iqv','irt','iru','irv','ist','isu','isv']);
    // 3: def    2: abc
    expect(functions.letterCombinations('32')).toStrictEqual(['da', 'db', 'dc', 'ea', 'eb', 'ec', 'fa', 'fb', 'fc']);
    expect(functions.letterCombinations('9')).toStrictEqual(['w','x','y','z']);
});

test('test spiral order function', () => {
    expect(functions.spiralOrder([
        [1,2,3],
        [4,5,6],
        [7,8,9]
    ])).toStrictEqual([1,2,3,6,9,8,7,4,5]);
    expect(functions.spiralOrder([
        [1,2],
        [3,4],
        [5,6]
    ])).toStrictEqual([1,2,4,6,5,3]);
    expect(functions.spiralOrder([
        [1,2,3,4,5,6]
    ])).toStrictEqual([1,2,3,4,5,6]);
    expect(functions.spiralOrder([
        [1,2,3,4],
        [4,3,2,1]
    ])).toStrictEqual([1,2,3,4,1,2,3,4]);
    expect(functions.spiralOrder([
        [3,5,6,7],
        [7,5,4,2],
        [1,1,1,8]
    ])).toStrictEqual([3,5,6,7,2,8,1,1,1,7,5,4]);
});

test('test canCompleteCirecuit function', () => {
    expect(functions.canCompleteCircuit([1,2,3,4,5],[3,4,5,1,2])).toBe(3);
    expect(functions.canCompleteCircuit([2,3,4],[3,4,3])).toBe(-1);
    expect(functions.canCompleteCircuit([1,2,3,4],[3,4,4,1,2])).toBe(-1);
    expect(functions.canCompleteCircuit([2,3,4],[2,4,3])).toBe(2);
    expect(functions.canCompleteCircuit([2,3,4,5],[2,3,4,5])).toBe(0);
});

test('test findDisappearNumbers function', () => {
    expect(functions.findDisappearedNumbers([4,3,2,7,8,2,3,1])).toStrictEqual([5,6]);
    expect(functions.findDisappearedNumbers([6,5,5,5,3,1])).toStrictEqual([2,4]);
    expect(functions.findDisappearedNumbers([1,1])).toStrictEqual([2]);
    expect(functions.findDisappearedNumbers([1,3,1])).toStrictEqual([2]);
    expect(functions.findDisappearedNumbers([4,2,2,4])).toStrictEqual([1,3]);
});

test('test findLHS function', () => {
    expect(functions.findLHS([1,3,2,2,5,2,3,7])).toBe(5);
    expect(functions.findLHS([1,3,2,2,5,2,3,7,2])).toBe(6);
    expect(functions.findLHS([2,3,2,2,5,2,3,7,2])).toBe(7);
    expect(functions.findLHS([1,3,2])).toBe(2);
    expect(functions.findLHS([1,1,2])).toBe(3);
});

test('test countSubstrings function', () => {
    expect(functions.countSubstrings("abc")).toBe(3);
    expect(functions.countSubstrings("aaa")).toBe(6);
    expect(functions.countSubstrings("abcd")).toBe(4);
    expect(functions.countSubstrings("abba")).toBe(6);
    expect(functions.countSubstrings("abcdedcba")).toBe(13);
});

test('test dailyTemperatures function', () => {
    expect(functions.dailyTemperatures([73,74,75,71,69,72,76,73])).toStrictEqual([1,1,4,2,1,1,0,0]);
    expect(functions.dailyTemperatures([73])).toStrictEqual([0]);
    expect(functions.dailyTemperatures([74,73,72])).toStrictEqual([0,0,0]);
    expect(functions.dailyTemperatures([73,74,75])).toStrictEqual([1,1,0]);
    expect(functions.dailyTemperatures([71,69,72,76])).toStrictEqual([2,1,1,0]);
})

test('test nextGreatestLetter function', () => {
    expect(functions.nextGreatestLetter(['c','f','j'],'a')).toBe('c');
    expect(functions.nextGreatestLetter(['c','f','j'],'c')).toBe('f');
    expect(functions.nextGreatestLetter(['c','f','j'],'d')).toBe('f');
    expect(functions.nextGreatestLetter(['a','b','c'],'z')).toBe('a');
    expect(functions.nextGreatestLetter(['a','b'],'c')).toBe('a');
})