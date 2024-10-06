function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() !== '') {
        const li = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = taskInput.value;
        li.appendChild(taskText);

        // Checkbox to mark task as completed
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.onclick = () => {
            taskText.classList.toggle('completed');
        };
        li.insertBefore(checkbox, taskText);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            taskList.removeChild(li);
        };
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
        taskInput.value = '';
    }
}
