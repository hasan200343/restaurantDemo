const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.use(express.static("demoWeb"));
app.use(express.urlencoded({ extended: false }));

app.get("/index", (req, res) => {
  const indexPath = path.join(__dirname, "demoWeb", "index.html");
  res.sendFile(indexPath);
});
//for sending restaurant.html when navigated
app.get("/restaurants", (req, res) => {
  const restaurantPath = path.join(__dirname, "demoWeb", "restaurants.html");
  res.sendFile(restaurantPath);
});
//for sending recommend.html when navigated
app.get("/recommend", (req, res) => {
  const recommendPath = path.join(__dirname, "demoWeb", "recommend.html");
  res.sendFile(recommendPath);
});
//for posting restaurant's data in the form
app.post("/recommend", (req, res) => {
  const inputRestaurants = req.body; //we used "req.body" here to take input of all the fields
  const filePath = path.join(__dirname, "restaurants.json");
  const fileData = fs.readFileSync(filePath);
  const restaurantsPresent = JSON.parse(fileData);
  restaurantsPresent.push(inputRestaurants);
  fs.writeFileSync(filePath, JSON.stringify(restaurantsPresent));
  res.redirect("/confirm");
});
//for sending confirm.html when navigated
app.get("/confirm", (req, res) => {
  const confirmPath = path.join(__dirname, "demoWeb", "confirm.html");
  res.sendFile(confirmPath);
});
//for sending about.html when navigated
app.get("/about", (req, res) => {
  const aboutPath = path.join(__dirname, "demoWeb", "about.html");
  res.sendFile(aboutPath);
});

//localhost port forwarding
app.listen(3000, () => {
  console.log("Dummy Server Running");
});
