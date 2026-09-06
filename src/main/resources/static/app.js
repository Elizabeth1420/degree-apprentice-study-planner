const SUPABASE_URL = "https://rgcqqlolyxkaecqfsxqf.supabase.co";
const SUPABASE_KEY = "sb_publishable_ujwspOExE_GpvD_GdrtO8w_guu_Ig7J";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const homeSection = document.getElementById("home-section");
const assignmentsSection = document.getElementById("assignments-section");
const homeHeading = document.getElementById("home-heading");
const toDoTaskCount = document.getElementById("to-do-task-count");
const inProgressTaskCount = document.getElementById("in-progress-task-count");
const completeTaskCount = document.getElementById("complete-task-count");
const allTaskCount = document.getElementById("all-task-count");
const approvedTaskList = document.getElementById("approved-task-list");
const showHomeButton = document.getElementById("show-home-button");
const showAssignmentsButton = document.getElementById("show-assignments-button");
const loginForm = document.getElementById("login-form");
const showSignUpButton = document.getElementById("show-sign-up-button");
const showLoginButton = document.getElementById("show-login-button");
const authModeHeading = document.getElementById("auth-mode-heading");
const authSubmitButton = document.getElementById("auth-submit-button");
const authSwitchMessage = document.getElementById("auth-switch-message");
const authSwitchButton = document.getElementById("auth-switch-button");
const passwordInput = document.getElementById("password");
const assignmentForm = document.getElementById("assignment-form");
const assignmentCreatePanel = document.getElementById("assignment-create-panel");
const toggleAssignmentFormButton = document.getElementById("toggle-assignment-form-button");
const closeAssignmentFormButton = document.getElementById("close-assignment-form-button");
const assignmentFilterButtons = document.querySelectorAll("[data-assignment-filter]");
const editAssignmentForm = document.getElementById("edit-assignment-form");
const loadAssignmentsButton = document.getElementById("load-assignments-button");
const assignmentList = document.getElementById("assignment-list");
const profile = document.getElementById("profile");
const logOutButton = document.getElementById("log-out-button");
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
const successChecklist = document.getElementById("success-checklist");
const studyHistory = document.getElementById("study-history");

let accessToken = null;
let selectedAssignmentId = null;
let authMode = "login";
let assignmentFilter = "all";
let assignmentCardsData = [];

function show(message) {
  output.textContent = message;
}

function setAuthMode(mode) {
  authMode = mode;

  const isSignUp = mode === "sign-up";

  showSignUpButton.classList.toggle("is-active", isSignUp);
  showLoginButton.classList.toggle("is-active", !isSignUp);

  showSignUpButton.setAttribute(
    "aria-pressed",
    String(isSignUp)
  );

  showLoginButton.setAttribute(
    "aria-pressed",
    String(!isSignUp)
  );

  authModeHeading.textContent = isSignUp
    ? "Create your account"
    : "Welcome back";

  authSubmitButton.textContent = isSignUp
    ? "Create account"
    : "Log in";

  authSwitchMessage.textContent = isSignUp
    ? "Already have an account?"
    : "Do not have an account?";

  authSwitchButton.textContent = isSignUp
    ? "Log in"
    : "Sign up";

  passwordInput.autocomplete = isSignUp
    ? "new-password"
    : "current-password";
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
  homeHeading.textContent = `Hello, ${formatWelcomeName(data.email)}`;
  return data;
}

function formatWelcomeName(email) {
  const emailName = String(email || "")
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .trim();

  if (!emailName) {
    return "welcome back";
  }

  return emailName.replace(
    /\b\w/g,
    character => character.toUpperCase()
  );
}

function setApplicationView(view) {
  const showHome = view === "home";

  homeSection.hidden = !showHome;
  assignmentsSection.hidden = showHome;

  showHomeButton.classList.toggle("is-active", showHome);
  showAssignmentsButton.classList.toggle("is-active", !showHome);

  if (showHome) {
    showHomeButton.setAttribute("aria-current", "page");
    showAssignmentsButton.removeAttribute("aria-current");
  } else {
    showAssignmentsButton.setAttribute("aria-current", "page");
    showHomeButton.removeAttribute("aria-current");
  }
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
  addProgressItem("Approved task progress", `${progress.completedTasks} complete out of ${progress.totalTasks}`);
  addProgressItem("Approved tasks", `${progress.approvedTasks}`);
  addProgressItem("Suggested tasks", `${progress.suggestedTasks}`);
  addProgressItem("Rejected tasks", `${progress.rejectedTasks}`);
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

async function loadSuccessChecklist(assignmentId) {
  const response = await apiFetch(`/api/assignments/${assignmentId}/analysis/success-checklist`);

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  const checklistItems = await response.json();
  successChecklist.replaceChildren();

  if (checklistItems.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No success checklist available yet.";
    successChecklist.appendChild(item);
    return;
  }

  for (const checklistItem of checklistItems) {
    const item = document.createElement("li");
    item.textContent = checklistItem;
    successChecklist.appendChild(item);
  }
}

function setAssignmentCreatePanel(open) {
  assignmentCreatePanel.hidden = !open;

  toggleAssignmentFormButton.setAttribute(
    "aria-expanded",
    String(open)
  );

  toggleAssignmentFormButton.textContent = open
    ? "Close form"
    : "+ Add assignment";

  if (open) {
    assignmentDetailSection.hidden = true;
    document.getElementById("module-code").focus();
  }
}

function formatDisplayDate(dateValue) {
  if (!dateValue) {
    return "Not set";
  }

  const date = new Date(`${dateValue}T00:00:00`);

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(date);
}

function assignmentIsCompleted(progress) {
  return Boolean(
    progress &&
    progress.totalTasks > 0 &&
    progress.taskCompletionPercentage === 100
  );
}

function assignmentMatchesFilter(cardData) {
  if (assignmentFilter === "all") {
    return true;
  }

  const completed = assignmentIsCompleted(cardData.progress);

  if (assignmentFilter === "completed") {
    return completed;
  }

  return !completed;
}

function setAssignmentFilter(filter) {
  assignmentFilter = filter;

  for (const button of assignmentFilterButtons) {
    const active =
      button.dataset.assignmentFilter === assignmentFilter;

    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  }

  renderAssignmentCards();
}

async function loadAssignments() {
  assignmentList.replaceChildren();
  approvedTaskList.replaceChildren();

  const loadingItem = document.createElement("li");
  loadingItem.classList.add("assignment-list-message");
  loadingItem.textContent = "Loading assignments...";
  assignmentList.appendChild(loadingItem);

  const dashboardLoadingItem = document.createElement("li");
  dashboardLoadingItem.classList.add("task-list-message");
  dashboardLoadingItem.textContent = "Loading approved tasks...";
  approvedTaskList.appendChild(dashboardLoadingItem);

  const response = await apiFetch("/api/assignments");

  if (!response.ok) {
    assignmentCardsData = [];
    assignmentList.replaceChildren();
    renderHomeDashboard();
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  const assignments = await response.json();

  assignmentCardsData = await Promise.all(
    assignments.map(async (assignment) => {
      let progress = null;
      let tasks = [];

      const [progressResult, tasksResult] = await Promise.allSettled([
        apiFetch(`/api/assignments/${assignment.assignmentId}/progress`),
        apiFetch(`/api/assignments/${assignment.assignmentId}/tasks`)
      ]);

      if (progressResult.status === "fulfilled") {
        const progressResponse = progressResult.value;
        if (progressResponse.ok) {
          progress = await progressResponse.json();
        }
      }

      if (tasksResult.status === "fulfilled") {
        const tasksResponse = tasksResult.value;
        if (tasksResponse.ok) {
          tasks = await tasksResponse.json();
        }
      }

      return {
        assignment,
        progress,
        tasks
      };
    })
  );

  renderAssignmentCards();
  renderHomeDashboard();
}

function formatTaskStatus(status) {
  const labels = {
    TO_DO: "To Do",
    IN_PROGRESS: "In Progress",
    COMPLETE: "Complete"
  };

  return labels[status] || "To Do";
}

function getApprovedDashboardTasks() {
  return assignmentCardsData.flatMap(({ assignment, tasks = [] }) =>
    tasks
      .filter(task => task.approvalStatus === "APPROVED")
      .map(task => ({ assignment, task }))
  );
}

function renderHomeDashboard() {
  const approvedTasks = getApprovedDashboardTasks();

  const statusCounts = approvedTasks.reduce(
    (counts, { task }) => {
      if (Object.hasOwn(counts, task.taskStatus)) {
        counts[task.taskStatus] += 1;
      }

      return counts;
    },
    {
      TO_DO: 0,
      IN_PROGRESS: 0,
      COMPLETE: 0
    }
  );

  toDoTaskCount.textContent = String(statusCounts.TO_DO);
  inProgressTaskCount.textContent = String(statusCounts.IN_PROGRESS);
  completeTaskCount.textContent = String(statusCounts.COMPLETE);
  allTaskCount.textContent = String(approvedTasks.length);

  approvedTaskList.replaceChildren();

  if (approvedTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.classList.add("task-list-message");
    emptyItem.textContent = "No approved tasks yet.";
    approvedTaskList.appendChild(emptyItem);
    return;
  }

  for (const { assignment, task } of approvedTasks) {
    const item = document.createElement("li");
    item.classList.add("dashboard-task-row");

    const taskCopy = document.createElement("div");
    taskCopy.classList.add("dashboard-task-copy");

    const title = document.createElement("strong");
    title.classList.add("dashboard-task-title");
    title.textContent = task.taskTitle || "Untitled task";

    const assignmentLabel = document.createElement("span");
    assignmentLabel.classList.add("dashboard-task-assignment");
    assignmentLabel.textContent = [
      assignment.moduleCode,
      assignment.moduleTitle
    ]
      .filter(Boolean)
      .join(" • ") || "Assignment details not added";

    taskCopy.appendChild(title);
    taskCopy.appendChild(assignmentLabel);

    const metadata = document.createElement("div");
    metadata.classList.add("dashboard-task-metadata");

    const status = document.createElement("span");
    status.classList.add(
      "dashboard-task-badge",
      `dashboard-task-badge--${String(task.taskStatus || "TO_DO").toLowerCase()}`
    );
    status.textContent = formatTaskStatus(task.taskStatus);

    const origin = document.createElement("span");
    origin.classList.add("dashboard-task-badge");
    origin.textContent = task.origin === "AI" ? "AI" : "Student";

    metadata.appendChild(status);
    metadata.appendChild(origin);
    item.appendChild(taskCopy);
    item.appendChild(metadata);
    approvedTaskList.appendChild(item);
  }
}

function renderAssignmentCards() {
  assignmentList.replaceChildren();

  const visibleAssignments = assignmentCardsData.filter(
    assignmentMatchesFilter
  );

  if (visibleAssignments.length === 0) {
    const item = document.createElement("li");
    item.classList.add("assignment-list-message");

    item.textContent =
      assignmentCardsData.length === 0
        ? "No assignments yet. Add your first assignment to get started."
        : `No ${assignmentFilter} assignments found.`;

    assignmentList.appendChild(item);
    return;
  }

  for (const cardData of visibleAssignments) {
    const { assignment, progress } = cardData;

    const item = document.createElement("li");
    item.classList.add("assignment-card-item");

    const card = document.createElement("button");
    card.type = "button";
    card.classList.add("assignment-card");

    const header = document.createElement("span");
    header.classList.add("assignment-card-header");

    const titleGroup = document.createElement("span");
    titleGroup.classList.add("assignment-card-title-group");

    const title = document.createElement("strong");
    title.classList.add("assignment-card-title");
    title.textContent =
      assignment.moduleTitle || "Untitled assignment";

    const subtitle = document.createElement("span");
    subtitle.classList.add("assignment-card-subtitle");

    subtitle.textContent = [
      assignment.moduleCode,
      assignment.assignmentType
    ]
      .filter(Boolean)
      .join(" • ") || "Module details not added";

    titleGroup.appendChild(title);
    titleGroup.appendChild(subtitle);

    const status = document.createElement("span");
    status.classList.add("assignment-status");

    const completed = assignmentIsCompleted(progress);

    status.classList.add(
      completed
        ? "assignment-status--completed"
        : "assignment-status--ongoing"
    );

    status.textContent = completed ? "Completed" : "Ongoing";

    header.appendChild(titleGroup);
    header.appendChild(status);

    const percentage = progress?.taskCompletionPercentage ?? 0;

    const progressRow = document.createElement("span");
    progressRow.classList.add("assignment-progress-row");

    const progressTrack = document.createElement("span");
    progressTrack.classList.add("assignment-progress-track");
    progressTrack.setAttribute("role", "progressbar");
    progressTrack.setAttribute("aria-label", "Approved task progress");
    progressTrack.setAttribute("aria-valuemin", "0");
    progressTrack.setAttribute("aria-valuemax", "100");
    progressTrack.setAttribute("aria-valuenow", String(percentage));

    const progressFill = document.createElement("span");
    progressFill.classList.add("assignment-progress-fill");
    progressFill.style.width = `${percentage}%`;

    progressTrack.appendChild(progressFill);

    const progressValue = document.createElement("strong");
    progressValue.classList.add("assignment-progress-value");
    progressValue.textContent = `${percentage}%`;

    progressRow.appendChild(progressTrack);
    progressRow.appendChild(progressValue);

    const metadata = document.createElement("span");
    metadata.classList.add("assignment-card-metadata");

    const taskProgress = document.createElement("span");
    taskProgress.textContent = progress
      ? `Approved tasks: ${progress.completedTasks} of ${progress.totalTasks} complete`
      : "Approved task progress unavailable";

    const officialDeadline = document.createElement("span");
    officialDeadline.textContent =
      `Official deadline: ${formatDisplayDate(
        assignment.officialDeadline
      )}`;

    const personalTarget = document.createElement("span");
    personalTarget.textContent =
      `Personal target: ${formatDisplayDate(
        assignment.personalTargetDate
      )}`;

    metadata.appendChild(taskProgress);
    metadata.appendChild(officialDeadline);
    metadata.appendChild(personalTarget);

    card.appendChild(header);
    card.appendChild(progressRow);
    card.appendChild(metadata);

    card.setAttribute(
      "aria-label",
      `Open ${assignment.moduleTitle || "untitled assignment"}`
    );

    card.addEventListener("click", async () => {
      setAssignmentCreatePanel(false);
      await loadAssignmentDetail(assignment.assignmentId);

      assignmentDetailSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });

    item.appendChild(card);
    assignmentList.appendChild(item);
  }
}

function hasDetailValue(value) {
  return value !== null && value !== undefined && String(value).trim() !== "";
}

function splitDetailItems(value) {
  if (!hasDetailValue(value)) {
    return [];
  }

  return String(value)
    .replace(/\r/g, "")
    .replace(/•/g, "\n")
    .replace(/\s+(?=(LO\d+:|KSBs?:|Knowledge:|Skills:|Values and Behaviours:|Criterion \d+|Pass status|Practicalities:|Confidentiality|Academic integrity|Guidance))/gi, "\n")
    .split(/\n+/)
    .map(item => item.trim())
    .filter(Boolean);
}

function addDetail(label, value, options = {}) {
  const paragraph = document.createElement("p");
  paragraph.classList.add("detail-card");

  if (options.variant) {
    paragraph.classList.add(`detail-card--${options.variant}`);
  }

  if (options.wrap) {
    paragraph.classList.add("detail-card--wrap");
  }

  const labelElement = document.createElement("strong");
  labelElement.classList.add("detail-label");
  labelElement.textContent = `${label}:`;
  paragraph.appendChild(labelElement);

  if (!hasDetailValue(value)) {
    const emptyElement = document.createElement("span");
    emptyElement.classList.add("detail-empty");
    emptyElement.textContent = " Not added yet";
    paragraph.appendChild(emptyElement);
    assignmentDetail.appendChild(paragraph);
    return;
  }

  const items = options.list ? splitDetailItems(value) : [];

  if (items.length > 1) {
    const list = document.createElement("ul");
    list.classList.add("detail-list");

    for (const itemText of items) {
      const item = document.createElement("li");
      item.textContent = itemText;
      list.appendChild(item);
    }

    paragraph.appendChild(list);
  } else {
    const valueElement = document.createElement("span");
    valueElement.classList.add("detail-value");

    if (options.wrap) {
      valueElement.classList.add("detail-value--wrap");
    }

    valueElement.textContent = ` ${String(value).trim()}`;
    paragraph.appendChild(valueElement);
  }

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
  populateEditAssignmentForm(assignment);
  assignmentDetail.replaceChildren();
  assignmentDetailSection.hidden = false;

  addDetail("Module", `${assignment.moduleCode || ""} - ${assignment.moduleTitle || ""}`, { variant: "compact" });
  addDetail("Module leader", assignment.moduleLeader, { variant: "compact" });
  addDetail("Assignment type", assignment.assignmentType, { variant: "compact" });
  addDetail("Assignment weighting", assignment.assignmentWeighting, { variant: "compact" });
  addDetail("Official deadline", assignment.officialDeadline, { variant: "compact" });
  addDetail("Personal target date", assignment.personalTargetDate, { variant: "compact" });
  addDetail("Assignment task", assignment.assignmentTask, { variant: "wide", list: true });
  addDetail("Assessment criteria", assignment.assessmentCriteria, { variant: "wide", list: true });
  addDetail("Learning outcomes / KSBs", assignment.learningOutcomesKsbs, { variant: "wide", list: true });
  addDetail("Referencing guidance", assignment.referencingGuidance, { variant: "wide", list: true, wrap: true });
  addDetail("Personal assignment goal", assignment.personalAssignmentGoal, { variant: "compact" });
  addDetail("Uploaded file", assignment.uploadedFileName, { variant: "compact", wrap: true });
  addDetail("Uploaded file type", assignment.uploadedFileType, { variant: "compact", wrap: true });
  await loadProgress(selectedAssignmentId);
  await loadSuccessChecklist(selectedAssignmentId);
  await loadRequirements(selectedAssignmentId);
  await loadTasks(selectedAssignmentId);
  await loadStudySessions(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
}

function populateEditAssignmentForm(assignment) {
  document.getElementById("edit-module-code").value = assignment.moduleCode || "";
  document.getElementById("edit-module-title").value = assignment.moduleTitle || "";
  document.getElementById("edit-module-leader").value = assignment.moduleLeader || "";
  document.getElementById("edit-assignment-type").value = assignment.assignmentType || "";
  document.getElementById("edit-assignment-weighting").value = assignment.assignmentWeighting || "";
  document.getElementById("edit-official-deadline").value = assignment.officialDeadline || "";
  document.getElementById("edit-personal-target-date").value = assignment.personalTargetDate || "";
  document.getElementById("edit-assignment-task").value = assignment.assignmentTask || "";
  document.getElementById("edit-assessment-criteria").value = assignment.assessmentCriteria || "";
  document.getElementById("edit-learning-outcomes-ksbs").value = assignment.learningOutcomesKsbs || "";
  document.getElementById("edit-referencing-guidance").value = assignment.referencingGuidance || "";
  document.getElementById("edit-personal-assignment-goal").value = assignment.personalAssignmentGoal || "";
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
  tasksList.replaceChildren();

  if (tasks.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No tasks generated yet.";
    tasksList.appendChild(item);
    return;
  }

  for (const task of tasks) {
    const item = document.createElement("li");
    item.classList.add("task-row");

    const text = document.createElement("span");
    text.classList.add("task-text");
    text.textContent =
      `${task.taskTitle} - ${task.taskStatus} (${task.approvalStatus})`;

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const approveButton = document.createElement("button");
    approveButton.type = "button";
    approveButton.textContent = "Approve";
    approveButton.disabled = task.approvalStatus !== "SUGGESTED";
    approveButton.addEventListener(
      "click",
      () => approveTask(task.taskId)
    );

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.textContent = "Mark complete";
    completeButton.disabled =
      task.taskStatus === "COMPLETE" ||
      task.approvalStatus !== "APPROVED";
    completeButton.addEventListener(
      "click",
      () => completeTask(task.taskId)
    );

    if (task.approvalStatus !== "REJECTED") {
      actions.appendChild(approveButton);
      actions.appendChild(completeButton);
    }

    if (
      task.origin === "AI" &&
      task.approvalStatus === "SUGGESTED"
    ) {
      const rejectButton = document.createElement("button");
      rejectButton.type = "button";
      rejectButton.dataset.action = "reject";
      rejectButton.textContent = "Reject";
      rejectButton.addEventListener(
        "click",
        () => rejectTask(task.taskId)
      );

      actions.appendChild(rejectButton);
    }

    item.appendChild(text);

    if (actions.childElementCount > 0) {
      item.appendChild(actions);
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

      const outcomeStatusSelect = document.createElement("select");

      const emptyOutcomeOption = document.createElement("option");
      emptyOutcomeOption.value = "";
      emptyOutcomeOption.textContent = "Choose outcome";
      outcomeStatusSelect.appendChild(emptyOutcomeOption);

      for (const status of ["COMPLETE", "PARTIAL", "INCOMPLETE"]) {
        const option = document.createElement("option");
        option.value = status;
        option.textContent = status;
        outcomeStatusSelect.appendChild(option);
      }

      outcomeStatusSelect.value = sessionTask.outcomeStatus || "";

      const outcomeInput = document.createElement("textarea");
      outcomeInput.placeholder = "Task outcome";
      outcomeInput.value = sessionTask.outcome || "";

      const saveOutcomeButton = document.createElement("button");
      saveOutcomeButton.type = "button";
      saveOutcomeButton.textContent = "Save outcome";
      saveOutcomeButton.addEventListener("click", () => {
        saveTaskOutcome(
          session.sessionId,
          sessionTask.taskId,
          outcomeStatusSelect.value,
          outcomeInput.value
        );
      });

      const removeButton = document.createElement("button");
      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.disabled = session.sessionStatus === "COMPLETED";
      removeButton.addEventListener("click", () => removeTaskFromStudySession(session.sessionId, sessionTask.taskId));

      linkedItem.append(" ");
      linkedItem.appendChild(outcomeStatusSelect);
      linkedItem.appendChild(outcomeInput);
      linkedItem.appendChild(saveOutcomeButton);
      linkedItem.appendChild(removeButton);
      sessionTaskList.appendChild(linkedItem);
    }

    const availableTasks = tasks.filter(task =>
      !linkedTaskIds.includes(task.taskId) &&
      task.approvalStatus === "APPROVED" &&
      task.taskStatus !== "COMPLETE"
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

        if (sessionTask.outcomeStatus) {
          taskItem.textContent += ` - ${sessionTask.outcomeStatus}`;
        }

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

async function saveTaskOutcome(sessionId, taskId, outcomeStatus, outcome) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/tasks/${taskId}/outcome`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      outcomeStatus,
      outcome
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadTasks(selectedAssignmentId);
  await loadStudySessions(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
  await loadProgress(selectedAssignmentId);
  show("Task outcome saved.");
}


async function openDashboardAfterAuthentication(successMessage) {
  const user = await loadProfile();

  if (user) {
    loginSection.hidden = true;
    dashboardSection.hidden = false;
    setApplicationView("home");
    show(successMessage);
    await loadAssignments();
  }
}

async function restoreSession() {
  const { data, error } = await supabaseClient.auth.getSession();

  if (error) {
    accessToken = null;
    loginSection.hidden = false;
    dashboardSection.hidden = true;
    show(`Could not restore your session: ${error.message}`);
    return;
  }

  if (!data.session) {
    accessToken = null;
    loginSection.hidden = false;
    dashboardSection.hidden = true;
    return;
  }

  accessToken = data.session.access_token;

  await openDashboardAfterAuthentication(
    "Your signed-in session has been restored."
  );
}

function showLoggedOutState() {
  accessToken = null;
  selectedAssignmentId = null;
  assignmentCardsData = [];

  loginSection.hidden = false;
  dashboardSection.hidden = true;
  assignmentDetailSection.hidden = true;
  setApplicationView("home");

  profile.textContent = "";
  homeHeading.textContent = "Welcome";
  toDoTaskCount.textContent = "0";
  inProgressTaskCount.textContent = "0";
  completeTaskCount.textContent = "0";
  allTaskCount.textContent = "0";
  approvedTaskList.replaceChildren();
  assignmentList.replaceChildren();
  assignmentDetail.replaceChildren();
  requirementsList.replaceChildren();
  tasksList.replaceChildren();
  studySessionList.replaceChildren();
  progressSummary.replaceChildren();
  successChecklist.replaceChildren();
  studyHistory.replaceChildren();

  briefTextInput.value = "";
  briefFileInput.value = "";

  assignmentForm.reset();
  editAssignmentForm.reset();
  manualTaskForm.reset();
  studySessionForm.reset();
  loginForm.reset();
  setAuthMode("login");
}

showSignUpButton.addEventListener("click", () => {
  setAuthMode("sign-up");
});

showLoginButton.addEventListener("click", () => {
  setAuthMode("login");
});

authSwitchButton.addEventListener("click", () => {
  setAuthMode(
    authMode === "login" ? "sign-up" : "login"
  );
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = passwordInput.value;
  const isCreatingAccount = authMode === "sign-up";

  authSubmitButton.disabled = true;
  authSubmitButton.textContent = isCreatingAccount
    ? "Creating account..."
    : "Logging in...";

  try {
    if (isCreatingAccount) {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password
      });

      if (error) {
        show(`Sign up failed: ${error.message}`);
        return;
      }

      if (data.session) {
        accessToken = data.session.access_token;

        await openDashboardAfterAuthentication(
          "Account created and logged in successfully."
        );

        return;
      }

      setAuthMode("login");

      show(
        "Account created. Check your email to confirm your account, then log in."
      );

      return;
    }

    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

    if (error) {
      show(`Log in failed: ${error.message}`);
      return;
    }

    accessToken = data.session.access_token;

    await openDashboardAfterAuthentication(
      "Logged in successfully."
    );
  } catch (error) {
    show(`Authentication failed: ${error.message}`);
  } finally {
    authSubmitButton.disabled = false;
    authSubmitButton.textContent =
      authMode === "sign-up"
        ? "Create account"
        : "Log in";
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

  assignmentForm.reset();
  setAssignmentCreatePanel(false);
  await loadAssignments();
  show("Assignment created successfully.");
});

editAssignmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!selectedAssignmentId) {
    return;
  }

  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      moduleCode: document.getElementById("edit-module-code").value || null,
      moduleTitle: document.getElementById("edit-module-title").value || null,
      moduleLeader: document.getElementById("edit-module-leader").value || null,
      assignmentType: document.getElementById("edit-assignment-type").value || null,
      assignmentWeighting: document.getElementById("edit-assignment-weighting").value || null,
      assignmentTask: document.getElementById("edit-assignment-task").value || null,
      assessmentCriteria: document.getElementById("edit-assessment-criteria").value || null,
      learningOutcomesKsbs: document.getElementById("edit-learning-outcomes-ksbs").value || null,
      referencingGuidance: document.getElementById("edit-referencing-guidance").value || null,
      officialDeadline: document.getElementById("edit-official-deadline").value || null,
      personalTargetDate: document.getElementById("edit-personal-target-date").value || null,
      personalAssignmentGoal: document.getElementById("edit-personal-assignment-goal").value || null
    })
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return;
  }

  await loadAssignments();
  await loadAssignmentDetail(selectedAssignmentId);
  show("Assignment details updated.");
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

showHomeButton.addEventListener("click", async () => {
  setApplicationView("home");
  await loadAssignments();
});

showAssignmentsButton.addEventListener("click", () => {
  setApplicationView("assignments");
});

toggleAssignmentFormButton.addEventListener("click", () => {
  setAssignmentCreatePanel(assignmentCreatePanel.hidden);
});

closeAssignmentFormButton.addEventListener("click", () => {
  setAssignmentCreatePanel(false);
});

for (const button of assignmentFilterButtons) {
  button.addEventListener("click", () => {
    setAssignmentFilter(button.dataset.assignmentFilter);
  });
}

logOutButton.addEventListener("click", async () => {
  logOutButton.disabled = true;

  try {
    const { error } = await supabaseClient.auth.signOut({
      scope: "local"
    });

    if (error) {
      throw error;
    }

    showLoggedOutState();
    show("You have logged out successfully.");
  } catch (error) {
    show(`Log out failed: ${error.message}`);
  } finally {
    logOutButton.disabled = false;
  }
});

supabaseClient.auth.onAuthStateChange((event, session) => {
  accessToken = session?.access_token ?? null;

  if (event === "SIGNED_OUT") {
    showLoggedOutState();
  }
});

setAuthMode("login");
restoreSession();
