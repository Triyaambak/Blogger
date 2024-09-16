import InternalServer from "../errors/InternalServer";
import TooManyRequest from "../errors/TooManyRequest";
import redisClient from "../redis/redisClient";

type AuthTokenDetails = {
  id: string;
  name: string;
  email: string;
}

const redisGetBlog = async (id: string) => {
  try {
    const response = await redisClient.GET(id);
    return response;
  } catch (error) {
    throw new InternalServer("Error while getting user blog from redis db");
  }
};

const redisPutBlog = async (id: string, data: string) => {
  try {
    await redisClient.SET(id, data, { EX: 3600 });
  } catch (error) {
    throw new InternalServer(`Error while setting blog with id - ${id}`);
  }
};

const redisGetAuthToken = async (authToken: string) => {
  try {
    const response = await redisClient.GET(authToken);
    return response;
  } catch (error) {
    throw new InternalServer("Error while getting user auth token");
  }
}

const redisRemoveAuthToken = async (authToken : string) => {
  try {
    await redisClient.DEL(authToken);
  } catch (error) {
    throw new InternalServer("Error while deleting user auth token");
  }
};

const redisPutAuthToken = async (authToken: string, id: string, name: string, email: string) => {
  try {
    const authTokenDetails: AuthTokenDetails = {
      id,
      name,
      email,
    };
    await redisClient.SET(authToken, JSON.stringify(authTokenDetails), { EX: 3600 });
  } catch (error) {
    throw new InternalServer("Error while setting authtoken");
  }
};

const redisRateLimiter = async (userIp: string) => {
  const key = `rate_limit_${userIp}`;
  const currReqRate = await redisClient.INCR(key);
  if (currReqRate === 1)
    redisClient.EXPIRE(key, 60);

  if (currReqRate > 5)
    throw new TooManyRequest("You have given a maximum of 5 tries , Please wait for 60 seconds");
}

export { redisGetBlog, redisRemoveAuthToken, redisPutBlog, redisPutAuthToken, redisGetAuthToken, redisRateLimiter };
