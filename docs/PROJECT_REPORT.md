# FitLife Hub Project Report

## Title Page

**Project title:** FitLife Hub: A Comprehensive Fitness and Nutrition Web Platform  
**Institution:** Mbarara University of Science and Technology  
**Faculty:** Faculty of Computing and Informatics  
**Programme:** Bachelor of Information Technology  
**Course unit:** Web Design and Development (BIT1203)  
**Project duration:** One month  

## Group Members

| Name | Registration number |
| --- | --- |
| Twinomugisha Davis | 2025/BIT/224/PS |
| Kobusingye Zipporah Angel | 2025/BIT/129/PS |
| Atukunda Cynthia | 2025/BIT/069/PS |
| Mumusiime Blessing | 2025/BIT/154/PS |
| Abaasa Annex Alex | 2025/BIT/242/PS |
| Ahishakiye Annah | 2025/BIT/025/PS |
| Ashabahebwa Cygan | 2025/BIT/063/PS |
| Imaan Rhania Elias | 2025/BIT/098/PS |
| Ainomugisha Flavia | 2025/BIT/035/PS |
| Abenaitwe Ian | 2025/BIT/243/PS |

## Introduction

FitLife Hub is a web-based fitness and nutrition platform designed for students, young adults, and beginners who need a simple starting point for healthy living. The system provides structured workouts, meal suggestions, health tips, a workout timer, registration/login forms, a dashboard, and contact feedback.

## Objectives

1. Provide structured workout routines for beginner, intermediate, and advanced users.
2. Offer simple nutrition advice and healthy meal suggestions.
3. Implement registration and login forms with input validation.
4. Display dynamic progress data on a user dashboard.
5. Create a responsive interface that works on mobile phones and computers.
6. Include backend source files using PHP and MySQL for server-side implementation.

## Site Map

```text
Home
├── About
├── Workouts
│   └── Workout Timer
├── Nutrition
├── Blog
├── Login / Registration
│   └── Dashboard
└── Contact
```

## Basic Wireframes

### Home Page

```text
[Header Navigation]
[Project hero text] [Progress preview image/card]
[Project aim]
[System feature cards]
[Footer]
```

### Workouts Page

```text
[Header Navigation]
[Page title]
[Workout level tabs] [Workout timer]
[Footer]
```

### Dashboard Page

```text
[Header Navigation]
[Welcome message]
[Action buttons]
[Workout progress] [Meal progress] [Active minutes]
[Footer]
```

## Features Implemented

- Multiple linked pages: Home, About, Workouts, Nutrition, Blog, Auth, Dashboard, and Contact.
- Responsive navigation with a mobile menu.
- JavaScript workout-plan tabs.
- JavaScript nutrition-plan tabs.
- JavaScript workout timer.
- Registration and login forms with validation.
- Browser-based progress dashboard using `localStorage`.
- Contact form with validation and recent feedback display.
- PHP backend files for registration, login, contact, and progress updates.
- MySQL schema for users, progress, feedback, and blog posts.

## Technologies Used

- HTML5 for page structure.
- CSS3 for layout, styling, and responsive media queries.
- JavaScript for interactivity, validation, dynamic content, and local demo storage.
- PHP for backend source files.
- MySQL for database schema design.
- GitHub Pages for hosting the static demo.

## Testing

The project was tested for:

- Navigation between all pages.
- Mobile responsive layout.
- Form validation for registration, login, and contact forms.
- Dynamic workout and nutrition content switching.
- Workout timer start, pause, and reset behavior.
- Dashboard progress updates using saved demo data.
- GitHub Pages availability.

## Challenges Encountered

GitHub Pages does not support PHP execution, so the hosted version uses JavaScript and browser storage for demonstration. PHP/MySQL backend files are included separately for local server deployment using XAMPP or WAMP.

## Conclusion

FitLife Hub meets the BIT1203 project requirements by combining front-end design, JavaScript interactivity, form validation, dynamic user data display, and basic backend source code. The system remains simple, responsive, and understandable while addressing a real-world need for accessible fitness and nutrition guidance.
