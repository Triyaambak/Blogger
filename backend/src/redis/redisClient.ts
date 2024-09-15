import "dotenv/config";
import { createClient } from "redis";

const redisClient = createClient({
  url: `redis://rdb:6379`
});

const initRedisClient = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.log('Redis connection error:', error);
  }
};

initRedisClient();

export default redisClient;
