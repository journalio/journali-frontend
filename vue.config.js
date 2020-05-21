const { DOCKER = false, NODE_ENV } = process.env

module.exports = {
    lintOnSave: NODE_ENV !== 'production',
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        proxy: {
            '^/api/': {
                target: DOCKER ? 'http://api:8000' : 'http://localhost:8000',
            },
        },
    },
    chainWebpack(config) {
        const svgRule = config.module.rule('svg')

        svgRule.uses.clear()

        svgRule.use('vue-svg-loader').loader('vue-svg-loader')

        config.watchOptions.poll = DOCKER
    },
}
