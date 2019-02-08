# ffmpeg-screenshot

## Description

Service used to get a screenshot as an `.png` from a video.

## Usage

### Parameters

##### url (required)
Link to the video that should be used.
Should be a valid `Url` to an video.

##### size (optional)
The size of the returned image.
Should be a `string` with an `x` to split the numbers.
Default value is `270x270`.
Example: `100x100`. 

##### timestamp (optional)
Timestamp to indicate where in the video you want to get your screenshot.
Should be a `string` that is splitted with the `:` symbol, the parts should be divided as such: `HH:mm:SS.ms`, it is optional do include `.ms`.
Default value is `00:00:00`
Example: `00:15:34.500` or `00:05:10`. 

## Test
https://ffmpeg-screenshot.herokuapp.com/?url=https://d2v9y0dukr6mq2.cloudfront.net/video/preview/GTYSdDW/dog-running-and-playing-with-ball_b1hei_ogb__PM.mp4&size=233x233&timestamp=00:00:02.300