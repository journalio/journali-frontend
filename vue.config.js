module.exports = {
    lintOnSave: process.env.NODE_ENV !== 'production',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '^/api/': {
                target: 'http://api:8000',
            },
        },
    },
    configureWebpack: {
        watchOptions: {
            poll: true,
        },
    },
}
