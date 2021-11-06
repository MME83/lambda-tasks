module.exports = {
    // working days, weekdays, from 10 to 19 by Kyiv time
    DAYS_WORK: ['Mo', 'Tu', 'We', 'Th', 'Fr'],

    // price in UAH, min cost of the order depending on language: uk|ru or en
    ONE_SYMB_PRICE: 0.05,
    ONE_SYMB_PRICE_EN: 0.12,
    MIN_COST: 50,
    MIN_COST_EN: 120,

    // document language
    LANG: ['uk', 'ru', 'en'],

    // standart file extensions: ['doc', 'docx', 'rtf'] 
    // file extensions, mimetype
    FILE_EXT: ['none', 'doc', 'docx', 'rtf', 'other'],

    // the percentage increase in the case of another document file extension (both for time and price)
    INCREASE_PERCENT: 20,

    // calc Time by minutes (min time after received order 30 min + execution time), min time order: 60 min
    MIN_TIME_START: 30,
    MIN_TIME_ORDER: 60,
    
    // number of symbols for one hour (60 min) depends on lang: uk|ru or en
    SYMB_ONEHOUR: 1333,
    SYMB_ONEHOUR_EN: 333,
};
