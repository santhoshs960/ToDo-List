import {displayProjects, arrStore , retrieveData} from "./barrel.js";
import { storeData } from "./project.js";


class Todo {
    static Id = 1;
    constructor(title,description,dueDate,priority,toProject) {
        this.id = Todo.Id++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.toProject = (!toProject || toProject === "" || toProject === "Click here to select a project") 
            ? "default" 
            : toProject;   
    }

    passTodo(){
        const { projects } = arrStore;
        for (let i=0;i<projects.length;i++){
            if (projects[i].name == this.toProject){
                projects[i].storeTodo.push(this);
            }
        }
    }
}

export function createTodo(...rest){
    const { todos } = arrStore;
    const todo = new Todo(...rest);
    todo.passTodo();
    todos.push(todo);
    
    // Store both todos and projects
    storeData("todos", todos);
    storeData("projects", arrStore.projects);
    
    displayProjects(); 
}


// function displayTodo(){
//     console.log("hi");
//     const projects = retrieveData("projects");
//     projects.forEach(project => {
//         const todosContainer = document.querySelectorAll(".todos-container");
//         project.storeTodo.forEach(todo => {
//             todosContainer.forEach(todocontainer => {

//             const todoItem = createAppend("div", todoContainer);
//             todoItem.classList.add("todo-item");
//             todoItem.dataset.id = todo.id;

//             const todoHead = createAppend("div", todoItem);
//             todoHead.classList.add("todoHead");
            
//             const todoTitle = createAppend("h5", todoHead);
//             todoTitle.classList.add("todoTitle");
//             todoTitle.textContent = todo.title;
            
//             const todoDate = createAppend("div", todoHead);
//             todoDate.classList.add("todoDate");
//             todoDate.textContent = `Due: ${todo.dueDate}`;
            
//             const toggleBtn = createAppend("div", todoHead);
//             toggleBtn.classList.add("view");
//             toggleBtn.dataset.id = todo.id;
//             toggleBtn.textContent = "▲"; 

//             // Add todo delete button
//             const deleteTodoBtn = createAppend("div", todoHead);
//             deleteTodoBtn.classList.add("delete-btn");
//             deleteTodoBtn.textContent = "×";
//             deleteTodoBtn.dataset.id = todo.id;
//             deleteTodoBtn.dataset.type = "todo";

//             const todoDesc = createAppend("p", todoItem);
//             todoDesc.classList.add("todoDesc", "hidden_todo", "group_todo");
//             todoDesc.textContent = todo.description;
            
//             const todoPriority = createAppend("p", todoItem);
//             todoPriority.classList.add("todoPriority", "hidden_todo", "group_todo");
//             todoPriority.textContent = `Priority: ${todo.priority}`;
//             })
//         })
//     });
// }

(function initTodos() {
    const storedTodos = retrieveData("todos");
    if (storedTodos) {
        arrStore.todos = storedTodos;
        // Restore Todo IDs to prevent duplicates
        if (storedTodos.length > 0) {
            Todo.Id = Math.max(...storedTodos.map(t => t.id)) + 1;
        }
    }
})();