<template>
        <div class="dataTable">
            <el-card shadow="always">
            <DetailsTag tagName="课程管理"></DetailsTag>
            <!-- 搜索框begin -->
            <el-input v-model="queryCourseParams.courseName" placeholder="请输入课程名称" clearable class="input_style"></el-input>
            <el-select v-model="queryCourseParams.auditStatus" clearable placeholder="请选择课程审核状态" class="input_style">
                <el-option
                v-for="item in courseAuditStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="queryCourseParams.publishStatus" clearable placeholder="请选择课程发布状态" class="input_style">
                <el-option
                v-for="item in coursePublishStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button icon="el-icon-search" circle style="margin-left: 30px;" @click="serachCourse()"></el-button>
            <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addCourse()" style="float:right;margin-right:20px;">添加课程</el-button>
            <!-- 搜索框end -->
            <!-- table begin -->
                <el-table
                    :data="courseData"
                    style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="课程名称"
                        width="210">
                    </el-table-column>
                    <el-table-column
                        prop="teachmode"
                        label="任务数"
                        width="90">
                    </el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="创建时间"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="teachmode"
                        label="是否付费"
                        width="110">
                    </el-table-column>
                    <el-table-column
                        prop="auditStatus"
                        label="审核状态 / 发布状态"
                        width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.auditStatus == '202001'" type="danger">{{$dict(scope.row.auditStatus)}}</el-tag>
                        <el-tag v-if="scope.row.auditStatus == '202002'" type="info">{{$dict(scope.row.auditStatus)}}</el-tag>
                        <el-tag v-if="scope.row.auditStatus == '202003'">{{$dict(scope.row.auditStatus)}}</el-tag>
                        <el-tag v-if="scope.row.auditStatus == '202004'" type="success">{{$dict(scope.row.auditStatus)}}</el-tag>

                        <el-tag v-if="scope.row.status == '203001' && scope.row.auditStatus == '202004'" type="info" style="margin-left:5px;">{{$dict(scope.row.status)}}</el-tag>
                        <el-tag v-if="scope.row.status == '203002' && scope.row.auditStatus == '202004'" type="success" style="margin-left:5px;">{{$dict(scope.row.status)}}</el-tag>
                        <el-tag v-if="scope.row.status == '203003' && scope.row.auditStatus == '202004'" style="margin-left:5px;">{{$dict(scope.row.status)}}</el-tag>

                        <el-link v-if="scope.row.auditStatus == '202001'" type="primary" style="display:block;width:90px">查看审核意见</el-link>
                        <el-link v-if="scope.row.status == '203002'" type="primary" style="display:block;width:90px">查看课程详情</el-link>
                    </template>    
                    </el-table-column>
                    <el-table-column
                        prop="teachmode"
                        label="类型"
                        width="150">
                        <template slot-scope="scope">
                            <i v-if="scope.row.teachmode == '200002'" class="el-icon-video-camera" style="font-size:25px"></i>
                            <i v-if="scope.row.teachmode == '200003'" class="el-icon-s-platform" style="font-size:25px"></i>
                            {{$dict(scope.row.teachmode)}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handlePreview(scope.$index, scope.row)">预览</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleSubmitForReview(scope.$index, scope.row)">提交审核</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handlePublish(scope.$index, scope.row)">发布</el-button>
                        <el-button
                        size="mini"
                        type="primary"
                        @click="handleTakeDown(scope.$index, scope.row)">下架</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            <!-- table end -->
            <!-- 分页begin -->
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total=total
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
            courseData: [],
            pageNo: 1,
            pageSize: 10,
            total: 0,
            //课程查询过滤条件
            queryCourseParams: {
                auditStatus: '',
                courseName: '',
                publishStatus: ''
            },

            courseAuditStatus: [{
                value: '202001',
                label: '审核未通过'
                }, {
                value: '202002',
                label: '未提交'
                }, {
                value: '202003',
                label: '已提交'
                }, {
                value: '202004',
                label: '审核通过'
                }], 

            coursePublishStatus: [{
                value: '203001',
                label: '未发布'
                }, {
                value: '203002',
                label: '已发布'
                }, {
                value: '203003',
                label: '已下线'
                },],
            }
        },
        created(){
           this.load()
        },
        methods: {
        load(){
            this.axios.post(`/course/list?pageNo=${this.pageNo}&pageSize=${this.pageSize}`,this.queryCourseParams)
            .then(res => {
                // console.log(res.data)
                if(res.code == 200){
                    this.courseData = res.data.records
                    this.total = res.data.total
                }
            })
            .catch(err => {
                console.error(err); 
            })
        },
        handleCurrentChange(pageNo){
            this.pageNo = pageNo
            this.load()
        },
        serachCourse(){
        //    console.log(this.queryCourseParams)
           this.load()
        },    
        addCourse(){
            this.$router.push('/manage/addCourse')
        },
        handleEdit(index,row){

        },
        handleDelete(index,row){
            
        },
        handlePreview(index,row){

        },
        handleSubmintForReview(index,row){

        },
        handlePublish(index,row){

        },
        handleTakeDown(index,row){

        },
    }
}

</script>