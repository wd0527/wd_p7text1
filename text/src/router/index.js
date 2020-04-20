import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import List from '@/components/List'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      redirect: '/list',
      children: [
        {
          path: 'list',
          name: 'List',
          component: List,
        },
      ]
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
    },

  ]
})
