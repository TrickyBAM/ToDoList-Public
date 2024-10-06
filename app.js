// Full JavaScript for Shared To-Do List App with Firebase Integration

window.onload = function () {
    console.log("Page loaded, initializing Firebase...");

    // Connect to Firebase Realtime Database
    try {
        const db = firebase.database();
        console.log("Firebase connected successfully");

        function addTask() {
            console.log("addTask function called");
            const taskInput = document.getElementById('taskInput');

            if (taskInput.value.trim() !== '') {
                console.log("Task input is valid, adding task...");
                // Add a new task to Firebase
                const newTaskRef = db.ref('tasks').push();
                newTaskRef.set({
                    task: taskInput.value,
                    completed: false
                }).then(() => {
                    console.log("Task added successfully");
                }).catch((error) => {
                    console.error("Error adding task: ", error);
                });
                taskInput.value = '';
            } else {
                console.warn("Task input is empty. Please enter a task.");
            }
        }

        // Listen for real-time updates
        db.ref('tasks').on('value', (snapshot) => {
            console.log("Received snapshot value, updating task list...");
            const taskList = document.getElementById('taskList');
            taskList.innerHTML = ''; // Clear existing tasks
            snapshot.forEach((taskSnapshot) => {
                const taskData = taskSnapshot.val();
                const li = document.createElement('li');
                const taskText = document.createElement('span');
                taskText.textContent = taskData.task;

                if (taskData.completed) {
                    taskText.classList.add('completed');
                }
                li.appendChild(taskText);

                // Checkbox to mark task as completed
                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = taskData.completed;
                checkbox.onclick = () => {
                    db.ref('tasks/' + taskSnapshot.key).update({
                        completed: checkbox.checked
                    }).then(() => {
                        console.log("Task status updated successfully");
                    }).catch((error) => {
                        console.error("Error updating task: ", error);
                    });
                };
                li.insertBefore(checkbox, taskText);

                // Delete button
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('delete-btn');
                deleteBtn.onclick = () => {
                    db.ref('tasks/' + taskSnapshot.key).remove().then(() => {
                        console.log("Task deleted successfully");
                    }).catch((error) => {
                        console.error("Error deleting task: ", error);
                    });
                };
                li.appendChild(deleteBtn);

                taskList.appendChild(li);
            });
        });

        // Make addTask function available globally
        window.addTask = addTask;

    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
};
