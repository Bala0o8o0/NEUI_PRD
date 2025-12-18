# 🚀 NEUI PRD - Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- Google Gemini API Key

## Step-by-Step Setup

### 1️⃣ Install Dependencies
```bash
npm install
```

### 2️⃣ Configure API Key

1. Get your Google Gemini API key from: https://aistudio.google.com/apikey
2. Create a `.env.local` file in the project root
3. Add your API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

**Important:** Replace `your_actual_api_key_here` with your real API key from Google AI Studio.

### 3️⃣ Start Development Server
```bash
npm run dev
```

The application will start on `http://localhost:3000`

## 🎮 How to Use

1. **Boot Sequence**: Wait for the cyberpunk terminal to initialize
2. **Select Module Type**: Choose from PRD, CLI, PROMPT, or ALL
3. **Input Requirements**: 
   - Type your requirements in the input field, OR
   - Click the microphone icon to use voice input
4. **Generate Outline**: Click "INITIALIZE_BUILD"
5. **Review & Edit**: Review the generated outline and make edits if needed
6. **Generate Document**: Click "EXECUTE_GENERATION"
7. **Verify (Optional)**: Use the "AUDIT" button to run AI verification
8. **Export**: Download your document as Markdown

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Cyberpunk CSS
- **AI Models**: 
  - Gemini 3 Pro Preview (Document Generation)
  - Gemini 2.5 Flash (Voice Transcription)
- **Audio**: Web Audio API (Synthesized sounds)

## 🔧 Troubleshooting

### Issue: "API_KEY is missing from environment variables"
**Solution**: Make sure you created `.env.local` with your `GEMINI_API_KEY`

### Issue: Port 3000 already in use
**Solution**: Either:
- Stop the process using port 3000, OR
- Change the port in `vite.config.ts` (line 9)

### Issue: Voice input not working
**Solution**: 
- Grant microphone permissions in your browser
- Use HTTPS or localhost (required for microphone access)

## 📝 Features

✅ Multi-step AI workflow (Outline → Generate → Verify)  
✅ Voice-to-text transcription  
✅ Real-time Markdown preview  
✅ Cyberpunk terminal UI with sound effects  
✅ Export to Markdown files  
✅ Document verification/audit system  

## 🎨 UI Features

- CRT scanline effects
- Glitch text animations
- Retro pixel-art loader (Space Invader)
- Synthesized UI sounds (clicks, processing, success/error)
- Neon glow effects

---

**Need Help?** Check the README.md for more detailed information.
