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
                  @click.stop="fetchWord(item.basic_form)"
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
                <v-card-text class="AnnoText-tooltip-search-words-item">
                  <div
                    v-for="(entry, entry_index) in dictWord"
                    :key="entry_index"
                    class="AnnoText-tooltip-search-word"
                  >
                    <div
                      v-if="entry.readings.length > 0"
                      class="headline AnnoText-tooltip-search-word"
                      v-html="
                        JapaneseToFurigana(
                          entry.readings[0].kanji,
                          entry.readings[0].kana
                        )
                      "
                    />
                    <div
                      v-else
                      class="headline AnnoText-tooltip-search-word"
                      v-html="entry.readings[0].kana"
                    />
                    <ul
                      v-for="(sense, sense_index) in entry.senses"
                      :key="sense_index"
                      style="list-style-type: none; list-style: none"
                      class="AnnoText-tooltip-dict-hits"
                    >
                      <li
                        style="list-style-type: none; list-style: none"
                        class="AnnoText-tooltip-dict-hit"
                      >
                        <div
                          style="margin-left: -20px"
                          class="Annotext-tooltip-dict-name"
                        >
                          <span>
                            {{ sense.part_of_speech }}
                          </span>
                        </div>
                        <div
                          style="margin-left: -20px"
                          class="Annotext-tooltip-dict-hit-text"
                        >
                          <span
                            v-for="(definition, definition_index) in sense.definition"
                            :key="definition_index"
                          >
                            <span v-html="definition" />
                          </span>
                        </div>
                      </li>
                    </ul>
                    <br>
                    <v-divider />
                    <br>
                  </div>
                </v-card-text>
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
import FetchWordMixin from './mixins/FetchWordMixin'

export default {
  mixins: [
    LoadSubtitlesMixin,
    SubtitleLinesUpdaterMixin,
    FetchWordMixin
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
