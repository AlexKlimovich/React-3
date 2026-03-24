const express = require("express");
const app = express();

const PORT = 8082;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.text({ type: "*/*" }));

const DATA = {
  users: [
    {
      name: "Ihar",
      age: 32,
      email: "some@gmail.com",
      isAdmin: true,
      login: "Gary",
      pass: 123,
    },
  ],
};

const setCustomTimeout = (cb) => {
  const delays = [0, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000];
  const delay = delays[Math.floor(Math.random() * delays.length)];
  return setTimeout(() => {
    cb?.();
  }, delay);
};

app.use((req, res, next) => {
  if (typeof req.body === "string" && req.body.length > 0) {
    try {
      req.body = JSON.parse(req.body);
    } catch (e) {}
  }
  next();
});

app.use((req, res, next) => {
  if (req.url === "/api/login" && req.method === "POST") {
    console.log("=== DEBUG LOGIN REQUEST ===");
    console.log("Headers:", req.headers);
    console.log("Raw body type:", typeof req.body);
    console.log("Raw body:", req.body);
  }
  next();
});

app.post("/api/login", (req, res) => {
  setCustomTimeout(() => {
    const { login, pass } = req.body;

    const findetUser = DATA.users.find(
      (user) => user.login === login && user.pass === pass,
    );
    if (findetUser) {
      const { pass, ...userWithoutPass } = findetUser;
      res.json({
        data: userWithoutPass,
      });
    } else {
      res.status(404).send(JSON.stringify("Не зареган"));
    }
  });
});

app.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
});
