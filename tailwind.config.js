module.exports = {
    purge: ['./src/**/*.vue', './public/index.html'],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4299e1',
                    default: '#166791',
                    dark: '#303a54',
                },
                accent: {
                    light: '#ecc94b',
                    default: '#f2b03d',
                    dark: '#d69e2e',
                },
            },
            fontFamily: {
                display: 'Khula',
                body: '"Open Sans"',
            },
        },
    },
    variants: {},
    plugins: [],
}
