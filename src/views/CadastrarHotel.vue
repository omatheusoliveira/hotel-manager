<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="pl-4">
          Cadastrar Hotel
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="px-9 py-7">
          <v-card style="width: 100%; heigth: calc(80vh - 100px)">
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-card-title class="text-h7"> Nome do Hotel </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.nome"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>

              <v-row >
                <v-col cols="6" sm="8" md="4">  
                  <v-card-title class="text-h7" style="padding-top: 0"> CNPJ do Hotel </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.cnpj"></v-text-field>
                  </v-card-text>
                </v-col>

                <v-col cols="6" sm="8" md="8">
                  <v-card-title class="text-h7" style="padding-top: 0"> País do Hotel </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo v-model="hotel.pais"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" sm="8" md="4">
                  <v-card-title class="text-h7" style="padding-top: 0"> Estado do Hotel </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.estado"></v-text-field>
                  </v-card-text>
                </v-col>

                <v-col cols="6" sm="8" md="8">
                  <v-card-title class="text-h7" style="padding-top: 0"> Cidade do Hotel </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo v-model="hotel.cidade"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                @click="addHotel()"
              >
                Salvar
              </v-btn>
            </v-card-actions>

          </v-card>
      </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

import axios from "axios";

  export default {

    name: 'CadastrarHotel',

    data: () => ({
      loading: false,
      hotel: {
        nome: "",
        cnpj: "",
        pais: "",
        estado: "",
        cidade: "",
      },
    }),
    methods: {
      addHotel(){
        axios
        .post('http://localhost:3000/controllerHotel', {
          nome: this.hotel.nome,
          cnpj: this.hotel.cnpj,
          pais: this.hotel.pais,
          estado: this.hotel.estado,
          cidade: this.hotel.cidade,
        })
        .then(() => {
          this.$swal({
            title: 'Sucesso!!!',
            text: 'Hotel adicionado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#4BB543',
            allowOutsideClick: true,
          });
          this.hotel = []
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }

  }
</script>
<style scoped>
.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}

</style>