const express = require("express");
const app = express();
const postsRoute = require("./routers/posts");

const PORT = 8000;

app.use(express.json());
app.use("/api/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
