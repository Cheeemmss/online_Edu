<!-- 表格上的标签说明 -->
<template>
    <div style="display: inline-block;">
      <el-tag class="tag" effect="light">{{tagName}}</el-tag>
    </div>
</template>

<style>
.tag {
    width: 120px;
    height: 45px;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight:900;
    line-height: 45px;
    text-align: center;
    user-select: none;
}
</style>

<script>
export default {
   data() {
     return {
        
     }
   },
   props: {
      tagName: String
   }
}
</script>