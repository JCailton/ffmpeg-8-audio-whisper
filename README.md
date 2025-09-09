# FFmpeg Whisper Subtitle Server

This project provides a simple Node.js API server that:

- Accepts video uploads via `POST /subtitle`
- Uses **FFmpeg 8** and **Whisper** to transcribe audio into subtitles
- Returns a `.srt` subtitle file in response

## 🧱 Tech Stack

- Node.js (Express)
- Multer (file upload)
- FFmpeg 8 with Whisper support
- Python (for Whisper backend)
- Docker-compatible (for deployment on Render, etc.)

## 🚀 How to Use

### 1. Install dependencies
```
npm install
```

### 2. Run locally
```
node index.js
```

Then send a `POST` request to `http://localhost:10000/subtitle` with a form-data body including a `file` field containing a video (e.g., `.mp4`).

### 3. Deploy to Render
- Create a new Render Web Service
- Use `Docker` as environment
- Set Dockerfile path to `Dockerfile`
- Expose port `10000`

## 🧪 Example cURL
```
curl -X POST http://localhost:10000/subtitle \
  -F "file=@./your_video.mp4" \
  --output subtitles.srt
```

## 📁 File structure
```
📦 root
 ┣ 📜 Dockerfile
 ┣ 📜 index.js
 ┣ 📜 package.json
 ┣ 📜 .gitignore
 ┣ 📜 README.md
```

---

## 🧠 Notes
- The server deletes both uploaded and generated files after sending the response
- Supports French transcription via `-whisper_language fr` (adjustable)

---

**Made with ❤️ for automated subtitles.**
