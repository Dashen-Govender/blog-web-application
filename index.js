import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let currentUserId = 1;
let currentUsername = "Eric";
let option = "none";

let users = [
  { id: 1, name: "Eric" },
  { id: 2, name: "Samishka" },
  { id: 3, name: "Dashen" },
];

let posts = [
  {
    id: 0,
    userid: 1,
    message:
      "Run a marathon in under two hours. Impossible? Not for Nike (@Nike). Last May, the company brought three of the best runners on the planet together in Italy to set a new record in a closed-door marathon that was broadcast live on Twitter.",
  },
  {
    id: 1,
    userid: 2,
    message:
      "Using this 360-degree video, Degree Men (@DegreeMen) teleported its community to a basketball court, where the challenge was to follow Stephen Curry (@StephenCurry30) of the championship-winning Golden State Warriors.",
  },
  {
    id: 2,
    userid: 1,
    message:
      "For Pandora (@pandoramusic), there is bound to be a piece of music for each emoji. At least this is what the American music streaming giant wanted to prove with its campaign #SoundsLike.",
  },
  {
    id: 3,
    userid: 1,
    message:
      "If you aren't sure which TV to buy, Samsung (@SamsungAU) is there for you. In Australia, the brand offered a personalized DM experience to advise its customers based on their requirements.",
  },
  {
    id: 4,
    userid: 2,
    message:
      "For #NationalVegetarianWeek, the English food supplier Tesco (@Tesco) shared a range of delicious vegetarian recipes in customized Moments.",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    users: users,
    posts: posts,
    currentUsername: currentUsername,
    currentUserId: currentUserId,
    option: option,
  });
});

app.post("/CreateUser", (req, res) => {
  if (users.length < 8) {
    const name = req.body.username;
    const id = users.length + 1;
    users.push({ id: id, name: name });
    currentUserId = id;
  }
  res.redirect("/");
});

app.post("/SelectUser", (req, res) => {
  const name = req.body.user;
  const user = users.find((user) => user.name === name);
  currentUserId = user.id;
  currentUsername = user.name;
  option = "none";

  res.redirect("/");
});

app.post("/viewPost", (req, res) => {
  option = "vp";
  res.render("index.ejs", {
    posts: posts,
    users: users,
    currentUsername: currentUsername,
    currentUserId: currentUserId,
    option: option,
  });
});

app.post("/createPost", (req, res) => {
  option = "cp";
  res.render("index.ejs", {
    posts: posts,
    users: users,
    currentUsername: currentUsername,
    currentUserId: currentUserId,
    option: option,
  });
});

app.post("/updatePost", (req, res) => {
  option = "up";
  res.render("index.ejs", {
    posts: posts,
    users: users,
    currentUsername: currentUsername,
    currentUserId: currentUserId,
    option: option,
  });
});

app.post("/deletePost", (req, res) => {
  option = "dp";
  res.render("index.ejs", {
    posts: posts,
    users: users,
    currentUsername: currentUsername,
    currentUserId: currentUserId,
    option: option,
  });
});

app.post("/submitEntry", (req, res) => {
  if (option === "cp") {
    const post = req.body["Editor"];
    const id = posts[posts.length-1].id + 1;
    posts.push({ id: id, userid: currentUserId, message: post });
    option = "vp";
    res.redirect("/");
  } else if (option === "up") {
    const postId = parseInt(req.body["postId"]);
    const message = req.body["Editor"];
    const pos = posts.map(val => val.id).indexOf(postId);
    posts[pos].message = message;
    option = "vp";
    res.redirect("/");
  } else if (option === "dp") {
    const postId = parseInt(req.body["postId"]);
    const pos = posts.map(val => val.id).indexOf(postId);
    delete posts[pos];
    option = "vp";
    res.redirect("/");
  }
});

app.listen(process.env.PORT || port, () => {
  console.log(`Listening on port ${port}`);
});
