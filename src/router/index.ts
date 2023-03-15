import {
    createRouter,
    createWebHashHistory,
    RouteRecordRaw
  } from 'vue-router'
  const Layout = () => import('../views/layout/Layout.vue')
  import home from '@/views/home.vue'
  const routes: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Root',
      component: Layout,
      children: [
        {
          path: '/',
          component: home,
          name: 'Home',
          meta: {
            title: 'Home',
          },
        },
      ]
    },
    
    
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router