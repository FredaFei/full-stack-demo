import Redis from 'ioredis';
import { isNil } from 'lodash';

export const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379', {
    host: process.env.REDIS_HOST || undefined,
    port: !isNil(process.env.REDIS_PORT) ? Number.parseInt(process.env.REDIS_PORT) : undefined,
    username: process.env.REDIS_USERNAME || undefined,
    password: process.env.REDIS_PASSWORD || undefined,
    db: !isNil(process.env.REDIS_DB) ? Number.parseInt(process.env.REDIS_DB) : undefined,
    keyPrefix: process.env.REDIS_KEYPREFIX || 'nextapp:',
});

// import Redis from 'ioredis';
// import { isNil } from 'lodash';

// // Redis 连接配置
// const redisConfig = {
//   host: process.env.REDIS_HOST || 'localhost',
//   port: !isNil(process.env.REDIS_PORT) ? Number.parseInt(process.env.REDIS_PORT) : 6379,
//   username: process.env.REDIS_USERNAME || undefined,
//   password: process.env.REDIS_PASSWORD || undefined,
//   db: !isNil(process.env.REDIS_DB) ? Number.parseInt(process.env.REDIS_DB) : 0,
//   keyPrefix: process.env.REDIS_KEYPREFIX || 'nextapp:',
//   // 连接选项
//   retryDelayOnFailover: 100,
//   retryDelayOnClusterDown: 300,
//   retryDelayOnFailover: 100,
//   maxRetriesPerRequest: 3,
//   lazyConnect: true, // 延迟连接，只在需要时才连接
//   keepAlive: 30000,
//   connectTimeout: 10000,
//   commandTimeout: 5000,
// };

// // 创建 Redis 实例
// export const redis = new Redis(process.env.REDIS_URL || redisConfig);

// // 连接事件监听
// redis.on('connect', () => {
//   console.log('Redis connected successfully');
// });

// redis.on('ready', () => {
//   console.log('Redis is ready to receive commands');
// });

// redis.on('error', (error) => {
//   console.error('Redis connection error:', error);
// });

// redis.on('close', () => {
//   console.log('Redis connection closed');
// });

// redis.on('reconnecting', () => {
//   console.log('Redis reconnecting...');
// });

// // 连接测试函数
// export async function testRedisConnection() {
//   try {
//     const result = await redis.ping();
//     console.log('Redis ping result:', result);
//     return result === 'PONG';
//   } catch (error) {
//     console.error('Redis ping failed:', error);
//     return false;
//   }
// }

// // 优雅关闭函数
// export async function closeRedisConnection() {
//   try {
//     await redis.quit();
//     console.log('Redis connection closed gracefully');
//   } catch (error) {
//     console.error('Error closing Redis connection:', error);
//   }
// }
