import Vue from 'vue';
import Router from 'vue-router';
import {
  store
} from './_store';
import Index from './pages/Index.vue';
import Events from './pages/Events.vue';
import Event from './pages/Event.vue';
import Gallery from './pages/Gallery.vue';
import Login from './pages/Login.vue';
import Register from './pages/Register.vue';
import Profile from './pages/Profile.vue';
import EditProfile from './pages/EditProfile.vue';
import MainNavbar from './layout/MainNavbar.vue';
import MainFooter from './layout/MainFooter.vue';

Vue.use(Router);

let router = new Router({
  linkExactActiveClass: 'active',
  mode: 'history',
  routes: [{
      path: '/',
      name: 'index',
      components: {
        default: Index,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: {
          colorOnScroll: 400
        },
        footer: {
          backgroundColor: 'black'
        }
      }
    },
    {
      path: '/events',
      name: 'events',
      components: {
        default: Events,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: {
          colorOnScroll: 0
        },
        footer: {
          backgroundColor: 'black'
        }
      }
    },
    {
      path: '/events/:slug',
      name: 'event',
      components: {
        default: Event,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: {
          colorOnScroll: 0
        },
        footer: {
          backgroundColor: 'black'
        }
      }
    },
    {
      path: '/gallery',
      name: 'gallery',
      components: {
        default: Gallery,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: {
          colorOnScroll: 0
        },
        footer: {
          backgroundColor: 'black'
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      components: {
        default: Login,
        header: MainNavbar
      },
      props: {
        header: {
          colorOnScroll: 400
        }
      }
    },
    {
      path: '/register',
      name: 'register',
      components: {
        default: Register,
        header: MainNavbar
      },
      props: {
        header: {
          colorOnScroll: 400
        }
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components: {
        default: Profile,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: {
          colorOnScroll: 400
        },
        footer: {
          backgroundColor: 'black'
        }
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/edit-profile',
      name: 'editprofile',
      components: {
        default: EditProfile,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: {
          colorOnScroll: 0
        },
        footer: {
          backgroundColor: 'black'
        }
      },
      meta: {
        requiresAuth: true
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next("/");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router