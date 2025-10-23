# Probonex

**Probonex** is a **Free Open Source Platform** that connects pro-bono lawyers to victims of human rights abuses. Built for the **Congressional App Challenge 2025**, Probonex enables victims to find qualified lawyers in their congressional district who have experience with similar human rights cases, while maintaining privacy, security, and transparency.

---

## Table of Contents

1. [Project Goal](#project-goal)
2. [Tech Stack](#tech-stack)
3. [License](#license)
4. [File Structure](#file-structure)
5. [Setup Instructions](#setup-instructions)

   * [Environment Variables](#environment-variables)
   * [Supabase Setup](#supabase-setup)
   * [Run Migrations](#run-migrations)
6. [Quick Start](#quick-start)
7. [Development](#development)
8. [Contribution Guidelines](#contribution-guidelines)
9. [Additional Notes](#additional-notes)

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

## License

Probonex is licensed under a **modified Apache 2.0 License**:

* Branding is protected (logo, product name)
* The **base matching algorithm** cannot be modified; only new functionality can be added on top
* Full Apache 2.0 protections for copyright, patents, and liability

See the [LICENSE](./LICENSE) file for details.

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
