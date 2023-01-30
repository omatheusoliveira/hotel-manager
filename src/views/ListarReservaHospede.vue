<template>
  <div>
    <!-- Inicio Principal -->
    <v-card>
      <v-toolbar flat>
        <v-icon> fas fa-hotel </v-icon>
        <v-toolbar-title class="pl-4">
          Lista de Reservas:
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col class="px-6 py-6">
            <v-data-table
              dense
              :headers="listReserva.cabecalho"
              :items="listReserva.items"
              :items-per-page="listReserva.porPagina"
              hide-default-footer
              class="elevation-1"
            >
              <template v-slot:[`item.operacoes`]="{ item }">
                  <v-icon size="16" color="green" class="operacoes" @click="abrirEditarReserva(item)">fas fa-pen</v-icon>
                  <v-icon size="16" color="red" class="operacoes" @click="deleteReserva(item)">fas fa-trash</v-icon>
              </template>
            </v-data-table> 
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <!-- Fim Principal -->

    <!-- Modal Alteracao -->
      <v-row class="px-9 py-7" justify="end">
        <v-dialog v-model="dialogReserva" max-width="950">
          <v-card>
            <v-container>
              <v-card-title class="text-h5" style="justify-content:center"> Atualizar - Reserva </v-card-title>
              <v-row style="display: flex; align-items: flex-end">
                <v-col cols="12" sm="6" md="4">
                  <v-card-title class="text-h7"> Numero Reserva </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="number" v-model="reserva.numeroReserva"></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="6" sm="4" md="4">
                  <v-dialog
                    ref="modal_datacheckin"
                    v-model="modal.datacheckin"
                    :return-value.sync="reserva.datacheckin"
                    persistent
                    width="290px"
                    :retain-focus="false"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        dense
                        outlined
                        prepend-icon="fas fa-calendar-alt"
                        label="Data de CheckIn"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :value="reserva.datacheckin"
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="reserva.datacheckin" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal.datacheckin = false"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.modal_datacheckin.save(reserva.datacheckin)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="6" sm="4" md="4">
                  <v-dialog
                    ref="modal_datacheckout"
                    v-model="modal.datacheckout"
                    :return-value.sync="reserva.datacheckout"
                    persistent
                    width="290px"
                    :retain-focus="false"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        dense
                        outlined
                        prepend-icon="fas fa-calendar-alt"
                        label="Data do CheckOut"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :value="reserva.datacheckout"
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="reserva.datacheckout" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal.datacheckout = false"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.modal_datacheckout.save(reserva.datacheckout)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>

              <v-row >
                <v-col cols="6" sm="8" md="3">  
                  <v-card-title class="text-h7" style="padding-top: 0"> Apartamento </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="number" v-model="reserva.apartamento"></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="6" sm="8" md="3">
                  <v-card-title class="text-h7" style="padding-top: 0"> Status </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="number" v-model="reserva.status"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>

              <v-row style="display: flex; justify-content: space-between; padding: 0 13px">
                <v-card-title class="text-h7" style="padding-top: 0"> Hóspedes </v-card-title>
                <div>
                  <v-btn
                  class="ma-2"
                  color="primary"
                  @click="editavel = !editavel"
                  >
                    Editar
                  </v-btn>
                  <v-btn
                    v-show="editavel == true"
                    class="ma-2"
                    color="primary"
                    @click="addHospede"
                  >
                    Adicionar Hospede
                  </v-btn>
                </div>
              </v-row>
              <v-row>
                <v-col class="px-6 py-6">
                  <v-data-table
                    dense
                    :headers="listReserva.cabecalhoHospede"
                    :items="reserva.hospedes"
                    :items-per-page="listReserva.porPagina"
                    item-key="id"
                    hide-default-footer
                    class="elevation-1"
                  >
                    <template v-slot:[`item.nome`]="{ item }" v-if="editavel == true">
                      <v-text-field
                        v-model="item.nome"
                        clearable
                      ></v-text-field>
                    </template>
                    <template v-slot:[`item.sobrenome`]="{ item }" v-if="editavel == true">
                      <v-text-field
                        v-model="item.sobrenome"
                        clearable
                      ></v-text-field>
                    </template>
                    <template v-slot:[`item.id`]="{ item }" v-if="editavel == true">
                      <v-text-field
                        v-model="item.id"
                        clearable
                      ></v-text-field>
                    </template>
                    <template v-slot:[`item.operacoes`]="{ item }" v-if="editavel == true">
                      <v-icon size="16" color="red" class="operacoes" @click="deleteHospede(item)">fas fa-trash</v-icon>
                    </template>
                  </v-data-table> 
                </v-col>
              </v-row>

            </v-container>
            
            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error" @click="(dialogReserva = false, carregarReserva())">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                @click="editarReserva()"
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
    name: 'ListarReservaHospede',

    data: () => ({

      dialogReserva: false,

      editavel: false,

      modal: {
        datacheckin: false,
        datacheckout: false,
      },

      reserva: {
        numeroReserva: "",
        apartamento: "",
        datacheckin: "",
        datacheckout: "",
        status: "",
        id: "",
        hospedes: [],
      },
      listReserva: {
        cabecalho: [
          { text: "ID ", value: "id", sortable: false },
          { text: "Status ", value: "status", sortable: false },
          { text: "Numero da Reserva", value: "numeroReserva", sortable: false },
          { text: "Apartamento", value: "apartamento", sortable: false },
          { text: "Data CheckIn", value: "datacheckin", sortable: false },
          { text: "Data CheckOut", value: "datacheckout", sortable: false },
          { text: "", value: "operacoes", sortable: false, align: "end" },
        ],
        cabecalhoHospede: [
          { text: "ID ", value: "id", sortable: false },
          { text: "Nome ", value: "nome", sortable: false },
          { text: "Sobrenome", value: "sobrenome", sortable: false },
          { text: "", value: "operacoes", sortable: false, align: "end" },
        ],
        items: [],
        porPagina: 10,
      },
    }),


    async mounted() {
      await this.carregarReserva();
    },
    methods: {

      async carregarReserva(){
        await axios
        .get('http://localhost:3000/controllerReserva')
        .then((res) => {
          this.listReserva.items = res.data;
        })
        .catch((error) => {
          console.log(error)
        })

      },

      deleteHospede(item){
        this.reserva.hospedes.splice(item, 1)
      },

      addHospede(){
        this.reserva.hospedes.push({id: null, nome: '', sobrenome: ''})
      },

      abrirEditarReserva(item){
        this.dialogReserva = true;
        this.reserva = item;
      },

      editarReserva(){
        axios
        .put(`http://localhost:3000/controllerReserva/${this.reserva.id}`, this.reserva)
        .then(() => {
          this.$swal({
            title: 'Sucesso!!!',
            text: 'Reserva editada com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#4BB543',
            allowOutsideClick: true,
          });
          this.dialogReserva = false;
          this.editavel = false;
          this.carregarReserva();
        })
        .catch((error) => {
          console.log(error)
        })
      },

      deleteReserva(item){
        this.$swal({
        title: 'Confirmação',
        html: `Deseja realmente excluir a Reserva?`,
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
              .delete(`http://localhost:3000/controllerReserva/${item.id}`)
              .then(() => {
                this.$swal({
                title: 'Sucesso!!!',
                text: 'Reserva excluída com sucesso.',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#4BB543',
                allowOutsideClick: true,
              });
                this.carregarReserva();
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
.v-text-field__details{
  display: none;
}
</style>