# TourDeFranceWebApp

### Test
| Method | Url                   | Description             | Sample Valid Request Body                                       |
|--------|-----------------------|-------------------------|-----------------------------------------------------------------|
| POST   | /users                | Create a user           | {"email": "Post@man.com", "password": "CreatedWithPostman1234"} |
| GET    | /users/:id            | Get a user by ID        |                                                                 |
| GET    | /users                | Get all users           |                                                                 |
| PUT    | /users/:id            | Edit a user by Id       | {"email": "new@email.com} or {"password":"newpassword1234}      |
| DELETE | /users/:id            | Delete a user by Id     |                                                                 |
