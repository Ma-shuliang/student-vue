<template>
<el-main>
  <!-- 查询表单 -->
  <el-form :inline="true" :model="queryForm" class="demo-form-inline">
    <el-form-item label="姓名">
      <el-input v-model="queryForm.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
  <!-- 列表 -->
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="#"
      prop="id"
      width="120">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      label="头像"
      width="120">
      <template slot-scope="scope">
        <img :src="scope.row.header_img" style="height: 36px;"/>
      </template>
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="create_time"
      label="创建时间"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      label="操作"
      show-overflow-tooltip>
      <template slot-scope="scope">
        <el-button @click="detail(scope.row.id)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="edit(scope.row.id)">编辑</el-button>
        <el-button @click="del(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    layout="prev, pager, next"
    @current-change="gotoPage"
    :page-count="pages">
  </el-pagination>
  <div style="margin-top: 20px">
    <el-button @click="add">添加</el-button>
    <el-button @click="delAll()">批量删除</el-button>
  </div>
  <!-- 添加编辑框 -->
  <el-dialog
    title="添加/编辑"
    :visible.sync="dialogVisible"
    width="60%"
    :before-close="handleClose">
    <el-form :inline="true" :model="saveForm" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="saveForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item><br>

      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1/file/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="saveForm.header_img" :src="saveForm.header_img" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item><br>

      <el-form-item label="年龄">
        <el-input v-model="saveForm.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="save">确 定</el-button>
  </span>
  </el-dialog>
  <!-- 详情框 -->
  <el-dialog
    title="详情"
    :visible.sync="detailDialogVisible"
    width="60%"
    :before-close="handleClose">
    <el-form :inline="true" :model="detailData" class="demo-form-inline">
      <el-form-item label="姓名">
        {{detailData.name}}
      </el-form-item><br>
      <el-form-item label="年龄">
        {{detailData.age}}
      </el-form-item><br>
      <el-form-item label="创建时间">
        {{detailData.create_time}}
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="detailDialogVisible = false">关闭</el-button>
  </span>
  </el-dialog>
</el-main>
</template>

<script>
    const axios = require("axios");
    const basePath = "http://127.0.0.1/";
    export default {
        name: "Student",
      data(){
          return{
            tableData: [],
            pages:0,
            queryForm:{
              pageNo:1,
              pageSize:2
            },
            dialogVisible:false,
            detailDialogVisible:false,
            saveForm:{},
            ids:null,
            detailData:{},
            fileName:null
          }
      },
      methods:{
        handleAvatarSuccess(res, file) {
          console.log(res,file)
          //给文件url赋值
          this.saveForm.header_img = res.fileUrl;
          console.log(this.saveForm.header_img)
          //删除图片
          if(this.fileName!=null){
            axios({
              url:basePath+"file/delByFileName",
              method:"get",
              params:{fileName:this.fileName}
            }).then(res=>{
              console.log("文件删除："+res.data.result)
            })
          }
          //保存原文件名
          this.fileName = res.fileName;
        },
        beforeAvatarUpload(file) {
         /* const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;*/
         return true;
        },

        /**
         * 多选
         * @param rows
         */
        handleSelectionChange(rows) {
          let ids = null;
          rows.forEach(row=>{
            if(ids==null){
              ids=row.id;
            }else{
              ids=ids+","+row.id;
            }
          })
          this.ids = ids;
        },
        /**
         * 列表页
         */
        getList(){
          const self = this;
          axios({
            url:basePath+"student/list",
            method:"get",
            params:this.queryForm
          }).then(res=>{
            self.tableData = res.data.list;
            self.pages = res.data.pages;
            console.log(res);
          })
        },
        /**
         * 添加
         */
        add(){
          this.dialogVisible=true;
          this.saveForm={header_img:""};
        },
        /**
         * 编辑
         */
        edit(id){
          this.dialogVisible=true;
          console.log(id)
          const self = this;
          axios({
            url:basePath+"student/getById",
            method:"get",
            params:{id:id}
          }).then(res=>{
            self.saveForm = res.data;
            self.fileName = res.data.fileName;
            console.log(res);
          })
        },
        /**
         * 保存
         */
        save(){
          console.log(this.saveForm)
          this.dialogVisible = false;
          const self = this;
          axios({
              url:basePath+"student/save",
              method:"post",
              data:this.saveForm
          }).then(res=>{
            console.log(res);
            self.getList();
            console.log(res);
          })
        },
        /**
         * 查询
         */
        onSubmit(){
            this.queryForm.pageNo=1;
            this.getList();
        },
        /**
         * 删除
         */
        delAll(){
          let self = this;
          let ids = this.ids;
          if(ids==null){
            this.$message("请选择删除的记录");
            return;
          }
          this.$confirm('你确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios({
              url:basePath+"student/delByIds",
              method:"get",
              params:{ids:this.ids}
            }).then(res=>{
              self.$message({
                type: 'success',
                message: '删除成功!'
              });
              self.queryForm.pageNo=1;
              self.getList();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        /**
         * 删除
         */
        del(id){
          let self = this;
          this.$confirm('你确认要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            axios({
              url:basePath+"student/delByIds",
              method:"get",
              params:{ids:id}
            }).then(res=>{
              self.$message({
                type: 'success',
                message: '删除成功!'
              });
              self.queryForm.pageNo=1;
              self.getList();
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        /**
         * 跳转到指定页
         */
        gotoPage(pageNo){
          this.queryForm.pageNo = pageNo;
          this.getList();
          console.log(pageNo)
        },
        /**
         * 详情
         */
        detail(id){
          console.log(id)
          this.detailDialogVisible=true;
          console.log(id)
          const self = this;
          axios({
            url:basePath+"student/getById",
            method:"get",
            params:{id:id}
          }).then(res=>{
            self.detailData = res.data;
            console.log(res);
          })
        },
        /**
         * 关闭对话框
         */
        handleClose(){
            this.dialogVisible=false;
        }
      },
      /**
       * 生命周期函数
       */
      created(){
        this.getList();
      }
    }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
