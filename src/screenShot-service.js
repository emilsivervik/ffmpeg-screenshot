'use strict';

const express = require('express');
const router = express.Router();

const ffmpegStatic = require('ffmpeg-static');

const { spawn } = require('child_process');

router.get('/', (req, res, next) => {
    const {
        timestamp = '00:00:00',
        size = '270x270',
        url
    } = req.query;

    var ffmpeg = spawn(ffmpegStatic.path, [
        /* Should be left in -ss 1;th and -i 2;th order since we would like to do a quick Input seek */
        '-ss', timestamp,
        '-i', url,
        '-vframes', 1,
        '-s', size,
        '-vcodec', 'mjpeg',
        '-f', 'image2pipe',
        'pipe:1',
        '-blocksize', 16384
    ]);
    ffmpeg.stdout.pipe(res);
    ffmpeg.stdout.on('err', err => {
        return res.status(500).send();
    })
})

module.exports = router;