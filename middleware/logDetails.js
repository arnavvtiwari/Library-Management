const logRequestDetails = (req, res, next) => {
    const timestamp = new Date().toISOString(); // Current timestamp
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next(); 
};

module.exports = logRequestDetails;