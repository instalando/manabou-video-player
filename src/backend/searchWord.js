import dict from './dictionary/searchWord'

const searchWord = (req, reply) => {
  const word = req.query.word
  dict(word).then(res => {
    reply.send(res)
  })
    .catch(err => {
      reply.send(err)
    })
}

export default searchWord
