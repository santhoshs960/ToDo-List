import {displayProjects, arrStore } from "./barrel.js";


class Todo {
    static Id = 1;
    constructor(title,description,dueDate,priority,toProject) {
        this.id = Todo.Id++;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.toProject = (this.toProject == "") ? this.toProject : "default";    
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
    displayProjects();
}
