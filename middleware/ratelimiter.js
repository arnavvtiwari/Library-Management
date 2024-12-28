const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
    windowMs: 15 * 60 * 1000,// 15 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});

module.exports = limiter;