const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = app => {
  app.use('/api', createProxyMiddleware({ target: `http://${process.env.Host||'localhost'}:${process.env.PORT || 3001}`, changeOrigin: true }))
}