import { opine } from "https://x.nest.land/opine@2.1.1/mod.ts";

try {
  Deno.lstatSync("./bigrat.monster").isDirectory;
} catch (_){
  await Deno.run({
    cmd: ["git", "clone", "https://github.com/bigratmonster/bigrat.monster"],
  }).status();
}

const app = opine();
const port = 8080;

const monkeys: string[] = [];
const deepfakes: string[] = [];
const other: string[] = [];

for await (const file of Deno.readDir("./bigrat.monster/media/monkeys/")) {
  monkeys.push(file.name);
}
for await (const file of Deno.readDir("./bigrat.monster/media/deepfakes/")) {
  deepfakes.push(file.name);
}
for await (const file of Deno.readDir("./bigrat.monster/media/")) {
  other.push(file.name);
}

app.get("/random", (req, res) => {
  switch (req.query.category) {
    case "monkey":
      res.sendFile(monkeys[Math.floor(Math.random() * monkeys.length)], {
        root: "./bigrat.monster/media/monkeys/",
      });
      break;
    case "deepfake":
      res.sendFile(deepfakes[Math.floor(Math.random() * deepfakes.length)], {
        root: "./bigrat.monster/media/deepfakes/",
      });
      break;
    case "other":
      res.sendFile(other[Math.floor(Math.random() * deepfakes.length)], {
        root: "./bigrat.monster/media/",
      });
      break;
    default:
      res.send(
        "<script>window.location.href = 'https://www.youtube.com/watch?v=HUgMWJKn2YY'</script><noscript><a href='https://www.youtube.com/watch?v=HUgMWJKn2YY' style='font-family: monospace'>404</a></noscript>",
      );
      break;
  }
});

app.get("/freekr", (_, res) => {
  res.sendFile("index.html", { root: "./bigrat.monster/freekr/" });
});

app.get("/facts", (_, res) => {
  res.sendFile("index.html", { root: "./bigrat.monster/facts/" });
});

app.get("/facts", (_, res) => {
  res.sendFile("index.html", { root: "./bigrat.monster/facts/" });
});

app.get("/printer", (_, res) => {
  res.sendFile("index.html", { root: "./bigrat.monster/printer/" });
});

app.get("/quiz", (_, res) => {
  res.sendFile("index.html", { root: "./bigrat.monster/quiz/" });
});

app.get("/", (_, res) => {
  res.send(`
  <pre>GET /random?category=[monkey | deepfake | other]</pre><pre>GET /freekr</pre>
  <pre>GET /facts</pre>
  <pre>GET /printer</pre>
  <pre>GET /quiz</pre>`.trimStart());
});

app.use((_, res) => {
  res.sendStatus(404);
  res.sendFile("404.html", { root: "./bigrat.monster" });
});

app.listen(port, () => {
  console.log(`Bigrat.monster API listening at http://localhost:${port}`);
});
