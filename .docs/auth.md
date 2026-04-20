# signup
- use the seed phrase to create users: annoId and end-to-end encyption key
- use google drive or download the seed phrase for later use

# login
- use the seed phrase to login (upload it or enter it)

> “Sign once → verify → issue JWT → use JWT after”


---

# ✅ Your idea (fixed and structured)

## 🔐 Step 1: Server sends a challenge (important)

Send a **random nonce (challenge)**:

```json
{
  "challenge": "random_string_123"
}
```

👉 This prevents replay attacks

---

## ✍️ Step 2: Client signs it

Client uses its **private key**:

```text
signature = sign(privateKey, challenge)
```

Then sends:

```json
{
  "publicKey": "...",
  "signature": "...",
  "challenge": "random_string_123"
}
```

---

## 🔍 Step 3: Server verifies

Server does:

```text
verify(publicKey, challenge, signature)
```

If valid:

* user is authenticated ✅

---

## 🎟️ Step 4: Server issues JWT

Now server returns:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## 🔁 Step 5: Client uses JWT

For future requests:

```http
Authorization: Bearer <JWT_TOKEN>
```

👉 No need to sign every request anymore



## 1. Nonce must be one-time use

* Store it temporarily
* Invalidate after login

---

## 2. JWT expiry

* Don’t make it forever
* Example: 15 min / 1 hour

---

## 3. Optional: Refresh tokens

* For longer sessions without re-signing

---

## 4. Bind user to public key

* Store user ↔ publicKey mapping

# 🧠 Clean mental model

```text
Login:
  sign(challenge) → verify → issue JWT

After login:
  JWT handles authentication
```