# degree-apprentice-study-planner

Study Planner is a full-stack web application developed for the COM6036 Digital Innovation project. It is designed to help degree apprentices organise assignments, understand assessment requirements, manage tasks and monitor their study activity.

Students can upload assignment briefs, extract important requirements, review AI-assisted task suggestions, plan focused study sessions, record task outcomes and view their overall progress.

**Prototype note:** 
The current version uses deterministic, rule-based text analysis to demonstrate AI-assisted assignment planning. A future version could integrate a generative AI service for more flexible and context-aware analysis.


## Key Features

- Secure student authentication and protected application data
- Assignment creation, editing and deadline management
- Assignment brief upload and text extraction
- Rule-based extraction of requirements and assessment information
- AI-assisted task suggestions with approval and rejection controls
- Manual creation of student-approved tasks
- Detailed task review showing the original source from the brief
- Study-session planning with approved task selection
- Study timer with start, pause, resume and finish controls
- Session review with task outcomes and study notes
- Progress dashboard showing task activity, study time and session history

## Technology Stack

### Front End

- HTML5
- CSS3
- JavaScript (ES6+), without a front-end framework
- Supabase JavaScript client for authentication

### Back End

- Java 17
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Spring Security with JWT authentication
- Maven

### Data and Document Processing

- PostgreSQL database
- Supabase authentication
- Apache PDFBox for PDF text extraction
- Apache POI for Microsoft Word document extraction

### Testing

- JUnit 5
- Mockito
- Spring Boot testing support

## Running the Tests

Automated tests cover:

- Assignment brief section extraction
- Numbered and lettered deliverable extraction
- Generation of clearer assignment tasks
- Prevention of duplicate generated tasks
- Preservation of approved, rejected, completed and student-created tasks during regeneration

Run the focused analysis and task-generation tests with:

```bash
./mvnw -Dtest=BriefAnalysisServiceTests,AssignmentAnalysisServiceTests,StudyTaskServiceTests test
```

Eight focused tests were passing at the completion of the prototype.

To run the complete test suite using the local database configuration:

```bash
SPRING_PROFILES_ACTIVE=local ./mvnw test
```


## Application Workflow

1. The student signs up or logs in securely.
2. The Home dashboard displays approved tasks and their current status.
3. The student creates an assignment and adds or uploads its brief.
4. The application extracts assignment requirements using rule-based analysis.
5. Task suggestions are generated from the extracted requirements.
6. The student reviews, approves or rejects each suggestion and can add manual tasks.
7. Approved tasks can be selected when planning a study session.
8. The student starts, pauses, resumes and finishes the study timer.
9. Task outcomes and session notes are recorded during the review stage.
10. The Progress & History dashboard summarises completed tasks, study time and previous sessions.


## Running the Project Locally

### Prerequisites

Before running the application, install or configure:

- Java 17
- Git
- A PostgreSQL database
- A Supabase project for student authentication

Maven does not need to be installed separately because the repository includes the Maven Wrapper.

### Clone the Repository

```bash
git clone https://github.com/Elizabeth1420/degree-apprentice-study-planner.git
cd degree-apprentice-study-planner
```

### Configure the Database

Create this local-only file:

```text
src/main/resources/application-local.properties
```

Add your own database connection values:

```properties
spring.datasource.url=YOUR_DATABASE_URL
spring.datasource.username=YOUR_DATABASE_USERNAME
spring.datasource.password=YOUR_DATABASE_PASSWORD
```

Replace these placeholders locally with your real values. 

The local properties file is excluded by `.gitignore` and must not be committed.

### Start the Application

On macOS or Linux:

```bash
SPRING_PROFILES_ACTIVE=local ./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
$env:SPRING_PROFILES_ACTIVE="local"
.\mvnw.cmd spring-boot:run
```

Open the application at:

```text
http://localhost:8080
```

## Current Limitations and Future Development

This application is an academic prototype developed to demonstrate the proposed study-planning workflow. Its current limitations include:

- Assignment analysis is deterministic and rule-based rather than connected to a generative AI model.
- Extraction works best when assignment briefs contain recognisable headings, numbered lists or lettered deliverables.
- The quality of generated tasks depends on the structure and text quality of the uploaded brief.
- The application currently runs locally and has not been configured for production deployment.
- User testing has been limited to the prototype development process.

Potential future improvements include:

- Integration with a generative AI API for context-aware requirement and task generation
- Support for additional document formats and scanned documents using OCR
- Calendar integration, reminders and deadline notifications
- More detailed progress analytics and study recommendations
- Expanded usability, accessibility, security and performance testing
- Production deployment with managed environment variables and monitoring



## Project Structure

```text
src/
├── main/
│   ├── java/com/elizabethadeleke/study_planner_backend/
│   │   ├── analysis/       Assignment analysis and task suggestions
│   │   ├── assignment/     Assignment management and brief extraction
│   │   ├── progress/       Progress calculations and summaries
│   │   ├── requirement/    Extracted assignment requirements
│   │   ├── sessiontask/    Tasks linked to study sessions
│   │   ├── studysession/   Study-session planning and timing
│   │   ├── task/           Task approval and completion workflow
│   │   └── user/           Student profile management
│   └── resources/
│       ├── static/
│       │   ├── index.html  Application interface
│       │   ├── app.js      Front-end behaviour and API communication
│       │   └── styles.css  Responsive interface styling
│       └── application.properties
└── test/                   Automated service tests
```

## Academic Context

This project was developed by Elizabeth Adeleke as the practical prototype for the COM6036 Digital Innovation module.

The prototype explores how digital innovation can support degree apprentices with assignment interpretation, task organisation, focused study and progress monitoring. Human oversight is retained throughout the AI-assisted workflow because generated task suggestions must be reviewed and either approved or rejected by the student before they can be used in a study session.
