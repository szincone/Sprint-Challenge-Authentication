const { server } = require("./server.js");

server.get("/", (req, res) => {
  res.status(200).send("Working");
});
const port = process.env.PORT || 7500;
server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port}\n`);
});
