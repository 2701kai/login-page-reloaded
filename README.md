# login-page

## 1st attempt on react..

### steps so far:

```bash
npm create vite@latest login-page
# template: react + vanilla.js
cd login-page/
npm i && npm run dev # works, so ctrl+c and
git init && git remote add origin https://github.com/2701kai/login-page.git
```

```bash
git push -u origin main # finally worked, :tada:
```

..nothing fancy yet.

---

## Router Installation + updating main.jsx

- input form created
- router installed: `npm i react-router-dom`

  > _what´s a router?_
  >
  > URLs mapped to components.
  > So `/login` can show `<Login />`, and `/dashboard` can show `<Dashboard />`.
  > React doesn’t have built-in routing, so we use `react-router-dom`.

- [main.jsx](./src/main.jsx) updated

---

## another humbling day..

leaving tailwind for now, I opted for uno.css.

```bash
npm install -D unocss
# @root:
touch uno.config.js #and edit with
```

```js
// uno.config.js
import { defineConfig, presetUno } from "unocss";

export default defineConfig({
  presets: [presetUno()],
});
```

then update `vite.config.js` respectively, adding UnoCSS as plugin:

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCSS from "unocss/vite";

export default defineConfig({
  plugins: [react(), UnoCSS()],
});
```

> #### more: [UnoCSS](https://unocss.dev/integrations/vite)

---

## Update:

created reloaded version full MERN, then

```bash
gh repo create login-page-reloaded --public --source=. --remote=origin --push
```
