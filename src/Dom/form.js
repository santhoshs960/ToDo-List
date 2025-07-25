export function toggleBasedView(e) {
    // Check if the clicked element is a toggle button
    if (e.target.classList.contains("view")) {
        const todoId = e.target.dataset.id;
        const todoItem = document.querySelector(`.todo-item[data-id="${todoId}"]`);
        
        if (todoItem) {
            const groupTodos = todoItem.querySelectorAll(".group_todo");
            groupTodos.forEach(grouptodo => {
                grouptodo.classList.toggle("hidden_todo");
            });
        }
    }
}
