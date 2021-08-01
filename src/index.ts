import { server } from './server';

server
  .listen()
  .then(({ url }) => {
    console.log(`🚀 server ready at ${url}`);
  })
  .catch((e) => {
    console.log(`the server cannot be started: ${e}`);
    process.exit(1);
  });
