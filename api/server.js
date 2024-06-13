const express = require("express");
const app = express();
const postsRoute = require("./routers/posts");
var cors = require("cors");

const PORT = 8000;

app.use(cors());
app.use(express.json());
app.use("/api/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
