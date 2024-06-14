## TerraShields Auth API

### NOTE

- all url need Bearer token except [Login](https://github.com/TerraShields/auth-api?tab=readme-ov-file#login) and [Register](https://github.com/TerraShields/auth-api?tab=readme-ov-file#register)
- all **Content-Type** are **application/json** except [Update](https://github.com/TerraShields/auth-api?tab=readme-ov-file#update-user)

### BASE URL

- https://api-service-backend-tpercgplna-uc.a.run.app

### Login with google account

```http
  GET {{url}}/api/auth/google
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
		"user": {
			"image": "string",
			"password": "string",
			"address": "string",
			"user_id": "string",
			"name": "string",
			"email": "string"
		}
	}
}
```

#### Post Report

```http
  POST {{url}}/api/report
```

| Parameter     | Type     | Description        |
| :------------ | :------- | :----------------- |
| `Token`       | `string` | Bearer <token>     |
| `longitude`   | `string` | required           |
| `latitude`    | `string` | required           |
| `description` | `string` | required           |
| `image`       | `string` | required, max 10MB |
| `sign`        | `string` | required           |

- success return body

```json
{
	"message": "success",
	"data": {
		"report_id": "string",
		"user_id": "string",
		"latitude": "string",
		"longitude": "string",
		"image": "string",
		"description": "string",
		"sign": "string"
	}
}
```

#### Get Report

```http
  GET {{url}}/api/report
```

| Parameter | Type      | Description               |
| :-------- | :-------- | :------------------------ |
| `Token`   | `string`  | Bearer <token>            |
| `page`    | `integer` | query parameter, required |
| `size`    | `integer` | query parameter, required |

- success return body

```json
{
	"data": [
		{
			"report_id": "string",
			"user_id": "string",
			"latitude": "string",
			"longitude": "string",
			"image": "string",
			"description": "string",
			"sign": "string",
			"classification_result": "string",
		},
		{
			"report_id": "string",
			"user_id": "string",
			"latitude": "string",
			"longitude": "string",
			"image": "string",
			"description": "string",
			"sign": "string",
			"classification_result": "string",
		}
	],
	"paging": {
		"total_item": "integer",
		"total_page": "integer",
		"page": "integer",
		"size": "integer"
	}
}
```
