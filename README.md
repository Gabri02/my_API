# My API

This is a simple API project that I created for demonstration purposes. The API allows users to perform basic CRUD (Create, Read, Update, Delete) operations on a fictional database of books.

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

- `GET /books`: Get all books
- `GET /books/:id`: Get a book by ID
- `POST /books`: Add a new book
- `PUT /books/:id`: Update a book by ID
- `DELETE /books/:id`: Delete a book by ID

All endpoints except `GET /books` require authentication using JWT (JSON Web Tokens). You can obtain a JWT by sending a POST request to `/auth/login` with the following JSON payload:

{
"username": "your_username",
"password": "your_password"
}


Replace `your_username` and `your_password` with your desired credentials.

### Example

To get all books, you can send a GET request to `http://localhost:3000/books`. If you want to add a new book, you can send a POST request to `http://localhost:3000/books` with a JSON payload containing the book details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you find any bugs or have suggestions for improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
