import Redis from 'ioredis';
import 'dotenv/config';

const REDIS_URL = process.env.UPSTASH_REDIS_URL;
export default new Redis(REDIS_URL);
