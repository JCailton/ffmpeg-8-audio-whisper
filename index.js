// index.js - Express + Multer + Whisper transcription with FFmpeg 8

import express from 'express';
import multer from 'multer';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

const app = express();
const upload = multer({ dest: 'uploads/' });

const PORT = process.env.PORT || 10000;

app.post('/subtitle', upload.single('Video'), async (req, res) => {
  try {
    if (!req.Video) {
      return res.status(400).send("No Video uploaded under field 'Video'");
    }

    const inputPath = req.Video.path;
    const outputPath = `output-${Date.now()}.srt`;

    // Command to generate subtitle using whisper in French (change -whisper_language if needed)
    const cmd = `ffmpeg -i ${inputPath} -f srt -whisper_language fr ${outputPath}`;

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
  } catch (err) {
    console.error(err);
    res.status(500).send('Unexpected server error.');
  }
});

app.get('/', (req, res) => {
  res.send('FFmpeg Whisper subtitle server is running.');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
