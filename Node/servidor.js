var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/New");

var New = mongoose.model("New", { texto: String, finish: Boolean });

app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());

app.use(cors());

app.post("/api/new", (req, res) => {
  New.create(
    {
      texto: req.body.texto,
    },
    function (error, list) {
      if (error) {
        res.send(error);
      }
      New.find(function (error, list) {
        if (error) {
          res.send(error);
        }
        res.json(list);
      });
    }
  );
});

app.get("/api/new", (req, res) => {
  New.find(function (error, list) {
    if (error) {
      res.send(error);
    }
    res.json(list);
  });
});

app.delete("/api/new/:id", (req, res) => {
  New.remove({ _id: req.params.id }, function (error, list) {
    if (error) {
      res.send(error);
    }
    New.find(function (error, list) {
      if (error) {
        res.send(error);
      }
      res.json(list);
    });
  });
});

app.put("/api/new/:id", (req, res) => {
  New.findOneAndUpdate(
    { _id: req.params.id },
    { texto: req.body.texto },
    function (error, list) {
      if (error) {
        res.send(error);
      }
      New.find(function (error, list) {
        if (error) {
          res.send(error);
        }
        res.json(list);
      });
    }
  );
});

app.listen(8080, () => {
  console.log("server");
});
