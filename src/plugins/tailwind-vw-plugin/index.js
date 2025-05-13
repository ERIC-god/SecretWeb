// plugins/tailwind-vw-plugin.js
const plugin = require('tailwindcss/plugin');

module.exports = plugin(function({ addUtilities }) {
  // 设计稿基准宽度
  const BASE_WIDTH = 750;
  
  // 将px转为vw的函数
  function pxToVw(px) {
    return `${(px / BASE_WIDTH * 100).toFixed(4)}vw`;
  }
  
  // 生成所有可能用到的类
  const utilities = {};
  
  // 生成宽度类 (vw-w-*)
  for (let i = 1; i <= 750; i++) {
    utilities[`.vw-w-${i}`] = {
      width: pxToVw(i)
    };
  }
  
  // 生成高度类 (vw-h-*)
  for (let i = 1; i <= 750; i++) {
    utilities[`.vw-h-${i}`] = {
      height: pxToVw(i)
    };
  }
  
  // 生成内边距类
  for (let i = 0; i <= 100; i++) {
    // 全内边距 (vw-p-*)
    utilities[`.vw-p-${i}`] = {
      padding: pxToVw(i)
    };
    
    // 水平内边距 (vw-px-*)
    utilities[`.vw-px-${i}`] = {
      paddingLeft: pxToVw(i),
      paddingRight: pxToVw(i)
    };
    
    // 垂直内边距 (vw-py-*)
    utilities[`.vw-py-${i}`] = {
      paddingTop: pxToVw(i),
      paddingBottom: pxToVw(i)
    };
    
    // 上内边距 (vw-pt-*)
    utilities[`.vw-pt-${i}`] = {
      paddingTop: pxToVw(i)
    };
    
    // 右内边距 (vw-pr-*)
    utilities[`.vw-pr-${i}`] = {
      paddingRight: pxToVw(i)
    };
    
    // 下内边距 (vw-pb-*)
    utilities[`.vw-pb-${i}`] = {
      paddingBottom: pxToVw(i)
    };
    
    // 左内边距 (vw-pl-*)
    utilities[`.vw-pl-${i}`] = {
      paddingLeft: pxToVw(i)
    };
  }
  
  // 生成外边距类
  for (let i = 0; i <= 100; i++) {
    // 全外边距 (vw-m-*)
    utilities[`.vw-m-${i}`] = {
      margin: pxToVw(i)
    };
    
    // 水平外边距 (vw-mx-*)
    utilities[`.vw-mx-${i}`] = {
      marginLeft: pxToVw(i),
      marginRight: pxToVw(i)
    };
    
    // 垂直外边距 (vw-my-*)
    utilities[`.vw-my-${i}`] = {
      marginTop: pxToVw(i),
      marginBottom: pxToVw(i)
    };
    
    // 上外边距 (vw-mt-*)
    utilities[`.vw-mt-${i}`] = {
      marginTop: pxToVw(i)
    };
    
    // 右外边距 (vw-mr-*)
    utilities[`.vw-mr-${i}`] = {
      marginRight: pxToVw(i)
    };
    
    // 下外边距 (vw-mb-*)
    utilities[`.vw-mb-${i}`] = {
      marginBottom: pxToVw(i)
    };
    
    // 左外边距 (vw-ml-*)
    utilities[`.vw-ml-${i}`] = {
      marginLeft: pxToVw(i)
    };
  }
  
  // 生成字体大小类 (vw-text-*)
  for (let i = 10; i <= 100; i++) {
    utilities[`.vw-text-${i}`] = {
      fontSize: pxToVw(i)
    };
  }
  
  // 生成行高类 (vw-leading-*)
  for (let i = 10; i <= 100; i++) {
    utilities[`.vw-leading-${i}`] = {
      lineHeight: pxToVw(i)
    };
  }
  
  // 生成圆角类 (vw-rounded-*)
  for (let i = 0; i <= 50; i++) {
    utilities[`.vw-rounded-${i}`] = {
      borderRadius: pxToVw(i)
    };
  }
  
  // 生成间距类 (vw-gap-*)
  for (let i = 0; i <= 100; i++) {
    utilities[`.vw-gap-${i}`] = {
      gap: pxToVw(i)
    };
    
    utilities[`.vw-gap-x-${i}`] = {
      columnGap: pxToVw(i)
    };
    
    utilities[`.vw-gap-y-${i}`] = {
      rowGap: pxToVw(i)
    };
  }
  
  // 添加自动外边距
  utilities['.vw-m-auto'] = { margin: 'auto' };
  utilities['.vw-mx-auto'] = { marginLeft: 'auto', marginRight: 'auto' };
  utilities['.vw-my-auto'] = { marginTop: 'auto', marginBottom: 'auto' };
  utilities['.vw-mt-auto'] = { marginTop: 'auto' };
  utilities['.vw-mr-auto'] = { marginRight: 'auto' };
  utilities['.vw-mb-auto'] = { marginBottom: 'auto' };
  utilities['.vw-ml-auto'] = { marginLeft: 'auto' };
  
  // 将所有工具类添加到Tailwind
  addUtilities(utilities);
});