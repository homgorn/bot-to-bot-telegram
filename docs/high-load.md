# High-Load Architecture Patterns

## Scaling Telegram Bots for High Traffic (April 2026)

### Table of Contents

1. [Overview](#overview)
2. [Rate Limiting](#rate-limiting)
3. [Horizontal Scaling](#horizontal-scaling)
4. [Queue Architecture](#queue-architecture)
5. [Caching Strategies](#caching-strategies)
6. [Monitoring](#monitoring)

---

## Overview

### Challenges

- **30 msg/s limit** - Per chat rate limit
- **Global quota** - Platform-wide limits
- **429 errors** - Too Many Requests
- **Connection limits** - TLS overhead

---

## Rate Limiting

### Token Bucket Implementation

```typescript
class TokenBucket {
  private tokens: number;
  private lastRefill: number;
  
  constructor(
    private capacity: number = 30,
    private refillRate: number = 30
  ) {
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }
  
  async acquire(): Promise<boolean> {
    this.refill();
    if (this.tokens >= 1) {
      this.tokens--;
      return true;
    }
    return false;
  }
  
  private refill(): void {
    const elapsed = (Date.now() - this.lastRefill) / 1000;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsed * this.refillRate
    );
    this.lastRefill = Date.now();
  }
}
```

### Per-Chat Rate Limiter

```typescript
class ChatRateLimiter {
  private limiters = new Map<string, TokenBucket>();
  private defaultLimiter = new TokenBucket(30, 30);
  
  getLimiter(chatId: string): TokenBucket {
    if (!this.limiters.has(chatId)) {
      this.limiters.set(chatId, new TokenBucket(30, 30));
    }
    return this.limiters.get(chatId)!;
  }
  
  async canSend(chatId: string): Promise<boolean> {
    return this.getLimiter(chatId).acquire();
  }
}
```

---

## Horizontal Scaling

### Architecture

```
┌─────────────┐     ┌─────────────┐
│  Load       │────▶│  Bot        │
│  Balancer   │     │  Instance 1 │
│             │────▶│  Bot        │
│             │     │  Instance 2 │
│             │────▶│  Bot        │
│             │     │  Instance N │
└─────────────┘     └─────────────┘
       │                   │
       └───────────────────┘
             Redis Queue
```

### Shared State with Redis

```typescript
class RedisRateLimiter {
  constructor(private redis: Redis) {}
  
  async acquire(key: string): Promise<boolean> {
    const now = Date.now();
    const window = 1000; // 1 second
    
    const result = await this.redis
      .multi()
      .zadd(key, now, `${now}-${Math.random()}`)
      .zremrangebyscore(key, 0, now - window)
      .zcard(key)
      .exec();
    
    const count = result[2] as number;
    return count <= 30;
  }
}
```

---

## Queue Architecture

### Message Queue

```typescript
interface MessageQueue {
  async publish(message: TelegramMessage): Promise<void>;
  async subscribe(handler: (msg: TelegramMessage) => Promise<void>): void;
}

class RedisMessageQueue implements MessageQueue {
  constructor(private redis: Redis) {}
  
  async publish(message: TelegramMessage): Promise<void> {
    await this.redis.lpush('telegram:queue', JSON.stringify(message));
  }
  
  async subscribe(handler: (msg: TelegramMessage) => Promise<void>): void {
    while (true) {
      const [, message] = await this.redis.brpop('telegram:queue', 0);
      if (message) {
        await handler(JSON.parse(message));
      }
    }
  }
}
```

---

## Caching Strategies

### Chat Info Cache

```typescript
class ChatCache {
  constructor(private redis: Redis, private ttl = 3600) {}
  
  async get(chatId: string): Promise<Chat | null> {
    const cached = await this.redis.get(`chat:${chatId}`);
    return cached ? JSON.parse(cached) : null;
  }
  
  async set(chatId: string, chat: Chat): Promise<void> {
    await this.redis.setex(`chat:${chatId}`, this.ttl, JSON.stringify(chat));
  }
}
```

---

## Monitoring

### Key Metrics

| Metric | Alert | Description |
|--------|-------|-------------|
| 429 rate | > 5% | Rate limit hits |
| P99 latency | > 2s | Response time |
| Queue depth | > 10k | Pending messages |
| Error rate | > 1% | General errors |

---

**Last Updated:** April 18, 2026