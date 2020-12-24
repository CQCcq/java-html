<template>
  <div class="app-container">
   <div class="add_user_button">
    <el-button type="primary" size="添加" @click="addUser"
          >添加用户</el-button
        >
   </div>
    <div class="add-user">
      <div class="search_form">
        <el-form :inline="true">
          <el-form-item label="用户姓名">
            <el-input v-model="userForm.userName"></el-input>
          </el-form-item>
             <el-form-item label="手机号">
            <el-input v-model="userForm.userMobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="添加" @click="getUser"
          >查询用户</el-button
        >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="userList"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <!-- <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column> -->
      <el-table-column type="index" align="center" label="序号" width="95">
        <!-- <template slot-scope="scope">
          {{ scope.$index }}
        </template> -->
      </el-table-column>
      <el-table-column label="姓名" width="110">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="性别" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.gender === 1 ? "男" : "女" }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.mobile }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status === 1 ? "在职" : "离职"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="入职时间"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱地址" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
          <el-table-column label="现居住地址" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
         </el-table-column>
          <el-table-column label="个人简介"  align="center">
        <template slot-scope="scope">
          {{ scope.row.describe }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editorUser(scope.row)">编辑</el-button>
           <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageCurrent"
        :page-sizes="[5, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
      >
      </el-pagination>
    </div>
    <add-user
      :dislogStatus="dialogUser.dislogStatus"
      :userInfo="userInfo"
      @callbackUser="callbackUser"
    />
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { getUser,deleteUser } from "@/api/user";
import AddUser from "@/components/AddUser/index";

export default {
  components: {
    AddUser
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      userForm:{
        userName:"",
        userMobile:""
      },
      pagination: {
        pageCurrent: 1,
        pageSize: 5,
        total: 0
      },
      dialogUser: {
        dislogStatus: false
      },
      userInfo:{},
      userList: null,
      listLoading: true
    };
  },
  created() {
    // this.fetchData();
    this.getUser();
  },
  methods: {
    async getUser(val) {
      if(val !== 1){
        this.pagination.pageCurrent = 1;
        this.pagination.pageSize = 5;
        this.pagination.total = 0;
      }
      this.listLoading = true;
      const {pagination,userForm} = this;
      try {
        let res = await getUser({...userForm,...pagination});
        if (res) {
          console.log(res);
          this.listLoading = false;
          this.userList = res.data;
          this.pagination.total = res.total;
        }
      } catch (error) {
        this.listLoading = false;
        console.log(error);
      }
    },
    handleSizeChange(val) {
      // this.pagination.pageSize = val;
       this.getUser(1);
      console.log("多少", val);
    },
    handleCurrentChange(val) {
      this.pagination.pageCurrent = val;
      this.getUser(1);
    },
    addUser() {
      this.dialogUser.dislogStatus = true;
    },
    editorUser(row) {
      this.addUser();
      this.userInfo = row;
      console.log("编辑的用户信息", row);
    },
   async deleteUser(row){
    try {
      const delUser =await  deleteUser(row)
      const {status} = delUser;
      if(status) this.getUser();
    } catch (error) {
      
    }
      console.log("删除用户",row);
    },
    callbackUser(row) {
      this.getUser()
      if (row.status === 0) {
        this.dialogUser.dislogStatus = false;
        this.userInfo = {};
      } else if (row.status === 1) {
        this.dialogUser.dislogStatus = false;
        this.userInfo = {}
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  &-container {
    width: 100%;
    .add_user_button{
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 20px;
    }
    .add {
      &-user {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .search{
          &_form{
            background-color: #f7f4f4;
            border: 1px solid #d1d1d1;
            border-radius: 5px;
            padding: 22px 10px 0px 10px;
            width: 100%;
            box-sizing: border-box;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
}
</style>
