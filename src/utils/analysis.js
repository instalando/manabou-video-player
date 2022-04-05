import { hiraToKata, kataToHira, anyCharIsKana } from './japanese'
import DiffMatchPatch from 'diff-match-patch'
import { cpSlice } from './string'
import { create as createAnnoText } from './annotext'
const kuromoji = require('kuromoji')

const dmp = new DiffMatchPatch()

let kuromojiTokenizer = null
let kuromojiLoadPromise = null

export const startLoadingKuromoji = () => {
  console.log('Loading Kuromoji ...')
  const dicPath = '/dict'
  kuromojiLoadPromise = new Promise(resolve =>
    kuromoji.builder({ dicPath }).build(function (_err, tokenizer) {
      console.log('Kuromoji loaded')
      kuromojiTokenizer = tokenizer
      resolve()
    })
  )
}

export const ensureKuromojiLoaded = async () => {
  if (!kuromojiLoadPromise) {
    startLoadingKuromoji()
  }
  await kuromojiLoadPromise
}

export const tokenizer = async text => {
  await ensureKuromojiLoaded()
  return kuromojiTokenizer.tokenize(text)
}

export const furigana = word => {
  if (
    word.reading !== '*' &&
    word.basic_form !== '*' &&
    hiraToKata(word.reading) !== hiraToKata(word.surface_form)
  ) {
    const diffs = new DiffMatchPatch().diff_main(
      word.surface_form,
      kataToHira(word.reading)
    )
    let html = ''
    const ruby = { furigana: null, text: null }
    diffs.push([0, ''])
    diffs.map(([kind, text]) => {
      if (kind === 0) {
        if (ruby.furigana || ruby.text) {
          html += `<ruby>${ruby.text}<rt>${ruby.furigana}</rt></ruby>`
          ruby.furigana = null
          ruby.text = null
        }
        html += text
      } else {
        ruby[kind === 1 ? 'furigana' : 'text'] = text
      }
    })
    return html
  } else {
    return word.surface_form
  }
}

export const JapaneseToFurigana = (japanese, furigana) => {
  const diffs = new DiffMatchPatch().diff_main(
    japanese,
    furigana
  )
  let html = ''
  const ruby = { furigana: null, text: null }
  diffs.push([0, ''])
  diffs.map(([kind, text]) => {
    if (kind === 0) {
      if (ruby.furigana || ruby.text) {
        html += `<ruby>${ruby.text}<rt>${ruby.furigana}</rt></ruby>`
        ruby.furigana = null
        ruby.text = null
      }
      html += text
    } else {
      ruby[kind === 1 ? 'furigana' : 'text'] = text
    }
  })
  return html
}

export const lemmaFurigana = word => {
  if (
    word.reading !== '*' &&
    word.basic_form !== '*' &&
    hiraToKata(word.reading) !== hiraToKata(word.basic_form)
  ) {
    const diffs = new DiffMatchPatch().diff_main(
      word.basic_form,
      kataToHira(word.reading)
    )
    let html = ''
    const ruby = { furigana: null, text: null }
    diffs.push([0, ''])
    diffs.map(([kind, text]) => {
      if (kind === 0) {
        if (ruby.furigana || ruby.text) {
          html += `<ruby>${ruby.text}<rt>${ruby.furigana}</rt></ruby>`
          ruby.furigana = null
          ruby.text = null
        }
        html += text
      } else {
        ruby[kind === 1 ? 'furigana' : 'text'] = text
      }
    })
    return html
  } else {
    return word.basic_form
  }
}

export const analyzeJAKuromoji = async text => {
  await ensureKuromojiLoaded()

  const tokens = kuromojiTokenizer.tokenize(text)
  const annotations = []

  // code point indexes, not byte indexes
  let cpBegin
  let cpEnd = 0

  for (const t of tokens) {
    console.log(t)
    cpBegin = cpEnd
    cpEnd = cpBegin + [...t.surface_form].length

    const textSlice = cpSlice(text, cpBegin, cpEnd)

    // sanity checks
    if (textSlice !== t.surface_form) {
      throw new Error('Input text token does not match surface_form')
    }

    if ((!t.basic_form) || (t.basic_form === '')) {
      throw new Error('Unexpected')
    }

    if (t.pos_detail_1 === '空白' && t.surface_form !== ' ') {
      annotations.push({
        cpBegin,
        cpEnd,
        kind: 'break_line',
        data: { furigana: null, lemma: '<br />', surface_form: '<br />' }
      })
    }
    if (t.word_type === 'UNKNOWN') {
      annotations.push({
        cpBegin,
        cpEnd,
        kind: 'word',
        data: { ruby: null, lemma: '<br />', surface_form: t.surface_form }
      })
    }

    if (t.basic_form === '*') {
      continue
    }

    annotations.push({
      cpBegin,
      cpEnd,
      kind: 'word',
      data: { ruby: null, surface_form: t.surface_form }
    })

    if (t.reading !== '*') {
      const kataReading = hiraToKata(t.reading)
      const kataSurfaceForm = hiraToKata(t.surface_form)

      if (kataReading !== kataSurfaceForm) {
        const hiraReading = kataToHira(t.reading)

        if (anyCharIsKana(t.surface_form)) {
          const diffs = dmp.diff_main(kataToHira(t.surface_form), hiraReading)
          let beginOff = 0
          let endOff = 0

          for (const [action, s] of diffs) {
            if (action === -1) {
              // Deletion
              endOff = beginOff + [...s].length
            } else if (action === 1) {
              // Insertion
              if (endOff <= beginOff) {
                console.warn('diff matching furigana, endOff <= beginOff', t.surface_form, hiraReading)
              }
              annotations.push({
                rubyBegin: 0 + beginOff,
                rubyEnd: cpBegin + endOff - cpBegin,
                wordEnd: [...t.surface_form].length,
                kind: 'ruby',
                data: { ruby: s, surface_form: t.surface_form }
              })
              beginOff = endOff
            } else {
              if (action !== 0) {
                throw new Error('diff should only return [-1,0,1]')
              }
              beginOff += [...s].length
              endOff = beginOff
            }
          }
          if (beginOff !== endOff) {
            console.warn('diff matching furigana, beginOff !== endOff', t.surface_form, hiraReading)
          }
        } else {
          // Simple case
          annotations.push({
            rubyBegin: 0,
            rubyEnd: cpEnd - cpBegin,
            wordEnd: [...t.surface_form].length,
            kind: 'ruby',
            data: { ruby: hiraReading, surface_form: t.surface_form }
          })
        }
      }
    }
  }

  return annotations
}
const languageAnalyzerFunc = {
  jpn: analyzeJAKuromoji
}

// eslint-disable-next-line no-prototype-builtins
const canAnalyzeLanguage = language => languageAnalyzerFunc.hasOwnProperty(language)

const analyzeText = async (text, language) => {
  if (!canAnalyzeLanguage(language)) {
    throw new Error('Cannot analyze ' + language)
  }

  return await languageAnalyzerFunc[language](text)
}

// expects ISO 639-3
export const createAutoAnnotatedText = async (text, language) => {
  if (canAnalyzeLanguage(language)) {
    return createAnnoText(text, await analyzeText(text, language))
  } else {
    return createAnnoText(text)
  }
}
