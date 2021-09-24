const createProxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: "http://3.36.50.0:3000/auth/signup",
            changeOrigin: true,
            pathRewrite: {
                '^/api': '' 
            }
        })
    );
};