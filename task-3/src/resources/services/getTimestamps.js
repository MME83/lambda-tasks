/* eslint-disable complexity */
const constants = require('../../common/constants');

/* ----------use date format------------
** const nowDateEx = new Date(new Date('2021-10-11T11:35').toLocaleString(constants.UK, constants.TZ));
*/

const getCorrectDate = (date) => {
    if (!date) {
        return undefined;
    }

    let daysLength = 0;

    if (date.getDay() === constants.DAYS.indexOf('Fr')
     && date.getHours() >= (constants.HOURS_END_WORK_DAY - constants.ONE_HOUR) / constants.ONE_HOUR) {
        daysLength = 3;

        date.setHours(10, 0, 0, 0);
    }

    if (date.getDay() === constants.DAYS.indexOf('Sa')) {
        daysLength = 2;

        date.setHours(10, 0, 0, 0);
    }

    if (date.getDay() === constants.DAYS.indexOf('Su')) {
        daysLength = 1;

        date.setHours(10, 0, 0, 0);
    }

    if (date.getHours() < constants.HOURS_START_WORK_DAY / constants.ONE_HOUR) {
        date.setHours(10, 0, 0, 0);
    }

    if (date.getHours() >= (constants.HOURS_END_WORK_DAY - constants.ONE_HOUR) / constants.ONE_HOUR) {
        daysLength = 1;

        date.setHours(10, 0, 0, 0);
    }

    date.setDate(date.getDate() + daysLength);

    return date;
};

const getTimestamps = (nowDate, time = 1) => {
    const date = getCorrectDate(nowDate);

    const startWorkDayTime = new Date(date);
    startWorkDayTime.setHours(10, 0, 0, 0);
    const endWorkDayTime = new Date(date);
    endWorkDayTime.setHours(19, 0, 0, 0);

    let d1 = date.getTime();

    // time in ms
    let timeMs = time * constants.ONE_HOUR;

    if (d1 >= startWorkDayTime.getTime() && d1 < endWorkDayTime.getTime() - constants.ONE_HOUR) {
        if (endWorkDayTime.getTime() - d1 >= timeMs) {
            d1 += timeMs;
            return d1;
        }

        timeMs -= endWorkDayTime.getTime() - d1;
        d1 = (startWorkDayTime).getTime() + constants.ONE_DAY;

        if (new Date(d1).getDay() === constants.DAYS.indexOf('Sa')) {
            d1 += constants.ONE_DAY * 2;
        }
    }

    const daysWork = timeMs / constants.ONE_WORKING_DAY;
    const timeRemainder = timeMs - (constants.ONE_WORKING_DAY * parseInt(daysWork, 10));

    if (timeMs / constants.ONE_HOUR > 9) {
        for (let i = parseInt(daysWork, 10); i > 0; i--) {
            d1 += constants.ONE_DAY;

            if (new Date(d1).getDay() === 6) {
                d1 += constants.ONE_DAY * 2;
            }
        }
    }

    d1 += timeRemainder;

    return d1;
};

module.exports = {
    getTimestamps,
};
