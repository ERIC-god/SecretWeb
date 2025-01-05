import { useUserStore } from "@/store/modules/user.js";
import { confirm } from "@/libs/confirm/index.js";

/**
 * @param {*} oauthType 登录方式
 * @param {*} oauthData 第三方数据
 */
export const oauthLogin = async (oauthType, oauthData) => {
  // 初始化 useUserStore
  const userStore = useUserStore();
  // 1.登录
  const code = await userStore.userLogin({
    oauthType,
    ...oauthData,
  });
  // 2.用户未注册
  if (code === 204) {
    console.log(111);
    confirm("You Are Not Register , Need to Register Now?").then(() => {
      router.push({
        path: "/register",
        query: {
          reqType: oauthType,
          ...oauthData,
        },
      });
    });
    return;
  }
  // 用户已经注册
  router.push("");
};
