import { mapState } from 'vuex'
import * as analysis from '../../../utils/analysis'

export default {
  computed: {
    ...mapState('player', ['currentTime']),
    getCurrentJapaneseLine () {
      return this.subtitles.japanese.filter(line =>
        this.currentTime >= line.begin &&
        this.currentTime < line.end
      )
    },
    getCurrentAnyLangLine () {
      return this.subtitles.anyLang.filter(line =>
        this.currentTime >= line.begin &&
        this.currentTime < line.end
      )
    }
  },
  watch: {
    currentTime () {
      this.updateSubtitleLines()
    }
  },
  methods: {
    tokenizer (line) {
      analysis.tokenizer(line).then(res => {
        this.subtitles.token = res
      })
    },
    updateSubtitleLines () {
      const japaneseLine = this.getCurrentJapaneseLine
      if (japaneseLine.length) this.tokenizer(japaneseLine[0].lines)
      if (!japaneseLine.length) this.subtitles.token = []

      const anyLangLine = this.getCurrentAnyLangLine
      if (anyLangLine.length) this.currentSubtitle = anyLangLine[0].lines
      if (!anyLangLine.length) this.currentSubtitle = ''
    }
  }
}
