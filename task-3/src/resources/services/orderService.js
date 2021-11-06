const constants = require('../../common/constants');

const getCalculation = async (lang, mimetype, count) => {
    let price = 50;
    let time = 1;
    
    const d = new Date();
    
    // calc price
    if (lang != 'en') {
        if (count <= 1000) {
            price = constants.MIN_COST;
        } else {
            price = constants.ONE_SYMB_PRICE * count;
        }
    } else if (lang === 'en') {
        if (count <= 1000) {
            price = constants.MIN_COST_EN;
        } else {
            price = constants.ONE_SYMB_PRICE_EN * count;
        }
    }

    // calc time
    if (lang !='en') {
        if (count <= Math.floor(constants.SYMB_ONEHOUR / 2)) {
            time = constants.MIN_TIME_ORDER / 60;
        } else {
            time = Math.floor((constants.MIN_TIME_START + ( count / Math.floor(constants.SYMB_ONEHOUR / 2) ) * constants.MIN_TIME_START) * 100 / 60) / 100;
        }
    } else if (lang === 'en') {
        if (count <= Math.floor(constants.SYMB_ONEHOUR_EN / 2)) {
            time = constants.MIN_TIME_ORDER / 60;
        } else {
            time = Math.floor((constants.MIN_TIME_START + ( count / Math.floor(constants.SYMB_ONEHOUR_EN / 2) ) * constants.MIN_TIME_START) * 100 / 60) / 100;
        }
    }

    // calc +% if !file.extension
    if (!(constants.FILE_EXT.includes(mimetype))) {
        price = price + (price * constants.INCREASE_PERCENT) / 100;

        time = time + (time * constants.INCREASE_PERCENT) / 100;
    }

    return { price, time, deadline: '0', deadline_date: '0' };
};

module.exports = {
    getCalculation,
};