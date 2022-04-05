import { mapState } from 'vuex'
import * as subtitleParser from '../../../utils/subtitleParsing'

export default {
  computed: {
    ...mapState('player', ['path'])
  },
  methods: {
    async getSubtitleFile () {
      const folder = this.path.folder
      const filename = this.path.file.split('.')[0]

      return {
        japanese: (await this.$api.get(`/load_file?path=${folder}/${filename}.jpn.srt`)).data,
        anyLang: (await this.$api.get(`/load_file?path=${folder}/${filename}.srt`)).data
      }
    },
    async loadSubtitles () {
      const subtitles = await this.getSubtitleFile()

      this.subtitles.japanese = subtitleParser.parseSRT(subtitles.japanese)
      this.subtitles.anyLang = subtitleParser.parseSRT(subtitles.anyLang)
    }
  }
}
