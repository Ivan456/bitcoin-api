import app from './app';

import * as cluster from 'cluster';
import * as os from 'os';

enum Env {
  dev = 'dev',
  prod = 'prod',
}

const port = process.argv[2] || 3001;
const numCPUs = os.cpus().length;
const env: Env = process.argv[3] as Env;

/**
 * @description Run app on port 3001 by deafault or port specified in cmd line
 * Will run proccess for each cpu core.
 */
if (env === Env.prod && cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  app.listen(port);
  console.log(`Server running on port ${port} in ${env} mode`);

  console.log(`Worker ${process.pid} started`);
}
