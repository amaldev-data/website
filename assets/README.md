# Portfolio Assets — README

This folder contains all media files used by the portfolio website.

---

## Folder Structure

```
assets/
├── images/
│   ├── profile.png          ← Your profile photo (already placed)
│   ├── project1.png         ← Screenshot/thumbnail for Project 1 (add yours)
│   └── project2.png         ← Screenshot/thumbnail for Project 2 (add yours)
└── docs/
    └── resume.pdf           ← Your resume PDF (add yours here)
```

---

## How to Add Your Files

### Profile Photo
- Already placed at `assets/images/profile.png`
- To replace: add your new PNG as `profile.png` (same name)

### Project Images
- Recommended size: **900 × 500 px** (16:9 ratio) or similar
- Format: `.png` or `.jpg`
- Name them exactly `project1.png` and `project2.png`
- Place them inside `assets/images/`
- If images are missing the site shows a placeholder automatically

### Resume PDF
- Place your resume PDF at `assets/docs/resume.pdf`
- The "Resume" icon in the hero section will automatically link to it for download

---

## Adding More Projects
To add a third project card:
1. Copy an existing `<div class="project-card">` block in `index.html`
2. Update the title, description, tags, and modal content
3. Add a new modal div with a unique id (e.g. `modal3`)
4. Place the project image as `assets/images/project3.png`

---

## Updating Social / Contact Links
Search `index.html` for `href="https://github.com/"` and `href="https://linkedin.com/"` and replace with your actual URLs.

Update the email `amal@email.com` with your real email address.

---

## Hosting on GitHub Pages
1. Create a new GitHub repository
2. Upload all files preserving the folder structure:
   ```
   index.html
   style.css
   script.js
   assets/
   ```
3. Go to **Settings → Pages → Source → main branch / root**
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`
