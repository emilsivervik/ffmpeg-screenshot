'use strict';

const express = require('express');
const router = express.Router();

const ffmpegStatic = require('ffmpeg-static');
const ffprobeStatic = require('ffprobe-static');
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegStatic.path);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const fs = require('fs')
const path = require('path')
const tmpFolderPath = path.join(__dirname, '/../tmp');
const tmpExist = fs.existsSync(tmpFolderPath);
if (!tmpExist) { fs.mkdirSync(tmpFolderPath) }

router.get('/', (req, res, next) => {
    const fileName = `${Date.now().toString()}.png`;

    const {
        timestamp = '00:00:00',
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
            const fileExist = fs.existsSync(filePath);
            if (!fileExist) {
                console.error('Could not find file, something wrong with inputs.');
                return res.status(500).send();
            }
            fs.createReadStream(filePath)
                .on('end', () => {
                    fs.unlink(filePath, (err) => { if (err) console.log(err) });
                })
                .on('error', err => {
                    const exist = fs.existsSync(filePath);
                    if (exist) {
                        fs.unlink(filePath, (err) => { if (err) console.log(err) });
                    }
                    console.error(err);
                    return res.status(500).send();
                })
                .pipe(res)
        })
        .screenshots(options)
        .on('error', err => {
            console.error(err);
            return res.status(500).send();
        })
})

module.exports = router;