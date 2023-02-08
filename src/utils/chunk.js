import CryptoJS from 'crypto-js'
import request from '@/utils/request.js'
import axios from 'axios'
import ElementUI from 'element-ui';
import SparkMD5 from 'spark-md5';
export default {

    fileMd5: '',  //当前上传文件的md5值
 
    //获取某块分片的数据
    getChunkInfo(file,currentChunk,chunkSize){
        let start = currentChunk * chunkSize;
        let end = Math.min(file.size, start + chunkSize);
        let chunk = file.slice(start, end);
        return chunk;
    },

   //计算文件md5值 
    computeFileMd5(file,percentageChange){
        const chunkSize = 2 * 1024 * 1024                 
        const chunkNum = Math.ceil(file.size / chunkSize)
        let fileReader = new FileReader() 
        let spark = new SparkMD5.ArrayBuffer()
        let currentChunk = 0

        let begin = new Date().getTime()
        ElementUI.Notification({
            title: 'info',
            message: `文件解析中 请稍等`,
            type: 'info'
        });
        fileReader.readAsArrayBuffer(this.getChunkInfo(file,currentChunk,chunkSize))
    
        fileReader.addEventListener('load',(e) => {
            spark.append(e.target.result)
            if(currentChunk < chunkNum){
                currentChunk ++ 
                fileReader.readAsArrayBuffer(this.getChunkInfo(file,currentChunk,chunkSize))
            }else{
                let md5 = spark.end()
                spark.destroy()
                this.fileMd5 = md5
                let end = new Date().getTime()
                let time = end - begin
                console.log('文件md5为:' + md5 + " 计算md5用时: " + time + "ms")
                this.checkFile(file,percentageChange)
            }
        }) 
    },

    

    //判断文件是否存在(已上传)
    checkFile(file,percentageChange){
            request.get(`/media/checkFile/${this.fileMd5}`,)
            .then(res => {
                if(res.code == 200 && res.data == false){
                    this.readChunkMD5(0,file,percentageChange)
                }else{
                    percentageChange(100) //已上传过完全相同的文件则不需要上传(秒传)
                    ElementUI.Notification({
                        title: 'success',
                        message: `文件 ${file.name} 已上传成功`,
                        type: 'success'
                    });
                }
            })
            .catch(err => {
                console.error(err); 
            })       
    },


    // 针对每个分片文件进行上传处理
     readChunkMD5(num,file,percentageChange){
            const chunkSize = 2 * 1024 * 1024                 //分片大小(2M)
            const chunkNum = Math.ceil(file.size / chunkSize) //分片数
            // console.log("chunkNum:"+chunkNum);
            if (num <= chunkNum - 1) {
                //得到当前需要上传的分片文件
                const chunk = this.getChunkInfo(file, num, chunkSize);
                // 上传分块前检查当前分块传过没有
                request.get(`/media/checkChunk/${this.fileMd5}/${num}`,)  //num是当前分片的索引
                .then(res => {
                //1. 当前分块没有传过 那么久上传当前分块
                if(res.code == 200 && res.data == false){
                    let formData = new FormData();
                    formData.append("file",chunk)
                    formData.append("fileMd5",this.fileMd5)
                    formData.append("chunkIndex",num)
                    axios({
                        headers: {'Content-Type': 'multipart/form-data'},
                        method:'post',
                        url: 'http://localhost:63010/media/uploadChunk',
                        data: formData
                    })
                    .then(res =>{
                        //当前分片上传成功，继续递归调用传下一个分片
                        if(res.data.code == 200 && res.data.data == true){
                            percentageChange(Math.floor((num / chunkNum) * 100))
                            this.readChunkMD5(num + 1,file,percentageChange)
                        }else {
                        //当前分片上传失败
                             console.log('分片上传失败');                            
                        }
                    })
                    .catch(err => {
                        ElementUI.Notification({
                            title: 'error',
                            message: `文件上传异常`,
                            type: 'error'
                        });
                    })
                }else{
                //2. 当前分块已经传过了 直接跳过去传下一个
                    percentageChange(Math.floor((num / chunkNum) * 100))
                    this.readChunkMD5(num + 1,file,percentageChange)
                }
                })
                .catch(err => {
                    console.error(err); 
                })                 
            } else {
                request.get(`/media/mergeChunk/${this.fileMd5}/${file.name}/${chunkNum}`,)
                .then(res => {
                    if(res.code == 200 && res.data == true){
                        percentageChange(100)
                        ElementUI.Notification({
                            title: 'success',
                            message: `文件 ${file.name} 已上传成功`,
                            type: 'success'
                        });
                    }else {
                        console.log('文件合并失败')
                    }
                })
                .catch(err => {
                    ElementUI.Notification({
                        title: 'error',
                        message: `文件上传异常`,
                        type: 'error'
                    });
                })
            }
        }

}