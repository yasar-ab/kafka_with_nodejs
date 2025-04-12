import { app } from "./app";
import jwt from "jsonwebtoken";
const port = process.env.APP_PORT || 9092;

export const server = async () => {
  const expressApp = await app();
  const tokens = jwt.sign(
    { id: 1, name: "John Doe", role: "user" },
    "secret_key",
    {
      expiresIn: "1h", // Token valid for 1 hour
    }
  );

  console.log("Generated Token:", tokens);
  console.log(`Server is running at http://localhost:${port}`);
  expressApp.listen(port, () => {
    console.info(`App is listening to ${port}`);
  });
};

server().then(() => {
  console.info("server is up");
});
