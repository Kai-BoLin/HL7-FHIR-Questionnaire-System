# FHIR Questionnaire System

A Vue.js application for rendering FHIR Questionnaire Resources and submitting QuestionnaireResponse to HAPI FHIR Server.

## Features

- Render Questionnaire dynamically
- Submit QuestionnaireResponse
- Connect HAPI FHIR Server
- RESTful API communication

## Tech Stack

- Vue.js 3
- Vite
- Express.js
- Axios
- Bootstrap
- HAPI FHIR Server

## What I Learned

- Vue Component Development
- FHIR Questionnaire Resource
- REST API
- Express Proxy Server


## FHIR Resources

This project demonstrates the following HL7 FHIR resources:

- Questionnaire
- QuestionnaireResponse

### Workflow

Questionnaire
↓
Render form in Vue.js
↓
User fills out the questionnaire
↓
Generate QuestionnaireResponse
↓
Submit to HAPI FHIR Server
