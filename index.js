const express = require("express");
const app = express();
const port = 5000;
const { User } = require("./models/User");
const bodyParser = require("body-parser");

const config = require("./config/key");

//application/x-www-form-urlencoded 이 데이터를 가져온다
app.use(bodyParser.urlencoded({ extended: true })); // 조건 추가

//application/json 이 데이터를 가져올 수 있게 해준다
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewURLParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Hello World! Happy new year! Help!"));

app.post("/register", (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body); //req.body 안에는 id, password가 json 데이터로서 존재한다
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err }); //error 가 나타날 경우 success:false라는 json 데이터가 보내진다
    return res.status(200).json({ success: true }); //status(200)은 연결이 되었다는 뜻이다
  }); //save는 MongoDB의 내용이다
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
