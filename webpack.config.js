module.exports = {
    // entry point for the webpack
    entry: './Components/index.js',
    //Where the bundle will be placed after packing
    output:{
        path:`${__dirname}/lib`,
        filename: 'app.bundle.js'
    },
    // For production not necessary, only for dev
    devServer : {
        // for hot reloading
        inline: true,
        //localhost8080
        port: 8080

    },
    module:{
        loaders:[
            {
                //tests to see if file contains the .js file type
                test: /\.js$/,
                // doesn't go threw the node_modules directory and bundle them in
                exclude: /node_modules/,
                // linking in babel for using es6 for import class arrow functions and react
                loader: 'babel-loader',
                query: {
                    presets: ['es2015','react'],
                    plugins: ["transform-object-rest-spread"]
                }
            }
        ]
    }
};