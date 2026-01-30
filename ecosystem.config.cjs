module.exports = {
    apps: [
        {
            name: 'cityquest-app',
            port: '3014',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        },
    ],
}
