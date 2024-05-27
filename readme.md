## TerraShields Auth API

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

#### Update User (Development)

```http
  PATCH {{url}}/api/auth/user
```

| Parameter               | Type     | Description                         |
| :---------------------- | :------- | :---------------------------------- |
| `name`                  | `string` | max (50)                            |
| `email`                 | `string` | must be email, max (100)            |
| `password`              | `string` | min (6)                             |
| `password_confirmation` | `string` | min (6), must be same with password |
| `address`               | `string` |                                     |
| `image`                 | `string` | type **jpg,jpeg,png max 10MB**      |

- headers
  - multipart/form-data
- success return body

```json
{
	"message": "success"
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
