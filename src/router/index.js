import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Student from '@/components/Student'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/abc/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Student',
      component: Student
    }
  ]
})
