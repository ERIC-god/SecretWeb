import { h, render } from "vue";
import confirmComponent from "../confirm/index.vue";

export const confirm = (title, content, cancelText, confirmText) => {
  return new Promise((resolve, reject) => {
    if (title && !content) {
      content = title;
      title = "";
    }
    // 关闭的回调
    const close = () => {
      // 3. 把渲染的 vnode去掉
      render(null, document.body);
    };
    // 取消按钮的回调
    const cancelHandler = () => {
      reject(new Error("取消按钮点击"));
    };
    // 确定按钮的回调
    const confirmHandler = () => {
      resolve();
    };

    // 1.生成 vnode 三个参数(要渲染的组件,props,children)
    const vnode = h(confirmComponent, {
      title,
      content,
      cancelText,
      confirmText,
      close,
      cancelHandler,
      confirmHandler,
    });

    // 2.render 函数渲染 vnode  两个参数(渲染的vnode,container)
    render(vnode, document.body);
  });
};
