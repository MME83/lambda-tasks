const constants = require('../../common/constants');

const getCalculation = async (lang, mimetype, count) => {
    let price = 50;
    
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

    if (!(constants.FILE_EXT.includes(mimetype))) {
        price = price + (price * constants.INCREASE_PERCENT) / 100;
    }

    return { price, time: '0', deadline: '0', deadline_date: '0' };
};

module.exports = {
    getCalculation,
};