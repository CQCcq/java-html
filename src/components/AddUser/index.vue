<template>
  <div>
    <el-dialog
      :title="titleName"
      :visible.sync="centerDialogVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeDialog"
      :show-close="false"
      width="30%"
      center
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model="ruleForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="现居住地址" prop="address">
          <el-input v-model="ruleForm.address"></el-input>
        </el-form-item>
        <el-form-item label="入职日期" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                v-model="ruleForm.date1"
                type="datetime"
                placeholder="选择日期时间"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="changeTime"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="简短描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUser('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="ensureUser('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { addUser, editUser } from "@/api/user";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        date1: "",
        gender: "",
        mobile: "",
        address: "",
        email: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱账号", trigger: "blur" }],
        address: [
          { required: true, message: "请输入邮箱账号", trigger: "blur" }
        ],
        date1: [
          {
            type: "string",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      }
    };
  },
  props: {
    dislogStatus: {
      type: Boolean,
      default: false
    },
    userInfo: {
      type: Object,
      default: null
    }
  },
  watch: {
    userInfo(val) {
      this.ruleForm = { ...val, date1: val.startTime, desc: val.describe };
    }
  },
  computed: {
    centerDialogVisible: {
      set: function(newValue) {
        this.centerDialogVisible = newValue;
      },
      get: function() {
        return this.$props.dislogStatus;
      }
      //   return this.$props.dislogStatus;
    },
    titleName() {
      if (this.userInfo && this.userInfo.userId) {
        return "编辑用户";
      } else {
        return "新增用户";
      }
    }
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    cancelUser(formName) {
      this.$refs[formName].resetFields();
      this.$emit("callbackUser", { title: "取消", status: 0 });
    },
    ensureUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.titleName == "新增用户") {
            addUser({ ...this.ruleForm })
              .then(res => {
                this.$emit("callbackUser", { title: "确定", status: 1 });
              })
              .catch(err => {
                console.log("失败数据");
              });
          } else {
            editUser({ ...this.ruleForm })
              .then(res => {
                this.$emit("callbackUser", { title: "确定", status: 1 });
              })
              .catch(err => {
                console.log("失败数据");
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeTime(val) {
      console.log(val);
    },
    closeDialog(row) {
      console.log("row===================>", row);
    }
  }
};
</script>

<style lang="less" scoped></style>
