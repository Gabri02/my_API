# MeditActive API

MeditActive aims to help users focus on a set of predefined goals to improve their lifestyle.

Your task is to create JSON RESTful APIs to implement this functionality within their app. There is no need to develop a front end for this project.

## Requirements

- All APIs must follow the REST architecture, including naming conventions, methods, and response status codes.
- APIs should allow for the insertion, modification, and deletion of a user with the following attributes: email, first name, and last name.
- APIs should allow for the insertion, modification, and deletion of a goal interval with the following attributes: start date, end date, and user to whom the interval belongs.
- APIs should allow for the association of a goal with an interval.
- APIs should allow for the retrieval of all intervals, filtering by included goals, and filtering by start and end date.

## Implementation Details

- You can use either MySQL or MongoDB to store your information. If you choose MySQL, remember to include a migrations.sql file to rebuild the structure of your database.
- If you use MySQL, ensure that all database queries are sanitized and not vulnerable to SQL Injection attacks. Prepared statements must be used to prevent these types of attacks.
- Remember that MongoDB can also be vulnerable to NoSQL Injection attacks. Take appropriate precautions.

## API Endpoints

1. **Users**
   - `POST /users`: Create a new user.
   - `GET /users/{user_id}`: Retrieve user information.
   - `PUT /users/{user_id}`: Update user information.
   - `DELETE /users/{user_id}`: Delete a user.

2. **Goal Intervals**
   - `POST /intervals`: Create a new goal interval.
   - `GET /intervals/{interval_id}`: Retrieve interval information.
   - `PUT /intervals/{interval_id}`: Update interval information.
   - `DELETE /intervals/{interval_id}`: Delete an interval.

3. **Associations**
   - `POST /associations`: Associate a goal with an interval.

4. **Queries**
   - `GET /intervals`: Retrieve all intervals.
   - `GET /intervals?goal={goal_id}`: Filter intervals by included goals.
   - `GET /intervals?start_date={start_date}&end_date={end_date}`: Filter intervals by start and end date.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

