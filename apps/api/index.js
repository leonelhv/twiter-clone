
const app = require("./src/config/app.js");
const connectDB = require("./src/config/db.js")

const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))