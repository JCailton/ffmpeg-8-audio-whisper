# Dockerfile - FFmpeg 8 + Whisper + Node.js server

FROM node:20-bullseye

# --- Install dependencies ---
RUN apt-get update && \
    apt-get install -y git build-essential cmake ffmpeg python3 python3-pip && \
    pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cpu && \
    pip3 install openai-whisper

# --- Set working directory ---
WORKDIR /app

# --- Copy server files ---
COPY package*.json ./
RUN npm install
COPY . .

# --- Expose port and run ---
EXPOSE 10000
CMD [ "node", "index.js" ]
