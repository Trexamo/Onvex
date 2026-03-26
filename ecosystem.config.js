module.exports = {
  apps: [
    {
      name: 'onvex-backend',
      script: 'backend/src/server.ts',
      interpreter: 'node',
      interpreter_args: '-r ts-node/register',
      watch: ['backend/src'],
      ignore_watch: ['node_modules'],
      env: {
        NODE_ENV: 'development',
        PORT: 3001
      }
    },
    {
      name: 'onvex-frontend',
      script: 'frontend/node_modules/.bin/next',
      args: 'dev',
      cwd: './frontend',
      watch: ['frontend/src'],
      ignore_watch: ['node_modules', '.next'],
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      }
    }
  ]
};
