document.getElementById(submit).click=()=>{
    if((document.querySelector(todo_input).innerHtml())!==''){
        items.push(document.querySelector(todo_input).innerHTML);
    }
}