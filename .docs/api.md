# API Documentation

## Authentication
Authentication follows a challenge-response mechanism using a Public/Private key pair. Once verified, a JWT is issued for subsequent requests.

### 1. Get Challenge
`GET /api/v1/auth/challenge`

Generates a random nonce (challenge) to be signed by the client's private key.

**Response:**
```json
{
  "challenge": "random_string_123"
}
```

### 2. Login / Register
`POST /api/v1/auth/login`

Verifies the signature and issues a JWT. If the public key is new, a user record is created.

**Request:**
```json
{
  "publicKey": "...",
  "signature": "...",
  "challenge": "random_string_123",
  "username": "Optional for registration",
  "emoji": "Optional for registration"
}
```

**Response:**
```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "uuid",
    "username": "...",
    "public_key": "..."
  }
}
```

---

## Users

### 1. Get Profile
`GET /api/v1/users/me`

**Headers:** `Authorization: Bearer <JWT_TOKEN>`

**Response:**
```json
{
  "id": "uuid",
  "username": "...",
  "public_key": "...",
  "emoji": "...",
  "bio": "...",
  "location": "...",
  "gender": "...",
  "created_at": "..."
}
```

### 2. Update Profile
`PUT /api/v1/users/me`

**Request:**
```json
{
  "username": "new_name",
  "bio": "...",
  "location": "...",
  "gender": "...",
  "emoji": "..."
}
```

### 3. Get Public Profile
`GET /api/v1/users/{id}`

Used to fetch another user's public key to initiate E2EE.

**Response:**
```json
{
  "id": "uuid",
  "username": "...",
  "public_key": "...",
  "emoji": "...",
  "bio": "..."
}
```

---

## Chats

### 1. List Chats
`GET /api/v1/chats`

Returns a list of active conversations.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "user": {
        "id": "uuid",
        "username": "...",
        "emoji": "..."
      },
      "last_message": {
        "ciphertext": "...",
        "created_at": "..."
      }
    }
  ]
}
```

### 2. Create/Get Chat
`POST /api/v1/chats`

Ensures a chat exists between the current user and target user. Always returns the consistent chat based on `user1_id < user2_id`.

**Request:**
```json
{
  "user_id": "target_user_uuid"
}
```

---

## Messages

### 1. List Messages
`GET /api/v1/chats/{chat_id}/messages`

**Query Params:** `cursor`, `limit`

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "sender_id": "uuid",
      "ciphertext": "...",
      "nonce": "...",
      "message_index": 1,
      "created_at": "..."
    }
  ],
  "next_cursor": "..."
}
```

### 2. Send Message
`POST /api/v1/chats/{chat_id}/messages`

**Request:**
```json
{
  "ciphertext": "...",
  "nonce": "...",
  "message_index": 5,
  "type": "text|image|game",
  "metadata": {}
}
```

### 3. Mark as Read
`PATCH /api/v1/messages/{message_id}/read`

---

## Notifications

### 1. Register Token
`POST /api/v1/notifications/token`

**Request:**
```json
{
  "token": "fcm_token_string",
  "platform": "android|ios|web"
}
```

---

## Settings

### 1. Get Settings
`GET /api/v1/settings`

### 2. Update Settings
`PATCH /api/v1/settings`

**Request:**
```json
{
  "push_notifications": true,
  "auto_delete_chat": 86400,
  "auto_delete_account": 365,
  "language": "am"
}
```