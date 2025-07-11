const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const PORT = process.env.PORT || 3000;
let app = express();

app.use(express.static('public')); 
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');

const items = [];

app.get('/', (req, res) => {
    res.render('index',{ejes: items}); 
    console.log('Current tasks:', items); 
});

app.post('/', (req, res) => {
    const task = req.body.todo_input; 
    if(task && task.trim() !== '') {
         items.push(task.trim());
         console.log('Added item:', task.trim());
     }
     res.redirect('/');
    console.log(task);
});

app.delete('/task/:index', (req, res) => {
    const idx = parseInt(req.params.index);
    if (!isNaN(idx) && idx >= 0 && idx < items.length) {
        items.splice(idx, 1);
    }
    res.redirect('/');
});

app.put('/task/:index', (req, res) => {
    const idx = parseInt(req.params.index);
    const newTask = req.body.newTask;
    if (!isNaN(idx) && idx >= 0 && idx < items.length && newTask && newTask.trim() !== '') {
        items[idx] = newTask.trim(); 
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
