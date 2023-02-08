<template>  
  <el-dialog title="上传视频" :visible.sync="uploadDialogVisible" :before-close="close" width="30%">
    <el-card>
        <el-progress type="circle" :percentage="percentage" :status="isSuccess" class="progress"></el-progress>
        <el-descriptions direction="vertical" :column="4" style="margin-left: 0px;margin-bottom: 20px;" border>
            <el-descriptions-item label="文件名">{{ fileName }}</el-descriptions-item>
            <el-descriptions-item label="文件大小(B)">{{ fileSize }}</el-descriptions-item>
        </el-descriptions>
        <el-upload
            class="upload"
            :accept="'video/*'"
            :show-file-list="false"
            action="#"
            :limit="1"
            :http-request="uploadVideo"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    <div slot="footer" class="dialog-footer">
    </div>
    </el-card>

  </el-dialog>
</template>

<style>
.upload {
    margin-left: 200px;
    margin-top: 30px;
}
.progress {
    margin-left: 175px;
    margin-bottom: 20px;
}
</style>

<script>
import chunkUtil from '@/utils/chunk.js'
export default {
    data(){
        return {    
            fileList: [],      
            isSuccess: null,
            fileName: '暂未选择文件',
            fileSize: 0,
            percentage: 0,
        }
    },
    props :{
        uploadDialogVisible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        percentage: 'handleSuccess'
    },
    methods: {
        close(){
            this.$emit('closeUploadVideoDialog')
        },
        uploadVideo(options){
             this.isSuccess = null
             this.percentage = 0
             this.fileName = options.file.name
             this.fileSize = options.file.size
             chunkUtil.readFileMd5(options.file,this.percentageChange)          
             this.fileList = []  //解决上传一次后需刷新才能上传第二次的问题
        },
        percentageChange(val){
             this.percentage = val
        },
        handleSuccess(val){
             if(val == 100){
                this.isSuccess = 'success'
             } 
        }

    }

}
</script>