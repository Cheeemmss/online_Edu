<template>
<div class="wrapper">
    <el-card shadow="always">
        <el-cascader  
        v-model="value"
        :options="options"
        @change="handleChange"
        clearable>
        </el-cascader>
    </el-card>
</div>
</template>

<style>
.wrapper {
    width: 80%;
    margin: 20px auto;
}
</style>
<script>
export default {
    data(){
        return {
            value: [],
            options: [

            ]
        }
    },
    created(){
        this.getCourseCategoryTreeNodes()
    },
    methods: {
        getCourseCategoryTreeNodes(){
            this.axios.get('/courseCategory/treeNodes',)
            .then(res => {
                 if(res.code == 200){
                    console.log(res.data);
                    this.options = res.data
                 }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        handleChange(value) {
            console.log(value);
        }
    },
}
</script>