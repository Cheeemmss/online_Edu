<template>  
  <el-dialog title="上传文件" :visible.sync="uploadDialogVisible" :before-close="close" width="45%">
        <el-table
        :data="uploadVideoData"
        style="width: 100%">
        <el-table-column
            prop="filename"
            label="文件名"
            width="250">
        </el-table-column>
        <el-table-column
            prop="filesize"
            label="文件大小"
            width="150">
        </el-table-column>
        <el-table-column
            prop="percentage"
            label="状态"
            width="300">
            <template slot-scope="scope">
                <el-progress :percentage="scope.row.percentage"></el-progress>
            </template>    
        </el-table-column>
        <el-table-column
            label="操作">
            <template slot-scope="scope">
                <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
        </el-table>
        <el-upload
            :show-file-list="false"
            action="#"
            :limit="1"
            :http-request="uploadVideo"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
    <div slot="footer" class="dialog-footer">
    </div>
  </el-dialog>
</template>

<style>
</style>

<script>
import chunkUtil from '@/utils/chunk.js'
export default {
    data(){
        return {    
            fileList: [],      
            uploadVideoData:[
                {
                    filename: 'file1',
                    filesize: 600,
                    percentage: 60
                }
            ]
        }
    },
    props :{
        uploadDialogVisible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        close(){
            this.$emit('closeUploadVideoDialog')
        },
        uploadVideo(options){
             chunkUtil.readFileMd5(options.file)
             this.fileList = []  //解决上传一次后需刷新才能上传第二次的问题       
        },
        handleDelete(){

        }
    }

}
</script>