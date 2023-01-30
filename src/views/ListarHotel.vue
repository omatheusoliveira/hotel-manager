<template>
  <div>
    <!-- Inicio Principal -->
    <v-card>
      <v-toolbar flat>
        <v-icon> fas fa-hotel </v-icon>
        <v-toolbar-title class="pl-4">
          Lista de Hoteis:
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col class="px-6 py-6">
            <v-data-table
              dense
              :headers="listHotel.cabecalho"
              :items="listHotel.items"
              :items-per-page="listHotel.porPagina"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:[`item.operacoes`]="{ item }">
                  <v-icon size="16" color="green" class="operacoes" @click="abrirEditarHotel(item)">fas fa-pen</v-icon>
                  <v-icon size="16" color="red" class="operacoes" @click="deleteHotel(item)">fas fa-trash</v-icon>
              </template>

            </v-data-table> 
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Fim Principal -->

    <!-- Modal Alteracao -->
      <v-row class="px-9 py-7" justify="end">
        <v-dialog v-model="dialogEditarHotel" max-width="900">
          <v-card>
            <v-container>
              <v-card-title class="text-h5" style="justify-content:center"> Atualizar - Hotel </v-card-title>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-card-title class="text-h7"> Nome </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.nome"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>

              <v-row >
                <v-col cols="6" sm="8" md="4">  
                  <v-card-title class="text-h7" style="padding-top: 0"> CNPJ </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.cnpj"></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="6" sm="8" md="8">
                  <v-card-title class="text-h7" style="padding-top: 0"> Cidade </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.cidade"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6" sm="8" md="4">
                  <v-card-title class="text-h7" style="padding-top: 0"> Estado </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.estado"></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="6" sm="8" md="8">
                  <v-card-title class="text-h7" style="padding-top: 0"> País </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="text" v-model="hotel.pais"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>

            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error" @click="dialogEditarHotel = false">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                @click="editarHotel()"
              >
                Salvar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
      <!-- Fim Modal Alteracao -->
  </div>
</template>

<script>

import axios from "axios";

  export default {
    name: 'ListarHotel',

    data: () => ({

      dialogEditarHotel: false,

      hotel: {
        nome: "",
        cnpj: "",
        pais: "",
        estado: "",
        cidade: "",
        id: "",
      },
      listHotel: {
        cabecalho: [
          { text: "ID ", value: "id", sortable: false },
          { text: "Nome", value: "nome", sortable: false },
          { text: "CNPJ", value: "cnpj", sortable: false },
          { text: "Cidade", value: "cidade", sortable: false },
          { text: "Estado - UF", value: "estado", sortable: false },
          { text: "País", value: "pais", sortable: false },
          { text: "", value: "operacoes", sortable: false, align: "end" },
        ],
        items: [],
        porPagina: 10,
      },
    }),
    mounted() {
    this.carregarHotel();
    },
    methods: {
      carregarHotel(){
        axios
        .get('http://localhost:3000/controllerHotel')
        .then((res) => {
          this.listHotel.items = res.data
        })
        .catch((error) => {
          console.log(error)
        })
      },
      abrirEditarHotel(item){
        this.dialogEditarHotel = true;
        console.log(item)
        this.hotel = item;
      },
      editarHotel(){
        axios
        .put(`http://localhost:3000/controllerHotel/${this.hotel.id}`, {
          cnpj: this.hotel.cnpj,
          nome: this.hotel.nome,
          cidade: this.hotel.cidade,
          pais: this.hotel.pais,
          estado: this.hotel.estado,
        })
        .then(() => {
          this.$swal({
            title: 'Sucesso!!!',
            text: 'Hotel editado com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#4BB543',
            allowOutsideClick: true,
          });
          this.dialogEditarHotel = false;
          this.carregarHotel();
        })
        .catch((error) => {
          console.log(error)
        })
      },
      deleteHotel(item){
        this.$swal({
        title: 'Confirmação',
        html: `Deseja realmente excluir o Hotel?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        confirmButtonColor: '#4BB543',
        cancelButtonColor: '#d33',
        allowOutsideClick: false,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await axios
              .delete(`http://localhost:3000/controllerHotel/${item.id}`)
              .then(() => {
                this.$swal({
                title: 'Sucesso!!!',
                text: 'Hotel excluído com sucesso.',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#4BB543',
                allowOutsideClick: true,
              });
                this.carregarHotel();
              });
          }
        });
      }
    }

  }
</script>
<style scoped>
.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}
.operacoes {
  cursor: pointer;
  justify-content: flex-end;
  padding-right: 8px;
}
.operacoes::after{
  background-color: transparent !important;
}
.v-icon.v-icon::after{
  display: none;
}
.v-dialog{
  overflow-y: unset;
}
</style>