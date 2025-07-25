import { createProject } from "../App/barrel.js";
import { createTodo } from "../App/barrel.js";
import { updateProjectDropdown } from "../App/barrel.js";

function getFormData(){
    const forms = document.querySelectorAll("form");
    
    forms.forEach(form => {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (form.classList == "project"){
                const name = document.querySelector("#name").value;
                createProject(name);
                updateProjectDropdown();
            } else {

                const title = document.querySelector("#title").value;
                const description = document.querySelector("textarea").value || "No description";
                const dueDate = document.querySelector("#date").value || "No Date";

                const priority = document.querySelector('input[name="priority"]:checked')?.value;
                const toProject = document.querySelector("#toProject").value || "default";
                createTodo(title,description,dueDate,priority,toProject);
            }
        })
    })
}

getFormData()