import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://localhost:3006"
});

redisClient.on("error" , err => console.log("Redis client error",err));

(async () => {
  await redisClient.connect();
})();

export default redisClient;
