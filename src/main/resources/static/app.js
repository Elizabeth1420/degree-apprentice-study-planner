const SUPABASE_URL = "https://rgcqqlolyxkaecqfsxqf.supabase.co";
const SUPABASE_KEY = "sb_publishable_ujwspOExE_GpvD_GdrtO8w_guu_Ig7J";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const loginForm = document.getElementById("login-form");
const assignmentForm = document.getElementById("assignment-form");
const loadAssignmentsButton = document.getElementById("load-assignments-button");
const assignmentList = document.getElementById("assignment-list");
const profile = document.getElementById("profile");
const output = document.getElementById("output");
const assignmentDetailSection = document.getElementById("assignment-detail-section");
const assignmentDetail = document.getElementById("assignment-detail");
const deleteAssignmentButton = document.getElementById("delete-assignment-button");
const briefTextInput = document.getElementById("brief-text");
const saveBriefTextButton = document.getElementById("save-brief-text-button");
const briefFileInput = document.getElementById("brief-file");
const uploadBriefFileButton = document.getElementById("upload-brief-file-button");
const generateRequirementsButton = document.getElementById("generate-requirements-button");
const requirementsList = document.getElementById("requirements-list");
const generateTasksButton = document.getElementById("generate-tasks-button");
const tasksList = document.getElementById("tasks-list");
const manualTaskForm = document.getElementById("manual-task-form");
const manualTaskTitleInput = document.getElementById("manual-task-title");
const manualTaskDescriptionInput = document.getElementById("manual-task-description");
const studySessionForm = document.getElementById("study-session-form");
const studySessionList = document.getElementById("study-session-list");
const progressSummary = document.getElementById("progress-summary");
const studyHistory = document.getElementById("study-history");

let accessToken = null;
let selectedAssignmentId = null;

function show(message) {
  output.textContent = message;
}

async function apiFetch(path, options = {}) {
  return fetch(path, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`
    }
  });
}

async function loadProfile() {
  const response = await apiFetch("/api/me");
  const text = await response.text();

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${text}`);
    return null;
  }

  const data = JSON.parse(text);
  profile.textContent = `Signed in as ${data.email}`;
  return data;
}

function formatDuration(seconds) {
  const totalSeconds = Number(seconds || 0);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = totalSeconds % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  }

  if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  }

  return `${remainingSeconds}s`;
}

async function loadProgress(assignmentId) {
  const response = await apiFetch(`/api/assignments/${assignmentId}/progress`);

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  const progress = await response.json();

  progressSummary.replaceChildren();

  addProgressItem("Task completion", `${progress.taskCompletionPercentage}%`);
  addProgressItem("Tasks", `${progress.completedTasks} complete out of ${progress.totalTasks}`);
  addProgressItem("Approved tasks", `${progress.approvedTasks}`);
  addProgressItem("Suggested tasks", `${progress.suggestedTasks}`);
  addProgressItem("Study sessions", `${progress.completedSessions} complete out of ${progress.totalSessions}`);
  addProgressItem("Active sessions", `${progress.activeSessions}`);
  addProgressItem("Total study time", formatDuration(progress.totalStudySeconds));
}

function addProgressItem(label, value) {
  const paragraph = document.createElement("p");
  const labelElement = document.createElement("strong");

  labelElement.textContent = `${label}: `;
  paragraph.appendChild(labelElement);
  paragraph.append(value);

  progressSummary.appendChild(paragraph);
}

async function loadAssignments() {
  const response = await apiFetch("/api/assignments");

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  const assignments = await response.json();
  assignmentList.innerHTML = "";

  if (assignments.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No assignments yet.";
    assignmentList.appendChild(item);
    return;
  }

    for (const assignment of assignments) {
        const item = document.createElement("li");
        const button = document.createElement("button");

        button.type = "button";
        button.textContent = `${assignment.moduleCode || "No module code"} - ${assignment.moduleTitle || "Untitled assignment"}`;
        button.addEventListener("click", () => loadAssignmentDetail(assignment.assignmentId));

        item.appendChild(button);
        assignmentList.appendChild(item);
}
}

function addDetail(label, value) {
  const paragraph = document.createElement("p");
  const labelElement = document.createElement("strong");

  labelElement.textContent = `${label}: `;
  paragraph.appendChild(labelElement);
  paragraph.append(value || "");

  assignmentDetail.appendChild(paragraph);
}

async function loadAssignmentDetail(assignmentId) {
  const response = await apiFetch(`/api/assignments/${assignmentId}`);

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }


  const assignment = await response.json();
  selectedAssignmentId = assignment.assignmentId;
  briefTextInput.value = assignment.extractedText || "";
  assignmentDetail.replaceChildren();
  assignmentDetailSection.hidden = false;

  addDetail("Module", `${assignment.moduleCode || ""} - ${assignment.moduleTitle || ""}`);
  addDetail("Module leader", assignment.moduleLeader);
  addDetail("Assignment type", assignment.assignmentType);
  addDetail("Assignment weighting", assignment.assignmentWeighting);
  addDetail("Official deadline", assignment.officialDeadline);
  addDetail("Personal target date", assignment.personalTargetDate);
  addDetail("Assignment task", assignment.assignmentTask);
  addDetail("Assessment criteria", assignment.assessmentCriteria);
  addDetail("Learning outcomes / KSBs", assignment.learningOutcomesKsbs);
  addDetail("Referencing guidance", assignment.referencingGuidance);
  addDetail("Personal assignment goal", assignment.personalAssignmentGoal);
  addDetail("Uploaded file", assignment.uploadedFileName);
  addDetail("Uploaded file type", assignment.uploadedFileType);
  await loadProgress(selectedAssignmentId);
  await loadRequirements(selectedAssignmentId);
  await loadTasks(selectedAssignmentId);
  await loadStudySessions(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
}

async function loadRequirements(assignmentId) {
  const response = await apiFetch(`/api/assignments/${assignmentId}/requirements`);

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  const requirements = await response.json();
  requirementsList.innerHTML = "";

  if (requirements.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No requirements generated yet.";
    requirementsList.appendChild(item);
    return;
  }

  for (const requirement of requirements) {
    const item = document.createElement("li");
    item.textContent = `${requirement.requirementText} (${requirement.sourceSection})`;
    requirementsList.appendChild(item);
  }
}

async function loadTasks(assignmentId) {
  const response = await apiFetch(`/api/assignments/${assignmentId}/tasks`);

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  const tasks = await response.json();
  tasksList.innerHTML = "";

  if (tasks.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No tasks generated yet.";
    tasksList.appendChild(item);
    return;
  }

  for (const task of tasks) {
    const item = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${task.taskTitle} - ${task.taskStatus} (${task.approvalStatus}) `;

    const approveButton = document.createElement("button");
    approveButton.type = "button";
    approveButton.textContent = "Approve";
    approveButton.disabled = task.approvalStatus !== "SUGGESTED";
    approveButton.addEventListener("click", () => approveTask(task.taskId));

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = "Mark complete";
    completeButton.disabled = task.taskStatus === "COMPLETE" || task.approvalStatus !== "APPROVED";
    completeButton.addEventListener("click", () => completeTask(task.taskId));

    item.appendChild(text);

    if (task.approvalStatus !== "REJECTED") {
      item.appendChild(approveButton);
      item.appendChild(completeButton);
    }

    if (task.origin === "AI" && task.approvalStatus === "SUGGESTED") {
      const rejectButton = document.createElement("button");
      rejectButton.type = "button";
      rejectButton.textContent = "Reject";
      rejectButton.addEventListener("click", () => rejectTask(task.taskId));
      item.appendChild(rejectButton);
    }

    tasksList.appendChild(item);
  }
}

async function approveTask(taskId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/tasks/${taskId}/approve`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadTasks(selectedAssignmentId);
  show("Task approved.");
}

async function rejectTask(taskId) {
  const confirmed = window.confirm("Reject this generated task?");

  if (!confirmed) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/tasks/${taskId}/reject`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadTasks(selectedAssignmentId);
  await loadStudySessions(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
  await loadProgress(selectedAssignmentId);
  show("Generated task rejected.");
}

async function completeTask(taskId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/tasks/${taskId}/complete`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadTasks(selectedAssignmentId);
  show("Task marked complete.");

  await loadStudySessions(selectedAssignmentId);
}

async function createManualTask(taskTitle, taskDescription) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      taskTitle,
      taskDescription: taskDescription || null
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  manualTaskForm.reset();
  await loadTasks(selectedAssignmentId);
  await loadStudySessions(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
  await loadProgress(selectedAssignmentId);
  show("Manual task added.");
}

async function deleteManualTask(taskId) {
  const confirmed = window.confirm("Delete this manual task?");

  if (!confirmed) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/tasks/${taskId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadTasks(selectedAssignmentId);
  await loadStudySessions(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
  await loadProgress(selectedAssignmentId);
  show("Manual task deleted.");
}

async function loadStudySessions(assignmentId) {
  const response = await apiFetch(`/api/assignments/${assignmentId}/study-sessions`);

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  const sessions = await response.json();
  studySessionList.innerHTML = "";

  if (sessions.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No study sessions planned yet.";
    studySessionList.appendChild(item);
    return;
  }

  const tasksResponse = await apiFetch(`/api/assignments/${assignmentId}/tasks`);

  if (!tasksResponse.ok) {
    show(`${tasksResponse.status} ${tasksResponse.statusText}\n${await tasksResponse.text()}`);
    return;
  }

  const tasks = await tasksResponse.json();

  for (const session of sessions) {
    const item = document.createElement("li");

    const text = document.createElement("span");
    text.textContent = `${session.sessionDate} - ${session.sessionName || "Study session"} (${session.sessionStatus}, ${session.timerStatus}, ${session.durationSeconds || 0}s) `;

    const startButton = document.createElement("button");
    startButton.type = "button";
    startButton.textContent = "Start";
    startButton.disabled = session.timerStatus !== "NOT_STARTED";
    startButton.addEventListener("click", () => startStudySession(session.sessionId));

    const pauseButton = document.createElement("button");
    pauseButton.type = "button";
    pauseButton.textContent = "Pause";
    pauseButton.disabled = session.timerStatus !== "RUNNING";
    pauseButton.addEventListener("click", () => pauseStudySession(session.sessionId));

    const resumeButton = document.createElement("button");
    resumeButton.type = "button";
    resumeButton.textContent = "Resume";
    resumeButton.disabled = session.timerStatus !== "PAUSED";
    resumeButton.addEventListener("click", () => resumeStudySession(session.sessionId));

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = "Complete";
    completeButton.disabled = session.sessionStatus === "COMPLETED";
    completeButton.addEventListener("click", () => completeStudySession(session.sessionId));

    item.appendChild(text);
    item.appendChild(startButton);
    item.appendChild(pauseButton);
    item.appendChild(resumeButton);
    item.appendChild(completeButton);

    const linkedTasks = await loadSessionTasks(assignmentId, session.sessionId);
    const linkedTaskIds = linkedTasks.map(sessionTask => sessionTask.taskId);

    const sessionTaskList = document.createElement("ul");

    for (const sessionTask of linkedTasks) {
      const linkedTask = tasks.find(task => task.taskId === sessionTask.taskId);
      const linkedItem = document.createElement("li");

      linkedItem.textContent = linkedTask ? linkedTask.taskTitle : sessionTask.taskId;

      const outcomeInput = document.createElement("textarea");
      outcomeInput.placeholder = "Task outcome";
      outcomeInput.value = sessionTask.outcome || "";

      const saveOutcomeButton = document.createElement("button");
      saveOutcomeButton.type = "button";
      saveOutcomeButton.textContent = "Save outcome";
      saveOutcomeButton.addEventListener("click", () => {
        saveTaskOutcome(session.sessionId, sessionTask.taskId, outcomeInput.value);
      });

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.disabled = session.sessionStatus === "COMPLETED";
      removeButton.addEventListener("click", () => removeTaskFromStudySession(session.sessionId, sessionTask.taskId));

      linkedItem.append(" ");
      linkedItem.appendChild(outcomeInput);
      linkedItem.appendChild(saveOutcomeButton);
      linkedItem.appendChild(removeButton);
      sessionTaskList.appendChild(linkedItem);
    }

    const availableTasks = tasks.filter(task =>
      !linkedTaskIds.includes(task.taskId) &&
      task.approvalStatus === "APPROVED"
    );

    const taskSelect = document.createElement("select");
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.textContent = "Choose task";
    taskSelect.appendChild(placeholderOption);

    for (const task of availableTasks) {
      const option = document.createElement("option");
      option.value = task.taskId;
      option.textContent = task.taskTitle;
      taskSelect.appendChild(option);
    }

    const addTaskButton = document.createElement("button");
    addTaskButton.type = "button";
    addTaskButton.textContent = "Add task";
    addTaskButton.disabled = availableTasks.length === 0 || session.sessionStatus === "COMPLETED";
    addTaskButton.addEventListener("click", () => {
      if (taskSelect.value) {
        addTaskToStudySession(session.sessionId, taskSelect.value);
      }
    });

    const notesInput = document.createElement("textarea");
    notesInput.placeholder = "Session notes";
    notesInput.value = session.sessionNotes || "";

    const saveNotesButton = document.createElement("button");
    saveNotesButton.type = "button";
    saveNotesButton.textContent = "Save notes";
    saveNotesButton.addEventListener("click", () => {
      saveStudySessionNotes(session.sessionId, notesInput.value);
    });

    item.appendChild(sessionTaskList);
    item.appendChild(taskSelect);
    item.appendChild(addTaskButton);
    item.appendChild(notesInput);
    item.appendChild(saveNotesButton);

    studySessionList.appendChild(item);
  }
}

async function startStudySession(sessionId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/start`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  show("Study session started.");
}

async function pauseStudySession(sessionId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/pause`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  show("Study session paused.");
}

async function resumeStudySession(sessionId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/resume`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  show("Study session resumed.");
}

async function completeStudySession(sessionId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/complete`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
  await loadProgress(selectedAssignmentId);
  show("Study session completed.");
}

async function loadStudyHistory(assignmentId) {
  const sessionsResponse = await apiFetch(`/api/assignments/${assignmentId}/study-sessions`);

  if (!sessionsResponse.ok) {
    show(`${sessionsResponse.status} ${sessionsResponse.statusText}\n${await sessionsResponse.text()}`);
    return;
  }

  const tasksResponse = await apiFetch(`/api/assignments/${assignmentId}/tasks`);

  if (!tasksResponse.ok) {
    show(`${tasksResponse.status} ${tasksResponse.statusText}\n${await tasksResponse.text()}`);
    return;
  }

  const sessions = await sessionsResponse.json();
  const tasks = await tasksResponse.json();

  studyHistory.replaceChildren();

  if (sessions.length === 0) {
    studyHistory.textContent = "No study history yet.";
    return;
  }

  for (const session of sessions) {
    const sessionBlock = document.createElement("div");
    const heading = document.createElement("h4");

    heading.textContent = `${session.sessionDate} - ${session.sessionName || "Study session"}`;
    sessionBlock.appendChild(heading);

    addHistoryItem(sessionBlock, "Status", `${session.sessionStatus}, ${session.timerStatus}`);
    addHistoryItem(sessionBlock, "Duration", formatDuration(session.durationSeconds));

    if (session.sessionGoal) {
      addHistoryItem(sessionBlock, "Goal", session.sessionGoal);
    }

    if (session.sessionNotes) {
      addHistoryItem(sessionBlock, "Notes", session.sessionNotes);
    }

    const linkedTasks = await loadSessionTasks(assignmentId, session.sessionId);

    if (linkedTasks.length > 0) {
      const taskList = document.createElement("ul");

      for (const sessionTask of linkedTasks) {
        const task = tasks.find(task => task.taskId === sessionTask.taskId);
        const taskItem = document.createElement("li");

        taskItem.textContent = task ? task.taskTitle : sessionTask.taskId;

        if (sessionTask.outcome) {
          taskItem.textContent += ` - Outcome: ${sessionTask.outcome}`;
        }

        taskList.appendChild(taskItem);
      }

      sessionBlock.appendChild(taskList);
    }

    studyHistory.appendChild(sessionBlock);
  }
}

function addHistoryItem(container, label, value) {
  const paragraph = document.createElement("p");
  const labelElement = document.createElement("strong");

  labelElement.textContent = `${label}: `;
  paragraph.appendChild(labelElement);
  paragraph.append(value || "");

  container.appendChild(paragraph);
}

async function loadSessionTasks(assignmentId, sessionId) {
  const response = await apiFetch(`/api/assignments/${assignmentId}/study-sessions/${sessionId}/tasks`);

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return [];
  }

  return response.json();
}

async function addTaskToStudySession(sessionId, taskId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/tasks/${taskId}`, {
    method: "POST"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  show("Task added to study session.");
}

async function removeTaskFromStudySession(sessionId, taskId) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/tasks/${taskId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  show("Task removed from study session.");
}

async function saveStudySessionNotes(sessionId, sessionNotes) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/notes`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionNotes
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  show("Study session notes saved.");
}

async function saveTaskOutcome(sessionId, taskId, outcome) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/tasks/${taskId}/outcome`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      outcome
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadStudySessions(selectedAssignmentId);
  show("Task outcome saved.");
}


loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    show(`Sign in failed: ${error.message}`);
    return;
  }

  accessToken = data.session.access_token;

  const user = await loadProfile();

  if (user) {
    loginSection.hidden = true;
    dashboardSection.hidden = false;
    show("Signed in successfully.");
    await loadAssignments();
  }
});

assignmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const response = await apiFetch("/api/assignments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      moduleCode: document.getElementById("module-code").value || null,
      moduleTitle: document.getElementById("module-title").value || null,
      moduleLeader: document.getElementById("module-leader").value || null,
      assignmentType: document.getElementById("assignment-type").value || null,
      assignmentWeighting: document.getElementById("assignment-weighting").value || null,
      assignmentTask: document.getElementById("assignment-task").value || null,
      assessmentCriteria: document.getElementById("assessment-criteria").value || null,
      learningOutcomesKsbs: document.getElementById("learning-outcomes-ksbs").value || null,
      referencingGuidance: document.getElementById("referencing-guidance").value || null,
      officialDeadline: document.getElementById("official-deadline").value || null,
      personalTargetDate: document.getElementById("personal-target-date").value || null,
      personalAssignmentGoal: document.getElementById("personal-assignment-goal").value || null
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  show("Assignment created.");
  assignmentForm.reset();
  await loadAssignments();
});

manualTaskForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!selectedAssignmentId) {
    return;
  }

  await createManualTask(
    manualTaskTitleInput.value,
    manualTaskDescriptionInput.value
  );
});

studySessionForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!selectedAssignmentId) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionName: document.getElementById("session-name").value || null,
      sessionDate: document.getElementById("session-date").value,
      sessionGoal: document.getElementById("session-goal").value || null
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  studySessionForm.reset();
  await loadStudySessions(selectedAssignmentId);
  show("Study session created.");
});

deleteAssignmentButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  const confirmed = window.confirm("Delete this assignment?");

  if (!confirmed) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  selectedAssignmentId = null;
  briefTextInput.value = "";
  assignmentDetail.replaceChildren();
  assignmentDetailSection.hidden = true;
  show("Assignment deleted.");
  await loadAssignments();
});

saveBriefTextButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/brief-text`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      extractedText: briefTextInput.value || null
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadAssignmentDetail(selectedAssignmentId);
  show("Brief text saved.");
});

uploadBriefFileButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  const file = briefFileInput.files[0];

  if (!file) {
    show("Choose a file first.");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/brief-file`, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  briefFileInput.value = "";
  await loadAssignmentDetail(selectedAssignmentId);
  show("Brief file uploaded.");
});

generateRequirementsButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/requirements/generate`, {
    method: "POST"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadRequirements(selectedAssignmentId);
  show("Requirements generated.");
});

generateTasksButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/tasks/generate`, {
    method: "POST"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadTasks(selectedAssignmentId);
  show("Tasks loaded or generated.");
});

loadAssignmentsButton.addEventListener("click", loadAssignments);