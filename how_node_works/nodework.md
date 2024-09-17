# What is Node.js ? How it works ?
Im exploring various questions about what Node.js is and how it functions, and I'm working on finding clear answers. 

### 1. **Why do we need Node.js when we already have JavaScript?**

JavaScript was originally designed to run in the browser to create dynamic web pages. However, it couldn't be used for server-side tasks, such as handling `HTTP `requests or interacting with a database and file operations. 

Node.js allows us to run JavaScript outside the browser, on the server side. It provides access to system resources (file system, network, processor , thread , memory_disk etc .) and enables js to handle tasks like creating web servers, handling requests, and managing databases. Node.js uses V8 (it is chromium based js engine) to execute js on the server.

### 2. **Why is Node.js called event-driven?**

Node.js is called event-driven because it operates by reacting to **events** rather than following a predefined flow of execution. It listens for events (like HTTP requests, file system changes,Dns event, error event, custom events etc.) and executes callbacks (event handlers) when those events occur.

For example when a client makes an HTTP request to a Node.js server, the server responds to that event by executing a callback to handle the request.

## Components of node.js 
- **Event queue**
- **Event Loop**
- **Thread Pool**

*Here are the question related with them.*


### 3. **What is the event queue?**

The **event queue** (also known as the message queue) is a queue that holds tasks or events that are waiting to be processed by the **event loop**. Whenever an asynchronous operation (like I/O, timers, or network requests) completes, its callback is placed in the event queue to be processed when the event loop is ready.

### 4. **What type of tasks are stored in the event queue?**

Tasks stored in the event queue are primarily **asynchronous tasks**. These include:
- **I/O operations** (e.g., reading/writing to a file, network requests).
- **Timers** (e.g., `setTimeout`, `setInterval`).
- **Callbacks for completed Promises** (resolved or rejected Promises).
- **Event listeners** (e.g., `click` events in client-side code).

#### Example:
```javascript
console.log("Start");

setTimeout(() => {
  console.log("This is from the event queue");
}, 1000);

console.log("End");
```

Here, the `setTimeout` callback is stored in the event queue and executed after the 1-second delay, while other code continues executing.

### 5. **What is the event loop?**

The **event loop** is a mechanism in Node.js that constantly monitors the **call stack** and **event queue**. It ensures that asynchronous callbacks from the event queue are processed only when the call stack is empty (i.e., when all synchronous code has finished executing).

The event loop works in cycles or "ticks." During each tick:
- It checks if the call stack is empty.
- If it is, it dequeues tasks from the event queue and moves them to the call stack for execution.

### 6. **What is the response of the event loop when it encounters synchronous and asynchronous tasks?**

- **Synchronous tasks** are executed immediately on the call stack. The event loop does not need to intervene since these tasks block the main thread.
  
  Example of synchronous task:
  ```javascript
  console.log("This is synchronous");
  ```

- **Asynchronous tasks** are handled differently. When the event loop encounters an asynchronous task, it offloads it (e.g., to the OS for I/O or to a worker thread). Once the task completes, its callback is placed in the event queue, waiting to be picked up by the event loop when the stack is clear.

  Example of asynchronous task:
  ```javascript
  setTimeout(() => {
    console.log("This is asynchronous");
  }, 1000);
  ```

### 7. **What are blocking and non-blocking tasks with examples?**

- **Blocking tasks** prevent further execution of code until the task completes. In Node.js, most synchronous tasks are blocking.

  **Example of a blocking task:**
  ```javascript
  const fs = require('fs');
  const data = fs.readFileSync('file.txt', 'utf8'); 
   // Blocks the event loop until file is read
  console.log(data);
  ```

- **Non-blocking tasks** allow the code to continue executing while the task runs in the background. In Node.js, most asynchronous tasks are non-blocking.

  **Example of a non-blocking task:**
  ```javascript
  const fs = require('fs');
  fs.readFile('file.txt', 'utf8', 
  (err, data) => {   // Non-blocking
    if (err) throw err;
    console.log(data);
  });
  console.log("This prints before the file is read");
  ```

### 8. **Is a synchronous task always handled by the event loop itself?**

No, synchronous tasks are executed directly on the **call stack**. The event loop is only responsible for processing the event queue and handling asynchronous callbacks. Synchronous tasks block the execution of the event loop until they finish.

### 9. **Examples of tasks handled by the event loop or thread pool:**

- **Tasks handled by the event loop:**
  - `setTimeout`
  - `setInterval`
  - Promises
  - Network requests (HTTP)

  **Example:**
  ```javascript
  setTimeout(() => console.log("This
   is handled by the event loop"), 1000);
  ```

- **Tasks handled by the thread pool (Node.js uses a thread pool for some async tasks like I/O):**
  - File system operations (`fs.readFile`)
  - DNS lookup
  - Compression (`zlib`)

  **Example:**
  ```javascript
  const fs = require('fs');
  fs.readFile('file.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("File read in the thread pool:", data);
  });
  ```

### 10. **What is a thread pool?**

The **thread pool** is a group of worker threads used by Node.js to handle expensive, asynchronous tasks, such as I/O operations, without blocking the main thread. By default, Node.js uses the **libuv** library, which provides a thread pool of four threads (default , can be modified on the basis of core on processor) to handle tasks like file system operations and DNS lookups.

For example, when you read a file asynchronously, the work is offloaded to the thread pool, so the main thread (event loop) remains free to handle other tasks.
### 11. How Tasks Are Passed to the Thread Pool:

-  **Node.js API Call (e.g., `fs.readFile`)**:
    
    -   When you invoke an asynchronous API like `fs.readFile`, the Node.js API detects that this operation involves an I/O task (which is expensive or blocking).
-  **libuv and Thread Pool**:
    
    -   **libuv**, the library that Node.js uses for managing I/O operations, recognizes that this task should be offloaded to the **thread pool**.
    -   **libuv** is responsible for passing these blocking or expensive operations (e.g., file system operations, DNS lookups, compression tasks) to the **thread pool**.
-  **Execution in the Thread Pool**:
    
    -   The thread pool is a group of worker threads maintained by **libuv**.
    -   These worker threads execute the tasks in the background, allowing the event loop to remain non-blocking.
-  **Callback Handling**:
    
    -   Once the task is completed by a worker thread in the thread pool, **libuv** places the associated callback function in the **event queue**.
-  **Event Loop Processing**:
    
    -   The **event loop** eventually picks up this callback from the event queue and pushes it onto the **call stack** for execution when the call stack is empty.

### Flow of Task to Thread Pool:
:bulb: **Note**
  Asynchronous Operation (e.g., `fs.readFile`)** ➡️ 2. **libuv detects it’s an I/O task** ➡️ 3. **libuv sends it to the thread pool** ➡️ 4. **Thread pool handles it** ➡️ 5. **Callback placed in the event queue** ➡️ 6. **Event loop processes callback.

### 12. **What is Call Stack?**

The **call stack** is a data structure that manages the execution of **synchronous code**. It operates in a **Last In, First Out (LIFO)** manner. When a function is called, it gets pushed onto the call stack. When the function returns or finishes execution, it gets popped off the stack.

-   If the call stack is busy (full of synchronous tasks), the event loop has to wait.
-   If the call stack is empty, the event loop can pick up tasks from the event queue and push them onto the call stack for execution.

### 13. **Event Loop and Call Stack Relationship**

-   The **event loop** constantly monitors the **call stack** and the **event queue**. If the call stack is empty, the event loop moves the next task from the event queue to the call stack for execution.
    
-   The **call stack** is responsible for handling both synchronous code and the execution of asynchronous callbacks that have been placed in the event queue by the event loop.
    

### 14. **Where Does the Call Stack Lie?**

The **call stack** is not separate from Node.js or the event loop. It is a fundamental part of the **JavaScript engine (like V8)**. The event loop interacts with the call stack, but the stack itself is managed by the JavaScript runtime engine that Node.js uses (V8).
#

### **Summary of How Node.js Handles Each Operation**:

1.  **Synchronous Operations** (e.g., `console.log`) are handled directly by the **call stack**.
    
2.  **Asynchronous I/O Operations** (e.g., `fs.readFile`, `fs.writeFile`) are delegated to the **thread pool** (via `libuv`), and their callbacks are placed in the **event queue** when complete.
    
3.  **Timers** (`setTimeout`) are scheduled by the **event loop**, and their callbacks are placed in the **event queue** when the timer expires.
    
4.  **HTTP Requests** are monitored by the **event loop**, and when a request is received, the callback is placed in the **event queue**.
    
5.  **Event Queue and Event Loop**: Once the call stack is empty, the **event loop** continuously checks the **event queue** for tasks. It processes tasks in order, executing their callbacks on the call stack.
    
6.  **Thread Pool**: The **thread pool** is used for handling blocking or expensive asynchronous operations (e.g., file system tasks or database queries), ensuring non-blocking behavior.