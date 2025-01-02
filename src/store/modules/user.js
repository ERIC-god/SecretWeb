import { defineStore } from "pinia";
import { loginUser } from "@/api/sys";
import { getProfile } from "../../api/sys";
import { registerUser } from "../../api/sys";
import md5 from "md5";
import { ref } from "vue";

export const useUserStore = defineStore(
  "user",
  () => {
    // 保存token
    const token = ref("");
    // 保存用户信息
    const userInfo = ref({});
    /**
     *   登录
     */
    const userLogin = async (data) => {
      const { password } = data;
      const newData = { ...data, password: password ? md5(password) : "" };
      const res = await loginUser(newData);
      token.value = res.token;
    };
    /**
     *  获取用户信息
     */
    const userProfile = async () => {
      const res = await getProfile();
      userInfo.value = res;
    };
    /**
     *  退出登录
     */
    const userLogout = () => {
      // 1.清空token
      token.value = "";
      // 2.清空用户信息
      userInfo.value = {};
      // 3.跳转页面
      location.reload();
    };

    /**
     *  注册
     */
    const userRegister = async (data) => {
      const { password } = data;
      const newData = { ...data, password: password ? md5(password) : "" };
      const res = await registerUser(newData);
    };

    return {
      token,
      userInfo,
      userLogin,
      userProfile,
      userLogout,
      userRegister,
    };
  },
  { persist: true }
);
