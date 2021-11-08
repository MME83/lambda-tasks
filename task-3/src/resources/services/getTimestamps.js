// work time 10-19, Mo-Fr

const OneHour = 3600 * 1000; // ms
const WorkTimeDay = 7 * 3600 * 1000; // ms
const TimeDay = 24 * 3600 * 1000; // ms

const d0 = new Date('2021-11-11T23:00:00.000Z');

const anotherDay = d0.getTime() + TimeDay;

// console.log(d0.getTime(), anotherDay);
// console.log(new Date(anotherDay).toISOString());

const deadLineDate = (d0, time) => {
    const daysWork = Math.floor(time / WorkTimeDay);
    
    const zalyshok = time - (WorkTimeDay * daysWork);
    
    let n = 0;
    let d1 = d0.getTime();
    
    if (daysWork > 1) {
        while (n < daysWork) {
           if (new Date(d1).getDay() === 6) {
               d1 += TimeDay * 2;
           } else {
               d1 += TimeDay; 
           }
           n++;
        }
    }
    
    d1 += zalyshok;
    
    return (new Date(d1).toISOString());
};

// console.log(3);
time = 15 * 3600 * 1000;

console.log(Math.floor(time / WorkTimeDay));

console.log(deadLineDate(d0, time));

a = new Date();
console.log(a.toISOString());
console.log(a.getTimezoneOffset()/60);
// console.log(a.toLocaleString("en-US", {timeZone: tzString}))
//a.setTimeZone('Europe/Kiev');
console.log(a.toLocaleString('uk-UK', 'Europe/Kiev'));