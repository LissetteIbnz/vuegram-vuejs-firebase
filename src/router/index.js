import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Login from '@/components/views/Login';
import Dashboard from '@/components/views/Dashboard';
import Settings from '@/components/views/Settings';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true, // Permite autenticar cada ruta
      },
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// Compruebe si la ruta existe y requiere autenticación.
// Luego crea una referencia al usuario actual y autentica las rutas.
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  /**
   * Si la ruta tiene la meta propiedad requiresAuth establecida en true y el usuario no ha iniciado sesión,
   * la ruta será redirigida a la vista de inicio de sesión.
   * Si la ruta tiene requiresAuth establecida en true y el usuario ha iniciado sesión,
   * envíela a la ruta que intente visitar.
   * Porque else, simplemente los envías a cualquier ruta que intenten visitar;
   * esto solo se activa si la ruta no requiere autenticación.
   */
  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
