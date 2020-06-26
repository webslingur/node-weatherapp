const path = require("path");
const express = require("express");
const hbs = require("hbs");
const chalk = require("chalk");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express configs
const pubDirPath = path.join(__dirname, "../public");
const templateDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", templateDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(pubDirPath));

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Kaustubh"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Kaustubh"
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        message: "This is a help message."
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please set the address."
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            console.log(chalk.red(error));
        } else {
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.log(chalk.red(error));
                    res.send(error);
                } else {
                    console.log(chalk.bold.green(forecastData));
                    res.send({
                        forecast: forecastData,
                        location,
                        address: req.query.address
                    });
                }
            })
        }
    })
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "Search is empty!"
        })
    }
    console.log(req.query);

    res.send({
        title: "Products",
        message: "This is a product message."
    });
});

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "Help Not found",
        message: "This is a 404 message."
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "Not found",
        message: "This is a 404 message."
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});