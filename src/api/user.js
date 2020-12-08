import request from "@/utils/request";

export function login(data) {
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
    url: "/MyDatabase",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      charset: "UTF-8",
      mrToken: "xxxxxxxxxxxxxxx"
    },
    params: {
      name: "wang1",
      url: "https:www.baidu.com",
      alexa: 1010,
      country: "china"
    }
  });
}

export function getUser() {
  return request({
    url: "/getuser",
    method: "get"
  });
}
