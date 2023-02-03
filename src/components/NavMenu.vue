<!-- 导航栏部分 -->
<template>
    <div class="menu">
        <el-card shadow="hover">
                <el-menu default-active="/manage/courseManage"  mode="horizontal" :router="true">
                <el-menu-item index="1"><i class="el-icon-s-home"></i><span slot="title">网站首页</span></el-menu-item>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-school"></i>教务教学</template>
                    <el-menu-item index="/manage/courseManage">课程管理</el-menu-item>
                    <el-menu-item index="2-2">直播管理</el-menu-item>
                    <el-menu-item index="/manage/mediaManage">媒资管理</el-menu-item>
                    <el-menu-item index="2-4">作业管理</el-menu-item>
                    <el-menu-item index="2-5">评价管理</el-menu-item>
                    <el-menu-item index="2-6">作业批改</el-menu-item>
                </el-submenu>
                <el-menu-item index="3"><i class="el-icon-office-building"></i><span slot="title">机构管理</span></el-menu-item>
                <el-menu-item index="4"><i class="el-icon-coin"></i><span slot="title">财务管理</span></el-menu-item>
            </el-menu>
        </el-card>

    </div>
</template>

<style>
.menu {
   width: 80%;
   margin: auto;
}
</style>

<script>
export default {

}
</script>