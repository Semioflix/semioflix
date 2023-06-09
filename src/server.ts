import App from "./App";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
  console.clear();
  console.log(`Server running on port ${PORT}`)
});