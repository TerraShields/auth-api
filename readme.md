## TerraShields Auth API

#### Login

```http
  POST {{url}}/api/auth/login
```

| Parameter  | Type     | Description                       |
| :--------- | :------- | :-------------------------------- |
| `email`    | `string` | **Required**. enter your email    |
| `password` | `string` | **Required**. enter your password |

#### Register

```http
  POST {{url}}/api/auth/register
```

| Parameter               | Type     | Description                         |
| :---------------------- | :------- | :---------------------------------- |
| `name`                  | `string` | **Required**. enter your name       |
| `email`                 | `string` | **Required**. enter your email      |
| `password`              | `string` | **Required**. enter your password   |
| `password_confirmation` | `string` | **Required**. enter your Repassword |

#### Update User

```http
  PATCH {{url}}/api/auth/user
```

| Parameter               | Type     | Description                                    |
| :---------------------- | :------- | :--------------------------------------------- |
| `name`                  | `string` | **Required**. enter your name                  |
| `email`                 | `string` | **Required**. enter your email                 |
| `password`              | `string` | **Required**. enter your password              |
| `password_confirmation` | `string` | **Required**. enter your Password Confirmation |

#### Change Password

```http
  POST {{url}}/api/auth/user/password
```

| Parameter               | Type     | Description                                    |
| :---------------------- | :------- | :--------------------------------------------- |
| `password`              | `string` | **Required**. enter your password              |
| `password_confirmation` | `string` | **Required**. enter your Password Confirmation |

#### Get User

```http
  GET {{url}}/api/auth/user
```

| Parameter | Type     | Description    |
| :-------- | :------- | :------------- |
| `Token`   | `string` | Bearer <token> |
