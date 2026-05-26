# Amaldev K M - Personal Portfolio

Welcome to my personal portfolio website! This repository contains the source code for my digital resume, designed to showcase my data science and machine learning projects.

## 🚀 Live Demo
You can view the live version of my portfolio here: **[Link to your GitHub Pages URL]**

---

## 🛠️ How to Edit & Customize Your Portfolio

This website uses standard HTML, CSS, and vanilla JavaScript. There are no complicated frameworks to compile. Below is a guide on how to update various parts of the website yourself.

### 1. Updating Your Resume (PDF)
When you have a new version of your resume:
1. Save your new resume as `resume.pdf`.
2. Place it in the `assets/resume/` folder, replacing the old file.
3. Because we use the `resume.html` wrapper to avoid forced downloads, you don't need to change any HTML code! Just replace the PDF file itself.

### 2. Updating the "About Me" & Education text
*   **File to edit:** `index.html`
*   **How:** Open `index.html` and search (Ctrl+F) for `<section id="about"`. You can simply change the paragraph text (`<p>`) between the tags. You can similarly search for "Education" to change the text inside the timeline.

### 3. Adding or Updating Projects
Project information is managed dynamically by JavaScript so you don't have to write complex HTML popups every time.
*   **Adding the visual card:** 
    1. Open `index.html` and search for `<section id="projects"`.
    2. Copy an existing `<div class="project-card">...</div>` block and paste it below the others.
    3. Change the `data-project="4"` number on the new "View Project" button.
*   **Adding the popup details:**
    1. Open `script.js` and search for `const projectData = {`.
    2. Copy an existing project block (e.g., project `3: { ... }`) and paste it as `4: { ... }`.
    3. Update the `title`, `desc` (description), `tech` array (skills used), `features` array, and the `githubLink` / `demoLink`.
*   **Project Thumbnails:** Place your new project image in `assets/project_thumbnails/` and update the `src` attribute of the image tag in `index.html`.

### 4. Updating Skills
*   **File to edit:** `index.html`
*   **How:** Search for `<section id="skills"`. You will see lists of `<span class="skill-pill">...</span>`. Simply add, edit, or remove these span tags to update your listed skills.

### 5. Adding New Certificates
*   **File to edit:** `index.html` and `script.js`
*   **How:** 
    1. Save your new certificate image in `assets/certificate_thumbnails/`.
    2. Open `index.html` and search for `<section id="certificates"`.
    3. Copy an existing `<div class="carousel-slide">...</div>` block and paste it at the end.
    4. Update the `src` of the image and the text inside the `<h4>` and `<p>` tags. 
    *(Note: The JavaScript automatically detects new certificates in the HTML and adds them to the carousel and modal viewer!)*

### 6. Changing the Typewriter Text
*   **File to edit:** `script.js`
*   **How:** Open `script.js` and search for `const typewriterTexts`. You will see an array like `["BI Analyst", "Data Analyst", ...]`. You can add or change the titles here.

---

## 📁 Project Structure
*   `index.html` - The main structure and content of the website.
*   `resume.html` - The dedicated page that opens your PDF resume in the browser.
*   `style.css` - All the colors, layouts, and animations.
*   `script.js` - The logic for the preloader, typewriter, dark mode, carousels, and project modals.
*   `assets/` - Folder containing your profile picture, project thumbnails, certificates, and resume PDF.

## 🏃‍♂️ How to Test Changes Locally
1. Simply double-click `index.html` to open it in your browser.
2. If you want to simulate a real server (which helps some fonts/icons load perfectly), use an extension like **Live Server** in Visual Studio Code.

## 📫 Contact
*   **LinkedIn:** [linkedin.com/in/amaldevkm](https://www.linkedin.com/in/amaldevkm/)
*   **GitHub:** [github.com/amaldev-data](https://github.com/amaldev-data)
*   **Email:** amaldev.connect@gmail.com
