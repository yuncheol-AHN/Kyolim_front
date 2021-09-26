const createProxyMiddleware = require('http-proxy-middleware');

module.exports = (app) => {
    app.use(
        '/auth',
        createProxyMiddleware({
            target: "http://3.36.50.0:3000",
            changeOrigin: true,
        })
    )
};