const videoStreaming = (req, reply) => {
  const fs = require('fs')
  const folder = req.query.folder
  const filename = req.query.filename
  const path = `${folder}/${filename}`

  const stats = fs.statSync(path)
  let range = req.headers.range
  if (!range) range = 'bytes=0-'

  var positions = range.replace(/bytes=/, '').split('-')
  var start = parseInt(positions[0], 10)
  var total = stats.size
  var end = positions[1] ? parseInt(positions[1], 10) : total - 1
  var chunksize = end - start + 1

  const stream = fs.createReadStream(path, {
    emitClose: false,
    flags: 'r',
    start,
    end
  })

  reply.status(206).headers({
    'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunksize,
    'Content-Type': 'video/mp4'
  }).send(stream)
}

export default videoStreaming
