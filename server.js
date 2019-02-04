const express = require("express");
const fs = require("fs");

const port = process.env.PORT || 3000;
let app = express();

app.set("view engine", "ejs");

app.use((req, res, next) => {
  let now = new Date().toString();

  let log = `${now}: ${req.method} ${req.url}`;

  console.log(log);

  fs.appendFile("serverlog.txt", log + "\n", err => {
    if (err) {
      console.log(err);
    }
  });

  next();
});

// app.use((req, res, next) => {
//   res.render("maintenance.ejs");

// });

app.use(express.static("./public"));

app.locals.getCurrentYear = () => {
  return new Date().getFullYear(); //express helper
};

app.locals.scream = text => {
  return text.toUpperCase();
};

app.get("/", (req, res) => {
  res.render("home.ejs", {
    pageTitle: "This Is Home Page!"
    // currentYear: new Date().getFullYear()
  });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    pageTitle: "About Page"
    // currentYear: new Date().getFullYear()
  });
});

app.listen(port, () => {
  console.log(`Server Is Up On ${port}`);
});
