const express = require("express");
const PORT = 5000;
const app = express();
const cookieParser = require("cookie-parser");

const posts = {
  jodie: "HI",
  liz: "how are you"
};

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.get("/login", (req, res) => {
  const name = req.query.name;
  res.cookie("name", name);
  res.send({ success: true });
});

app.get("/post", (req, res) => {
  const { name } = req.cookies;
  const post = posts[name];
  res.send(post);
});

app.get("/logout", (req, res) => {
  res.clearCookie("name");
  res.send("logged out");
});

app.get("/", (req, res) => {
  res.cookie("monster", "blue").send("hi");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
