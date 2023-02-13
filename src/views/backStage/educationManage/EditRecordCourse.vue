<template>
    <div class="wrapper">
        <el-card shadow="always">
              <DetailsTag tagName="编辑课程"></DetailsTag>
              <!-- 步骤条begin -->
              <el-steps :active="active" style="margin-bottom:20px;" finish-status="success" v-if="courseBaseInfoForm.teachmode == 200002">
              <el-step title="填写课程基本信息" description="完善课程的基本信息和营销信息"></el-step>
              <el-step title="填写课程计划" description="填写课程的大纲目录/章节/小节 并上传课程视频"></el-step>
              <el-step title="填写讲师信息" description="完善课程讲师的基本信息"></el-step>
              </el-steps>
              <!-- 步骤条end -->
    
    
            <!-- 1 课程基本信息-->
            <div v-if="(active == 1)">
                <el-form ref="courseBaseInfoForm" :model="courseBaseInfoForm" label-width="80px" class="baseInfoForm" :rules="courseBaseInfoFormRules">
                    <el-form-item label="课程名称" prop="name">
                        <el-input style="width:280px;"
                        maxlength="25"
                        show-word-limit
                        placeholder="请输入课程名称"
                        v-model="courseBaseInfoForm.name"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="课程标签">
                        <el-input style="width:280px;"
                        placeholder="请输入课程标签"
                        v-model="courseBaseInfoForm.tags"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="课程分类" prop="courseCategoryArr">
                        <el-cascader  placeholder="请选择课程分类"
                        v-model="courseCategoryArr"
                        :options="courseCategoryOptions"
                        @change="handleChange"
                        >
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="课程等级" prop="grade">
                        <el-select v-model="courseBaseInfoForm.grade" placeholder="请选择课程等级">
                            <el-option
                            v-for="item in courseGradeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="课程简介">
                        <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入课程简介"
                        v-model="courseBaseInfoForm.description">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="适用人群" prop="users">
                        <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入适用人群"
                        v-model="courseBaseInfoForm.users">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="课程封面">
                    <el-upload
                        action="http://localhost:63010/media/upload/file"
                        list-type="picture-card"
                        :limit="1"
                        :on-exceed="overLimit"
                        :on-success="onSuccess"
                        >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="当前封面">
                            <el-image
                            style="width: 150px; height: 150px;"
                            :src="coursePic"
                            >
                            </el-image>
                    </el-form-item>
                    <el-form-item label="课程类型" prop="charge">
                        <el-radio v-model="courseBaseInfoForm.charge" label="201000">免费</el-radio>
                        <el-radio v-model="courseBaseInfoForm.charge" label="201001">收费</el-radio>
                    </el-form-item>
                    <el-form-item v-if="courseBaseInfoForm.charge == '201001'" label="课程价格" prop="price">
                        <el-input style="width:280px;"
                        placeholder="请输入课程价格"
                        v-model.number="courseBaseInfoForm.price"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="咨询QQ">
                        <el-input style="width:280px;"
                        placeholder="请输入咨询QQ"
                        v-model="courseBaseInfoForm.qq"                   
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="咨询微信">
                        <el-input style="width:280px;"
                        placeholder="请输入咨询微信"
                        v-model="courseBaseInfoForm.wechat"          
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input style="width:280px;"
                        v-model="courseBaseInfoForm.phone"    
                        placeholder="请输入联系电话"
                        clearable>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="有效期(天)" prop="validDays">
                        <el-input style="width:280px;"
                        placeholder="请输入课程有效期"
                        v-model.number="courseBaseInfoForm.validDays"    
                        clearable>
                        </el-input> 
                    </el-form-item>
                </el-form>
                  <el-button type="primary" ckass="next_btn" @click="courseBaseNextBtn()" size="medium" style="margin-left:50%">保存并进行下一步</el-button>
            </div>
    
            <!-- 2 课程计划-->
            <div v-if="(active == 2)">
                <el-button @click="addChapter"  type="primary" plain icon="el-icon-plus">添加章节</el-button>
                <el-tree 
                :data="teachPlanData"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                style="margin-top:20px;margin-bottom: 25px;">
                    <div class="custom-tree-node" slot-scope="{ node, data }"> 
                        <el-input style="width:250px;" v-model="data.pname" 
                        placeholder="请输入章节名称" maxlength="25" show-word-limit clearable @blur="editCoursePlan(data)">
                       </el-input>
    
                        <el-autocomplete v-if="data.parentid != 0" style="width:300px;margin-left: 10px;" v-model="data.teachplanMedia.mediaFilename"
                        clearable
                        :fetch-suggestions="queryMediasAsync"
                        @select="handleSelect"
                        placeholder="请选择章节视频">
                        </el-autocomplete>
                        <i class="el-icon-check bindingBtn"  v-if="data.parentid != 0" @click="bindingCourseVideo(data)"></i>  
                        <i class="el-icon-delete bindingBtn" v-if="data.parentid != 0" ></i>  

                        <!-- <el-switch  
                            v-if="data.parentid != 0"
                            v-model="data.isPreview"
                            :active-value=1
                            :inactive-value=0
                            active-text="免费"
                            style="margin-left:10px;">
                        </el-switch> -->
    
                        <el-button
                            style="float:right;font-size: 16px;"
                            type="primary"
                            plain
                            size="small"
                            @click="() => remove(node, data)">
                            删除本章
                        </el-button>
                        <el-button
                            v-if="data.parentid == 0"
                            style="float:right;margin-right: 5px;font-size: 16px;"
                            type="primary"
                            plain
                            size="small"
                            @click="() => append(data)">
                            添加小结
                        </el-button>
                    </div>
                </el-tree>
                <el-button @click="pre()"  style="margin-left: 35%;margin-right: 140px;" size="medium">上一步</el-button>
                <el-button type="primary" @click="active ++" style="margin-left: 35px;" size="medium">下一步</el-button>
            </div>
    
            <!-- 3 讲师信息-->
            <div v-if="(active == 3)">
                this is four
                <el-button @click="pre()"  style="margin-left: 35px;" size="medium">上一步</el-button>
                <el-button type="primary" @click="" style="margin-right: 35px;" size="medium">保存</el-button>
            </div>
        </el-card>           
    </div>
    </template>
    
    <style>
    .wrapper {
        width: 80%;
        margin: 20px auto;
    }
    .radio_wrapper {
        display: inline-block;
        width: 30%;
        height: 180px;
        margin: 30px 0px 30px 70px;
    }
    .radio_sty {
        width: 80%;
        margin: 25px 0px 0px 12px;
        text-align: center;
        font-weight: 900;
    }
    .radio_bgimg {
         margin-left: 14%;
         width: 100px;
         height: 100px;
    }
    .one_next_btn {
           margin-left:48%;
    }
    .baseInfoForm {
        width: 650px;
        margin: 30px auto;
        font-weight: 900;
    }
    .pre_btn {
        margin-left: 35%;
        margin-right: 140px;
    }
    .el-tree-node__content {
        height: 65px;
    }
    .custom-tree-node {
         width: 1000px;
         height: 40px;
         background-color: rgb(241, 241, 241);
         border-radius: 15px;
         padding: 10px;
         line-height: 40px;
    }
    .bindingBtn {
        color: rgb(25, 137, 250);
        font-weight: 900;
        font-size: 22px;
        margin-left: 10px;
    }
    </style>
    <script>
    import DetailsTag from '@/components/DetailsTag.vue'
    export default {
        components :{
            DetailsTag
        },
        
        data(){
            return {
                active: 1,
    
                //课程基本信息&&营销信息
                courseCategoryArr: ['1-1', '1-1-1'],
                courseBaseInfoForm: {
                    id: null, //课程id主键
                    teachmode: '200002',
                    name: '',
                    tags: '',
                    //课程大分类 课程小分类
                    mt : '1-1',
                    st : '1-1-1',
                    grade: '',
                    description: '',
                    users: '',
                    pic: '',
                    charge: '201000',
                    price: null,
                    qq: '',
                    wechat: '',
                    phone: '',
                    validDays: null,
                },
                coursePic: '',
                courseCategoryOptions: [],
                courseGradeOptions: [
                    {value:"204001", label:"初级"},{value:"204002", label:"中级"},{value:"204003", label:"高级"}
                ],
                courseBaseInfoFormRules:{
                    name: [{ required: true, message: '课程名称不可以为空', trigger: 'blur' }],
                    grade: [{ required: true, message: '请选择课程等级', trigger: 'change' }],
                    users: [{ required: true, message: '适用人群不可以为空', trigger: 'blur' }],
                    charge: [{ required: true, message: '请选择课程收费类型', trigger: 'change' }],
                    price: [{ type: 'number', message: '价格必须为数字', trigger: 'blur' }],
                    validDays: [{type: 'number', message: '有效天数必须为数字', trigger: 'blur' }]
                },
    
                //课程计划信息
                teachPlanData: [],
                currentMeidaData:{}
            }
        },
        created(){
            // 加载课程基本信息 + 课程计划信息
            this.getCourseCategoryTreeNodes()
            this.loadCourseBaseInfo()
            this.loadTeachPlanTreeNodes()
        },
        methods: {
            loadCourseBaseInfo(){
                const fileUrlPrefix = 'http://localhost:9000'
                this.axios.get(`/content/course/baseInfo/${this.$route.query.courseId}`,)
                .then(res => {
                     if(res.code == 200){
                        this.courseBaseInfoForm = res.data
                        this.coursePic = fileUrlPrefix + res.data.pic
                     }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            getCourseCategoryTreeNodes(){
                this.axios.get('/content/courseCategory/treeNodes',)
                .then(res => {
                     if(res.code == 200){
                        // console.log(res.data);
                        this.courseCategoryOptions = res.data
                     }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            handleChange(value) {
                //分别通过数组给大分类和小分类赋值
                this.courseBaseInfoForm.mt = value[0]
                this.courseBaseInfoForm.st = value[1]         
            },
            //课程封面上传超过一个的回调
            overLimit(){
                this.$message.error('只能选择一个课程封面哦')
            },
            pre(){
                 this.active --
            },
            courseBaseNextBtn() {
                this.$refs['courseBaseInfoForm'].validate((valid) => {
                    if(valid){
                        this.axios.put('/content/course/CourseBase',this.courseBaseInfoForm)
                        .then(res => {
                             if(res.code == 200){
                                this.$message.success(res.msg)
                                this.courseBaseInfoForm = res.data
                                this.active ++ 
                             }else{
                                this.$message.error(res.msg)
                             }      
                        })
                        .catch(err => {
                            console.error(err); 
                        })
                    }
                })                 
            },
            loadTeachPlanTreeNodes(){
                this.axios.get(`/content/TeachPlan/treeNodes/${this.$route.query.courseId}`,)
                .then(res => {
                     if(res.code == 200){
                        this.teachPlanData = res.data
                     }
                })
                .catch(err => {
                    console.error(err); 
                })
            },
            //添加大章节
            addChapter(){
               const saveTeachPlanDto = {
                    id: null,   //课程计划ID
                    pname: '新增章节[点击修改]',
                    parentid: 0,
                    grade: 1,
                    mediaType: '',
                    courseId: this.courseBaseInfoForm.id,
                    coursePubId: '',
                    isPreview: 0
                }
                this.axios.post('/content/TeachPlan/saveTeachPlan',saveTeachPlanDto)
                .then(res => {
                    if(res.code == 200){
                        this.loadTeachPlanTreeNodes()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
                // const newChild = { id: this.NodeId++, label: '', children: [],isLeaf:false,free:'201001',video:''};
                // this.data.push(newChild);
            },
            //添加小节
            append(data) {
                const saveTeachPlanDto = {
                    id: null,   //课程计划ID
                    pname: '新增小结[点击修改]',
                    parentid: data.id,
                    grade: 2,
                    mediaType: '',
                    courseId: this.courseBaseInfoForm.id,
                    coursePubId: '',
                    isPreview: 0
                }
                this.axios.post('/content/TeachPlan/saveTeachPlan',saveTeachPlanDto)
                .then(res => {
                    if(res.code == 200){
                        this.loadTeachPlanTreeNodes()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                .catch(err => {               
                    console.error(err); 
                })
                // const newChild = { id: this.NodeId++, label: '', children: [],isLeaf:true, free:'201001',video:''};
                // if (!data.children) {
                //    this.$set(data, 'children', []);
                // }
                // data.children.push(newChild);
           },
           editCoursePlan(data){
            const saveTeachPlanDto = {
                    id: data.id,   //课程计划ID
                    pname:data.pname,
                    parentid: data.parentid,
                    grade: data.grade,
                    mediaType: data.mediaType,
                    courseId: this.courseBaseInfoForm.id,
                    coursePubId: data.coursePubId,
                    isPreview: data.isPreview
                }
                this.axios.post('/content/TeachPlan/saveTeachPlan',saveTeachPlanDto)
                    .then(res => {
                        if(res.code == 200){
                            this.loadTeachPlanTreeNodes()
                        }else{
                            this.$message.error(res.msg)
                        }
                    })
                    .catch(err => {               
                        console.error(err); 
                    })
           },
           //查询已被审核通过可用于绑定的视频
           queryMediasAsync(mediaName, callback){
                    if(mediaName == undefined || mediaName == null || mediaName == '') return 
                    this.axios.get(`/media/list/auditMedias?mediaName=${mediaName}`,)
                    .then(res => {
                        if(res.code == 200){
                            const result = []
                            res.data.forEach(e => {
                                result.push({'value': e.filename,'mediaId':e.id})
                            });
                            callback(result)
                        }
                    })
                    .catch(err => {
                        console.error(err); 
                    }) 
           },
           handleSelect(data){
                this.currentMeidaData = data 
                // console.log(this.currentMeidaData);
           },
           bindingCourseVideo(data){
               const teachplanId = data.teachplanMedia.teachplanId
               const params = {
                               'mediaId': this.currentMeidaData.mediaId,
                               'fileName': this.currentMeidaData.value,
                               'teachplanId' : teachplanId,
                              }
                if(params.mediaId == null || params.mediaId == undefined){
                    this.$message.warning('请选择一个要绑定的媒资')
                    return 
                }
                // console.log(params)
                this.axios.post('/content/TeachPlan/binding',params)
                .then(res => {
                    if(res.code == 200){
                        this.$message.success(res.msg)
                        this.loadTeachPlanTreeNodes()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
                .catch(err => {
                    console.error(err); 
                })
           },

           //删除小节
            // remove(node, data) {
            //     const parent = node.parent;
            //     const children = parent.data.children || parent.data;
            //     let index = children.findIndex(d => d.id === data.id);
            //     children.splice(index, 1);
            // },

            //文件上传的回调
            onSuccess(res,file, fileList){
                const fileUrlPrefix = 'http://localhost:9000'
                if(res.code == 200){
                    this.courseBaseInfoForm.pic = res.data.url
                    this.coursePic = fileUrlPrefix + res.data.url
                }else{
                    this.$message.error('上传失败')
                }
            },
    
        },
    }
    </script>