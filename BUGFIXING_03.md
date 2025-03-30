# Another Day in Paradise

> Rise and shine, little 🤖, it´s bug fixing day!

## Backend tests

### 1. is it even alive?

```bash
curl -X POST https://login-page-reloaded.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "myUserName", "password": "myPasswod"}'
# indeed it is, returns user token
```

### 2. does it return .json?

https://login-page-reloaded.onrender.com/api/auth/login returns

```json
fetch("https://login-page-reloaded.onrender.com/api/auth/login", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    "priority": "u=0, i",
    "sec-ch-ua": "\"Chromium\";v=\"134\", \"Not:A-Brand\";v=\"24\", \"Google Chrome\";v=\"134\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Linux\"",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
```

It does. So Backend on Render works, as it returns [JWT](https://auth0.com/learn/json-web-tokens).

### 3. what about .env on reder / vercel?

gotcha: corrected misconfigured `VITE_API_URL`.
