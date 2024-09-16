# How nodejs works ?

 Node.js is a js runtime build on V8 engine , that allow us to run javascript outside the browser or server-side.

Node.js is single threaded , it is event driven architecture. It operates on a single thread using a non-blocking , asynchronous acrchitecute. It handles the requests as per their nature (blocking or non-blocking) . Event loop , event queue , and thread pool are the key concepts used in node.js.

Lets break down these concepts using the nature of requests to a node.js server.

1. **Event queue**  
    When requests are arrived in server, the event queue holds these events or tasks waiting to processed by the `Event loop`. Events like http requess , file i/o are pushed into this queue. and nodejs picks them up from here for processing.

2.  **Event loop**
 It is the heart of Node.js . It continuously checks the event queue for tasks to execute.Event loop pick up the request from event queue. If the task is non-blocking, they are processed here and executed immediately. if a task is blocking, node js pass it to other resources called `thread Pool` , so the main thread doesn't block.
 example.
    ```javascript
    const http = require('http');

     const server = http.createServer((req, res) => {
     if (req.url === "/") {
    // Simulating non-blocking with setTimeout
    setTimeout(() => {
      res.end('Non-blocking request');
    }, 2000);
      }
     });

     server.listen(3000, () => {
      console.log('Server running on port 3000');
     });

    ```
     Here, the `setTimeout` function is non-blocking. the event loop doesn't wait for 2 second. instead it continues to process other request.

4. **Thread pool**
 Node js uses `Thread pool`, which is build by using the c++ library called libuv to handle the sync requests. When event loop counter the blocking request from the user, it will be assigned to thread pool to handle. where the blocking requests are handle by offloading to worker threads. Node js has a default pool size of 4 thread, but we can adjust this using `UV_THREADPOOL_SIZE`. We can maximize the thread size on the basis of how many CPU cores are avialable on or machine. 

    While increasing the thread pool size can improve the performance of blocking operations, simply matching the number of threads to CPU cores doesn’t always result in better performance. The thread pool handles I/O-bound tasks (which don’t heavily use CPU). Hence, the ideal thread pool size depends on the ratio of I/O-bound tasks to CPU-bound tasks in your application.


### Summary

-   **Event Queue**: Holds tasks waiting for execution.
-   **Event Loop**: Picks up tasks from the queue and processes them. If non-blocking, they are handled immediately; if blocking, they are deferred.
-   **Thread Pool**: Handles expensive blocking operations (like I/O) to avoid blocking the main event loop.

 



