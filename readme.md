## TerraShields Auth API

### NOTE

- all url need Bearer token except [Login](https://github.com/TerraShields/auth-api?tab=readme-ov-file#login) and [Register](https://github.com/TerraShields/auth-api?tab=readme-ov-file#register)
- all **Content-Type** are **application/json** except [Update](https://github.com/TerraShields/auth-api?tab=readme-ov-file#update-user)

### BASE URL

- https://api-service-backend-tpercgplna-uc.a.run.app

### Login with google account

```http
  POST {{url}}/api/auth/google
```

- success return body

```json
{
	"data": {
		"token": "string"
	}
}
```

- error return body

```json
{
	"errors": "string"
}
```

#### Login

```http
  POST {{url}}/api/auth/login
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `email`    | `string` | **Required**. must be email, max (100) |
| `password` | `string` | **Required**. min(6)                   |

- success return body

```json
{
	"message": "success",
	"data": {
		"token": "string"
	}
}
```

- error return body

```json
{
	"errors": "string"
}
```

#### Register

```http
  POST {{url}}/api/auth/register
```

| Parameter               | Type     | Description                                       |
| :---------------------- | :------- | :------------------------------------------------ |
| `name`                  | `string` | **Required**. max (50)                            |
| `email`                 | `string` | **Required**. must be email, max (100)            |
| `password`              | `string` | **Required**. min (6)                             |
| `password_confirmation` | `string` | **Required**. min (6), must be same with password |

- success return body

```json
{
	"message": "success",
	"data": {
		"email": "string",
		"name": "string",
		"user_id": "string"
	}
}
```

- error return body

```json
{
	"errors": "string"
}
```

#### Update User

- Content-Type: multipart/form-data

```http
  PATCH {{url}}/api/auth/user
```

| Parameter | Type     | Description                    |
| :-------- | :------- | :----------------------------- |
| `name`    | `string` | **Required**. enter your name  |
| `email`   | `string` | **Required**. enter your email |
| `address` | `string` | **Required**.                  |
| `image`   | `string` | **Required**.                  |

- success return body

```json
{
	"message": "update data"
}
```

- error return body

```json
{
	"errors": "string"
}
```

#### Change Password

```http
  POST {{url}}/api/auth/user/password
```

| Parameter               | Type     | Description                              |
| :---------------------- | :------- | :--------------------------------------- |
| `password`              | `string` | **Required**. min(6)                     |
| `password_confirmation` | `string` | **Required**. must be same with password |

- success return body

```json
{
	"message": "success",
	"data": {
		"email": "string",
		"name": "string",
		"user_id": "string"
	}
}
```

- error return body

```json
{
	"errors": "string"
}
```

#### Get User

```http
  GET {{url}}/api/auth/user
```

| Parameter | Type     | Description    |
| :-------- | :------- | :------------- |
| `Token`   | `string` | Bearer <token> |

- success return body

```json
{
	"data": {
		"image": "https://storage.googleapis.com/capstone-bucket-bangkit-2024/users_image/user-default-image.png",
		"password": "$2b$10$MemXhuCYwRMmVkkBcR2cMuuWXhze3GedS7Qu0sh0sEaUEI7xDUoLS",
		"address": "",
		"user_id": "user-941706e1-89cc-4f41-928e-fb186a112cea",
		"name": "user tampan",
		"email": "user@gmail.com"
	}
}
```
