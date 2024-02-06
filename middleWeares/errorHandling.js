

export const errorHandling = (err, req, res, next) => {

    let statusCode = res.statusCode || 400;

    let message = err.message || " מצטערים יש תקלה בצד שלנו ";
    
    res.status(statusCode).send(message);
}