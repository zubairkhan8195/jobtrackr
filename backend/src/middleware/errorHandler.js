const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
    let message = err.message;
    let validation = err.errors;
  
    // Mongoose: invalid ObjectId
    if (err.name === "CastError" && err.kind === "ObjectId") {
      statusCode = 400;
      message = "Invalid ID format";
    }
  
    // Mongoose: duplicate key
    if (err.code === 11000) {
      statusCode = 400;
      const field = Object.keys(err.keyValue)[0];
      message = `${field} already exists`;
    }
  
    res.status(statusCode).json({
      message,
      ...(validation && { errors: validation }),
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  };
  
  module.exports = errorHandler;