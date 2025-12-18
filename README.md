# 🧠 NEUI ARCHITECT (Neural Uplink Interface)

![Version](https://img.shields.io/badge/VERSION-2.0-00ff41?style=for-the-badge&logo=android&logoColor=black)
![AI Model](https://img.shields.io/badge/CORE-GEMINI_2.5_FLASH-blue?style=for-the-badge)
![License](https://img.shields.io/badge/LICENSE-MIT-purple?style=for-the-badge)

> **ARCHITECT_YOUR_VISION**
> 
> A sophisticated, retro-futuristic AI tool designed to generate Product Requirements Documents (PRDs), CLI specifications, and System Prompts using simple voice commands. Powered by the **Free Tier Gemini 2.5 Flash** model.

---

## ⚡ Transmission Incoming...

NEUI ARCHITECT is not just a text generator; it is an intelligent AI coworker. Wrapped in a specialized Cyberpunk Terminal UI, it employs a multi-step reasoning process to transform raw voice ideas into structured technical documentation.

### 🚀 Key Capabilities

*   **100% Free Core Architecture**:
    *   **Unified Core (Gemini 2.5 Flash)**: Handles complex architectural planning, drafting, and auditing. Optimized for the Google Gemini Free Tier.
    *   **Sensory Cortex (Gemini 2.5 Flash)**: Provides multimodal voice-to-text transcription and video understanding.
*   **Chain-of-Thought Workflow**:
    1.  **Input**: Speak your idea naturally (Voice) or type it.
    2.  **Outline**: Generates a strategic blueprint (Skeleton) first.
    3.  **Execution**: Drafts the detailed documentation based on the blueprint.
    4.  **Audit**: A separate AI Agent verifies the logic and quality.
*   **Immersive Terminal UI**:
    *   CRT Scanlines, Glitch text effects, and Neon glow.
    *   Synthesized Web Audio (Mechanical clicks, data processing chirps).
    *   Responsive Cyberpunk Design.
*   **Zero-Cost Operation**:
    *   Designed specifically to run on the **Gemini API Free Tier**.
    *   No credit card required for standard usage.

---

## 🛠️ Tech Stack & Protocol

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS + Custom Glitch Animations |
| **AI SDK** | Google GenAI SDK (`@google/genai`) |
| **Models** | `gemini-2.5-flash` (All Tasks) |
| **Deployment** | Vercel / Netlify |

---

## 📂 Project Structure

```bash
NEUI_ARCHITECT/
├── index.html          # Entry point
├── .env.local          # API Keys (Not pushed to GitHub)
├── App.tsx             # Main Logic & UI Controller
├── types.ts            # Interfaces
├── components/         # UI Components
│   ├── AudioInput.tsx  # Voice Recorder
│   └── MarkdownRenderer.tsx # Matrix-style Text Viewer
└── services/           # Backend Logic
    └── geminiService.ts # The Brain (Talks to Gemini 2.5)
```

---

## 🎮 Usage Guide

1.  **Boot Sequence**: `npm run dev` to start the interface.
2.  **Select Module**:
    *   `PRD.MOD`: Product Requirements Document.
    *   `CLI.MOD`: Technical Reference.
    *   `PROMPT.MOD`: System Prompts.
    *   `ALL.MOD`: The "Full Stack" Dossier.
3.  **Input Data**: Click the **Microphone** and explain your app idea like you're talking to a friend.
4.  **Initialize Build**: The AI creates the Plan/Outline.
5.  **Execute**: Confirm the plan to write the full document.
6.  **Audit**: "Verify" the document to get a Quality Score.

---

## 🔐 Setup & Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Bala0o8o0/NEUI_PRD.git
    cd NEUI_PRD
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure API Key**:
    *   Get a free key from [Google AI Studio](https://aistudio.google.com/).
    *   Rename `.env.example` to `.env.local`.
    *   Add your key: `GEMINI_API_KEY=your_key_here`.

4.  **Run Locally**:
    ```bash
    npm run dev
    ```

---

<div align="center">
  <sub>END_OF_TRANSMISSION // NEUI_ARCHITECT_V2.0</sub>
</div>
