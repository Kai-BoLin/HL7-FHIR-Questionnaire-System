# HL7 FHIR Questionnaire System

A Vue.js application that retrieves HL7 FHIR Questionnaire resources from a HAPI FHIR Server, renders the questionnaire dynamically, and submits user responses as QuestionnaireResponse resources.

---

## Project Motivation

This project was built to learn how HL7 FHIR Questionnaire and QuestionnaireResponse resources are used in healthcare applications.

It also helped me practice Vue.js, RESTful APIs, and FHIR resource integration.

---

## Features

- Retrieve Questionnaire resources from a HAPI FHIR Server
- Dynamically render questionnaire forms with Vue.js
- Collect user input
- Generate QuestionnaireResponse resources
- Submit QuestionnaireResponse to a HAPI FHIR Server

---

## Tech Stack

### Frontend

- Vue.js
- Bootstrap
- Axios

### Backend

- Express.js
- Node.js

### Healthcare

- HL7 FHIR R4
- HAPI FHIR Server

---

## Workflow

```text
Create Questionnaire in Postman
        │
        ▼
Upload Questionnaire to HAPI FHIR Server
        │
        ▼
Retrieve Questionnaire with Vue.js
        │
        ▼
Render dynamic questionnaire
        │
        ▼
User completes the questionnaire
        │
        ▼
Generate QuestionnaireResponse
        │
        ▼
Submit QuestionnaireResponse to HAPI FHIR Server
