'use strict';

const express = require('express');
const app = express();

const ffmpegStatic = require('ffmpeg-static');
const ffprobeStatic = require('ffprobe-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegStatic.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const port = process.env.PORT || 1233;

const fs = require('fs')
const path = require('path')
const tmpFolderPath = path.join(__dirname, 'tmp');
const tmpExist = fs.existsSync(tmpFolderPath);
if (!tmpExist) { fs.mkdirSync(tmpFolderPath) }

app.get('/video', (req, res, next) => {
    const fileName = `${Date.now().toString()}.png`;

    const {
        timestamp = '00:00:01',
        size = '270x270',
        url
    } = req.query;

    const options = {
        timemarks: [timestamp],
        size,
        filename: fileName,
        folder: tmpFolderPath,
        fastSeek: true
    }

    ffmpeg(url)
        .on('end', () => {
            const filePath = path.join(tmpFolderPath, fileName);
            const newFile = fs.createReadStream(filePath);
            newFile.pipe(res)
            newFile.on('end', () => {
                fs.unlink(filePath, (err) => console.log(err));
            })
        })
        .screenshots(options)
        .on('error', err => console.error(err))
})
app.listen(port)