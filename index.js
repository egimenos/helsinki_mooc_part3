require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

app.use(express.static("build"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("tiny"));
morgan.token("body_content", function(req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan({
    format: "POST body :body_content"
  })
);

const Person = require("./models/person");

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons =>
    res.json(persons.map(person => person.toJSON()))
  );
});

app.get("/info", (req, res) => {
  res.send(`<div>PhoneBook has info for ${persons.length} people</div>`);
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(request.params.id).then(person => {
    response.json(person.toJSON());
  });
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.filter(person => person.id !== id);
  res.status(204).end();
});

const checkDuplicated = name => {
  return persons.some(person => person.name === name);
};

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "content missing"
    });
  }

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing, both fields required"
    });
  }

  // if (checkDuplicated(body.name)) {
  //   return res.status(400).json({
  //     error: "the name already exists"
  //   });
  // }

  const person = new Person ({
    name: body.name,
    number: body.number
  });

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
