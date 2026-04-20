# Users table
- id
- public_key
- username: <avater_name>_<random_number:0001-9989> expt: 0666,6660,6666 
- emoji
- bio
- location
- last_seen
- is_online
- account_status: active, suspended, deleted
- updated_at

# user_field_changes
- id
- user_id
- field_name (e.g. "bio", "username", "emoji")
- old_value
- new_value
- changed_at (timestamp)

# sessions (for auth and notfication)
- id (uuid, pk)
- user_id (fk → users.id)
- session_token (hashed)  so when user try to login hashed(jwt_token)==session_token
- refresh_token (hashed)
- notfiying_token
- device_fingerprint
- ip_address_hash
- user_agent
- platform
- created_at
- last_seen_at
- expires_at
- is_active (boolean)
- revoked_at (nullable timestamp)

# Settings table
- id
- user_id (pk, fk → users.id)
- push_notifications (boolean)   
- auto_delete_chat (int)   -- e.g. 86400 = 24h = min is base unit
- auto_delete_account (int)    -- e.g. 365 = 1 year = day is base unit
- language (varchar)          -- "en", "am", etc.
- created_at
- updated_at

# Chats table

- id (uuid, pk)
- user1_id (fk → users.id)
- user2_id (fk → users.id)
- created_at (timestamp)
-- optional (performance)
- last_message_id



You MUST enforce:
```text
(user1_id, user2_id) is unique
```

And always store them in a **consistent order**:

```text
user1_id < user2_id
```

👉 This prevents duplicate chats like:

* (A, B)
* (B, A)

---

# Messages table
- id (uuid, pk)
- chat_id (fk → chats.id)
- sender_id (fk → users.id)
- ciphertext (text / blob)  --- encrypted stuff
Text message
{
  "type": "text",
  "text": "yo bro"
}
🟣 Image message
{
  "type": "image",
  "url": "https://cdn/abc.jpg",
  "caption": "look at this"
}
🎮 Game message
{
  "type": "game",
  "game_id": "tic_tac_toe",
  "state": {...}
}
- nonce (text)
- message_index (int)
- system_message (text)
- created_at (timestamp)
-- optional
- status (sent, delivered, read)



# Message flow

### Sending:

1. derive message key
2. encrypt → ciphertext
3. generate nonce
4. increment message_index
5. send to server

---

### Receiving:

1. get message
2. use message_index
3. derive same key
4. decrypt

---

# ⚡ How to get chat between two users

```sql
SELECT * FROM chats
WHERE user1_id = LEAST(x, y)
AND user2_id = GREATEST(x, y);
```

👉 That ordering trick is important.

---

# 🔥 Optional improvements (worth it)

## 🟡 1. Unique constraint

```sql
UNIQUE (user1_id, user2_id)
```

---

## 🟡 2. Index for messages

```sql
INDEX (chat_id, created_at)
```

👉 fast message loading

---