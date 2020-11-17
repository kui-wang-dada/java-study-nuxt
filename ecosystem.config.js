module.exports = {
    apps: [
        {
            name: 'API',
            script: './node_modules/nuxt/bin/nuxt.js',

            // Options reference: https://pm2.keymetrics.io/docs/usage/application-declaration/
            args: 'one two',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ],

    deploy: {
        production: {
            user: 'root',
            host: '121.196.189.114',
            ref: 'origin/main',
            repo: 'git@github.com:wangkui1991/java-study-nuxt.git',
            path: '/root/wk/javastudy/production',
            'post-deploy': 'yarn && npm run build &&  pm2 reload ecosystem.config.js --env production'
        }
    }
};
