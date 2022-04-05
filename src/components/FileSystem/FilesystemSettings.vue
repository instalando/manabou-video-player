<template>
  <section>
    <!-- <v-dialog
      v-model="visible"
      max-width="700px"
      @change="(val) => $emit('update:visible', val)"
    >
      <v-card>
        <v-container>
          <v-card-title>Configurações</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="10">
                <v-text-field
                  v-model="root_folder"
                  label="Raíz das pastas"
                />
              </v-col>

              <v-col cols="2">
                <v-btn
                  style="margin-bottom: -45px"
                  @click.stop="openFilesystem()"
                >
                  Buscar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-container>
      </v-card>
    </v-dialog> -->
  </section>
</template>

<script>
export default {
  model: {
    prop: 'visible',
    event: 'update:visible'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  }
}
</script>
