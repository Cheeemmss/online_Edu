<!-- 网页Header部分 -->
<template>
 <div class="header">
    <el-avatar shape="square" :size="65" :src="logo" class="logo"></el-avatar>
    <div class="content">
        <h3>cheems 在线学习小站</h3>
        <div class="discription">
            <span>立项日期</span>
            <el-tag class="time" size="small">2023-1-19</el-tag>
        </div>
    </div>
 </div>
</template>

<style>
.header{
    margin:30px 0px 20px 192px;
    
}
.logo {
    vertical-align: top;
}
.content {
    display: inline-block;
    padding-top: 5px;
    padding-left: 10px;
}
.discription {
    padding-top: 4px;
}
.time {
    margin-left: 10px;
}
</style>

<script>
import logo from '@/assets/logo.png'
export default {
    data() {
        return {
            // el-avatar 使用这种方式才可以引入本地图片
            logo : logo
        }
    },
}
</script>