class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message) //super is contructor of parent class
        this.statusCode = statusCode;

        //helps create a clean and precise stack trace for your custom error class
        // example: 
        // Error: Something went wrong!
        // at new ErrorHandler (<path-to-your-file>:9:9)
        // at Object.<anonymous> (<path-to-your-file>:13:9)
        // at Module._compile (node:internal/modules/cjs/loader:1212:14)
        // at Object.Module._extensions..js (node:internal/modules/cjs/loader:1274:10)
        // at Module.load (node:internal/modules/cjs/loader:1062:32)
        // at Function.Module._load (node:internal/modules/cjs/loader:901:12)

        // vs 

        // Error: Something went wrong!
        // at new SomeFunction (<path-to-your-file>:15:13)
        // at Object.<anonymous> (<path-to-your-file>:19:5)

        Error.captureStackTrace(this, this.constructor);
    }
}
export default ErrorHandler