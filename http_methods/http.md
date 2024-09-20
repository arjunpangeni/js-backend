# HTTP Methods.

HTTP (HyperText Transfer Protocol) methods are used to define actions to be performed on resources (typically in a REST API). Here are the most common methods:

#### 1. **GET**

-   **Description**: Retrieves data from the server.
-   **Example**: Fetch a list of users.
    
    
    `GET /users` 
    
    **Response**: A list of users in JSON format.
    
    ````json
    [
      { "id": 1, "name": "arjun" },
      { "id": 2, "name": "raju" }
    ] 
    ````

#### 2. **POST**

-   **Description**: Sends data to the server, often to create a new resource.
-   **Example**: Create a new user.
   
    
    `POST /users` 
    
    **Request Body**: JSON payload with new user data.
    
    ````json
    
    {
      "name": "hari",
      "email": "hari@example.com"
    }
    ````
    
    **Response**: A confirmation or the newly created resource.
    ```json
    {
      "id": 1,
      "name": "hari",
      "email": "hari@example.com"
    } 
    ```
    

#### 3. **PUT**

-   **Description**: Updates an existing resource. Typically replaces the entire resource.
-   **Example**: Update user details.
    
    
    `PUT /users/1` 
    
    **Request Body**: New data for the user.
    
    ```json
    
    {
      "name": "Hari Updated",
      "email": "hariupdated@example.com"
    }
    ``` 
    
    **Response**: The updated resource.
    
    ```json
 
    
    {
      "id": 1,
      "name": "Alice Updated",
      "email": "aliceupdated@example.com"
    }
    ```
    

#### 4. **PATCH**

-   **Description**: Updates part of an existing resource.
-   **Example**: Update the email of a user.
    
    `PATCH /users/1` 
    
    **Request Body**: The field to update.
    
    ````json
    
    {
      "email": "hariupdatedagin@example.com"
    }
    ````
    
    **Response**: The updated user with only the changed field.
    
    ````json
    {
      "id": 1,
      "name": "Alice",
      "email": "newalice@example.com"
    }
    ```` 
    

#### 5. **DELETE**

-   **Description**: Deletes an existing resource.
-   **Example**: Delete a user.
  
    
    `DELETE /users/1` 
    
    **Response**: A confirmation of deletion.
    
    ````json
    
    {
      "message": "User deleted successfully."
    }
    ```` 
    

----------

### Status Codes

HTTP status codes are responses from the server to indicate the outcome of the request. They are grouped into five categories:

#### 1. **1xx Informational**

-   **Example**: `100 Continue`
    -   The server has received the request headers and is waiting for the body (if any).
-    **Example**: `101 processing` 

#### 2. **2xx Success**

-   **Example**: `200 OK`
    -   The request was successful.
-   **Example**: `201 Created`
    -   The resource was successfully created (often used in `POST` responses).

#### 3. **3xx Redirection**

-   **Example**: `301 Moved Permanently`
    -   The resource has been moved to a new URL.
-   **Example**: `302 Found`
    -   Temporary redirection to a new URL.

#### 4. **4xx Client Errors**

-   **Example**: `400 Bad Request`
    -   The server could not understand the request due to invalid syntax.
-   **Example**: `401 Unauthorized`
    -   Authentication is required or has failed.
-   **Example**: `403 Forbidden`
    -   The client does not have permission to access the resource.
-   **Example**: `404 Not Found`
    -   The resource could not be found on the server.

#### 5. **5xx Server Errors**

-   **Example**: `500 Internal Server Error`
    -   The server encountered an unexpected condition that prevented it from fulfilling the request.
-   **Example**: `503 Service Unavailable`
    -   The server is temporarily unavailable, often due to maintenance.

----------

### Example in Context

Let's say you have a Next.js app that interacts with an API:

-   **GET `/api/products`**: Fetch a list of products (returns a `200 OK` if successful).
-   **POST `/api/products`**: Add a new product (returns a `201 Created` on success).
-   **PUT `/api/products/1`**: Update an existing product with ID 1 (returns a `200 OK` if updated).
-   **DELETE `/api/products/1`**: Remove product with ID 1 (returns a `204 No Content` after successful deletion).

These methods and status codes allow your app to communicate effectively with a server.