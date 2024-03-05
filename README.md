# Goal Management API

This project is a web API application for managing goals to be achieved within certain time intervals. It allows users to add, modify, and delete a user, a time interval, as well as insert, modify, and assign goals to a specific interval and user.

## Key Features

- *User Management:* Add, edit, and delete users.
- *Time Interval Management:* Insert and modify available time intervals.
- *Goal Management:* Create, edit, and assign goals to specific intervals and users.

## Installation

1. Clone the repository:
   ``` bash
    git clone https://github.com/Gabri02/my_API.git
   ```
2. Make sure you have npm installed. If not, you can download it [here](https://www.npmjs.com/package/npm).
3. Install dependencies using npm:
  ```  bash
    npm install
  ```
4. Start the server:
   ``` bash
    node app.js
   ```

## Usage

1. Access the API through the provided routes.
2. Utilize the routes to manage users, time intervals, and goals as needed.
3. Make HTTP requests to create, modify, or delete data.

## API Examples

User POST request:

``` javascript
POST /users HTTP/1.1
Host: your-api-domain.com
Content-Type: application/json

{
  "email": "example@example.com",
  "first_name": "John",
  "last_name": "Doe"
}
```
Users GET request:

``` javascript
GET /users HTTP/1.1
Host: your-api-domain.com
```
Users GET by id:

``` javascript
GET /users/1 HTTP/1.1
Host: your-api-domain.com
```

## Contributing

If you find bugs or have suggestions to improve the project, feel free to open an issue or submit a pull request.

## Authors

- Gabri02
