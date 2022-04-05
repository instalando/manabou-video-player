<template>
  <div
    id="subtitle"
    ref="subtitle"
    style="position: absolute; bottom: 70px; z-index: 1; width: 100%"
  >
    <v-col
      v-if="!!textjpn && textjpn_visible"
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
              v-for="(item, index) in japaneseToken"
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
                  @click.stop="getWord(item.basic_form)"
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
                <!-- <v-card-text class="AnnoText-tooltip-search-words-item">
                  <div
                    v-for="(word, index) in findedWord"
                    :key="index"
                    class="AnnoText-tooltip-search-word"
                  >
                    <div
                      v-if="word.kanji_elements.length > 0"
                      class="headline AnnoText-tooltip-search-word"
                      v-html="
                        JapaneseToFurigana(
                          word.kanji_elements[0].keb,
                          word.reading_elements[0].reb
                        )
                      "
                    />
                    <div
                      v-else
                      class="headline AnnoText-tooltip-search-word"
                      v-html="word.reading_elements[0].reb"
                    />
                    <ul
                      v-for="(sense, index) in word.senses"
                      :key="index"
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
                          <span
                            v-for="(pos, index) in sense.pos"
                            :key="index"
                          >{{ pos.text }}</span>
                        </div>
                        <div
                          style="margin-left: -20px"
                          class="Annotext-tooltip-dict-hit-text"
                        >
                          <span
                            v-for="(glossary, index) in sense.glossary"
                            :key="index"
                          >
                            {{ glossary.translated }}
                            <span
                              v-if="
                                index != Object.keys(sense.glossary).length - 1
                              "
                              class="Annotext-tooltip-dict-hit-text"
                            >;</span>
                          </span>
                        </div>
                      </li>
                    </ul>
                    <br>
                    <v-divider />
                    <br>
                  </div>
                </v-card-text> -->
              </v-card>
            </v-menu>
          </div>
        </div>
      </div>
    </v-col>
    <v-col
      v-if="!!textbr && textbr_visible"
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
              v-html="textbr"
            />
          </div>
        </div>
      </div>
    </v-col>
  </div>
</template>

<script>
import axios from 'axios'
import * as analysis from '../../utils/analysis'
import * as subtitleParser from '../../utils/subtitleParsing'
import { mapState, mapGetters, mapActions } from 'vuex'
var fs = require('fs')

export default {
  data: () => ({
    textbr_visible: true,
    textjpn_visible: true,
    textbr: '',
    subbr: '',
    textjpn: '',
    japaneseToken: null,
    fav: true,
    menu: false,
    message: false,
    hints: true,
    findedWord: []
  }),
  computed: {
    ...mapState('player', ['path', 'currentTime']),
    ...mapGetters('player', ['getPathString'])
  },
  watch: {
    currentTime () {
      this.updateText()
    },
    textjpn () {
      analysis.tokenizer(this.textjpn).then(res => {
        this.japaneseToken = res
      })
    }
  },
  mounted () {
    document.addEventListener('keyup', event => {
      if (event.code === 'Digit1') {
        this.textjpn_visible = !this.textjpn_visible
      }

      if (event.code === 'Digit2') {
        this.textbr_visible = !this.textbr_visible
      }
    })

    const path = this.getPathString.split('/')
    const newPath = this.getPathString.split('/').slice(0, -1).join('/')

    var subjpn = fs.readFileSync(
      `${newPath}/${path[path.length - 1].split('.')[0]}.jpn.srt`,
      'utf8'
    )
    this.subjpn = subtitleParser.parseSRT(subjpn)

    var subbr = fs.readFileSync(
      `${newPath}/${path[path.length - 1].split('.')[0]}.brl.srt`,
      'utf8'
    )
    this.subbr = subtitleParser.parseSRT(subbr)

    analysis.startLoadingKuromoji()
  },
  methods: {
    ...mapActions('subtitle', ['setSubJPN', 'setIndexJPN']),
    ...mapActions('player', ['setPause']),
    furigana (word) {
      return analysis.furigana(word)
    },
    lemmaFurigana (word) {
      return analysis.lemmaFurigana(word)
    },
    JapaneseToFurigana (japanse, furigana) {
      return analysis.JapaneseToFurigana(japanse, furigana)
    },
    getWord (word) {
      this.setPause(true)
      axios
        .post('http://127.0.0.1:8000/api/find', {
          search: word
        })
        .then(res => {
          this.findedWord = res.data.word
        })
    },
    updateText () {
      let currentjpn = {}
      let currentbr = {}
      this.setSubJPN(this.subjpn)

      for (let i = 0; i <= this.subjpn.length - 1; i++) {
        if (
          this.currentTime >= this.subjpn[i].begin &&
          this.currentTime < this.subjpn[i].end
        ) {
          currentjpn = this.subjpn[i]
          this.setIndexJPN(i)
        }
      }

      for (let i = 0; i <= this.subbr.length - 1; i++) {
        if (
          this.currentTime >= this.subbr[i].begin &&
          this.currentTime < this.subbr[i].end
        ) {
          currentbr = this.subbr[i]
        }
      }

      if (currentjpn !== undefined && currentjpn.lines) {
        this.textjpn = currentjpn.lines
      } else {
        this.textjpn = ''
      }

      if (currentbr !== undefined && currentbr.lines) {
        this.textbr = currentbr.lines
      } else {
        this.textbr = ''
      }
    }
  }
}
</script>

<style scoped lang="css" src="./css/subtitle.css" />