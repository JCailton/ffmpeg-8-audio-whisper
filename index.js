// index.js - Express + Multer + FFmpeg 8 + Whisper subtitle generation

import express from 'express';
import multer from 'multer';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 10000;

// Route pour générer les sous-titres
app.post('/subtitle', upload.single('Video'), async (req, res) => {
  console.log('🎬 Fichier reçu :', req.Video);

  if (!req.Video) {
    return res.status(400).send("No Video uploaded under field 'Video'");
  }

  const inputPath = req.Video.path;
  const outputPath = `output-${Date.now()}.srt`;

  // ⚠️ FFmpeg 8 avec Whisper intégré
  const cmd = `ffmpeg -i ${inputPath} -f srt -whisper 1 -whisper_language fr ${outputPath}`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`FFmpeg error: ${error.message}`);
      return res.status(500).send('Error generating subtitles.');
    }

    res.download(outputPath, () => {
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputPath);
    });
  });
});

// Route de test GET /
app.get('/', (req, res) => {
  res.send('✅ FFmpeg + Whisper server is running.');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
