<template>
        <div class="dataTable">
            <el-card shadow="always">
            <DetailsTag tagName="课程管理"></DetailsTag>
            <!-- 搜索框begin -->
            <el-input v-model="input1" placeholder="请输入内容" clearable class="input_style"></el-input>
            <el-select v-model="value1" clearable placeholder="请选择" class="input_style">
                <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="value2" clearable placeholder="请选择" class="input_style">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button icon="el-icon-search" circle style="margin-left: 30px;"></el-button>
            <!-- 搜索框end -->
            <!-- table begin -->
                <el-table
                    :data="tableData"
                    style="width: 100%">
                    <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址">
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            <!-- table end -->
            <!-- 分页begin -->
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000"
                    @current-change="handleCurrentChange"
                    class="page_style">
                </el-pagination>
            <!-- 分页end -->
            </el-card>
        </div>      
    </template>
    
    <style>
    .dataTable {
        width: 80%;
        margin: 20px auto;
    }
    .input_style{
       display:inline-block; 
       width:200px;
       margin-left: 30px;
    }
    .page_style {
        margin: 20px 0px 10px 500px;
    }
    </style>
    
<script>
import DetailsTag from '@/components/DetailsTag.vue'
export default {
    components :{
        DetailsTag
    },
    data() {
        return {
            input1: '',
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            },
            {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
            }],
            options1: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }], 
                value1: '',

                options2: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
                value2: ''
            }
        },
        methods: {
        handleEdit(index,row){

        },
        handleDelete(index,row){
            
        },
        handleCurrentChange(pageNo){
            console.log(pageNo)
        }
    }
}

</script>