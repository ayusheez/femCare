# FemCare — Personalized Women's Health Companion

An AI-assisted web app that collects user health data through a
questionnaire and delivers personalized health insights and
recommendations, built for the Infosys Springboard Hackathon (1st place).

## Features
- Health questionnaire capturing age, sleep, exercise, menstrual cycle,
  and lifestyle data
- Rule-based user segmentation for personalized recommendations
- Health score calculation and data-driven insights dashboard
- Responsive React UI

## Tech Stack
- **Frontend:** React, TypeScript, Tailwind CSS, shadcn/ui (Radix UI
  components), React Router, TanStack Query
- **ML Validation:** Hierarchical Clustering and Gaussian Mixture Models
  (Python/scikit-learn) — a separate pipeline validating the segmentation
  approach used in the app

## Status
This is an MVP built under hackathon time constraints:
- Segmentation in the live app uses rule-based scoring; a real
  Hierarchical Clustering + GMM pipeline was built and validated
  separately (not yet wired into the live backend)
- Login is currently a front-end mock for demo purposes; real
  authentication is a planned next step

## Getting Started
```bash
npm install
npm run dev
```

## Roadmap
- [ ] Wire the validated clustering pipeline into the live backend
- [ ] Add real authentication
- [ ] Persist user data (currently session-only)
