# 📘 NEUI Architect - The Magic Project Manual (For Everyone!)

Welcome to **NEUI Architect**! If you are reading this, you want to know how this super cool robot works. This manual is written so simply that even a smart 10-year-old can understand it! 🧒✨

---

## 🏗️ What Is This Project? (The Big Idea)

Imagine you have a **really great idea** for an app or a website, but you don't know how to write all the boring documents that engineers need. 

**NEUI Architect** is like a **Magic Translator**:
1. 🗣️ **You Talk**: You just explain your idea out loud.
2. 🤖 **It Listens**: The AI hears you and types it out.
3. 🧠 **It Thinks**: It plans out exactly how to build your idea.
4. 📄 **It Writes**: It creates a perfect "Blueprint" (PRD) for your project.
5. 🕵️ **It Checks**: Another AI checks the work to make sure it's perfect.

It turns your **Voice** into a **Professional Plan** in seconds!

---

## 🛠️ The Technology Stack (The Parts We Used)

Think of this like a Lego castle. Here are the different blocks we used to build it:

*   **⚡ Vite + React**: This is the **engine** and the **body** of the app. It makes the website show up on your screen.
*   **🎨 Tailwind CSS**: This is the **paint**. It makes the app look cool (Cyberpunk style!).
*   **🧠 Gemini 2.5 Flash**: This is the **brain**. It's the super-smart AI from Google that listens and writes.
*   **🎤 Audio Recorder**: A tool that lets the browser hear your microphone.

---

## 📂 File Structure (Where Things Live)

Here is a map of the project folder. Think of it like a house:

```text
NEUI FINAL/
├── 📄 .env.local          <-- The Key: Holds the secret password (API Key) for the AI.
├── 📄 index.html          <-- The Front Door: The main file that loads the site.
├── 📄 package.json        <-- The Shopping List: Lists all the tools we need to install.
├── 📄 vite.config.ts      <-- The Settings: Configures how the app runs.
├── 📂 public/             <-- The Garage: Stores static files like images.
└── 📂 src/                <-- The Living Room: Where all the real code lives!
    ├── 📄 main.tsx        <-- The Start Button: Starts the React app.
    ├── 📄 App.tsx         <-- The Brain: The main logic of the app operates here.
    ├── 📄 types.ts        <-- The Dictionary: Defines what words like "PRD" mean.
    ├── 📂 components/     <-- The Furniture: Reusable parts of the screen.
    │   └── 📄 MarkdownRenderer.tsx  <-- The Printer: Shows the fancy text on screen.
    └── 📂 services/       <-- The Workers: Helper programs.
        └── 📄 geminiService.ts      <-- The Wizard: Talks to Google Gemini AI.
```

---

## ⚙️ How It Works (The Flow)

Here is the step-by-step journey of your idea:

### Step 1: 🎤 The Voice Input
*   **What you do:** Click the microphone button and talk.
*   **What happens:** The app records your voice and turns it into `base64` (a weird text format for audio).
*   **Code:** `transcribeAudio()` inside `geminiService.ts` sends this audio to Gemini 2.5 Flash, which replies with the text words.

### Step 2: 📝 The Outline (The Skeleton)
*   **What happens:** The AI looks at your text text and thinks: "Okay, they want a pizza app. What outlines do I need? Menu? Delivery? Payment?"
*   **Code:** `generateOutline()` creates a simple list of headers and bullet points.

### Step 3: ✍️ The Full Build (The Meat)
*   **What happens:** The AI takes the skeleton and writes strict, detailed paragraphs for every single point. It fills in the details.
*   **Code:** `generateDocument()` expands the outline into a full document.

### Step 4: 🕵️ The Audit (The Teacher)
*   **What happens:** A *second* AI persona (The Auditor) reads the document. It looks for mistakes ("Hey, you forgot the login button!").
*   **Code:** `verifyDocument()` gives it a grade (like 95/100).

---

## 🚀 How to Run It (Setup Guide)

Do you want to run this yourself? Follow these easy steps:

1.  **Get the Code**: Download this folder.
2.  **Install Tools**: Open a terminal (black screen) and type:
    ```bash
    npm install
    ```
    (This buys all the ingredients from the store).
3.  **Set the Password**:
    *   Find the file `.env.example`.
    *   Rename it to `.env.local`.
    *   Open it and paste your Google Gemini API Key where it says `GEMINI_API_KEY=...`.
4.  **Start the Engine**: Type:
    ```bash
    npm run dev
    ```
5.  **Use It**: Open your web browser and go to `http://localhost:3000`.

---

## 🚢 Deployment (Putting it on the Internet)

If you want the whole world to see it:

1.  We usually use **Vercel** (it's free and easy).
2.  You just drag this folder into Vercel.
3.  **IMPORTANT**: You must add the `GEMINI_API_KEY` in the Vercel Settings (under Environment Variables), or the AI won't work!

---

## ✅ Final Checklist

*   [x] **Port 3000**: Should be free.
*   [x] **API Key**: Must be valid.
*   [x] **Microphone**: Browser must allow access.
*   [x] **Model**: Using `gemini-2.5-flash` (It's Free!).

**Have fun building!** 🏗️🚀
