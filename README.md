# bcrypt-workers

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/rwv/bcrypt-workers/deploy.yml)
![Swagger Validator](https://img.shields.io/swagger/valid/3.0?specUrl=https%3A%2F%2Fbcrypt-workers.rwv.workers.dev%2Fopenapi.json)


[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/rwv/bcrypt-workers)

This is a Cloudflare Workers project that provides a simple API to hash and compare passwords using bcrypt.

## Usage

OpenAPI Documentation: https://bcrypt-workers.rwv.dev/

### Hash a password

```javascript
fetch("/hash", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password: "password",
    rounds: 12,
  }),
})
```

### Verify a password

```javascript
fetch("/verify", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    password: "password",
    hash: "$2a$10$0AeRIW6lLG4Nz5uCLItonuasTNdScKoLzBX9hIzIII371CxBcwYrO",
  }),
})
```

## Development

```
$ pnpm run dev
```

## License

MIT
