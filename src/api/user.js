import request from "@/utils/request";

export function login(data) {
  console.log(data);
  return request({
    url: "/vue-admin-template/user/login",
    method: "post",
    data
  });
}

export function getInfo(token) {
  return request({
    url: "/vue-admin-template/user/info",
    method: "get",
    params: { token }
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post"
  });
}

export function addUser(param) {
  /*
  姓名
  性别
  联系方式
  邮箱地址
  现居住地址
  入职日期
  简短描述
  */
  return request({
    method: "post",
    url: "/addUser",
    data: param
  });
}

export function editUser(param) {
  /*
  姓名
  性别
  联系方式
  邮箱地址
  现居住地址
  入职日期
  简短描述
  */
  return request({
    method: "post",
    url: "/editUser",
    data: param
  });
}

export function deleteUser(row) {
  return request({
    method: "delete",
    url: "/deleteUser",
    data: {
      userId: row.userId
    }
  });
}

export function getUser(param) {
  return request({
    url: "/getuser",
    method: "get",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      charset: "UTF-8",
      mrToken: "xxxxxxxxxxxxxxx"
    },
    params: {
      ...param
    }
  });
}
