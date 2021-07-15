const express = require("express");
const path = require("path");

const app = express();

const _isAvailable = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  switch (day) {
    case 0:
    case 6:
      res.sendFile(path.join(__dirname, "src", "webPages", "404.html"));
      break;
    default: {
      if (hour >= 18 || hour <= 9) {
        res.sendFile(path.join(__dirname, "src", "webPages", "404.html"));
        break;
      } else {
        next();
        break;
      }
    }
  }
};
app.use(_isAvailable);

app.use(express.static(path.join(__dirname, "src", "webpages")));

app.listen(8080, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server running on port 8080");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "webPages", "index.html"));
});
app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "webPages", "services.html"));
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "webPages", "contact.html"));
});

app.use((req, res) =>
  res.sendFile(path.join(__dirname, "src", "webpages", "pageNotFound.html"))
);
