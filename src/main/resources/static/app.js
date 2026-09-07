const SUPABASE_URL = "https://rgcqqlolyxkaecqfsxqf.supabase.co";
const SUPABASE_KEY = "sb_publishable_ujwspOExE_GpvD_GdrtO8w_guu_Ig7J";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const loginSection = document.getElementById("login-section");
const dashboardSection = document.getElementById("dashboard-section");
const homeSection = document.getElementById("home-section");
const assignmentsSection = document.getElementById("assignments-section");
const progressHistorySection = document.getElementById("progress-history-section");
const homeHeading = document.getElementById("home-heading");
const toDoTaskCount = document.getElementById("to-do-task-count");
const inProgressTaskCount = document.getElementById("in-progress-task-count");
const completeTaskCount = document.getElementById("complete-task-count");
const allTaskCount = document.getElementById("all-task-count");
const approvedTaskList = document.getElementById("approved-task-list");
const showHomeButton = document.getElementById("show-home-button");
const showAssignmentsButton = document.getElementById("show-assignments-button");
const showProgressButton = document.getElementById("show-progress-button");
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
const primaryNavigation = document.querySelector(".primary-navigation");
const backToAssignmentsButton = document.getElementById("back-to-assignments-button");
const taskReviewSection = document.getElementById("task-review-section");
const openTaskReviewButton = document.getElementById("open-task-review-button");
const backToWorkspaceButton = document.getElementById("back-to-workspace-button");
const refreshTaskReviewButton = document.getElementById("refresh-task-review-button");
const taskReviewAssignmentTitle = document.getElementById("task-review-assignment-title");
const taskReviewModule = document.getElementById("task-review-module");
const taskReviewTabButtons = Array.from(document.querySelectorAll("[data-task-review-tab]"));
const taskReviewTabPanels = Array.from(document.querySelectorAll("[data-task-review-panel]"));
const taskDetailsDialog = document.getElementById("task-details-dialog");
const closeTaskDetailsDialogButton = document.getElementById("close-task-details-dialog-button");
const taskDetailsDialogTitle = document.getElementById("task-details-dialog-title");
const taskDetailsDialogDescription = document.getElementById("task-details-dialog-description");
const taskDetailsDialogSource = document.getElementById("task-details-dialog-source");
const taskDetailsDialogMetadata = document.getElementById("task-details-dialog-metadata");
const studySessionSection = document.getElementById("study-session-section");
const openStudySessionButton = document.getElementById("open-study-session-button");
const backFromStudySessionButton = document.getElementById("back-from-study-session-button");
const studySessionAssignmentTitle = document.getElementById("study-session-assignment-title");
const studySessionModule = document.getElementById("study-session-module");
const studySessionTabButtons = Array.from(document.querySelectorAll("[data-study-session-tab]"));
const studySessionTabPanels = Array.from(document.querySelectorAll("[data-study-session-panel]"));
const studySessionTaskSearch = document.getElementById("study-session-task-search");
const studySessionTaskPool = document.getElementById("study-session-task-pool");
const studySessionTimerTab = document.getElementById("study-session-timer-tab");
const studySessionElapsedTime = document.getElementById("study-session-elapsed-time");
const activeStudySessionTitle = document.getElementById("active-study-session-title");
const activeStudySessionGoal = document.getElementById("active-study-session-goal");
const studyTimerProgressCount = document.getElementById("study-timer-progress-count");
const studyTimerProgressPercentage = document.getElementById("study-timer-progress-percentage");
const studyTimerProgressTrack = document.getElementById("study-timer-progress-track");
const studyTimerProgressFill = document.getElementById("study-timer-progress-fill");
const studyTimerTaskCount = document.getElementById("study-timer-task-count");
const studyTimerTaskList = document.getElementById("study-timer-task-list");
const studyTimerStartButton = document.getElementById("study-timer-start-button");
const studyTimerPauseButton = document.getElementById("study-timer-pause-button");
const studyTimerResumeButton = document.getElementById("study-timer-resume-button");
const studyTimerFinishButton = document.getElementById("study-timer-finish-button");
const studySessionReviewTab = document.getElementById("study-session-review-tab");
const studyReviewSessionName = document.getElementById("study-review-session-name");
const studyReviewDuration = document.getElementById("study-review-duration");
const studyReviewSessionDate = document.getElementById("study-review-session-date");
const studyReviewGoal = document.getElementById("study-review-goal");
const studyReviewTaskCount = document.getElementById("study-review-task-count");
const studyReviewTaskList = document.getElementById("study-review-task-list");
const studyReviewNotesInput = document.getElementById("study-review-notes-input");
const saveStudyReviewButton = document.getElementById("save-study-review-button");
const workspaceAssignmentTitle = document.getElementById("workspace-assignment-title");
const workspaceModule = document.getElementById("workspace-module");
const workspaceStatus = document.getElementById("workspace-status");
const workspaceDeadline = document.getElementById("workspace-deadline");
const workspaceTabButtons = Array.from(document.querySelectorAll("[data-workspace-tab]"));
const workspaceTabPanels = Array.from(document.querySelectorAll("[data-workspace-panel]"));
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
const plannedStudySessionCount = document.getElementById("planned-study-session-count");
const activeStudySessionCount = document.getElementById("active-study-session-count");
const completedStudySessionCount = document.getElementById("completed-study-session-count");
const studyPlanningTotalTime = document.getElementById("study-planning-total-time");
const progressHistoryCompletedTaskCount = document.getElementById("progress-history-completed-task-count");
const progressHistoryOngoingTaskCount = document.getElementById("progress-history-ongoing-task-count");
const progressHistoryTotalStudyTime = document.getElementById("progress-history-total-study-time");
const dailyTaskActivityChart = document.getElementById("daily-task-activity-chart");
const progressHistorySessionCount = document.getElementById("progress-history-session-count");
const previousStudySessions = document.getElementById("previous-study-sessions");

let accessToken = null;
let selectedAssignmentId = null;
let authMode = "login";
let assignmentFilter = "all";
let assignmentCardsData = [];
let approvedStudySessionTasks = [];
const selectedStudySessionTaskIds = new Set();
let studySessionTaskAssignmentId = null;
let activeStudySessionId = null;
let activeStudySession = null;
let studyTimerIntervalId = null;
let reviewStudySessionId = null;
let reviewStudySessionWasCompleted = false;

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
  const showAssignments = view === "assignments";
  const showWorkspace = view === "workspace";
  const showTaskReview = view === "task-review";
  const showStudySession = view === "study-session";
  const showProgressHistory = view === "progress-history";

  homeSection.hidden = !showHome;
  assignmentsSection.hidden = !showAssignments;
  progressHistorySection.hidden = !showProgressHistory;
  assignmentDetailSection.hidden = !showWorkspace;
  taskReviewSection.hidden = !showTaskReview;
  studySessionSection.hidden = !showStudySession;
  primaryNavigation.hidden =
    showWorkspace || showTaskReview || showStudySession;

  showHomeButton.classList.toggle("is-active", showHome);
  showAssignmentsButton.classList.toggle(
    "is-active",
    showAssignments
  );
  showProgressButton.classList.toggle(
    "is-active",
    showProgressHistory
  );

  showHomeButton.removeAttribute("aria-current");
  showAssignmentsButton.removeAttribute("aria-current");
  showProgressButton.removeAttribute("aria-current");

  if (showHome) {
    showHomeButton.setAttribute("aria-current", "page");
  }

  if (showAssignments) {
    showAssignmentsButton.setAttribute("aria-current", "page");
  }

  if (showProgressHistory) {
    showProgressButton.setAttribute("aria-current", "page");
  }
}

function setWorkspaceTab(tabName, moveFocus = false) {
  for (const button of workspaceTabButtons) {
    const active = button.dataset.workspaceTab === tabName;

    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;

    if (active && moveFocus) {
      button.focus();
    }
  }

  for (const panel of workspaceTabPanels) {
    panel.hidden =
      panel.dataset.workspacePanel !== tabName;
  }
}

function setTaskReviewTab(tabName, moveFocus = false) {
  for (const button of taskReviewTabButtons) {
    const active =
      button.dataset.taskReviewTab === tabName;

    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;

    if (active && moveFocus) {
      button.focus();
    }
  }

  for (const panel of taskReviewTabPanels) {
    panel.hidden =
      panel.dataset.taskReviewPanel !== tabName;
  }
}

function setStudySessionTab(tabName, moveFocus = false) {
  for (const button of studySessionTabButtons) {
    const active =
      button.dataset.studySessionTab === tabName;

    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;

    if (active && moveFocus) {
      button.focus();
    }
  }

  for (const panel of studySessionTabPanels) {
    panel.hidden =
      panel.dataset.studySessionPanel !== tabName;
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

function createProgressHistoryEmptyItem(message) {
  const item = document.createElement("li");
  item.classList.add("task-list-message");
  item.textContent = message;
  return item;
}

function getRecentActivityDays() {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);

    const dateKey = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");

    days.push({
      dateKey,
      dayLabel: new Intl.DateTimeFormat("en-GB", {
        weekday: "short"
      }).format(date),
      dateLabel: new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short"
      }).format(date),
      taskCount: 0
    });
  }

  return days;
}

function renderDailyTaskActivity(sessionRecords) {
  const recentDays = getRecentActivityDays();
  const daysByDate = new Map(
    recentDays.map(day => [day.dateKey, day])
  );

  for (const { session, linkedTasks } of sessionRecords) {
    if (session.sessionStatus !== "COMPLETED") {
      continue;
    }

    const activityDay = daysByDate.get(session.sessionDate);

    if (!activityDay) {
      continue;
    }

    activityDay.taskCount += linkedTasks.filter(
      sessionTask => Boolean(sessionTask.outcomeStatus)
    ).length;
  }

  const maximumTaskCount = Math.max(
    1,
    ...recentDays.map(day => day.taskCount)
  );

  dailyTaskActivityChart.replaceChildren();

  for (const day of recentDays) {
    const item = document.createElement("li");
    item.classList.add("daily-task-activity-day");
    item.setAttribute(
      "aria-label",
      `${day.dateLabel}: ${day.taskCount} ${day.taskCount === 1 ? "task" : "tasks"} reviewed`
    );

    const value = document.createElement("strong");
    value.classList.add("daily-task-activity-value");
    value.textContent = String(day.taskCount);

    const barTrack = document.createElement("span");
    barTrack.classList.add("daily-task-activity-bar-track");

    const bar = document.createElement("span");
    bar.classList.add("daily-task-activity-bar");
    bar.style.height =
      `${Math.round((day.taskCount / maximumTaskCount) * 100)}%`;
    barTrack.appendChild(bar);

    const dayLabel = document.createElement("span");
    dayLabel.classList.add("daily-task-activity-day-label");
    dayLabel.textContent = day.dayLabel;

    const dateLabel = document.createElement("span");
    dateLabel.classList.add("daily-task-activity-date-label");
    dateLabel.textContent = day.dateLabel;

    item.appendChild(value);
    item.appendChild(barTrack);
    item.appendChild(dayLabel);
    item.appendChild(dateLabel);
    dailyTaskActivityChart.appendChild(item);
  }
}

function renderPreviousStudySessions(sessionRecords) {
  const completedSessions = sessionRecords
    .filter(({ session }) =>
      session.sessionStatus === "COMPLETED"
    )
    .sort((first, second) => {
      const firstDate = new Date(
        first.session.endTime ||
        `${first.session.sessionDate}T00:00:00`
      );
      const secondDate = new Date(
        second.session.endTime ||
        `${second.session.sessionDate}T00:00:00`
      );

      return secondDate - firstDate;
    });

  const sessionCount = completedSessions.length;
  progressHistorySessionCount.textContent =
    `${sessionCount} ${sessionCount === 1 ? "session" : "sessions"}`;
  previousStudySessions.replaceChildren();

  if (sessionCount === 0) {
    previousStudySessions.appendChild(
      createProgressHistoryEmptyItem(
        "Completed study sessions will appear here."
      )
    );
    return;
  }

  for (const { assignment, session, linkedTasks } of completedSessions) {
    const item = document.createElement("li");
    item.classList.add("previous-study-session-card");

    const header = document.createElement("div");
    header.classList.add("previous-study-session-header");

    const headingGroup = document.createElement("div");
    headingGroup.classList.add("previous-study-session-heading");

    const date = document.createElement("p");
    date.classList.add("previous-study-session-date");
    date.textContent = formatDisplayDate(session.sessionDate);

    const heading = document.createElement("h3");
    heading.textContent = session.sessionName || "Study session";

    const assignmentLabel = document.createElement("p");
    assignmentLabel.classList.add("previous-study-session-assignment");
    assignmentLabel.textContent = [
      assignment.moduleCode,
      assignment.moduleTitle
    ].filter(Boolean).join(" • ") || "Assignment details not added";

    headingGroup.appendChild(date);
    headingGroup.appendChild(heading);
    headingGroup.appendChild(assignmentLabel);

    const duration = createSessionBadge(
      formatDuration(getElapsedStudySeconds(session)),
      "duration"
    );

    header.appendChild(headingGroup);
    header.appendChild(duration);
    item.appendChild(header);

    const outcomeCounts = linkedTasks.reduce(
      (counts, sessionTask) => {
        if (Object.hasOwn(counts, sessionTask.outcomeStatus)) {
          counts[sessionTask.outcomeStatus] += 1;
        }

        return counts;
      },
      {
        COMPLETE: 0,
        PARTIAL: 0,
        INCOMPLETE: 0
      }
    );

    const outcomeSummary = document.createElement("div");
    outcomeSummary.classList.add("previous-study-session-outcomes");

    for (const [label, value, variant] of [
      ["Complete", outcomeCounts.COMPLETE, "complete"],
      ["Partial", outcomeCounts.PARTIAL, "partial"],
      ["Incomplete", outcomeCounts.INCOMPLETE, "incomplete"]
    ]) {
      const outcome = document.createElement("span");
      outcome.classList.add(
        "previous-study-session-outcome",
        `previous-study-session-outcome--${variant}`
      );
      outcome.textContent = `${label}: ${value}`;
      outcomeSummary.appendChild(outcome);
    }

    item.appendChild(outcomeSummary);

    if (session.sessionNotes) {
      const notes = document.createElement("p");
      notes.classList.add("previous-study-session-notes");

      const label = document.createElement("strong");
      label.textContent = "Notes: ";

      notes.appendChild(label);
      notes.append(session.sessionNotes);
      item.appendChild(notes);
    }

    previousStudySessions.appendChild(item);
  }
}

async function loadProgressHistoryDashboard() {
  const approvedTasks = getApprovedDashboardTasks();
  const completedTasks = approvedTasks.filter(
    ({ task }) => task.taskStatus === "COMPLETE"
  ).length;
  const ongoingTasks = approvedTasks.length - completedTasks;

  progressHistoryCompletedTaskCount.textContent =
    String(completedTasks);
  progressHistoryOngoingTaskCount.textContent =
    String(ongoingTasks);
  progressHistoryTotalStudyTime.textContent = "Loading…";
  progressHistorySessionCount.textContent = "Loading…";
  dailyTaskActivityChart.replaceChildren(
    createProgressHistoryEmptyItem("Loading recent activity…")
  );
  previousStudySessions.replaceChildren(
    createProgressHistoryEmptyItem("Loading study sessions…")
  );

  const sessionResults = await Promise.allSettled(
    assignmentCardsData.map(async ({ assignment }) => {
      const response = await apiFetch(
        `/api/assignments/${assignment.assignmentId}/study-sessions`
      );

      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText}`
        );
      }

      const sessions = await response.json();
      return sessions.map(session => ({ assignment, session }));
    })
  );

  const sessions = sessionResults.flatMap(result =>
    result.status === "fulfilled" ? result.value : []
  );
  const sessionRecords = await Promise.all(
    sessions.map(async ({ assignment, session }) => ({
      assignment,
      session,
      linkedTasks: await loadSessionTasks(
        assignment.assignmentId,
        session.sessionId
      )
    }))
  );

  const totalStudySeconds = sessionRecords.reduce(
    (total, { session }) =>
      total + getElapsedStudySeconds(session),
    0
  );

  progressHistoryTotalStudyTime.textContent =
    formatDuration(totalStudySeconds);
  renderDailyTaskActivity(sessionRecords);
  renderPreviousStudySessions(sessionRecords);

  if (sessionResults.some(result => result.status === "rejected")) {
    show("Some progress information could not be loaded.");
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

async function loadAssignmentDetail(assignmentId, activeTab = "details") {
  const response = await apiFetch(
    `/api/assignments/${assignmentId}`
  );

  if (!response.ok) {
    show(
      `${response.status} ${response.statusText}\n${await response.text()}`
    );
    return;
  }

  const assignment = await response.json();
  selectedAssignmentId = assignment.assignmentId;

  const cardData = assignmentCardsData.find(
    item =>
      item.assignment.assignmentId === assignment.assignmentId
  );

  const completed = assignmentIsCompleted(cardData?.progress);

  workspaceAssignmentTitle.textContent =
    assignment.moduleTitle || "Untitled assignment";

  workspaceModule.textContent = [
    assignment.moduleCode,
    assignment.assignmentType
  ]
    .filter(Boolean)
    .join(" • ") || "Module details not added";

  taskReviewAssignmentTitle.textContent =
    assignment.moduleTitle || "Untitled assignment";

  taskReviewModule.textContent = [
    assignment.moduleCode,
    assignment.assignmentType
  ]
    .filter(Boolean)
    .join(" • ") || "Module details not added";

  studySessionAssignmentTitle.textContent =
    assignment.moduleTitle || "Untitled assignment";

  studySessionModule.textContent = [
    assignment.moduleCode,
    assignment.assignmentType
  ]
    .filter(Boolean)
    .join(" • ") || "Module details not added";

  workspaceDeadline.textContent =
    `Official deadline: ${formatDisplayDate(
      assignment.officialDeadline
    )}`;

  workspaceStatus.textContent =
    completed ? "Completed" : "Ongoing";

  workspaceStatus.classList.toggle(
    "assignment-status--completed",
    completed
  );

  workspaceStatus.classList.toggle(
    "assignment-status--ongoing",
    !completed
  );

  briefTextInput.value = assignment.extractedText || "";

  populateEditAssignmentForm(assignment);
  assignmentDetail.replaceChildren();

  addDetail(
    "Module",
    [assignment.moduleCode, assignment.moduleTitle]
      .filter(Boolean)
      .join(" — "),
    { variant: "compact" }
  );

  addDetail(
    "Module leader",
    assignment.moduleLeader,
    { variant: "compact" }
  );

  addDetail(
    "Assignment type",
    assignment.assignmentType,
    { variant: "compact" }
  );

  addDetail(
    "Assignment weighting",
    assignment.assignmentWeighting,
    { variant: "compact" }
  );

  addDetail(
    "Official deadline",
    formatDisplayDate(assignment.officialDeadline),
    { variant: "compact" }
  );

  addDetail(
    "Personal target date",
    formatDisplayDate(assignment.personalTargetDate),
    { variant: "compact" }
  );

  addDetail(
    "Assignment task",
    assignment.assignmentTask,
    {
      variant: "wide",
      list: true
    }
  );

  addDetail(
    "Assessment criteria",
    assignment.assessmentCriteria,
    {
      variant: "wide",
      list: true
    }
  );

  addDetail(
    "Learning outcomes / KSBs",
    assignment.learningOutcomesKsbs,
    {
      variant: "wide",
      list: true
    }
  );

  addDetail(
    "Referencing guidance",
    assignment.referencingGuidance,
    {
      variant: "wide",
      list: true,
      wrap: true
    }
  );

  addDetail(
    "Personal assignment goal",
    assignment.personalAssignmentGoal,
    { variant: "compact" }
  );

  addDetail(
    "Uploaded file",
    assignment.uploadedFileName,
    {
      variant: "compact",
      wrap: true
    }
  );

  addDetail(
    "Uploaded file type",
    assignment.uploadedFileType,
    {
      variant: "compact",
      wrap: true
    }
  );

  // Clear information from the previously opened assignment.
  progressSummary.replaceChildren();
  successChecklist.replaceChildren();
  requirementsList.replaceChildren();
  tasksList.replaceChildren();
  studySessionList.replaceChildren();
  studyHistory.replaceChildren();

  // Open the Workspace as soon as the main assignment has loaded.
  setWorkspaceTab(activeTab);
  setApplicationView("workspace");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  // Load the remaining Workspace sections independently.
  const workspaceResults = await Promise.allSettled([
    loadProgress(selectedAssignmentId),
    loadSuccessChecklist(selectedAssignmentId),
    loadRequirements(selectedAssignmentId),
    loadTasks(selectedAssignmentId),
    loadStudySessions(selectedAssignmentId),
    loadStudyHistory(selectedAssignmentId)
  ]);

  const workspaceLoadFailed = workspaceResults.some(
    result => result.status === "rejected"
  );

  if (workspaceLoadFailed) {
    show(
      "The assignment opened, but some Workspace information could not be loaded."
    );
  }
}

function populateEditAssignmentForm(assignment) {
  document.getElementById("edit-module-code").value =
    assignment.moduleCode || "";

  document.getElementById("edit-module-title").value =
    assignment.moduleTitle || "";

  document.getElementById("edit-module-leader").value =
    assignment.moduleLeader || "";

  document.getElementById("edit-assignment-type").value =
    assignment.assignmentType || "";

  document.getElementById("edit-assignment-weighting").value =
    assignment.assignmentWeighting || "";

  document.getElementById("edit-official-deadline").value =
    assignment.officialDeadline || "";

  document.getElementById("edit-personal-target-date").value =
    assignment.personalTargetDate || "";

  document.getElementById("edit-assignment-task").value =
    assignment.assignmentTask || "";

  document.getElementById("edit-assessment-criteria").value =
    assignment.assessmentCriteria || "";

  document.getElementById("edit-learning-outcomes-ksbs").value =
    assignment.learningOutcomesKsbs || "";

  document.getElementById("edit-referencing-guidance").value =
    assignment.referencingGuidance || "";

  document.getElementById("edit-personal-assignment-goal").value =
    assignment.personalAssignmentGoal || "";
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
    item.classList.add("task-list-message");
    item.textContent = "No tasks generated yet.";
    tasksList.appendChild(item);
    return;
  }

  for (const task of tasks) {
    const item = document.createElement("li");
    const approvalStatus =
      String(task.approvalStatus || "SUGGESTED").toLowerCase();

    item.classList.add(
      "task-row",
      `task-row--${approvalStatus}`
    );

    const content = document.createElement("div");
    content.classList.add("task-card-content");

    const title = document.createElement("h3");
    title.classList.add("task-card-title");
    title.textContent = task.taskTitle || "Untitled task";

    content.appendChild(title);

    if (task.taskDescription) {
      const description = document.createElement("p");
      description.classList.add("task-card-description");
      description.textContent = task.taskDescription;
      content.appendChild(description);
    }

    const metadata = document.createElement("div");
    metadata.classList.add("task-card-metadata");

    const originBadge = document.createElement("span");
    originBadge.classList.add("task-badge", "task-badge--origin");
    originBadge.textContent =
      task.origin === "AI" ? "AI generated" : "Student-created";

    const taskStatusBadge = document.createElement("span");
    taskStatusBadge.classList.add(
      "task-badge",
      `task-badge--${String(task.taskStatus || "TO_DO").toLowerCase()}`
    );
    taskStatusBadge.textContent = formatTaskStatus(task.taskStatus);

    const approvalBadge = document.createElement("span");
    approvalBadge.classList.add(
      "task-badge",
      `task-badge--${approvalStatus}`
    );
    approvalBadge.textContent = {
      suggested: "Awaiting review",
      approved: "Approved",
      rejected: "Rejected"
    }[approvalStatus] || task.approvalStatus;

    metadata.appendChild(originBadge);
    metadata.appendChild(taskStatusBadge);
    metadata.appendChild(approvalBadge);
    content.appendChild(metadata);

    const actions = document.createElement("div");
    actions.classList.add("task-actions");

    const detailsButton = document.createElement("button");
    detailsButton.type = "button";
    detailsButton.classList.add("task-details-button");
    detailsButton.textContent = "See full details";
    detailsButton.addEventListener(
      "click",
      () => openTaskDetails(task)
    );

    actions.appendChild(detailsButton);

    if (task.approvalStatus === "SUGGESTED") {
      const approveButton = document.createElement("button");
      approveButton.type = "button";
      approveButton.textContent = "Approve";
      approveButton.addEventListener(
        "click",
        () => approveTask(task.taskId)
      );

      actions.appendChild(approveButton);

      if (task.origin === "AI") {
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
    }

    if (task.approvalStatus === "APPROVED") {
      const approvedIndicator = document.createElement("button");
      approvedIndicator.type = "button";
      approvedIndicator.classList.add(
        "task-decision-indicator",
        "task-decision-indicator--approved"
      );
      approvedIndicator.textContent = "Approved";
      approvedIndicator.disabled = true;

      const completeButton = document.createElement("button");
      completeButton.type = "button";
      completeButton.textContent =
        task.taskStatus === "COMPLETE"
          ? "Completed"
          : "Mark complete";
      completeButton.disabled = task.taskStatus === "COMPLETE";
      completeButton.addEventListener(
        "click",
        () => completeTask(task.taskId)
      );

      actions.appendChild(approvedIndicator);
      actions.appendChild(completeButton);
    }

    if (task.approvalStatus === "REJECTED") {
      const rejectedIndicator = document.createElement("button");
      rejectedIndicator.type = "button";
      rejectedIndicator.classList.add(
        "task-decision-indicator",
        "task-decision-indicator--rejected"
      );
      rejectedIndicator.textContent = "Rejected";
      rejectedIndicator.disabled = true;

      actions.appendChild(rejectedIndicator);
    }

    item.appendChild(content);

    if (actions.childElementCount > 0) {
      item.appendChild(actions);
    }

    tasksList.appendChild(item);
  }
}

function openTaskDetails(task) {
  const approvalStatus =
    String(task.approvalStatus || "SUGGESTED").toLowerCase();

  taskDetailsDialogTitle.textContent =
    task.taskTitle || "Untitled task";
  taskDetailsDialogDescription.textContent =
    task.taskDescription || "No additional task description was provided.";
  taskDetailsDialogSource.textContent =
    task.sourcePassage || "No source passage was recorded for this task.";

  taskDetailsDialogMetadata.replaceChildren();

  const metadataValues = [
    {
      className: "task-badge--origin",
      label: task.origin === "AI" ? "AI generated" : "Student-created"
    },
    {
      className: `task-badge--${String(task.taskStatus || "TO_DO").toLowerCase()}`,
      label: formatTaskStatus(task.taskStatus)
    },
    {
      className: `task-badge--${approvalStatus}`,
      label: {
        suggested: "Awaiting review",
        approved: "Approved",
        rejected: "Rejected"
      }[approvalStatus] || task.approvalStatus
    }
  ];

  for (const metadataValue of metadataValues) {
    const badge = document.createElement("span");
    badge.classList.add("task-badge", metadataValue.className);
    badge.textContent = metadataValue.label;
    taskDetailsDialogMetadata.appendChild(badge);
  }

  taskDetailsDialog.showModal();
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

function renderStudySessionTaskPool() {
  const searchTerm = studySessionTaskSearch.value
    .trim()
    .toLowerCase();

  const visibleTasks = approvedStudySessionTasks.filter(task => {
    const searchableText = [
      task.taskTitle,
      task.taskDescription
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });

  studySessionTaskPool.replaceChildren();

  if (approvedStudySessionTasks.length === 0) {
    const item = document.createElement("li");
    item.classList.add("task-list-message");
    item.textContent =
      "No approved incomplete tasks are available yet.";
    studySessionTaskPool.appendChild(item);
    return;
  }

  if (visibleTasks.length === 0) {
    const item = document.createElement("li");
    item.classList.add("task-list-message");
    item.textContent = "No approved tasks match your search.";
    studySessionTaskPool.appendChild(item);
    return;
  }

  for (const task of visibleTasks) {
    const item = document.createElement("li");
    item.classList.add("study-session-task-option");

    const label = document.createElement("label");
    label.classList.add("study-session-task-label");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = task.taskId;
    checkbox.checked = selectedStudySessionTaskIds.has(
      task.taskId
    );

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        selectedStudySessionTaskIds.add(task.taskId);
      } else {
        selectedStudySessionTaskIds.delete(task.taskId);
      }
    });

    const copy = document.createElement("span");
    copy.classList.add("study-session-task-copy");

    const title = document.createElement("strong");
    title.textContent = task.taskTitle || "Untitled task";

    const metadata = document.createElement("span");
    metadata.classList.add("study-session-task-metadata");
    metadata.textContent =
      task.origin === "AI"
        ? "AI generated"
        : "Student-created";

    copy.appendChild(title);
    copy.appendChild(metadata);
    label.appendChild(checkbox);
    label.appendChild(copy);
    item.appendChild(label);
    studySessionTaskPool.appendChild(item);
  }
}

async function loadStudySessionTaskPool(assignmentId) {
  if (studySessionTaskAssignmentId !== assignmentId) {
    studySessionTaskAssignmentId = assignmentId;
    selectedStudySessionTaskIds.clear();
    studySessionTaskSearch.value = "";
  }

  const response = await apiFetch(
    `/api/assignments/${assignmentId}/tasks`
  );

  if (!response.ok) {
    approvedStudySessionTasks = [];
    selectedStudySessionTaskIds.clear();
    renderStudySessionTaskPool();
    show(
      `${response.status} ${response.statusText}\n${await response.text()}`
    );
    return;
  }

  const tasks = await response.json();

  approvedStudySessionTasks = tasks.filter(task =>
    task.approvalStatus === "APPROVED" &&
    task.taskStatus !== "COMPLETE"
  );

  const availableTaskIds = new Set(
    approvedStudySessionTasks.map(task => task.taskId)
  );

  for (const taskId of selectedStudySessionTaskIds) {
    if (!availableTaskIds.has(taskId)) {
      selectedStudySessionTaskIds.delete(taskId);
    }
  }

  renderStudySessionTaskPool();
}

async function linkTasksToStudySession(sessionId, taskIds) {
  for (const taskId of taskIds) {
    const response = await apiFetch(
      `/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/tasks/${taskId}`,
      { method: "POST" }
    );

    if (!response.ok) {
      show(
        `The study session was created, but a selected task could not be linked.\n${response.status} ${response.statusText}\n${await response.text()}`
      );
      return false;
    }
  }

  return true;
}

function formatSessionValue(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, character => character.toUpperCase());
}

function createSessionBadge(value, variant) {
  const badge = document.createElement("span");
  badge.classList.add(
    "session-badge",
    `session-badge--${variant}`
  );
  badge.textContent = value;
  return badge;
}

function formatTimerClock(seconds) {
  const totalSeconds = Math.max(0, Number(seconds || 0));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const remainingSeconds = Math.floor(totalSeconds % 60);

  return [hours, minutes, remainingSeconds]
    .map(value => String(value).padStart(2, "0"))
    .join(":");
}

function getElapsedStudySeconds(session) {
  let elapsedSeconds = Number(session?.durationSeconds || 0);

  if (session?.timerStatus === "RUNNING" && session.startTime) {
    const startedAt = new Date(session.startTime).getTime();

    if (Number.isFinite(startedAt)) {
      elapsedSeconds += Math.max(
        0,
        Math.floor((Date.now() - startedAt) / 1000)
      );
    }
  }

  return elapsedSeconds;
}

function stopStudyTimerClock() {
  if (studyTimerIntervalId !== null) {
    window.clearInterval(studyTimerIntervalId);
    studyTimerIntervalId = null;
  }
}

function updateStudyTimerClock() {
  if (!activeStudySession) {
    studySessionElapsedTime.textContent = "00:00:00";
    return;
  }

  const elapsedSeconds = getElapsedStudySeconds(
    activeStudySession
  );

  studySessionElapsedTime.textContent =
    formatTimerClock(elapsedSeconds);
}

function startStudyTimerClock() {
  stopStudyTimerClock();
  updateStudyTimerClock();

  if (activeStudySession?.timerStatus === "RUNNING") {
    studyTimerIntervalId = window.setInterval(
      updateStudyTimerClock,
      1000
    );
  }
}

function resetStudySessionReview() {
  reviewStudySessionId = null;
  reviewStudySessionWasCompleted = false;
  studySessionReviewTab.disabled = true;
  studyReviewSessionName.textContent = "No session selected";
  studyReviewDuration.textContent = "0s";
  studyReviewSessionDate.textContent = "Not set";
  studyReviewGoal.textContent = "No session goal added.";
  studyReviewTaskCount.textContent = "0 tasks";
  studyReviewNotesInput.value = "";
  saveStudyReviewButton.disabled = true;
  saveStudyReviewButton.textContent = "Save review and finish";
  studyReviewTaskList.replaceChildren();

  const emptyItem = document.createElement("li");
  emptyItem.classList.add("task-list-message");
  emptyItem.textContent =
    "Finish a timed session to review its tasks.";
  studyReviewTaskList.appendChild(emptyItem);
}

function renderStudySessionReview(session, linkedTasks, tasks) {
  reviewStudySessionId = session.sessionId;
  reviewStudySessionWasCompleted =
    session.sessionStatus === "COMPLETED";
  studySessionReviewTab.disabled = false;
  studyReviewSessionName.textContent =
    session.sessionName || "Study session";
  studyReviewDuration.textContent =
    formatDuration(getElapsedStudySeconds(session));
  studyReviewSessionDate.textContent =
    formatDisplayDate(session.sessionDate);
  studyReviewGoal.textContent =
    session.sessionGoal || "No session goal added.";
  studyReviewNotesInput.value = session.sessionNotes || "";

  const taskCount = linkedTasks.length;
  studyReviewTaskCount.textContent =
    `${taskCount} ${taskCount === 1 ? "task" : "tasks"}`;
  studyReviewTaskList.replaceChildren();

  if (taskCount === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.classList.add("task-list-message");
    emptyItem.textContent =
      "No tasks are linked to this session. You can still add notes and finish it.";
    studyReviewTaskList.appendChild(emptyItem);
  }

  for (const sessionTask of linkedTasks) {
    const task = tasks.find(
      taskItem => taskItem.taskId === sessionTask.taskId
    );
    const taskTitle = task?.taskTitle || "Linked task";
    const item = document.createElement("li");
    item.classList.add("study-review-task-item");
    item.dataset.taskId = sessionTask.taskId;

    const heading = document.createElement("h4");
    heading.textContent = taskTitle;
    item.appendChild(heading);

    const outcomeChoices = document.createElement("fieldset");
    outcomeChoices.classList.add("study-review-outcome-choices");

    const legend = document.createElement("legend");
    legend.classList.add("visually-hidden");
    legend.textContent = `Outcome for ${taskTitle}`;
    outcomeChoices.appendChild(legend);

    for (const status of [
      "COMPLETE",
      "PARTIAL",
      "INCOMPLETE"
    ]) {
      const choice = document.createElement("label");
      choice.classList.add(
        "study-review-outcome-choice",
        `study-review-outcome-choice--${status.toLowerCase()}`
      );

      const input = document.createElement("input");
      input.type = "radio";
      input.name = `study-review-outcome-${sessionTask.taskId}`;
      input.value = status;
      input.checked = sessionTask.outcomeStatus === status;

      const label = document.createElement("span");
      label.textContent = formatSessionValue(status);

      choice.appendChild(input);
      choice.appendChild(label);
      outcomeChoices.appendChild(choice);
    }

    item.appendChild(outcomeChoices);

    const outcomeLabel = document.createElement("label");
    outcomeLabel.textContent = "Outcome note (optional)";

    const outcomeInput = document.createElement("textarea");
    outcomeInput.classList.add("study-review-task-note");
    outcomeInput.dataset.reviewOutcomeNote = "";
    outcomeInput.value = sessionTask.outcome || "";
    outcomeInput.placeholder =
      "Add a short note about this task";

    outcomeLabel.appendChild(outcomeInput);
    item.appendChild(outcomeLabel);
    studyReviewTaskList.appendChild(item);
  }

  saveStudyReviewButton.disabled = false;
}

function resetStudyTimer() {
  stopStudyTimerClock();
  activeStudySessionId = null;
  activeStudySession = null;
  resetStudySessionReview();

  studySessionTimerTab.disabled = true;
  activeStudySessionTitle.textContent = "No active session";
  activeStudySessionGoal.textContent =
    "Start a planned session to begin tracking time.";
  studySessionElapsedTime.textContent = "00:00:00";
  studyTimerProgressCount.textContent = "0 of 0 complete";
  studyTimerProgressPercentage.textContent = "0%";
  studyTimerProgressTrack.setAttribute("aria-valuenow", "0");
  studyTimerProgressFill.style.width = "0%";
  studyTimerTaskCount.textContent = "0 tasks";
  studyTimerTaskList.replaceChildren();

  const emptyItem = document.createElement("li");
  emptyItem.classList.add("task-list-message");
  emptyItem.textContent =
    "No tasks are linked to the active session.";
  studyTimerTaskList.appendChild(emptyItem);

  for (const button of [
    studyTimerStartButton,
    studyTimerPauseButton,
    studyTimerResumeButton,
    studyTimerFinishButton
  ]) {
    button.disabled = true;
  }

  setStudySessionTab("plan");
}

function renderStudyTimer(session, linkedTasks, tasks) {
  activeStudySession = session;
  activeStudySessionId = session.sessionId;
  studySessionTimerTab.disabled = false;

  activeStudySessionTitle.textContent =
    session.sessionName || "Study session";
  activeStudySessionGoal.textContent =
    session.sessionGoal || "No session goal added.";

  const selectedTasks = linkedTasks.map(sessionTask => ({
    sessionTask,
    task: tasks.find(task => task.taskId === sessionTask.taskId)
  }));

  const completedTasks = selectedTasks.filter(({ sessionTask, task }) =>
    sessionTask.outcomeStatus === "COMPLETE" ||
    task?.taskStatus === "COMPLETE"
  ).length;

  const totalTasks = selectedTasks.length;
  const completionPercentage = totalTasks === 0
    ? 0
    : Math.round((completedTasks / totalTasks) * 100);

  studyTimerProgressCount.textContent =
    `${completedTasks} of ${totalTasks} complete`;
  studyTimerProgressPercentage.textContent =
    `${completionPercentage}%`;
  studyTimerProgressTrack.setAttribute(
    "aria-valuenow",
    String(completionPercentage)
  );
  studyTimerProgressFill.style.width =
    `${completionPercentage}%`;
  studyTimerTaskCount.textContent =
    `${totalTasks} ${totalTasks === 1 ? "task" : "tasks"}`;

  studyTimerTaskList.replaceChildren();

  if (selectedTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.classList.add("task-list-message");
    emptyItem.textContent =
      "No tasks are linked to this session.";
    studyTimerTaskList.appendChild(emptyItem);
  }

  for (const { sessionTask, task } of selectedTasks) {
    const item = document.createElement("li");
    item.classList.add("study-timer-task-item");

    const copy = document.createElement("div");
    copy.classList.add("study-timer-task-copy");

    const title = document.createElement("strong");
    title.textContent = task?.taskTitle || "Linked task";

    const status = document.createElement("span");
    status.classList.add("study-timer-task-status");
    status.textContent = sessionTask.outcomeStatus
      ? formatSessionValue(sessionTask.outcomeStatus)
      : formatTaskStatus(task?.taskStatus);

    copy.appendChild(title);
    copy.appendChild(status);
    item.appendChild(copy);
    studyTimerTaskList.appendChild(item);
  }

  studyTimerStartButton.disabled =
    session.timerStatus !== "NOT_STARTED";
  studyTimerPauseButton.disabled =
    session.timerStatus !== "RUNNING";
  studyTimerResumeButton.disabled =
    session.timerStatus !== "PAUSED";
  studyTimerFinishButton.disabled =
    session.sessionStatus === "COMPLETED";

  startStudyTimerClock();
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
    resetStudyTimer();
    const item = document.createElement("li");
    item.classList.add("task-list-message");
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
  const timerSession =
    sessions.find(session =>
      session.sessionId === activeStudySessionId &&
      session.sessionStatus !== "COMPLETED"
    ) ||
    sessions.find(session =>
      session.sessionStatus === "ACTIVE" &&
      ["RUNNING", "PAUSED"].includes(session.timerStatus)
    );

  let timerRendered = false;

  for (const session of sessions) {
    const item = document.createElement("li");
    item.classList.add(
      "study-session-card",
      `study-session-card--${String(session.sessionStatus || "planned").toLowerCase()}`
    );

    const header = document.createElement("div");
    header.classList.add("session-card-header");

    const headerCopy = document.createElement("div");
    headerCopy.classList.add("session-card-copy");

    const date = document.createElement("p");
    date.classList.add("session-card-date");
    date.textContent = formatDisplayDate(session.sessionDate);

    const title = document.createElement("h3");
    title.classList.add("session-card-title");
    title.textContent = session.sessionName || "Study session";

    headerCopy.appendChild(date);
    headerCopy.appendChild(title);

    if (session.sessionGoal) {
      const goal = document.createElement("p");
      goal.classList.add("session-card-goal");
      goal.textContent = session.sessionGoal;
      headerCopy.appendChild(goal);
    }

    const metadata = document.createElement("div");
    metadata.classList.add("session-card-metadata");

    metadata.appendChild(
      createSessionBadge(
        formatSessionValue(session.sessionStatus),
        String(session.sessionStatus || "planned").toLowerCase()
      )
    );

    metadata.appendChild(
      createSessionBadge(
        formatSessionValue(session.timerStatus),
        String(session.timerStatus || "not_started").toLowerCase()
      )
    );

    metadata.appendChild(
      createSessionBadge(
        formatDuration(session.durationSeconds),
        "duration"
      )
    );

    header.appendChild(headerCopy);
    header.appendChild(metadata);
    item.appendChild(header);

    const controls = document.createElement("div");
    controls.classList.add("session-control-actions");

    if (
      session.timerStatus === "NOT_STARTED" &&
      session.sessionStatus !== "COMPLETED"
    ) {
      const startButton = document.createElement("button");
      startButton.type = "button";
      startButton.textContent = "Start session";
      startButton.addEventListener(
        "click",
        () => startStudySession(session.sessionId)
      );
      controls.appendChild(startButton);
    }

    if (session.timerStatus === "RUNNING") {
      const pauseButton = document.createElement("button");
      pauseButton.type = "button";
      pauseButton.textContent = "Pause";
      pauseButton.addEventListener(
        "click",
        () => pauseStudySession(session.sessionId)
      );
      controls.appendChild(pauseButton);
    }

    if (session.timerStatus === "PAUSED") {
      const resumeButton = document.createElement("button");
      resumeButton.type = "button";
      resumeButton.textContent = "Resume";
      resumeButton.addEventListener(
        "click",
        () => resumeStudySession(session.sessionId)
      );
      controls.appendChild(resumeButton);
    }

    if (session.sessionStatus !== "COMPLETED") {
      const completeButton = document.createElement("button");
      completeButton.type = "button";
      completeButton.classList.add("secondary-button");
      completeButton.textContent = "Finish session";
      completeButton.addEventListener(
        "click",
        () => openStudySessionReview(session.sessionId)
      );
      controls.appendChild(completeButton);
    } else {
      const reviewButton = document.createElement("button");
      reviewButton.type = "button";
      reviewButton.classList.add("secondary-button");
      reviewButton.textContent = "Review session";
      reviewButton.addEventListener(
        "click",
        () => openStudySessionReview(session.sessionId)
      );
      controls.appendChild(reviewButton);
    }

    if (controls.childElementCount > 0) {
      item.appendChild(controls);
    }

    const linkedTasks = await loadSessionTasks(assignmentId, session.sessionId);
    const linkedTaskIds = linkedTasks.map(sessionTask => sessionTask.taskId);

    if (session.sessionId === timerSession?.sessionId) {
      renderStudyTimer(session, linkedTasks, tasks);
      timerRendered = true;
    }

    const management = document.createElement("details");
    management.classList.add("session-management");

    const managementSummary = document.createElement("summary");
    managementSummary.textContent =
      `Manage ${linkedTasks.length} linked ${linkedTasks.length === 1 ? "task" : "tasks"} and notes`;
    management.appendChild(managementSummary);

    const linkedTaskSection = document.createElement("section");
    linkedTaskSection.classList.add("session-linked-tasks");

    const linkedTaskHeading = document.createElement("h4");
    linkedTaskHeading.textContent = "Linked tasks";
    linkedTaskSection.appendChild(linkedTaskHeading);

    const sessionTaskList = document.createElement("ul");
    sessionTaskList.classList.add("session-linked-task-list");

    if (linkedTasks.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.classList.add("task-list-message");
      emptyItem.textContent = "No tasks linked to this session yet.";
      sessionTaskList.appendChild(emptyItem);
    }

    for (const sessionTask of linkedTasks) {
      const linkedTask = tasks.find(
        task => task.taskId === sessionTask.taskId
      );

      const linkedItem = document.createElement("li");
      linkedItem.classList.add("session-linked-task");

      const linkedTitle = document.createElement("strong");
      linkedTitle.classList.add("session-linked-task-title");
      linkedTitle.textContent = linkedTask
        ? linkedTask.taskTitle
        : "Linked task";

      linkedItem.appendChild(linkedTitle);

      const outcomeStatusSelect =
        document.createElement("select");

      const emptyOutcomeOption =
        document.createElement("option");

      emptyOutcomeOption.value = "";
      emptyOutcomeOption.textContent = "Choose outcome";
      outcomeStatusSelect.appendChild(emptyOutcomeOption);

      for (const status of [
        "COMPLETE",
        "PARTIAL",
        "INCOMPLETE"
      ]) {
        const option = document.createElement("option");

        option.value = status;
        option.textContent = status;

        outcomeStatusSelect.appendChild(option);
      }

      outcomeStatusSelect.value =
        sessionTask.outcomeStatus || "";

      outcomeStatusSelect.setAttribute(
        "aria-label",
        `Outcome status for ${linkedTitle.textContent}`
      );

      const outcomeInput =
        document.createElement("textarea");

      outcomeInput.placeholder = "Task outcome";
      outcomeInput.value = sessionTask.outcome || "";
      outcomeInput.setAttribute(
        "aria-label",
        `Outcome notes for ${linkedTitle.textContent}`
      );

      const saveOutcomeButton =
        document.createElement("button");

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

      const removeButton =
        document.createElement("button");

      removeButton.type = "button";
      removeButton.textContent = "Remove";
      removeButton.disabled =
        session.sessionStatus === "COMPLETED";

      removeButton.addEventListener("click", () => {
        removeTaskFromStudySession(
          session.sessionId,
          sessionTask.taskId
        );
      });

      outcomeStatusSelect.classList.add(
        "session-outcome-select"
      );

      outcomeInput.classList.add(
        "session-outcome-input"
      );

      saveOutcomeButton.classList.add(
        "session-outcome-button"
      );

      removeButton.classList.add(
        "session-outcome-button",
        "session-remove-button"
      );

      linkedItem.appendChild(outcomeStatusSelect);
      linkedItem.appendChild(outcomeInput);
      linkedItem.appendChild(saveOutcomeButton);
      linkedItem.appendChild(removeButton);

      sessionTaskList.appendChild(linkedItem);
    }

    linkedTaskSection.appendChild(sessionTaskList);
    management.appendChild(linkedTaskSection);

    const availableTasks = tasks.filter(task =>
      !linkedTaskIds.includes(task.taskId) &&
      task.approvalStatus === "APPROVED" &&
      task.taskStatus !== "COMPLETE"
    );

    const taskSelect = document.createElement("select");
    taskSelect.setAttribute(
      "aria-label",
      `Add an approved task to ${title.textContent}`
    );
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

    taskSelect.classList.add("session-task-select");

    addTaskButton.classList.add(
      "session-add-task-button"
    );

    const taskAdder = document.createElement("div");
    taskAdder.classList.add("session-task-adder");

    const taskAdderHeading = document.createElement("h4");
    taskAdderHeading.textContent = "Add another approved task";

    taskAdder.appendChild(taskAdderHeading);
    taskAdder.appendChild(taskSelect);
    taskAdder.appendChild(addTaskButton);

    const notesInput = document.createElement("textarea");
    notesInput.placeholder = "Session notes";
    notesInput.value = session.sessionNotes || "";
    notesInput.setAttribute(
      "aria-label",
      `Notes for ${title.textContent}`
    );

    const saveNotesButton = document.createElement("button");
    saveNotesButton.type = "button";
    saveNotesButton.textContent = "Save notes";
    saveNotesButton.addEventListener("click", () => {
      saveStudySessionNotes(session.sessionId, notesInput.value);
    });

    notesInput.classList.add("session-notes-input");

    saveNotesButton.classList.add(
      "session-save-notes-button"
    );

    const notesEditor = document.createElement("div");
    notesEditor.classList.add("session-notes-editor");

    const notesHeading = document.createElement("h4");
    notesHeading.textContent = "Session notes";

    notesEditor.appendChild(notesHeading);
    notesEditor.appendChild(notesInput);
    notesEditor.appendChild(saveNotesButton);

    management.appendChild(taskAdder);
    management.appendChild(notesEditor);
    item.appendChild(management);

    studySessionList.appendChild(item);
  }

  if (!timerRendered) {
    resetStudyTimer();
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

  activeStudySessionId = sessionId;
  await loadStudySessions(selectedAssignmentId);
  setApplicationView("study-session");
  setStudySessionTab("timer");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

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

  activeStudySessionId = sessionId;
  await loadStudySessions(selectedAssignmentId);
  setStudySessionTab("timer");
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

  activeStudySessionId = sessionId;
  await loadStudySessions(selectedAssignmentId);
  setStudySessionTab("timer");
  show("Study session resumed.");
}

async function openStudySessionReview(sessionId) {
  const sessionsResponse = await apiFetch(
    `/api/assignments/${selectedAssignmentId}/study-sessions`
  );

  if (!sessionsResponse.ok) {
    show(`${sessionsResponse.status} ${sessionsResponse.statusText}\n${await sessionsResponse.text()}`);
    return;
  }

  const sessions = await sessionsResponse.json();
  let session = sessions.find(
    sessionItem => sessionItem.sessionId === sessionId
  );

  if (!session) {
    show("The selected study session could not be found.");
    return;
  }

  if (session.timerStatus === "RUNNING") {
    const pauseResponse = await apiFetch(
      `/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/pause`,
      { method: "PATCH" }
    );

    if (!pauseResponse.ok) {
      show(`${pauseResponse.status} ${pauseResponse.statusText}\n${await pauseResponse.text()}`);
      return;
    }

    session = await pauseResponse.json();
  }

  const tasksResponse = await apiFetch(
    `/api/assignments/${selectedAssignmentId}/tasks`
  );

  if (!tasksResponse.ok) {
    show(`${tasksResponse.status} ${tasksResponse.statusText}\n${await tasksResponse.text()}`);
    return;
  }

  const tasks = await tasksResponse.json();
  const linkedTasks = await loadSessionTasks(
    selectedAssignmentId,
    sessionId
  );

  stopStudyTimerClock();
  activeStudySession = session;
  activeStudySessionId = sessionId;
  renderStudySessionReview(session, linkedTasks, tasks);
  setApplicationView("study-session");
  setStudySessionTab("review");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  show("Add your task outcomes and session notes.");
}

async function completeStudySession(
  sessionId,
  returnToWorkspace = false
) {
  const response = await apiFetch(`/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/complete`, {
    method: "PATCH"
  });

  if (!response.ok) {
    show(`${response.status} ${response.statusText}\n${await response.text()}`);
    return false;
  }

  await loadStudySessions(selectedAssignmentId);
  await loadTasks(selectedAssignmentId);
  await loadStudyHistory(selectedAssignmentId);
  await loadProgress(selectedAssignmentId);

  if (returnToWorkspace) {
    setWorkspaceTab("notes");
    setApplicationView("workspace");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  show(
    returnToWorkspace
      ? "Study session review saved."
      : "Study session completed."
  );
  return true;
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

  const sessionCounts = sessions.reduce(
    (counts, session) => {
      if (Object.hasOwn(counts, session.sessionStatus)) {
        counts[session.sessionStatus] += 1;
      }

      return counts;
    },
    {
      PLANNED: 0,
      ACTIVE: 0,
      COMPLETED: 0
    }
  );

  const totalStudySeconds = sessions.reduce(
    (total, session) =>
      total + getElapsedStudySeconds(session),
    0
  );

  plannedStudySessionCount.textContent =
    String(sessionCounts.PLANNED);
  activeStudySessionCount.textContent =
    String(sessionCounts.ACTIVE);
  completedStudySessionCount.textContent =
    String(sessionCounts.COMPLETED);
  studyPlanningTotalTime.textContent =
    formatDuration(totalStudySeconds);

  studyHistory.replaceChildren();

  if (sessions.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.classList.add("task-list-message");
    emptyMessage.textContent =
      "No study sessions yet. Plan your first focused session.";
    studyHistory.appendChild(emptyMessage);
    return;
  }

  const orderedSessions = [...sessions].sort((first, second) => {
    const firstDate = new Date(
      first.createdAt || `${first.sessionDate}T00:00:00`
    );
    const secondDate = new Date(
      second.createdAt || `${second.sessionDate}T00:00:00`
    );

    return secondDate - firstDate;
  });

  for (const session of orderedSessions) {
    const sessionBlock = document.createElement("article");
    sessionBlock.classList.add(
      "study-history-card",
      `study-history-card--${String(session.sessionStatus || "planned").toLowerCase()}`
    );

    const header = document.createElement("div");
    header.classList.add("study-history-card-header");

    const headerCopy = document.createElement("div");
    headerCopy.classList.add("study-history-card-copy");

    const date = document.createElement("p");
    date.classList.add("study-history-date");
    date.textContent = formatDisplayDate(session.sessionDate);

    const heading = document.createElement("h4");
    heading.textContent = session.sessionName || "Study session";

    headerCopy.appendChild(date);
    headerCopy.appendChild(heading);

    const metadata = document.createElement("div");
    metadata.classList.add("study-history-metadata");
    metadata.appendChild(
      createSessionBadge(
        formatSessionValue(session.sessionStatus),
        String(session.sessionStatus || "planned").toLowerCase()
      )
    );
    metadata.appendChild(
      createSessionBadge(
        formatDuration(getElapsedStudySeconds(session)),
        "duration"
      )
    );

    header.appendChild(headerCopy);
    header.appendChild(metadata);
    sessionBlock.appendChild(header);

    if (session.sessionGoal) {
      const goal = document.createElement("p");
      goal.classList.add("study-history-detail");
      const label = document.createElement("strong");
      label.textContent = "Goal: ";
      goal.appendChild(label);
      goal.append(session.sessionGoal);
      sessionBlock.appendChild(goal);
    }

    if (session.sessionNotes) {
      const notes = document.createElement("p");
      notes.classList.add("study-history-detail");
      const label = document.createElement("strong");
      label.textContent = "Notes: ";
      notes.appendChild(label);
      notes.append(session.sessionNotes);
      sessionBlock.appendChild(notes);
    }

    const linkedTasks = await loadSessionTasks(assignmentId, session.sessionId);

    if (linkedTasks.length > 0) {
      const taskList = document.createElement("ul");
      taskList.classList.add("study-history-task-list");

      for (const sessionTask of linkedTasks) {
        const task = tasks.find(task => task.taskId === sessionTask.taskId);
        const taskItem = document.createElement("li");
        taskItem.classList.add("study-history-task-item");

        const taskTitle = document.createElement("strong");
        taskTitle.textContent = task?.taskTitle || "Linked task";
        taskItem.appendChild(taskTitle);

        if (sessionTask.outcomeStatus) {
          const outcomeStatus = document.createElement("span");
          outcomeStatus.classList.add(
            "study-history-task-status",
            `study-history-task-status--${sessionTask.outcomeStatus.toLowerCase()}`
          );
          outcomeStatus.textContent =
            formatSessionValue(sessionTask.outcomeStatus);
          taskItem.appendChild(outcomeStatus);
        }

        if (sessionTask.outcome) {
          const outcome = document.createElement("span");
          outcome.classList.add("study-history-task-outcome");
          outcome.textContent = sessionTask.outcome;
          taskItem.appendChild(outcome);
        }

        taskList.appendChild(taskItem);
      }

      sessionBlock.appendChild(taskList);
    }

    studyHistory.appendChild(sessionBlock);
  }
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

async function saveStudySessionReview() {
  if (!reviewStudySessionId) {
    return;
  }

  const taskItems = Array.from(
    studyReviewTaskList.querySelectorAll(
      ".study-review-task-item"
    )
  );
  const taskOutcomes = [];

  for (const item of taskItems) {
    item.classList.remove("has-error");

    const selectedOutcome = item.querySelector(
      'input[type="radio"]:checked'
    );

    if (!selectedOutcome) {
      item.classList.add("has-error");
      item.querySelector('input[type="radio"]')?.focus();
      show("Choose an outcome for every selected task.");
      return;
    }

    const outcomeNote = item.querySelector(
      "[data-review-outcome-note]"
    );

    taskOutcomes.push({
      taskId: item.dataset.taskId,
      outcomeStatus: selectedOutcome.value,
      outcome: outcomeNote?.value || ""
    });
  }

  const sessionId = reviewStudySessionId;
  const sessionWasCompleted = reviewStudySessionWasCompleted;
  const originalButtonText = saveStudyReviewButton.textContent;
  saveStudyReviewButton.disabled = true;
  saveStudyReviewButton.textContent = "Saving review…";

  try {
    for (const taskOutcome of taskOutcomes) {
      const response = await apiFetch(
        `/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/tasks/${taskOutcome.taskId}/outcome`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            outcomeStatus: taskOutcome.outcomeStatus,
            outcome: taskOutcome.outcome
          })
        }
      );

      if (!response.ok) {
        show(`${response.status} ${response.statusText}\n${await response.text()}`);
        return;
      }
    }

    const notesResponse = await apiFetch(
      `/api/assignments/${selectedAssignmentId}/study-sessions/${sessionId}/notes`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sessionNotes: studyReviewNotesInput.value
        })
      }
    );

    if (!notesResponse.ok) {
      show(`${notesResponse.status} ${notesResponse.statusText}\n${await notesResponse.text()}`);
      return;
    }

    if (sessionWasCompleted) {
      await loadTasks(selectedAssignmentId);
      await loadStudySessions(selectedAssignmentId);
      await loadStudyHistory(selectedAssignmentId);
      await loadProgress(selectedAssignmentId);
      setWorkspaceTab("notes");
      setApplicationView("workspace");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      show("Study session review updated.");
      return;
    }

    await completeStudySession(sessionId, true);
  } finally {
    saveStudyReviewButton.textContent = originalButtonText;

    if (reviewStudySessionId === sessionId) {
      saveStudyReviewButton.disabled = false;
    }
  }
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
  approvedStudySessionTasks = [];
  selectedStudySessionTaskIds.clear();
  studySessionTaskAssignmentId = null;
  resetStudyTimer();

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
  plannedStudySessionCount.textContent = "0";
  activeStudySessionCount.textContent = "0";
  completedStudySessionCount.textContent = "0";
  studyPlanningTotalTime.textContent = "0s";
  progressHistoryCompletedTaskCount.textContent = "0";
  progressHistoryOngoingTaskCount.textContent = "0";
  progressHistoryTotalStudyTime.textContent = "0s";
  progressHistorySessionCount.textContent = "0 sessions";
  approvedTaskList.replaceChildren();
  assignmentList.replaceChildren();
  assignmentDetail.replaceChildren();
  requirementsList.replaceChildren();
  tasksList.replaceChildren();
  studySessionTaskPool.replaceChildren();
  studySessionList.replaceChildren();
  progressSummary.replaceChildren();
  successChecklist.replaceChildren();
  studyHistory.replaceChildren();
  dailyTaskActivityChart.replaceChildren();
  previousStudySessions.replaceChildren();

  briefTextInput.value = "";
  briefFileInput.value = "";
  studySessionTaskSearch.value = "";

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

  const session = await response.json();
  const selectedTaskIds = Array.from(
    selectedStudySessionTaskIds
  );

  const tasksLinked = await linkTasksToStudySession(
    session.sessionId,
    selectedTaskIds
  );

  studySessionForm.reset();
  selectedStudySessionTaskIds.clear();
  renderStudySessionTaskPool();
  await loadStudySessions(selectedAssignmentId);

  if (!tasksLinked) {
    return;
  }

  show(
    selectedTaskIds.length === 0
      ? "Study session created."
      : `Study session created with ${selectedTaskIds.length} selected ${selectedTaskIds.length === 1 ? "task" : "tasks"}.`
  );
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
  setApplicationView("assignments");
  show("Assignment deleted.");
  await loadAssignments();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
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

  await loadAssignmentDetail(selectedAssignmentId, "attachments");
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

  await loadAssignmentDetail(selectedAssignmentId, "attachments");
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

showProgressButton.addEventListener("click", async () => {
  setApplicationView("progress-history");
  await loadProgressHistoryDashboard();
});

backToAssignmentsButton.addEventListener("click", () => {
  setApplicationView("assignments");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

openTaskReviewButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  setTaskReviewTab("review");
  setApplicationView("task-review");
  await loadTasks(selectedAssignmentId);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

backToWorkspaceButton.addEventListener("click", () => {
  setApplicationView("workspace");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

openStudySessionButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  setStudySessionTab("plan");
  setApplicationView("study-session");
  await loadStudySessionTaskPool(selectedAssignmentId);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

studySessionTaskSearch.addEventListener(
  "input",
  renderStudySessionTaskPool
);

for (const button of studySessionTabButtons) {
  button.addEventListener("click", () => {
    if (!button.disabled) {
      setStudySessionTab(button.dataset.studySessionTab);
    }
  });

  button.addEventListener("keydown", event => {
    const supportedKeys = [
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End"
    ];

    if (!supportedKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const availableButtons = studySessionTabButtons.filter(
      tabButton => !tabButton.disabled
    );
    const currentIndex = availableButtons.indexOf(button);

    if (currentIndex === -1) {
      return;
    }

    let nextIndex = currentIndex;

    if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + availableButtons.length) %
        availableButtons.length;
    }

    if (event.key === "ArrowRight") {
      nextIndex =
        (currentIndex + 1) % availableButtons.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = availableButtons.length - 1;
    }

    setStudySessionTab(
      availableButtons[nextIndex].dataset.studySessionTab,
      true
    );
  });
}

studyTimerStartButton.addEventListener("click", () => {
  if (activeStudySessionId) {
    startStudySession(activeStudySessionId);
  }
});

studyTimerPauseButton.addEventListener("click", () => {
  if (activeStudySessionId) {
    pauseStudySession(activeStudySessionId);
  }
});

studyTimerResumeButton.addEventListener("click", () => {
  if (activeStudySessionId) {
    resumeStudySession(activeStudySessionId);
  }
});

studyTimerFinishButton.addEventListener("click", () => {
  if (activeStudySessionId) {
    openStudySessionReview(activeStudySessionId);
  }
});

saveStudyReviewButton.addEventListener(
  "click",
  saveStudySessionReview
);

backFromStudySessionButton.addEventListener("click", async () => {
  setWorkspaceTab("notes");
  setApplicationView("workspace");
  await loadStudyHistory(selectedAssignmentId);

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

refreshTaskReviewButton.addEventListener("click", async () => {
  if (!selectedAssignmentId) {
    return;
  }

  refreshTaskReviewButton.disabled = true;

  try {
    await loadTasks(selectedAssignmentId);
  } finally {
    refreshTaskReviewButton.disabled = false;
  }
});

closeTaskDetailsDialogButton.addEventListener("click", () => {
  taskDetailsDialog.close();
});

taskDetailsDialog.addEventListener("click", event => {
  if (event.target === taskDetailsDialog) {
    taskDetailsDialog.close();
  }
});

for (const button of taskReviewTabButtons) {
  button.addEventListener("click", () => {
    setTaskReviewTab(button.dataset.taskReviewTab);
  });

  button.addEventListener("keydown", event => {
    const supportedKeys = [
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End"
    ];

    if (!supportedKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const currentIndex =
      taskReviewTabButtons.indexOf(button);

    let nextIndex = currentIndex;

    if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + taskReviewTabButtons.length) %
        taskReviewTabButtons.length;
    }

    if (event.key === "ArrowRight") {
      nextIndex =
        (currentIndex + 1) %
        taskReviewTabButtons.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = taskReviewTabButtons.length - 1;
    }

    setTaskReviewTab(
      taskReviewTabButtons[nextIndex].dataset.taskReviewTab,
      true
    );
  });
}

for (const button of workspaceTabButtons) {
  button.addEventListener("click", () => {
    setWorkspaceTab(button.dataset.workspaceTab);
  });

  button.addEventListener("keydown", event => {
    const supportedKeys = [
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End"
    ];

    if (!supportedKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const currentIndex =
      workspaceTabButtons.indexOf(button);

    let nextIndex = currentIndex;

    if (event.key === "ArrowLeft") {
      nextIndex =
        (currentIndex - 1 + workspaceTabButtons.length) %
        workspaceTabButtons.length;
    }

    if (event.key === "ArrowRight") {
      nextIndex =
        (currentIndex + 1) %
        workspaceTabButtons.length;
    }

    if (event.key === "Home") {
      nextIndex = 0;
    }

    if (event.key === "End") {
      nextIndex = workspaceTabButtons.length - 1;
    }

    setWorkspaceTab(
      workspaceTabButtons[nextIndex].dataset.workspaceTab,
      true
    );
  });
}

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
