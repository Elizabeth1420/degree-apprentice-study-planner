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

loadAssignmentsButton.addEventListener("click", loadAssignments);