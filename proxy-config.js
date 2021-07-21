module.exports = [
    {
        //for any request
        context: ['/**'],
        //forward to dev server
        target: 'http://localhost:3000',
        //not using https
        secure: false, 
        logLevel: 'debug'
    }

]