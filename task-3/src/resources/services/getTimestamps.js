/* eslint-disable complexity */
const constants = require('../../common/constants');

// const d0 = new Date('2021-11-11T15:00:00.000Z');

/* ----------use date format------------
** const nowDateEx = new Date(new Date('2021-10-11T11:35').toLocaleString(constants.UK, constants.TZ));
*/

// nowDate, date in Kyiv timezone; time -> number of hours
const getTimestamps = (nowDate, time = 1) => {
    // const nowDate = new Date(Date.now());// new Date(new Date(Date.now()).toLocaleString(constants.UK, constants.TZ));

    const startWorkDayTime = new Date(nowDate);
    startWorkDayTime.setHours(10, 0, 0, 0);

    const endWorkDayTime = new Date(nowDate);
    endWorkDayTime.setHours(19, 0, 0, 0);

    let d1 = nowDate.getTime();

    // time in ms
    let timeMs = time * constants.ONE_HOUR;

    if (d1 >= startWorkDayTime.getTime() && d1 < endWorkDayTime.getTime() - constants.ONE_HOUR) {
        if (endWorkDayTime.getTime() - d1 <= time * constants.ONE_HOUR) {
            timeMs -= endWorkDayTime.getTime() - d1;
            d1 += endWorkDayTime.getTime() - d1;
        }
        // console.log('робочий час\n');
    }

    const daysWork = timeMs / constants.ONE_WORKING_DAY;
    const timeRemainder = timeMs - (constants.ONE_WORKING_DAY * parseInt(daysWork, 10));

    if (d1 > (startWorkDayTime.getTime() - constants.ONE_HOUR * 10) && d1 < startWorkDayTime.getTime()) {
        d1 = startWorkDayTime.getTime();
        // console.log('час зранку до 10:00Ж');
    }

    if (d1 >= endWorkDayTime.getTime() - constants.ONE_HOUR && d1 <= endWorkDayTime.getTime() + constants.ONE_DAY * 5) {
        d1 = startWorkDayTime.getTime() + constants.ONE_DAY;
        // console.log('час вечором пысля 18\n', new Date(d1).toString());
    }

    if (new Date(d1).getDay() === constants.DAYS.indexOf('Sa')) {
        d1 += constants.ONE_DAY * 2;
    }

    if (new Date(d1).getDay() === constants.DAYS.indexOf('Su')) {
        d1 += constants.ONE_DAY;
    }

    if (timeMs / constants.ONE_HOUR > 9) {
        // console.log('time true >9', time);

        for (let i = parseInt(daysWork, 10); i - 1 > 0; i--) {
            d1 += constants.ONE_DAY;

            if (new Date(d1).getDay() === 6) {
                d1 += constants.ONE_DAY * 2;
            }
        }
    }

    if (timeRemainder === 0) {
        // console.log('timereainder', timeRemainder);
        if (new Date(d1).getDay() === 0) {
            d1 += constants.ONE_DAY;
        }

        d1 += constants.ONE_WORKING_DAY;
    }

    if (timeMs / constants.ONE_HOUR <= 9) {
        d1 += timeRemainder;
    } else {
        if (new Date(d1).getDay() + 1 === 6) {
            d1 += constants.ONE_DAY * 2;
        }

        d1 += timeRemainder + constants.ONE_DAY;
    }

    return d1;
};

module.exports = {
    getTimestamps,
};

/*
const time = 28;

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
