# ProBound Onboarding Task

This project is my submission for the ProBound Frontend Engineer coding assignment. I've implemented two screens from the provided Figma design as responsive, production-ready UI components using Next.js.

## Implemented Screens

1. **Sign In Screen**: A clean authentication form with email and password fields, password visibility toggle, and appropriate error validation.

2. **Forgot Password Screen**: A password recovery form that allows users to request a password reset via email, with proper validation and user guidance.

Both screens feature:

-   Pixel-accurate implementation of the Figma designs
-   Responsive layout for desktop and mobile views
-   Form validation using React Hook Form and Zod
-   Interactive elements (password visibility toggle)
-   Smooth transitions and animations on the carousel
-   Consistent design language across components

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Styling**: Tailwind CSS
-   **Form Handling**: React Hook Form + Zod validation
-   **Components**: Custom UI components
-   **Animations**: Embla Carousel for smooth slide transitions

## Setup and Run Instructions

1. Clone the repository:

```bash
git clone https://github.com/herdeybayor/probound-onboarding.git
cd probound-onboarding
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the sign-in page

## Assumptions and Notes

-   The authentication forms are fully functional in terms of UI/UX but don't connect to a backend API
-   Email validation ensures proper format before submission
-   The carousel features testimonials that automatically rotate
-   Mobile responsiveness is implemented for screens down to 320px width
-   The design uses a consistent color scheme throughout the application

## Live Demo

The application is deployed at: [https://probound-herdeybayor.netlify.app/](https://probound-herdeybayor.netlify.app/)

## Repository

Source code: [https://github.com/herdeybayor/probound-onboarding](https://github.com/herdeybayor/probound-onboarding)
