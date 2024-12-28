const logRequestDetails = (req, res, next) => {
    const timestamp = new Date().toISOString(); // Current timestamp
    console.log(`[${timestamp}] ${req.method} ${req.url}`); // Log the request details
    next(); 
};

module.exports = logRequestDetails;