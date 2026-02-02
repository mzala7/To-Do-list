document.getElementById("addTaskBtn").addEventListener("click", addTask);
document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// List of compliments (ensuring no immediate repetition)
const compliments = [
    "Great job! Keep it up! 🎉",
    "You're on fire! 🔥",
    "Well done! Another step closer to success! ✅",
    "That’s one less thing to worry about! 👍",
    "You're unstoppable! 💪",
    "Excellent work! Keep the momentum going! 🚀",
    "You're doing amazing! Keep crushing it! 👏",
    "Another task down, you're a productivity machine! 🏆"
];

let lastComplimentIndex = -1; // To prevent immediate repetition

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();

    if (taskText === "") return;

    let taskItem = createTaskElement(taskText, false);
    document.getElementById("pendingTasks").appendChild(taskItem);

    taskInput.value = "";
}

function createTaskElement(taskText, isCompleted) {
    let li = document.createElement("li");
    li.classList.add("task-item"); // Ensure task structure is well maintained

    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div class="task-buttons">
            <button class="completeBtn">${isCompleted ? "🔄" : "✅"}</button>
            <button class="deleteBtn">🗑️</button>
        </div>
    `;

    if (isCompleted) {
        li.classList.add("completed");
        document.getElementById("completedTasks").appendChild(li);
    } else {
        document.getElementById("pendingTasks").appendChild(li);
    }

    li.querySelector(".completeBtn").addEventListener("click", (event) => {
        toggleTaskStatus(li, event);
    });

    li.querySelector(".deleteBtn").addEventListener("click", () => {
        li.remove();
    });

    return li;
}

function toggleTaskStatus(taskItem, event) {
    let isCompleted = taskItem.classList.contains("completed");

    if (isCompleted) {
        taskItem.classList.remove("completed");
        taskItem.querySelector(".completeBtn").textContent = "✅";
        document.getElementById("pendingTasks").appendChild(taskItem);
    } else {
        taskItem.classList.add("completed");
        taskItem.querySelector(".completeBtn").textContent = "🔄";
        document.getElementById("completedTasks").appendChild(taskItem);

        // Show compliment **inside** the task (no overlapping)
        showFloatingCompliment(taskItem);
    }
}

function showFloatingCompliment(taskItem) {
    // Ensure no immediate repetition of compliments
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * compliments.length);
    } while (newIndex === lastComplimentIndex);

    lastComplimentIndex = newIndex;
    let randomCompliment = compliments[newIndex];

    // Remove existing compliment if any (prevents stacking within the same task)
    let existingCompliment = taskItem.querySelector(".floating-compliment");
    if (existingCompliment) {
        existingCompliment.remove();
    }

    // Create the compliment element
    let complimentDiv = document.createElement("div");
    complimentDiv.textContent = randomCompliment;
    complimentDiv.classList.add("floating-compliment");

    // Positioning fix: Attach the compliment near the complete button
    let completeBtn = taskItem.querySelector(".completeBtn");
    completeBtn.parentElement.appendChild(complimentDiv);

    // Fade out and remove after 3 seconds
    setTimeout(() => {
        complimentDiv.style.opacity = "0";
        setTimeout(() => complimentDiv.remove(), 500);
    }, 2000);
}
