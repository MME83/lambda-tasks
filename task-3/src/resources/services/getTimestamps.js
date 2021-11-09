const constants = require('../../common/constants');

// const d0 = new Date('2021-11-11T19:00:00.000Z');

//----------------------------
const nowDateEx = new Date(new Date('2021-10-11T07:00').toLocaleString(constants.UK, constants.TZ));

// nowDate, date in Kyiv timezone; time -> number of hours
const deadLineDate = (nowDate, time) => {
    const startWorkDayTime = new Date(nowDate);
    startWorkDayTime.setHours(10, 0, 0, 0);

    const endWorkDayTime = new Date(nowDate);
    endWorkDayTime.setHours(19, 0, 0, 0);

    const timeMs = time * constants.MINUTES * constants.SECONDS * constants.MS;
    const daysWork = timeMs / constants.ONE_WORKING_DAY;
    const timeRemainder = timeMs - (constants.ONE_WORKING_DAY * parseInt(daysWork, 10));

    let d1 = nowDate.getTime();

    if (d1 > (startWorkDayTime.getTime() - constants.ONE_HOUR * 10) && d1 < startWorkDayTime.getTime()) {
        d1 = startWorkDayTime.getTime();
    }

    if (d1 >= endWorkDayTime.getTime() - constants.ONE_HOUR && d1 <= endWorkDayTime.getTime() + constants.ONE_DAY * 5) {
        d1 = startWorkDayTime.getTime() + constants.ONE_DAY;
    }

    if (new Date(d1).getDay() === constants.DAYS.indexOf('Sa')) {
        d1 += constants.ONE_DAY * 2;
    }

    if (new Date(d1).getDay() === constants.DAYS.indexOf('Su')) {
        d1 += constants.ONE_DAY;
    }

    if (d1 >= startWorkDayTime.getTime() && d1 < endWorkDayTime.getTime() - constants.ONE_HOUR) {

    }

    if (time > 9) {
        console.log('time true', time);

        for (let i = parseInt(daysWork, 10); i - 1 > 0; i--) {
            d1 += constants.ONE_DAY;

            if (new Date(d1).getDay() === 6) {
                d1 += constants.ONE_DAY * 2;
            }
        }
    }

    if (timeRemainder === 0) {
        if (new Date(d1).getDay() === 0) {
            d1 += constants.ONE_DAY;
        }

        d1 += constants.ONE_WORKING_DAY;
    }

    if (time < 9) {
        d1 += timeRemainder;
    } else {
        if (new Date(d1).getDay() + 1 === 6) {
            d1 += constants.ONE_DAY * 2;
        }

        d1 += timeRemainder + constants.ONE_DAY;
    }

    return (new Date(d1).toString());
};

const time = 7;

console.log('sogodni:', nowDateEx.toString());
console.log(deadLineDate(nowDateEx, time));

/*
a = new Date();
console.log(a.toISOString());
console.log(a.getTimezoneOffset()/60);
// console.log(a.toLocaleString("en-US", {timeZone: tzString}))
//a.setTimeZone('Europe/Kiev');
console.log(a.toLocaleString('uk-UK', 'Europe/Kiev'));
*/
