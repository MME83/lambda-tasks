/** Function that input string and output array with all posible combinations with dots inside the chars of string 
 *  input => 'abc'
 *  output => ['abc', 'a.bc', 'ab.c', 'a.b.c']
 **/

 const { performance } = require('perf_hooks');

 // v1
 const dotsOne = (str) => {
     let result = [str[0]];
 
     for (let i = 1; i < str.length; i++) {
         const copyArray = result.slice().map((value) => value + '.');
 
         result = [...result, ...copyArray];
 
         result = result.map((value) => value + str[i]);
     };
 
     return result;
 };
 
 // v2-1 recurtion
 const dotsRecOne = (str, offset = 1, result = [str[0]]) => {
     if (offset === str.length) {
         return result;
     };
 
     const char = str[offset];
     const copyArray = result.slice().map((value) => value + '.');
 
     result.push(...copyArray);
     result = result.map((value) => value + char);
 
     return dotsRecOne(str, offset + 1, result);
 };
 
 // v2-2 recurtion
 const dotsRecTwo = (chars, string = '', skip = 0, strings = []) => {
     if (chars.length - skip === 1) {
       const res = string + chars[skip];
 
       strings.push(res);
     } else {
       const char = chars[skip];
       const next = string + char;
 
       dotsRecTwo(chars, next + '.', skip + 1, strings);
       dotsRecTwo(chars, next, skip + 1, strings);
     };
 
     return strings;
 };
 
 // v2-2-1 recurtion
 const dotsRecTwoVerTwo = (str, offset = 0, tmp = '', result = []) => {
     if (offset === str.length - 1) {
       tmp += str[offset];
       
       result.push(tmp);
 
       return result;
     } 
     
     const char = str[offset];
 
     dotsRecTwoVerTwo(str, offset + 1, tmp + char, result);
     dotsRecTwoVerTwo(str, offset + 1, tmp + char + '.', result);
 
     return result;
 };
 
 // v2-3 recurtion
 const dotsRecThree = (str, result = [str[0]]) => {
     if (str.length === 1) {
         return result;
     };
 
     const char = str[1];
 
     str = str.slice(1);
 
     const newArrWithDots = result.slice().map(value => value + '.' + char);
     const newArrWithoutDots = result.map(value => value + char);
 
     const resWithoutDots = dotsRecThree(str, newArrWithoutDots);
     const resWithDots = dotsRecThree(str, newArrWithDots);
 
     return [...resWithoutDots, ...resWithDots];
 }
 
 // v2-4 recurtion
 const dotsRecFour = (str, flag, result = [str[0]]) => {
     const char = str[1];
 
     str = str.slice(1);
     result = result.slice().map((value) => value + (flag ? '.' : '') + char);
 
     if (str.length === 1) {
         return result;
     }
 
     const resWithoutDots = dotsRecFour(str, false, result);
     const resWithDots = dotsRecFour(str, true, result);
 
     return [...resWithoutDots, ...resWithDots];
 };
 
 // v2-5 recurtion
 const resRecFive = [];
 
 const dotsRecFive = (str, index = 1) => {
     if (str.length === index) {
         resRecFive.push(str);
         
         return;
     }
 
     dotsRecFive(str.slice(0, index) + '.' + str.slice(index), index + 2);
     dotsRecFive(str, index + 1);
 };
 
 // v3-1 bit / binary mask
 function binaryOne(string) {
     const total = Math.pow(2, string.length - 1);
 
     const arr = string.split("");
     const strings = new Array(total);
 
     for (let i = 1; i < total; i++) {
       let mapped = "";
 
       for (let index = 0; index < arr.length; index++) {
         mapped += arr[index];
 
         if (index < arr.length - 1) {
           mapped += ((i >> index) & 1) == 1 ? "." : "";
         }
       };
 
       strings[i] = mapped;
     };
   
   strings[0] = string;
 
   return strings;
 };
 
 // v3-2 bit / binary mask (*string has limit 2**32  bits, after func will be broken)
 function binaryTwo(str) {
     const total = Math.pow(2, str.length - 1);
 
     const result = [];
 
     for (let i = 0; i < total; i++) {
         const binaryMask = i.toString(2).padStart(str.length - 1, '0');
 
         let tmp = '';
 
         for (let j = 0; j < str.length; j++) {
             tmp += str[j];
 
             tmp += binaryMask[j] === '1' ? '.' : '';
         };
 
         result.push(tmp);
     };
 
     return result;
 };
 
 // v3-3 bit / binary mask (*! has limit 2**32  bits, after it func will be broken)
 function binaryBits(str) {
     const total = Math.pow(2, str.length - 1);
 
     const result = [];
 
     for (let i = 0; i < total; i++) {
         let tmp = '';
 
         for (let j = 0; j < str.length; j++) {
             tmp += str[j];
 
             tmp += (i >> j) % 2 === 1 ? '.' : '';
         };
 
         result.push(tmp);
     };
 
     return result;
 };
 
 const startTime = performance.now();
 
 console.log('\n----------------------------------\nResult:');
 
 // change the string => input data to func
 const str = 'abc';
 
 // choose the func:
 //console.log(dotsOne(str));
 //console.log(dotsRecOne(str));
 //console.log(dotsRecTwo(str));
 //console.log(dotsRecTwoVerTwo(str));
 //console.log(dotsRecThree(str));
 //console.log([...dotsRecFour(str, false), ...dotsRecFour(str, true)]);
 //dotsRecFive(str); console.log(resRecFive); resRecFive.length = 0; //clean memory
 //console.log(binaryOne(str));
 //console.log(binaryTwo(str));
 console.log(binaryBits(str));
 
 const speedTime = performance.now() - startTime;
 
 console.log('==============\nFunction speed:', speedTime + ' milliseconds\n==============\n');
 