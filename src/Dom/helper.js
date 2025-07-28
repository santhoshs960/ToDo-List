import { arrStore , toggleBasedView, displayProjects, storeData, retrieveData} from "../App/barrel.js";


export function updateProjectDropdown() {
    const select = document.querySelector("#toProject");

    select.innerHTML = `<option disabled selected hidden>Click here to select a project</option>`;

    arrStore.projects.forEach(project => {
        const option = document.createElement("option");
        option.textContent = project.name;
        option.value = project.name;
        select.appendChild(option);
    });
}

document.addEventListener("DOMContentLoaded", updateProjectDropdown);

const popup = (function(){
    const projectBtn = document.querySelector(".add_project");
    const todoBtn = document.querySelector(".add_todo");
    const closeBtns = document.querySelectorAll(".close");
    const projectForm = document.querySelector(".project_form");
    const todoForm = document.querySelector(".todo_form");

    projectBtn.addEventListener("click", () => {
        projectForm.classList.remove("hidden");
    })

    todoBtn.addEventListener("click", () => {
        todoForm.classList.remove("hidden");
    })

    closeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            btn.closest(".hidden_form").classList.add("hidden");
        })
    })

})();

export function createAppend(element, parent) {
    const tag = document.createElement(element);
    parent.appendChild(tag);
    return tag;
}

const changeToggle = (function (){
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("view")) {
            e.target.textContent = e.target.textContent === "▲" ? "▼" : "▲";
            toggleBasedView(e);
        }
        else if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            const type = e.target.dataset.type;
            

            if (confirm(`Are you sure you want to delete this ${type}?`)) {
                deleteItem(type, id);
            }
        }
    });
})();

export function deleteItem(itemType, id) {
    const { projects, todos } = arrStore;
    
    if (itemType === 'project') {
        const projectIndex = projects.findIndex(p => p.id === id);
        if (projectIndex !== -1) {

            const projectName = projects[projectIndex].name;
            arrStore.todos = todos.filter(todo => todo.toProject !== projectName);
            
            projects.splice(projectIndex, 1);
            
            storeData("projects", projects);
            storeData("todos", arrStore.todos);
        }
    } 
    else if (itemType === 'todo') {
        const todoIndex = todos.findIndex(t => t.id === id);
        if (todoIndex !== -1) {
            const todo = todos[todoIndex];
            
            todos.splice(todoIndex, 1);
            
            const project = projects.find(p => p.name === todo.toProject);
            if (project) {
                const projectTodoIndex = project.storeTodo.findIndex(t => t.id === id);
                if (projectTodoIndex !== -1) {
                    project.storeTodo.splice(projectTodoIndex, 1);
                }
            }
            
            storeData("projects", projects);
            storeData("todos", todos);
        }
    }
    
    displayProjects();
}
