# import.meta 是什么 ？其详细的属性有哪些呢？ 其在 vite 中的用法又是什么 ？ 在 webpack 中呢？

1. import.meta 是一个给 JavaScript 模块暴露特定上下文元数据的对象。这是 ES2020 引入的特性。
   import.meta 简单来说就是一个"模块的身份证"，它告诉我们当前代码所在的模块（文件）的一些基本信息。
2. 详细属性 import.meta.url 可以知道当前代码文件在哪里，就像知道自己家的地址一样。

3. 在 Vite 中，import.meta.env 包含了环境变量和模式相关的信息 。vite 会把 VITE 前缀的默认暴漏到 import.meta.env 下。
   如下：
   ```javascript
   // Vite 中的默认环境变量
   console.log(import.meta.env.MODE); // 'development' 或 'production'
   console.log(import.meta.env.DEV); // 是否是开发模式
   console.log(import.meta.env.PROD); // 是否是生产模式
   console.log(import.meta.env.BASE_URL); // base url
   console.log(import.meta.env.VITE_APP_TITLE); // 自定义环境变量
   ```

# 在 vite.config.js 中，使用到的 path.resolve() --dirname ，process.cwd() 分别是什么用法，代表着什么意思

1. path.resolve() ，这是一个拼接路径的方法 ，比如：
   ```javascript
   path.resolve("folder", "subfolder", "file.txt");
   // 输出: C:\你的项目\folder\subfolder\file.txt
   ```
2. dirname 表示当前文件所在的文件夹路径 ，比如：
   ```javascript
   // 假设这个文件是 C:\project\vite.config.js
   console.log(__dirname);
   // 输出: C:\project
   ```
3. process.cwd()表示你在哪个文件夹下运行的命令：
   ```javascript
   // 假设你在 C:\project 文件夹下运行 node xxx.js
   console.log(process.cwd());
   // 输出: C:\project
   ```

# vite 通用组件的 自动化注册是怎么实现的 ？ import.meta.glob 是有什么作用呢？ app.component()是什么 ？defineAsyncComponent()是什么呢

1. 使用 import.meta.glob 获取到所有的通用组件。用于动态导入多个模块 。
2. 使用 app.component()全局注册组件;

   ```javascript
   app.component("m-svg-icon", svgIcon);
   app.component("m-popup", popUp);
   ```

3. defineAsyncComponent( ()=>import('./xxx/index.vue') ) 是 Vue 提供的官方方式来处理异步组件

# 讲一下在 mobile 下的 navigation 组件遇到的问题

## DOM.getBoundingClientRect()

1. 其方法获取的是元素相对于视口（viewport）的位置和尺寸信息

## 在组件中用到的动态 ref 写法

1. ref 的两种使用方式对比， 如下：
   ```javascript
      // 静态 ref（常见用法）：
      <div ref="myRef"></div>
      // 动态 ref（函数形式）： 这种方式适用于需要引用多个元素的场景，特别是在 v-for 循环中。
      <li v-for="item in data" :ref="setItemRef">
   ```
2. 动态 ref 的工作流程和用法：
   工作流程：
   当每个 <li> 元素被创建时，Vue 会调用 setItemRef 函数
   ( 函数接收当前 DOM 元素作为参数 )

# 彻底弄清一个重难点，一个多次都未曾解决的难点 ， 它就是 v-model 这个语法糖

## 基础 v-model（用于表单元素）

```javascript
   // 原始写法
   <input :value="text" @input="text = $event.target.value">
   // 语法糖
   <input v-model="text">
```

## 自定义组件的 v-model

```javascript
// 父组件
   <template>
    <!-- 这样写 -->
    <MyInput v-model="message" />

    <!-- 等同于这样写 -->
    <MyInput
        :modelValue="message"
        @update:modelValue="message = $event"
    />
   </template>

// 子组件
   <template>
    <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
   </template>

   <script setup>
      defineProps(['modelValue'])
      defineEmits(['update:modelValue'])
   </script>
```

## 使用了 useVmodel 的情况

# 解析一下 popup 组件中出现的 $attrs

1. 在 Vue 3 中，v-bind="$attrs" 是一个非常有用的特性，主要用于将父组件的非 prop 属性传递给子组件。$attrs 是一个包含了父组件传递给子组件的所有非 prop 属性的对象。
2. 在 Vue 中，子组件默认会继承父组件传递的非 prop 属性，包括样式和类名。这是因为 Vue 会自动将这些属性应用到子组件的根元素上，除非你显式地设置 inheritAttrs: false。
3. 在 setup 语法糖中设置 inheritAttrs: false:

```vue
<template>
  <div v-bind="attrs">这是子组件</div>
</template>

<script setup>
import { useAttrs, defineOptions } from "vue";

// 设置 inheritAttrs: false
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs(); // 获取父组件传递的非 prop 属性
</script>
```

4. 使用了 inheritAttrs: false ，在这种情况下，只有当你使用 v-bind="$attrs" 时，父组件的样式和类才会被应用到子组件的 <div> 中。
