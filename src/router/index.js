import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    name : 'backStage',
    path : '/manage',
    component: ()=> import('@/views/backStage/Manage.vue'),
    children : [
       {
         name : 'courseManage',
         path : 'courseManage',
         component: ()=> import('@/views/backStage/educationManage/CourseDetails.vue')
       },
       {
        name : 'addCourse',
        path : 'addCourse',
        component: ()=>import('@/views/backStage/educationManage/AddCourse.vue')
       },
       {
        name: 'editRecordsCourse',
        path: 'editRecordsCourse',
        component: ()=>import('@/views/backStage/educationManage/EditRecordCourse.vue')
       },
       {
         name: 'mediaManage',
         path: 'mediaManage',
         component: ()=>import('@/views/backStage/educationManage/MediaDetails.vue')
       }
    ] 
  }
 
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
