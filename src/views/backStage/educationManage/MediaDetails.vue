<template>
    <div class="dataTable">
        <el-card shadow="always">
        <DetailsTag tagName="媒资管理"></DetailsTag>
        <!-- 搜索框begin -->
        <el-input v-model="QueryMediaParamsDto.filename" placeholder="请输入媒资文件名称" clearable class="input_style"></el-input>
        <el-select v-model="QueryMediaParamsDto.fileType" clearable placeholder="请选择媒资类型" class="input_style">
            <el-option
            v-for="item in fileTypes"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-select v-model="QueryMediaParamsDto.auditStatus" clearable placeholder="请选择媒资审核状态" class="input_style">
            <el-option
            v-for="item in auditStat"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-button icon="el-icon-search" circle style="margin-left: 30px;" @click="serachMediaFiles()"></el-button>
        <el-button type="primary" icon="el-icon-top" @click="toUploadVideo()" style="float:right;margin-right:20px;">上传视频</el-button>
        <!-- 搜索框end -->
        <!-- table begin -->
            <el-table
                :data="MediaData"
                style="width: 100%">
                <el-table-column
                    prop="filename"
                    label="文件名称"
                    width="300">
                </el-table-column>
                <el-table-column
                    prop="fileType"
                    label="类型"
                    width="150">
                    <template slot-scope="scope">
                        <i v-if="scope.row.fileType == '001001'" class="el-icon-picture-outline" style="font-size:25px"></i>
                        <i v-if="scope.row.fileType == '001002'" class="el-icon-video-camera" style="font-size:25px"></i>
                        <i v-if="scope.row.fileType == '001003'" class="el-icon-document" style="font-size:25px"></i>
                        {{$dict(scope.row.fileType)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tags"
                    label="标签"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="上传时间"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="auditStatus"
                    label="审核状态"
                    width="180">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.auditStatus == '002001'" type="danger">{{$dict(scope.row.auditStatus)}}</el-tag>
                    <el-tag v-if="scope.row.auditStatus == '002002'">{{$dict(scope.row.auditStatus)}}</el-tag>
                    <el-tag v-if="scope.row.auditStatus == '002003'" type="success">{{$dict(scope.row.auditStatus)}}</el-tag>
                    <el-link v-if="scope.row.auditStatus == '002001'" type="primary" style="display:block;width:90px">查看审核意见</el-link>
                </template>    
                </el-table-column>
                <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handlePreview(scope.$index, scope.row)">预览</el-button>
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
        <UploadVideo :uploadDialogVisible="uploadDialogVisible" @closeUploadVideoDialog="closeUploadVideoDialog"></UploadVideo>
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
import UploadVideo from './UploadVideo.vue'
export default {
components :{
    DetailsTag,
    UploadVideo
},
data() {
    return {
        MediaData: [],
        pageNo: 1,
        pageSize: 10,
        total: 0,
        //媒资查询过滤条件
        QueryMediaParamsDto: {
            filename: '',
            fileType: '',
            auditStatus: ''
        },

        auditStat: [{
            value: '002001',label: '审核未通过'}, {value: '002002',label: '未审核'}, {value: '002003',label: '审核通过'}
        ], 
        fileTypes: [{value: '001001',label: '图片'}, {value: '001002',label: '视频'}, {value: '001003',label: '其他'},
        ],
        uploadDialogVisible: false
      }
    },
    created(){
       this.load()
    },
    methods: {
    load(){
        this.axios.post(`/media/list?pageNo=${this.pageNo}&pageSize=${this.pageSize}`,this.QueryMediaParamsDto)
        .then(res => {
            if(res.code == 200){
                this.MediaData = res.data.records
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
    serachMediaFiles(){
       this.load()
    },
    toUploadVideo(){
        this.uploadDialogVisible = true
    },
    closeUploadVideoDialog(){
        this.uploadDialogVisible = false
      
    },
    handleDelete(index,row){
        
    },
    handlePreview(index,row){

    },

  }
}

</script>