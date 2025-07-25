import { createAppend } from "./barrel.js";

class Project {

    static Id = 1;
    constructor(name) {
        this.id = Project.Id++;
        this.name = name;
        this.storeTodo = [];
    }
}

//to store the collection of array which contains todos & projects
export const arrStore = (function () {
    const projects = [];
    const todos = [];
    console.log(projects);
    console.log(todos);
    return { projects, todos };
})();


export function createProject(value) {
    const { projects } = arrStore;

    const project = new Project(value);
    projects.push(project);
    console.log(projects);
    displayProjects();
}

const cards = document.querySelector(".cards");

export function displayProjects() {
    cards.textContent = "";
    arrStore.projects.forEach(project => {
        const projectDiv = createAppend("div", cards);
        projectDiv.classList.add("project");
        projectDiv.dataset.projectId = project.id;
        
        const projectHeader = createAppend("div", projectDiv);
        projectHeader.classList.add("project-header");
        
        const title = createAppend("h4", projectHeader);
        title.textContent = project.name;

        // Add project delete button
        const deleteProjectBtn = createAppend("button", projectHeader);
        deleteProjectBtn.classList.add("delete-btn");
        deleteProjectBtn.textContent = "×";
        deleteProjectBtn.dataset.id = project.id;
        deleteProjectBtn.dataset.type = "project";

        const todosContainer = createAppend("div", projectDiv);
        todosContainer.classList.add("todos-container");

        project.storeTodo.forEach(todo => {
            const todoItem = createAppend("div", todosContainer);
            todoItem.classList.add("todo-item");
            todoItem.dataset.id = todo.id;

            const todoHead = createAppend("div", todoItem);
            todoHead.classList.add("todoHead");
            
            const todoTitle = createAppend("h5", todoHead);
            todoTitle.classList.add("todoTitle");
            todoTitle.textContent = todo.title;
            
            const todoDate = createAppend("div", todoHead);
            todoDate.classList.add("todoDate");
            todoDate.textContent = `Due: ${todo.dueDate}`;
            
            const toggleBtn = createAppend("div", todoHead);
            toggleBtn.classList.add("view");
            toggleBtn.dataset.id = todo.id;
            toggleBtn.textContent = "▲"; 

            // Add todo delete button
            const deleteTodoBtn = createAppend("div", todoHead);
            deleteTodoBtn.classList.add("delete-btn");
            deleteTodoBtn.textContent = "×";
            deleteTodoBtn.dataset.id = todo.id;
            deleteTodoBtn.dataset.type = "todo";

            const todoDesc = createAppend("p", todoItem);
            todoDesc.classList.add("todoDesc", "hidden_todo", "group_todo");
            todoDesc.textContent = todo.description;
            
            const todoPriority = createAppend("p", todoItem);
            todoPriority.classList.add("todoPriority", "hidden_todo", "group_todo");
            todoPriority.textContent = `Priority: ${todo.priority}`;
        });
    });
}
const ensureDefaultProject = (function(){
    const { projects } = arrStore;
    const hasDefault = projects.some(project => project.name === "default");

    if (!hasDefault) {
        const default_project = new Project("default");
        projects.push(default_project);
    }

    document.addEventListener("DOMContentLoaded", () => {
        displayProjects();
    })
})();

