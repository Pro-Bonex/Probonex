# Probonex

**Probonex** is a **Free Open Source Platform** that connects pro-bono lawyers to victims of human rights abuses. Built for the **Congressional App Challenge 2025**, Probonex enables victims to find qualified lawyers in their congressional district who have experience with similar human rights cases, while maintaining privacy, security, and transparency.

---

## Table of Contents

1. [README Guidelines](#readme-guidelines)
2. [Project Goal](#project-goal)
3. [Tech Stack](#tech-stack)
4. [License](#license)
5. [File Structure](#file-structure)
6. [Setup Instructions](#setup-instructions)
   * [Environment Variables](#environment-variables)
   * [Supabase Setup](#supabase-setup)
   * [Run Migrations](#run-migrations)
7. [Quick Start](#quick-start)
8. [Development](#development)
9. [Contribution Guidelines](#contribution-guidelines)
10. [Additional Notes](#additional-notes)

---

## README GUIDELINES - IMPORTANT
- ***ENSURE YOU DO NOT EDIT ANY README.MD FILES ANYWHERE IN THE REPOSITORY, ESPECIALLY UNDER THESE SUBDIRECTORIES. IF ONE IS FOUND DOING SO, THE REPOSITORY WILL BE SHUT DOWN FOR A CERTAIN PERIOD. THAT PERSON WILL BE REPORTED TO GitHub, AND I.P. BANNED FROM VIEWING OR EDITING THE REPO.*** -

---

## Project Goal

The goal of Probonex is to provide an **efficient, transparent, and accessible platform** for connecting victims of human rights abuses to pro-bono legal support.

**Key Features:**

* Match victims to lawyers with at least **one similar human rights violation in the same congressional district**.
* Distinct dashboards for **lawyers** and **victims**.
* Secure account management with Supabase Auth.
* Modular, extensible UI components for easy customization.

---

## Tech Stack

Probonex uses a modern full-stack TypeScript environment:

* **Frontend:** React 18, Vite, TailwindCSS
* **UI Components:** Radix UI, Lucide React, Sonner *(Note: UI is stored in "src/components/ui". READ THE README.md FILE IN UI FOLDER BEFORE EDITING UI COMPONENTS)*
* **State Management & Hooks:** React Query, Custom Hooks
* **Form Validation:** React Hook Form, Zod
* **Database / Backend:** Supabase (Auth, Database, Storage)
* **Animations & Carousel:** Framer Motion, Embla Carousel
* **Utilities:** Date-fns, clsx, class-variance-authority

---

## Contribution and Licensing (effective CONTRIBUTING.MD)

### License

Probonex is licensed under a **modified Apache 2.0 License**:

* Branding is protected (logo, product name)
* The **base matching algorithm** cannot be modified; only new functionality can be added on top
* Full Apache 2.0 protections for copyright, patents, and liability

See the [LICENSE](./LICENSE) file for details.

### Contribution Guidelines
* All logos, trademarks, and **base matching algorithms** are to be unmodified. Modification will result in the potential removal of modification access to the repository.
* Sub-Directory Guidelines are referenced in certain directories. These guidelines are located in the sub-directories' README files.MD file (all subdirectories with such cases are listed below). If any sub-directory-specific guideline is to be broken, the user will potentially lose modification access to the repository.

### Sub-Directories with Guidelines
Note: Ensure you check the README.md Files for more comprehensive guidelines. We will assume that you have read and agreed to those MD files if you commit any changes in those folders. ENSURE YOU DO NOT EDIT ANY README.MD FILES ANYWHERE IN THE REPOSITORY, ESPECIALLY UNDER THESE SUBDIRECTORIES. IF ONE IS FOUND DOING SO, THE REPOSITORY WILL BE SHUT DOWN FOR A CERTAIN PERIOD. THAT PERSON WILL BE REPORTED TO GitHub, AND I.P. BANNED FROM VIEWING OR EDITING THE REPO.

* "src/assets" - Do Not Modify Logos and Trademarks
* "public/" - Do not Modify Logos, Trademarks, or Robots' Access
* "src/components/ui" - Do not modify UI Libraries
* "src/components/hooks" - Do not modify Mobile or Toast UI unless specifically permitted by Repository Administrators
* "supabase/migrations" - Do not modify existing files. Only add new migrations. Ensure all migrations work

---

## Setup Instructions

### Environment Variables

Create a `.env` file in the root directory with the following structure:

```
VITE_SUPABASE_PROJECT_ID="{SUPABASE PROJECT ID - FOUND IN SUPABASE PROJECT SETTINGS UNDER GENERAL}"
VITE_SUPABASE_PUBLISHABLE_KEY="{SUPABASE ANON KEY - FOUND IN SUPABASE PROJECT SETTINGS UNDER API KEYS}"
VITE_SUPABASE_URL="https://{SUPABASE PROJECT ID}.supabase.co"
```

### Supabase Setup

1. Create a free Supabase project: [https://supabase.com/](https://supabase.com/)
2. Copy your **Project ID** and **Anon/Public API key** into your `.env` file.
3. Ensure your project is in the **same region** as your app for latency efficiency.

### Run Migrations

Navigate to the `supabase/migrations/` folder and run all `.sql` scripts to initialize your database. Example:

```
supabase db push  # or supabase migration apply <filename>
```

---

## Quick Start

1. Install dependencies:

```
npm install
```

2. Start the development server:

```
npm run dev
```

3. Open the app at `http://localhost:5173` (default Vite port).

4. Sign up as a **lawyer** or **victim** to test the dashboard functionality.

5. Verify that matching works by creating test cases with overlapping human rights violations in the same congressional district.

6. Build for production:

```
npm run build
```

---

## Development

* Follow React and TypeScript best practices.
* Components are modular and can be extended without modifying the core algorithm.
* Use `src/hooks/` for custom hooks and `src/lib/utils.ts` for utility functions.

---

## Contribution Guidelines

* Contributions are welcome!
* Respect the **branding** and **base algorithm** rules.
* Include **clear notes** about modifications in any derivative work.
* Follow standard GitHub pull request protocols.

---

## Additional Notes

* This project is part of the **Congressional App Challenge 2025**.
* Designed for **pro-bono lawyer-victim matching** in the U.S. congressional districts.
* Full license details are available in the [LICENSE](./LICENSE) file.
