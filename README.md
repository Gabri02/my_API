# My API

This is a simple API project that I created for demonstration purposes. The API allows users to perform basic CRUD (Create, Read, Update, Delete) operations on a fictional database of intervals goals.

## Installation

To use this API, you will need to have Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

After installing Node.js, you can clone this repository to your local machine using the following command:

```
git clone https://github.com/Gabri02/my_API.git
```

Once the repository is cloned, navigate to the project directory and install the dependencies by running:

npm install


## Usage

To start the API server, run the following command:

npm start


This will start the server on `http://localhost:3000`.

### Endpoints

The following endpoints are available:

- `GET /users`: Get all users
- `GET /users/:id`: Get a user by ID
- `POST /users`: Add a new user
- `PUT /users/:id`: Update a user by ID
- `PATCH /users/:id`: Update a user by ID
- `DELETE /users/:id`: Delete a user by ID

``` json
{
"email": "your_email",
"first_name": "your_name",
"last_name": "your_surname"
}
```

Replace `your_email`, `your_name` and `your_surname` with your desired credentials.

### Example

To get all users, you can send a GET request to `http://localhost:3000/users`. If you want to add a new book, you can send a POST request to `http://localhost:3000/users` with a JSON payload containing the book details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you find any bugs or have suggestions for improvements.

