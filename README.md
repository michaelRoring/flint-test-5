# flin-test-5

## Getting Started

### Prerequisites

- Node.js
- MongoDB Atlas

1. Clone the repository
2. Install dependencies

```
npm install
```

3. Create a .env file

```
cp .env.example .env
```

4. Start the server

```
npm run start
```

## End points

### GET /ping

Response:

```
pong!
```

### POST /register

Request:

```
{
    "email" : "johndoe@mail.com",
    "password_plaintext" : "Password123",
    "firstName" :"michael",
    "lastName" : "roring",
    "phoneNumber" : "25918951"
}
```

Response:

```
{
    "status": "success",
    "data": {
        "_id": "6826d8910910fe5857a6de0a",
        "email": "johndoe@mail.com",
        "firstName": "michael",
        "lastName": "roring",
        "phoneNumber": "25918951",
        "createdAt": "2025-05-16T06:17:53.772Z"
    }
}
```

### POST /login

Request:

```
{
    "email": "johndoe@mail.com",
    "password_plaintext": "Password123"
}
```

Response:

```
{
    "status": "success",
    "message": "Login successful.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjZkODkxMDkxMGZlNTg1N2E2ZGUwYSIsImVtYWlsIjoiam9obmRvZUBtYWlsLmNvbSIsImlhdCI6MTc0NzM3NjI5OSwiZXhwIjoxNzQ3Mzc5ODk5fQ.fuEL6P-A3t-u2X2iWIBst7AqXjV_MuvKJV7g6f1rF40",
    "data": {
        "id": "6826d8910910fe5857a6de0a",
        "email": "johndoe@mail.com",
        "firstName": "michael",
        "lastName": "roring"
    }
}
```

### GET /profile

Request header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MjZkODkxMDkxMGZlNTg1N2E2ZGUwYSIsImVtYWlsIjoiam9obmRvZUBtYWlsLmNvbSIsImlhdCI6MTc0NzM3NjI5OSwiZXhwIjoxNzQ3Mzc5ODk5fQ.fuEL6P-A3t-u2X2iWIBst7AqXjV_MuvKJV7g6f1rF40
```

Response:

```
{
    "status": "success",
    "data": {
        "_id": "6826d8910910fe5857a6de0a",
        "email": "johndoe@mail.com",
        "firstName": "michael",
        "lastName": "roring",
        "phoneNumber": "25918951",
        "createdAt": "2025-05-16T06:17:53.772Z"
    }
}
```
