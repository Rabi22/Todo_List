const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
var app = express();

app.use(express.static('public')); //Serves static files (CSS, JavaScript, images, etc.) from the 'public' directory.
app.use(methodOverride('_method'));//Allows HTML forms to simulate PUT, DELETE methods
app.use(express.urlencoded({ extended: true })); //Parses formm data submitted via HTML forms (URL-encoded data) and convert it into js objects.
app.set('view engine', 'ejs');//Tells Express to use EJS for processing .ejs files

var items = [];

// app.use((req, res, next) => {
//     next(); //Calls the next middleware function in the stack
// })

app.get('/', (req, res) => {
    res.render('index',{ejes: items}); //Renders the 'index.ejs' template and passes the items array to task variable
    console.log('Current tasks:', items); //Logs the current items to the console
});

app.post('/', (req, res) => {
    const task = req.body.todo_input; //Gets the task from form input as name :'todo_input'
    if(task && task.trim() !== '') {
         items.push(task.trim()); //Adds the task to the items array
         console.log('Added item:', task.trim()); //Logs the added item
     }
     res.redirect('/'); //Redirects to the root route to display the updated list
    console.log(task); //Logs the received task
});

// DELETE method 
app.delete('/task/:index', (req, res) => {//:index is the value that will be passed in the URL to identify which item to delete
    const idx = parseInt(req.params.index);
    if (!isNaN(idx) && idx >= 0 && idx < items.length) {
        items.splice(idx, 1); // Remove the item at the given index
    }
    res.redirect('/');
});

// PUT method for edit/update operation
app.put('/task/:index', (req, res) => {
    const idx = parseInt(req.params.index);
    const newTask = req.body.newTask;
    if (!isNaN(idx) && idx >= 0 && idx < items.length && newTask && newTask.trim() !== '') {
        items[idx] = newTask.trim(); // Update the item at the given index
    }
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// *Ignore comments please*