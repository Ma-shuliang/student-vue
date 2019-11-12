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
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    layout="prev, pager, next"
    @current-change="gotoPage"
    :page-count="pageCount">
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
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="saveForm.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</el-main>
</template>

<script>
    export default {
        name: "Student",
      data(){
          return{
            tableData: [{
              id: '1',
              name: '王小虎',
              age: 10,
              create_time: '2019-11-07'
            }],
            multipleSelection: [],
            pageCount:5,
            queryForm:{},
            dialogVisible:false,
            saveForm:{}
          }
      },
      methods:{
        handleSelectionChange(val) {
          console.log(val);
          this.multipleSelection = val;
        },
        add(){
          this.dialogVisible=true;
        },
        edit(id){
          this.dialogVisible=true;
          console.log(id)
        },
        onSubmit(){

        },
        delAll(){

        },
        gotoPage(pageNo){
          console.log(pageNo)
        },
        detail(id){
          console.log(id)
        },
        handleClose(){

        }
      },
      created(){

      }
    }
</script>

<style scoped>

</style>
