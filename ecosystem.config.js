module.exports = {
  apps : [{
    name: 'www',
    script: 'yarn start',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  // deploy : {
  //   production : {
  //     user : 'gitlab-runner',
  //     host : '',
  //     ref  : 'origin/master',
  //     repo : 'git@git.jzez100.com:wuji/mangariver-web.git',
  //     path : '/var/www/production',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
  //   }
  // }
};
