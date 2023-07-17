
import app from "./src/config/app.js"
import { connectDB } from "./src/config/db.js"
const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => console.log(`Listening on port ${PORT}!`))