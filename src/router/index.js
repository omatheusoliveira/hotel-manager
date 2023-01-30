import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Principal',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/PrincipalView.vue'),
    children: [
      {
        path: '/cadastrar-hotel',
        name: 'Cadastrar Hotel',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/CadastrarHotel.vue'),
      },
      {
        path: '/listar-hotel',
        name: 'Listar Hotel',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/ListarHotel.vue'),
      },
      {
        path: '/listar-reserva-hospede',
        name: 'Listar Reserva Hospede',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/ListarReservaHospede.vue'),
      },
      {
        path: '/cadastrar-reserva-hospede',
        name: 'Cadastrar Reserva Hospede',
        // route level code-splitting
        // this generates a separate chunk (principal.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "principal" */ '../views/CadastrarReserva.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
