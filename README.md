# Falaq Food Employee Attendance System

A Next.js + TypeScript + Prisma + PostgreSQL starter for Falaq Food HR.

## Features
- Dashboard with total employees and daily status counts
- Employee registration
- 10 Falaq Food departments
- Daily attendance: Present, Absent, Late, Leave
- Date selection
- Monthly employee attendance report
- PostgreSQL database via Prisma
- Responsive HR/admin UI

## Requirements
- Node.js 20+
- PostgreSQL 14+

## Setup
1. Copy `.env.example` to `.env` and set `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, a unique `ADMIN_AUTH_SECRET` of at least 32 characters, and `DEPARTMENT_HEADS_JSON`.
2. Install packages: `npm install`
3. Create/update database: `npx prisma db push`
4. Seed demo employees: `npm run db:seed`
5. Start development server: `npm run dev`
6. Open `http://localhost:3000`

## Production
Run `npm run build` then `npm start`.

The dashboard, attendance, employee, and report pages require the configured admin login at `/login`. Department heads sign in at `/user-panel`; configure one account per department in `DEPARTMENT_HEADS_JSON`, an array of objects with `department`, `username`, and `password` fields. Head sessions are restricted to reading and marking attendance for active employees in their assigned department. Set unique passwords and a strong session secret before deploying.

## Suggested next production features
Authentication/RBAC, biometric/device integration, audit logs, Excel/CSV export, payroll integration, shift schedules, overtime calculation, holidays, leave management, and automated backup.
