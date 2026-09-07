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
