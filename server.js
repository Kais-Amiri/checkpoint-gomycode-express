const express = require("express");
const path = require("path");

const app = express();

const _isAvailable = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  switch (day) {
    case 0 || 6:
      break;
    default: {
      if (hour >= 18 || hour <= 9) {
        break;
      } else {
        next();
      }
    }
  }
};
app.use(_isAvailable);

app.use(express.static(path.join(__dirname, "src", "webpages")));
// app.get("/", (req, res)=>{
//     res.sendFile(path.join(__dirname, "webPages","home.html" ))
//  })
// app.get("/services", (req, res)=>{
//     res.sendFile(path.join(__dirname, "webPages","service.html" ))
//     })

// app.get("/contact", (req, res)=>{
//     res.sendFile(path.join(__dirname, "webPages","contact.html" ))
//     })

app.listen(8080, (err) => {
  if (err) {
    throw err;
  } else {
    console.log("server running on port 8080");
  }
});
