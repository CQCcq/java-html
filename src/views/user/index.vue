<template>
  <div class="app-container">
    <div class="add-user">
      <el-button type="primary" size="添加" @click="addUser"
        >添加用户</el-button
      >
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
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
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
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
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="200" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" @click="editorUser(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="float:right">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.pageCurrent"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total"
        background
      >
      </el-pagination>
    </div>
    <add-user
      :dislogStatus="dialogUser.dislogStatus"
      @callbackUser="callbackUser"
    />
  </div>
</template>

<script>
import { getList } from "@/api/table";
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
      pagination: {
        pageCurrent: 1,
        pageSize: 10,
        total: 10
      },
      dialogUser: {
        dislogStatus: false
      },
      list: null,
      listLoading: true
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const { pageCurrent, pageSize } = this.pagination;
      this.listLoading = true;
      getList().then(response => {
        console.log("response", response);
        let res = response.data.items.filter(
          (item, index) =>
            (pageCurrent - 1) * pageSize <= index &&
            index < pageCurrent * pageSize
        );
        this.list = res;
        this.listLoading = false;
        this.pagination.total = response.data.total;
      });
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      console.log("多少", val);
    },
    handleCurrentChange(val) {
      this.pagination.pageCurrent = val;
      this.fetchData();
    },
    addUser() {
      this.dialogUser.dislogStatus = true;
    },
    editorUser(row) {
      console.log("编辑的用户信息", row);
    },
    callbackUser(row) {
      if (row.status === 0) {
        this.dialogUser.dislogStatus = false;
      } else if (row.status === 1) {
        this.dialogUser.dislogStatus = false;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.app {
  &-container {
    width: 100%;
    /deep/.el-table {
      background-color: rgb(177, 24, 207);
    }
    .add {
      &-user {
        width: 100%;
        margin-bottom: 20px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
      }
    }
  }
}
</style>
