module.exports = {
    apps: [
        {
            name: 'cityquest-app',
            port: '5173',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
        },
    ],
}
