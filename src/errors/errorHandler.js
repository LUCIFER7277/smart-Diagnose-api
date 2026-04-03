const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    
    res.status(statusCode).json({ 
        error: err.name || 'Server Error', 
        details: err.message || 'Something went wrong!' 
    });
};

module.exports = errorHandler;
