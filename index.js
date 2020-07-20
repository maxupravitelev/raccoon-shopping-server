const express = require("express");
const app = express();

app.use(express.json());

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

let lists = [

    {
      id: 1,
      listId: 1,
      newItems: [
        {
          id: 1,
          text: "T-Rex",
          amount: 2,
          price: 1250,
          isCompleted: false,
        },
        {
          id: 2,
          text: "Eggs",
          amount: 5,
          price: 1,
          isCompleted: false,
        },
        {
          id: 3,
          text: "Bananas",
          amount: 24,
          price: 2,
          isCompleted: false,
        },
      ],
    },
    {
        newItems: [
        {
          text: "Cookies",
          amount: "4",
          isCompleted: false,
        },
        {
          text: "Cookies",
          amount: "4",
          isCompleted: true,
        },
      ],
      id: 2,
    },
    {
        newItems: [
        {
          text: "Cookies",
          amount: "2",
          isCompleted: false,
        },
      ],
      id: 3,
    },

];

// app.get('/', (req, res) => {
//     res.send('<h1>test<h1>')
// })

app.get("/api/lists", (req, res) => {
  res.json(lists);
});

app.get("/api/lists/:id", (req, res) => {
  const id = Number(req.params.id);
  const list = lists.find((list) => list.id === id);

  if (list) {
    res.json(list);
  } else {
    res.status(404).end();
  }
});

const generateId = () => {
  const maxId = lists.length > 0 ? Math.max(...lists.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post("/api/lists", (req, res) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const list = {
    id: generateId(),
    text: body.text,
    amount: body.amount,
    isCompleted: body.isCompleted || false,
    date: new Date(),
  };

  lists = lists.concat(list);

  res.json(list);
});

app.delete("/api/lists/:id", (req, res) => {
  const id = Number(req.params.id);
  lists = lists.filter((list) => list.id !== id);

  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// built upon: https://fullstackopen.com/en/part3/
