<template>
  <div>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title class="pl-4">
          Cadastrar Reserva - Hóspede
        </v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row class="px-9 py-7">
          <v-card style="width: 100%; heigth: calc(80vh - 100px)">
            <v-container>
              <v-row style="padding-left: 15px">
                <v-col cols="2" class="alinhamento">
                  <v-dialog
                    ref="modal_datacheckin"
                    v-model="modal.datacheckin"
                    :return-value.sync="reservaHospede.datacheckin"
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
                        :value="formatDateInicioGrid"
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="reservaHospede.datacheckin" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal.datacheckin = false"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.modal_datacheckin.save(reservaHospede.datacheckin)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-col>

                <v-col cols="2" class="alinhamento">
                  <v-dialog
                    ref="modal_datacheckout"
                    v-model="modal.datacheckout"
                    :return-value.sync="reservaHospede.datacheckout"
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
                        :value="formatDateFinalGrid"
                        clearable
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="reservaHospede.datacheckout" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal.datacheckout = false"
                        >Cancelar</v-btn
                      >
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.modal_datacheckout.save(reservaHospede.datacheckout)"
                        >OK</v-btn
                      >
                    </v-date-picker>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-row >
                <v-col cols="6" sm="8" md="3">
                  <v-card-title class="text-h7" style="padding-top: 0"> Número da Reserva </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="number" v-model="reservaHospede.numeroReserva"></v-text-field>
                  </v-card-text>
                </v-col>

                <v-col cols="6" sm="8" md="3">
                  <v-card-title class="text-h7" style="padding-top: 0"> Apartamento </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="number" v-model="reservaHospede.apartamento"></v-text-field>
                  </v-card-text>
                </v-col>
                <v-col cols="6" sm="8" md="3">
                  <v-card-title class="text-h7" style="padding-top: 0"> Status </v-card-title>
                  <v-card-text style="padding-bottom: 0">
                    <v-text-field solo type="number" v-model="reservaHospede.status"></v-text-field>
                  </v-card-text>
                </v-col>
              </v-row>
              <v-row style="width: 800px" class="pl-4">
                <v-toolbar-title class="pl-4" style="padding-top: 10px; padding-bottom: 20px; padding-right: 20px; color: black" >
                  Hóspedes
                  <v-btn @click="addLinha()" style="margin-left: 30px"> Adicionar hóspede</v-btn>
                </v-toolbar-title>
                <div style="display: flex; flex-direction: row; flex-wrap: wrap;">
                  <div v-for="hospede, index in reservaHospede.hospedes" :key="index">
                    <v-row style="margin-left: 1px">
                      <div>
                        <v-col>
                          <v-text-field
                            dense
                            outlined
                            label="ID Hóspede"
                            v-model="hospede.id"
                            type="text"
                            style="width: 200px"
                          ></v-text-field>
                        </v-col>
                      </div>
                      <div>
                        <v-col>
                          <v-text-field
                            dense
                            outlined
                            label="Nome"
                            v-model="hospede.nome"
                            type="text"
                            style="width: 200px"
                          ></v-text-field>
                        </v-col>
                      </div>
                      <div>
                        <v-col>
                          <v-text-field
                            dense
                            outlined
                            label="Sobrenome"
                            v-model="hospede.sobrenome"
                            type="text"
                            style="width: 200px"
                          ></v-text-field>
                        </v-col>
                      </div>
                      <div v-show="reservaHospede.hospedes.length > 1">
                        <v-col style="margin-top: 12px">
                          <v-icon @click="removeLinha(index)" small color="red">fas fa-trash</v-icon>
                        </v-col>
                      </div>
                    </v-row>
                  </div>
                </div>
              </v-row>
            </v-container>

            <v-card-actions class="alignmentDialog">
              <v-btn class="ma-2" color="error">
                Cancelar
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                @click="addReservaHospede()"
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

import moment from "moment";
import axios from "axios";

  export default {

    name: 'CadastrarReservaHospede',

    data: () => ({
      loading: false,

      reservaHospede: {
        numeroReserva: null,
        apartamento: null,
        datacheckin: "",
        datacheckout: "",
        status: null,
        hospedes: [
          {
            id: null,
            nome: '',
            sobrenome: '',
          }
        ],
      },

      modal: {
      datacheckin: false,
      datacheckout: false,
      },
      
    }),

    computed: {
      formatDateInicioGrid() {
        return this.reservaHospede.datacheckin
          ? moment(this.reservaHospede.datacheckin).format("DD/MM/YYYY")
          : "";
      },
      formatDateFinalGrid() {
        return this.reservaHospede.datacheckout
          ? moment(this.reservaHospede.datacheckout).format("DD/MM/YYYY")
          : "";
      },
    },

    methods: {
      addReservaHospede(){
        axios
        .post('http://localhost:3000/controllerReserva', this.reservaHospede)
        .then(() => {
          console.log(this.reservaHospede)
          this.$swal({
            title: 'Sucesso!!!',
            text: 'Reserva criada com sucesso.',
            icon: 'success',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#4BB543',
            allowOutsideClick: true,
          });
          this.reservaHospede = {
            numeroReserva: null,
            apartamento: null,
            datacheckin: "",
            datacheckout: "",
            status: null,
            hospedes: [
              {
                id: null,
                nome: '',
                sobrenome: '',
              }
            ],
          }
        })
        .catch((error) => {
          console.log(error)
        })
      },
      
      removeLinha(index){
        this.reservaHospede.hospedes.splice(index, 1);
      },

      addLinha(){
        this.reservaHospede.hospedes.push({id: null, nome: '', sobrenome: ''})
      },

      limparLinhas(){
        this.reservaHospede = [{
          id: null,
          nome: '',
          sobrenome: '',
        }]
      },
    }

  }
</script>
<style scoped>
.alignmentDialog {
  display: flex;
  justify-content: flex-end;
}
.alinhamento {
  padding-bottom: 0 !important;
  padding-top: 25px !important;
}

</style>