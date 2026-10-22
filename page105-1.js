import express from "express";
const app = express();
app.use(express.json());

const arrBooks = [
  {
    id: 101,
    name: "למידה מבוססת JavaScript",
    category: "תכנות",
    islend: true,
    price: 100,
  },
  {
    id: 102,
    name: "מבני נתונים ואלגוריתמים",
    category: "מדעי המחשב",
    islend: true,
    price: 120,
  },
  {
    id: 103,
    name: "המדריך המלא ל-Node.js",
    category: "תכנות",
    islend: false,
    price: 90,
  },
];
const arrLend = [];

app.get("/books", (req, res) => {
  res.end(`the books that we have ${JSON.stringify(arrBooks)}`);
});

app.get("/books/:id", (req, res) => {
  const book = arrBooks.find((book) => book.id === +req.params.id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }
  res.json(book);
});

app.post("/books", (req, res) => {
  if (req.body.id && req.body.name && req.body.category && req.body.price) {
    arrBooks.push(req.body);
    res.status(201).json(req.body);
  } else {
    res.status(409).json({ error: "missing data" });
  }
});

app.put("/books/lend/:id", (req, res) => {
  const index = arrBooks.findIndex((p) => p.id === +req.params.id);
  if (index === -1) {
  return res.status(404).json({ error: "Book not found" });
}
  if (!arrBooks[index].islend) {
    arrBooks[index] = { ...req.body, islend: true };
    arrLend.push(req.body);
    res.json(req.body);
  } else {
    res.json("the book is already lend. sorry.");
  }
});


app.put("/books/return/:id", (req, res) => {
  const index = arrBooks.findIndex((p) => p.id ===+req.params.id);
  arrBooks[index] = { ...req.body, islend: false };
  res.json(req.body);
});

app.delete("/books/:id", (req, res) => {
  const id = +req.params.id;
  const index = arrBooks.findIndex((p) => p.id === id);
  if (index === -1) {
    res.status(404).json({ error: "product not found" });
  } else {
    arrBooks.splice(index, 1);
    res.status(204).json();
  }
});

app.listen(5050);
