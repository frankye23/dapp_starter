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
        {
          path: '/stake',
          name: 'stake',
          component: () => import('@/views/stake/Index.vue')
        },
        {
          path: '/reward',
          name: 'reward',
          component: () => import('@/views/reward/Index.vue')
        },
       
        
        
      ]
    },
    
    
  ]
  
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })
  
  export default router