export default {
    //code 转 描述
    dictCode2Description(code){
        //课程审核状态
        if(code == "202001") return "审核未通过"
        if(code == "202002") return "未提交"
        if(code == "202003") return "已提交"
        if(code == "202004") return "审核通过"
        //课程模式
        if(code == "200002") return "录播"
        if(code == "200003") return "直播"
        //课程发布状态
        if(code == "203001") return "未发布"
        if(code == "203002") return "已发布"
        if(code == "203003") return "已下线" 
    }
}