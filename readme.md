## TerraShields Auth API

### NOTE

- all url need Bearer token except [Login](https://github.com/TerraShields/auth-api?tab=readme-ov-file#login) and [Register](https://github.com/TerraShields/auth-api?tab=readme-ov-file#register)
- all **Content-Type** are **application/json** except [Update](https://github.com/TerraShields/auth-api?tab=readme-ov-file#update-user)

### BASE URL

- 

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
			"report_id": "report-f15d83f8-d695-4dec-869e-60d413ce42ed",
			"user_id": "user-2a35342b-2f66-46fc-b6b1-0dee64f0cac8",
			"image": "https://storage.googleapis.com/capstone-bucket-bangkit-2024/reports/fc1c9e33-fe87-434a-a5e3-4423dfdcc41f.jpeg",
			"description": "",
			"sign": "string",
			"created_at": "2024-06-14T22:09:34.549283Z",
			"classification_result": "earthworms",
			"prediction": {
				            "C": 0.0,
				            "E": 0.0,
				            "N": 0.0,
				            "NE": 0.0,
				            "NW": 0.0,
				            "S": 0.0,
				            "SE": 1.0,
				            "SW": 0.0,
				            "W": 0.0
			},
			"location": {
				"_latitude": 90,
				"_longitude": 180
			},
		},
		{
			"report_id": "report-f15d83f8-d695-4dec-869e-60d413ce42ed",
			"user_id": "user-2a35342b-2f66-46fc-b6b1-0dee64f0cac8",
			"image": "https://storage.googleapis.com/capstone-bucket-bangkit-2024/reports/fc1c9e33-fe87-434a-a5e3-4423dfdcc41f.jpeg",
			"description": "",
			"sign": "string",
			"created_at": "2024-06-14T22:09:34.549283Z",
			"classification_result": "earthworms"
			"location": {
				"_latitude": 90,
				"_longitude": 180
			},
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
