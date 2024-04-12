require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { main } = require("../database");
const authRouter  = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");

main()
  .then(() => console.log("Database connected successfully."))
  .catch((err) =>
    console.error(`Unfortunately, server did not connect. Error: ${err.message}`)
  );

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World"));
app.use("/auth", authRouter);
app.use('/product',productRouter)
app.use('/user',userRouter)

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Server is running on port", port);
});

