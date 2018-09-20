
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('pages/Index.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/Settings.vue')
      },

      // public pages
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/Login.vue'),
        meta: { isPublic: true }
      },
      {
        path: 'password-recovery',
        name: 'password-recovery',
        component: () => import('pages/PasswordRecovery.vue'),
        meta: { isPublic: true }
      },
      {
        path: 'set-password',
        name: 'set-password',
        component: () => import('pages/SetPassword.vue'),
        meta: { isPublic: true }
      },
      {
        path: 'join',
        name: 'join',
        component: () => import('pages/Join.vue'),
        meta: { isPublic: true }
      },
      {
        path: 'email-confirm',
        name: 'email-confirm',
        component: () => import('pages/EmailConfirm.vue'),
        meta: { isPublic: true }
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    name: 'notFound',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
