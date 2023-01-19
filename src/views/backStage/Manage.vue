<template>
<div>
    <!-- 顶部Logo && 网站说明 &&导航栏 -->
    <Header></Header>
    <NavMenu></NavMenu>
    <!-- 详细信息 -->
    <router-view/>
</div>
  
</template>

<style>
body {
   background-color: rgb(241, 242, 243);
}
</style>

<script>
import Header from '@/components/Header.vue'
import NavMenu from '@/components/NavMenu.vue'

export default {
    components :{
          Header,
          NavMenu,
    },
    data() {
        return {

        }
      },
}

</script>