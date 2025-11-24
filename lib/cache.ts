import { redis } from "./redis";
import { createHash } from "crypto";

export const hashKey = (text: string): string => {
  return createHash("sha256").update(text).digest("hex");
};

export const getCached = async <T>(key: string): Promise<T | null> => {
  try {
    const cached = await redis.get(key);
    return cached as T | null;
  } catch (error) {
    console.error("Cache got error: ", error);
    return null;
  }
};

export const setCache = async <T>(
  key: string,
  value: T,
  ttl: number = 86400
) => {
  try {
    await redis.setex(key, ttl, JSON.stringify(value));
  } catch (error) {
    console.error("Cache set error:", error);
  }
};
