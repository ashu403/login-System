import { NextFunction } from "express";

const ValidationErrorHandler: any = (error: any) => {
    // const errors = Object.values(error.errors).map((el: any) => el.message);
    const errors = error.details.body.map((el:any)=>el.message);
    const message = `Invalid Input Data :  ${errors.join('. ')}`;
    return message;
  };



const ErrorHandler = (err: any, res: any) => {
    if (err.message) {
      res.status(401).json({
        status: 'error',
        message: err.message
      });
    } else {
      res.status(500).json({
        status: 'error',
        message: 'something went wrong!!!'
      });
    }
  }; 


const globalErrorHandler = (err: any, req: any, res: any, next: any) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (err.name === 'ValidationError') err.message = ValidationErrorHandler(err);
    ErrorHandler(err, res)
};


export  {globalErrorHandler}