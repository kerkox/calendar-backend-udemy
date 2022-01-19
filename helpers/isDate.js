const moment = require('moment');

const isDate = (value, {req, location, path}) => {
    if(!value) return false;
    return moment.isDate(value);
}

module.exports = {
    isDate
}