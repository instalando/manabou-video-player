<template>
  <div
    id="subtitle"
    ref="subtitle"
    style="position: absolute; bottom: 70px; z-index: 1; width: 100%"
  >
    <v-col
      v-if="Object.keys(subtitles.token).length > 0"
      cols="12"
      class="Player-text-chunk-outer"
    >
      <div
        class="Player-text-chunk-inner"
        style="margin: 0px; padding: 0px"
      >
        <div style="position: relative">
          <div
            class="
              Player-text-chunk-annotext Player-text-chunk-annotext-visible
            "
          >
            <v-menu
              v-for="(item, index) in subtitles.token"
              :key="index"
              :close-on-content-click="false"
              :nudge-top="10"
              :nudge-left="150"
              top
              offset-y
            >
              <template #activator="{ on }">
                <span
                  onmouseover="this.style.backgroundColor = 'rgba(0, 128, 0, 0.3)'"
                  onmouseout="this.style.backgroundColor = 'rgba(0, 128, 0, 0)'"
                  v-on="on"
                  v-html="furigana(item)"
                />
                <span
                  v-show="
                    item.surface_form !== ' ' &&
                      item.pos === '記号' &&
                      item.pos_detail_1 === '空白' &&
                      item.word_type === 'UNKNOWN'
                  "
                >
                  <br>
                </span>
              </template>
              <v-card
                width="400px"
                height="280px"
                class="scroll"
              >
                //
              </v-card>
            </v-menu>
          </div>
        </div>
      </div>
    </v-col>

    <v-col
      v-if="currentSubtitle.length > 0"
      cols="12"
      class="Player-text-chunk-outer"
      style="margin-top: 10px"
    >
      <div
        class="Player-text-chunk-inner"
        style="margin: 0px; padding: 0px"
      >
        <div style="position: relative">
          <div
            class="
              Player-text-chunk-annotext Player-text-chunk-annotext-visible
            "
          >
            <pre
              style="font-family: arial"
              v-html="currentSubtitle"
            />
          </div>
        </div>
      </div>
    </v-col>
  </div>
</template>

<script>
import * as analysis from '../../utils/analysis'
import LoadSubtitlesMixin from './mixins/LoadSubtitlesMixin'
import SubtitleLinesUpdaterMixin from './mixins/SubtitleLinesUpdaterMixin'

export default {
  mixins: [
    LoadSubtitlesMixin,
    SubtitleLinesUpdaterMixin
  ],
  data: () => ({
    subtitles: {
      japanese: [],
      anyLang: [],
      token: []
    },
    currentSubtitle: ''
  }),
  async mounted () {
    await this.loadSubtitles()
    analysis.startLoadingKuromoji()

    console.log(this.$dict.searchWord('日本語'))
  },
  methods: {
    furigana (word) {
      return analysis.furigana(word)
    },
    lemmaFurigana (word) {
      return analysis.lemmaFurigana(word)
    },
    JapaneseToFurigana (japanse, furigana) {
      return analysis.JapaneseToFurigana(japanse, furigana)
    }
  }
}
</script>

<style scoped lang="css" src="./css/subtitle.css" />
