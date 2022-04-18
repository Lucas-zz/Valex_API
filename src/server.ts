import app from "./app.js";
import "./setup.js";

const port = +process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on port ${port}.`);
});