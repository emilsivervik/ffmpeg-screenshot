/* External Modules */
const isUrl = require('validator/lib/isURL');
const isInt = require('validator/lib/isInt');
const isDecimal = require('validator/lib/isDecimal');

/* Declarations */
const queryKeys = ['url', 'size', 'timestamp'];

const queryMiddleware = (req, res, next) => {
    const validationArr = [];
    const mergedObject = Object.assign({}, req.params, req.query);

    if (!mergedObject['url']) { return res.status(400).send('url parameter is required.'); }

    Object.entries(mergedObject).forEach(([property, value]) => {
        if (!(validateType(property, value))) {
            validationArr.push(`Param \'${property}\' is not valid`);
        }
    });

    if (validationArr.length) { return res.status(400).send(validationArr); }
    return next();
};

const validateType = (property, value) => {
    switch (property) {
        case 'url':
            return isUrl(value);
            break;
        case 'size':
            const sizeArr = value.split('x');
            if (sizeArr.length !== 2 ||
                !isInt(sizeArr[0]) ||
                !isInt(sizeArr[1])) { return false; }
            return true;
            break;
        case 'timestamp':
            const timestampArr = value.split(':');
            if (timestampArr.length !== 3 ||
                !isInt(timestampArr[0]) ||
                !isInt(timestampArr[1]) ||
                (!isDecimal(timestampArr[2]) && !isInt(timestampArr[2]))) { return false; }
            return true;
            break;
        default:
            return false;
            break;
    };
};

module.exports = queryMiddleware