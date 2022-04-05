<template>
  <v-simple-table>
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            Pastas e Arquivos
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            class="title"
            @click.stop="backDir()"
          >
            ...
          </td>
        </tr>
        <tr
          v-for="item in files"
          :key="item.name"
        >
          <td
            class="body-1"
            @click.stop="open(item)"
          >
            {{ item }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import axios from 'axios'
import FileSystemMixin from './mixins/FileSystemMixin'

export default {
  mixins: [FileSystemMixin],
  data: () => ({
    files: []
  }),
  watch: {
    path () {
      this.readdir(this.getPathString)
    }
  },
  mounted () {
    this.readdir(this.getPathString)
  }
}
</script>
