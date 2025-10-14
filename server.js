/* eslint-disable @typescript-eslint/no-require-imports */
const next = require('next');
const http = require(`http`);

const dev = false;
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app.prepare().then(() => {
  http.createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
});
