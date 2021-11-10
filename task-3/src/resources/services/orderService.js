const constants = require('../../common/constants');
const { getTimestamps } = require('./getTimestamps');

const pad = (n) => (n < 10 ? (`0${n}`) : n);

const formatDate = (date) => {
    const fslash = '/';
    const colon = ':';

    return `${pad(date.getDate()) + fslash
    + pad(date.getMonth() + 1) + fslash
    + pad(date.getFullYear())} ${
        pad(date.getHours()) + colon
        + pad(date.getMinutes()) + colon
        + pad(date.getSeconds())}`;
};

const getCalculation = (lang, mimetype, count) => {
    let price = constants.MIN_COST;
    let time = 1;
    const nowDate = new Date(new Date().toLocaleString(constants.UK, {
        hour12: false,
        timeZone: constants.TZ
    }));

    // calc price
    if (lang !== 'en') {
        if (count <= constants.MIN_COST / constants.ONE_SYMB_PRICE) {
            price = constants.MIN_COST;
        } else {
            price = Math.ceil((constants.ONE_SYMB_PRICE * count) * 100, 10) / 100;
        }
    } else if (lang === 'en') {
        if (count <= constants.MIN_COST_EN / constants.ONE_SYMB_PRICE_EN) {
            price = constants.MIN_COST_EN;
        } else {
            price = Math.ceil((constants.ONE_SYMB_PRICE_EN * count) * 100, 10) / 100;
        }
    }

    // calc number of hours for doing an order
    if (lang !== 'en') {
        if (count <= Math.floor(constants.SYMB_ONEHOUR / 2)) {
            time = constants.MIN_TIME_ORDER / 60;
        } else {
            time = Math.ceil((constants.MIN_TIME_START + Math.ceil(count / Math.floor(constants.SYMB_ONEHOUR / 60))) / 60);
        }
    } else if (lang === 'en') {
        if (count <= Math.floor(constants.SYMB_ONEHOUR_EN / 2)) {
            time = constants.MIN_TIME_ORDER / 60;
        } else {
            time = Math.ceil((constants.MIN_TIME_START + Math.ceil(count / Math.floor(constants.SYMB_ONEHOUR_EN / 60))) / 60);
        }
    }

    // calc +20% if file.extension = 'other'
    if (constants.FILE_EXT_OTHER.includes(mimetype)) {
        price += Math.ceil(((price * constants.INCREASE_PERCENT) / 100) * 100) / 100;

        time += Math.ceil((time * constants.INCREASE_PERCENT) / 100);
    }

    // calc timestamps in seconds
    const deadline = getTimestamps(nowDate, time) / constants.MS;

    // calc deadline date
    const deadline_date = formatDate(new Date(deadline * constants.MS));
    // new Date(deadline * constants.MS).toString();
    /* new Date(deadline * constants.MS).toLocaleString(constants.UK, {
        hour12: false,
        timeZone: constants.TZ
    }); */

    // deadline_date.toString()

    // console.log(nowDate.toISOString(), nowDate.getMonth(), deadline_date, deadline_date.getMonth());

    return {
        price,
        time,
        deadline,
        deadline_date,
    };
};

module.exports = {
    getCalculation,
};
