const constants = require('../../common/constants');

const getCalculation = async (lang, mimetype, count) => {
    let price = 50;
    let time = 1;
    
    const d = new Date();
    
    // calc price
    if (lang != 'en') {
        if (count <= constants.MIN_COST / constants.ONE_SYMB_PRICE) {
            price = constants.MIN_COST;
        } else {
            price = parseInt((constants.ONE_SYMB_PRICE * count) * 100) / 100;
        }
    } else if (lang === 'en') {
        if (count <= constants.MIN_COST_EN / constants.ONE_SYMB_PRICE_EN) {
            price = constants.MIN_COST_EN;
        } else {
            price = parseInt((constants.ONE_SYMB_PRICE_EN * count) * 100) / 100;
        }
    }

    // calc time for doing an order
    if (lang !='en') {
        if (count <= Math.floor(constants.SYMB_ONEHOUR / 2)) {
            time = constants.MIN_TIME_ORDER / 60;
        } else {
            time = Math.ceil((constants.MIN_TIME_START + Math.ceil( count / Math.floor(constants.SYMB_ONEHOUR / 60))) / 60);
        }
    } else if (lang === 'en') {
        if (count <= Math.floor(constants.SYMB_ONEHOUR_EN / 2)) {
            time = constants.MIN_TIME_ORDER / 60;
        } else {
            time = Math.ceil((constants.MIN_TIME_START + Math.ceil( count / Math.floor(constants.SYMB_ONEHOUR_EN / 60))) / 60);
        }
    }

    // calc +20% if !file.extension
    if (mimetype === constants.FILE_EXT[4]) {
        price = price + parseInt(((price * constants.INCREASE_PERCENT) / 100) * 100) / 100;

        time = time + Math.ceil((time * constants.INCREASE_PERCENT) / 100);
    }

    return { price, time, deadline: '0', deadline_date: '0' };
};

module.exports = {
    getCalculation,
};