# Data Modelling for the backend with Mongoose.
Mongoose is an object-data-modeling (ODM) library for mongoDB(NoSQL database). An ODM is a tool or library that provides a higher-level abstraction for working with databases, making it easier for developers to interact with a database using the JS. 

Data modeling with mongoose involves defining schemas and creating models to interact with mongodb. This process allows us to structure and validate our data before it gets saved to the database. Mongoose provides several features and methods to facilitate this process. 

## What is data modeling?
Data modeling is a process in which the structure, organization, and relationships of data are defined and documented to facilate effective data management and informal retrieval. It is an essential step in designing and developing a database or information system, and it helps ensure that data is structured in a way that accuratel represents the real world entities and relationships it represents.

**Key aspects of data modeling include:**
   1. *Entities*: Data modeling identifies the entities or objects that need to be represented in the system. These entities can be physical (user, customers, products) or conceptual (order, invoice).
   2. *Attributes*: For each entity, data modeling defines the attributes or properties that describe the entity. For example, a "customer" entity might have attributes like 'name', 'address' and 'number'. 
   3. *Data Types:* Data modeling specifies the data types for each attribute, indicating the kind of data that an attribute can hold. 

## Data modeling for todo App
We are creating a data modeling for the todo app, with three field User, Todo, and sub Todo.
Firstly, make three files (users.models.js, todo.models.js, sub_todo.models.js).in the models/todo directory. 

At first install the mongoose package.
```javascript
    npm i mongoose
```

## Defining a Schema
  A schema in mongoose defines the structure of documents within a collection. We specify the fields and their types , as well as any validation rules.
   ```javascript
   user.models.js //file name
   import mongoose from 'mongoose'
   
   const userSchema= new mongoose.Schema({})
    
   export const User= mongoose.model('User',userSchema)
  ```
  Here, we are creating a new mongoose schema named userschema using `mongoose.schema( )` A schema is a blueprint that defines the structure and constrains for our mongoDB documents (in this case, documents represents users ). 

In second line , we are creating a mongoose model named "User" using the `mongoose.model()` method,  this method take two arguments.
  - the first argument is the name we want to use for the model. 
  - the second argument is the schema you want to associate with the model.

### Define data by specifying the fields and their data types within the object passed to schema. 

```javascript
const userSchema= new mongoose.Schema({
     username:{
       type:String,
       required:true,
       unique: true,
       lowercase:true
     },email:{
       type:String,
       required:true,
       unique: true,
       lowercase:true
     },password:{
       type:String,
       required:[true, 'password is required']
     }
})
```  

### Timestamps
In mongoose, we can enable automatic timestaps for our mongoDB documents by settiing the `timestamps` option in our schema. Enabaling timestamps adds two fields,  `createdAt` and `updatedAt`, to our documents , which automatically store the creating and update timestamps when we create or modify a documents. This is a convenient way to track data . Here's how we can enable timestamps in a mongoose schema. 

  ```javascript
  const userSchema= new mongoose.Schema({....},{
     timestamps:true
    })
 ```
### Reference to another model
In Mongoose, you can establish relationships between different data models using references. This is a powerful feature that allows you to connect documents in different collections, providing a way to represent associations between data.

In the Todo app, we are giving sub-todos for the given Todo. To pass this reference,
    
````javascript  
todo.models.js  
  
const todoSchema = new mongoose.Schema({  
    content: {  
        type: String,  
        required: true,  
    },  
    complete: {  
        type: Boolean,  
        default: false  
    },  
    createdBy: {  
        type: mongoose.Schema.Type.ObjectId,  
        ref: "User"  
    },  
    subTodos: [  
      {  
          type: mongoose.Schema.Type.ObjectId,  
          ref: "SubTodo"  
       }  
    ]  //Array of Sub-Todos  
}
````
### Another Example of Data Modeling:

**Data modeling for E-commerce**
````javascript
user.models.js  
  
const userSchema = new mongoose.Schema({  
    username: {  
        type: String,  
        required: true,  
        unique: true,  
        lowercase: true  
    },  
    email: {  
        type: String,  
        required: true,  
        unique: true,  
        lowercase: true  
    },  
    password: {  
        type: String,  
        required: true  
    },  
}, {timestamp: true})
````

````javascript
product.models.js  
  
const productSchema = new mongoose.Schema({  
    description: {  
      required: true,  
      type: String  
    },  
    name: {  
      required: true,  
      type: String  
    },  
    productImage: {  
      type: String  
    },  
    price: {  
      type: Number,  
      default: 0  
    },  
    category: {  
      type: mongoose.Schema.Types.ObjectId,  
       ref: "Category"  
    },  
    owner: {  
      type: mongoose.Schema.Types.ObjectId,  
      ref: "Seller"  
    }  
},   
{timestamp: true}  
  
})
````
````javascript
order.models.js  
  
const orderItemSchema = new mongoose.Schema({  
    productId: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: "Product"  
    },  
    quantity: {  
        type: Number,  
        required: true  
    }  
})  
  
const orderSchema = new mongoose.Schema({  
    orderPrice: {  
        type: Number,  
        required: true  
    },  
    customer: {  
        type: mongoose.Schema.Type.ObjectId,  
        ref: "User"  
    },  
    orderItems: {  
        type: [orderItemSchema]  
    },  
    status: {  
        type: String,  
        enum: ["PENDING", "CANCELLED", "DELIVERED"],  
        default: "PENDING"  
    }  
}, {timestamp: true})
````
In conclusion, mastering data modeling is paramount for any backend developer navigating the dynamic landscape of MongoDB with Mongoose. This article delved into the intricate art of crafting robust data models, offering a comprehensive guide for both beginners and seasoned developers.

As you embark on your backend development journey, remember that data modeling is not just a technical task; it’s an art that requires thoughtful consideration of your application’s unique requirements. With Mongoose as your ally, you’re well-positioned to navigate the intricate landscape of MongoDB, turning your data structures into a robust foundation for seamless, performant applications.
