import * as fs from 'fs';
import express from 'express';

let app = express();

const port = 8080;

let monkeys: string[] = [];
let deepfakes: string[] = [];
let other: string[] = [];

fs.readdir('./bigrat.monster/media/monkeys/', (err, files) => {
  if (err) console.warn(err);
  files.map(file => {monkeys.push(file)})
})

fs.readdir('./bigrat.monster/media/deepfakes/', (err, files) => {
  if (err) console.warn(err);
  files.map(file => {deepfakes.push(file)})
})

fs.readdir('./bigrat.monster/media/', (err, files) => {
  if (err) console.warn(err);
  files.map(file => {other.push(file)})
})

app.get('/random', (req, res) => {
  switch (req.query.category) {
    case 'monkey':
      res.sendFile(monkeys[Math.floor(Math.random() * monkeys.length)], { root: './bigrat.monster/media/monkeys/' });
      break;
    case 'deepfake':
      res.sendFile(deepfakes[Math.floor(Math.random() * deepfakes.length)], { root: './bigrat.monster/media/deepfakes/' });
      break;
    case 'other':
      res.sendFile(other[Math.floor(Math.random() * deepfakes.length)], { root: './bigrat.monster/media/' });
      break;
    default:
      res.send('<script>window.location.href = \'https://www.youtube.com/watch?v=HUgMWJKn2YY\'</script><noscript><a href=\'https://www.youtube.com/watch?v=HUgMWJKn2YY\' style=\'font-family: monospace\'>404</a></noscript>')
      break;
  }
})

app.get('/freekr', (req, res) => { res.sendFile('index.html', {root: './bigrat.monster/freekr/'}) })

app.get('/facts', (req, res) => { res.sendFile('index.html', {root: './bigrat.monster/facts/'}) })

app.get('/facts', (req, res) => { res.sendFile('index.html', {root: './bigrat.monster/facts/'}) })

app.get('/printer', (req, res) => { res.sendFile('index.html', {root: './bigrat.monster/printer/'}) })

app.get('/quiz', (req, res) => { res.sendFile('index.html', {root: './bigrat.monster/quiz/'}) })

app.get('/', (req, res) => {
  res.send(`
  <pre>GET /random?category=[monkey | deepfake | other]</pre><pre>GET /freekr</pre>
  <pre>GET /facts</pre>
  <pre>GET /printer</pre>
  <pre>GET /quiz</pre>`.trimStart())
})

app.use(function(req, res) {
  res.status(404);
  res.sendFile('404.html', {root: './bigrat.monster'});
});

app.listen(port, () => {
  console.log(`Bigrat.monster API listening at http://localhost:${port}`)
})
