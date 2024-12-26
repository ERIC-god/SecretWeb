<template>
    <div class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40" ref="containerTarget">
        <div>
            <!-- 搜索图标 -->
            <m-svg-icon name="search" color="#707070"
                class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"></m-svg-icon>
            <!-- 输入框 -->
            <input class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 
                rounded-xl text-zinc-900 tracking-wide font-semibold border text-xm border-zinc-100
                focus:border-red-300 duration-500 group-hover:bg-white group-hover:border-zinc-200" placeholder="搜索"
                type="text" v-model="inputValue" @keyup.enter="onSearchHandler" @focus="onFocusHandler"
                @blur="onBlurHandler">
            <!-- 删除按钮 -->
            <m-svg-icon v-if="inputValue" name="input-delete" @click="onClearClick"
                class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 cursor-pointer duration-500">
            </m-svg-icon>
            <!-- 分割线 -->
            <div class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] 
            duration-500  bg-zinc-200 group-hover:opacity-100">
            </div>
            <!-- TODO: 搜索按钮(通用组件) -->
            <m-button icon="search"
                class="opacity-0 absolute translate-y-[-50%] top-[50%] right-1 duration-500 rounded-full group-hover:opacity-100"
                type="main" iconColor="#ffffff" @click="onSearchHandler"></m-button>
        </div>
        <!-- 下拉区 -->
        <transition name="slide">
            <div v-if="$slots.dropdown" v-show="isFocus" class="max-h-[368px] w-full text-base overflow-auto bg-white absolute 
            z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 duration-200 hover:shadow-2xl">
                <slot name="dropdown" />
            </div>
        </transition>
    </div>
</template>

<script>
// 双向绑定
const EMIT_UPDATE_MODELVALUE = 'update:modelValue'
// search 搜索
const EMIT_SEARCH = 'search'
// 删除所有 文本
const EMIT_CLEAR = 'clear'
// 输入 事件
const EMIT_INPUT = 'input'
// 获取 焦点
const EMIT_FOCUS = 'focus'
// 失去 焦点
const EMIT_BLUR = 'blur'


</script>


<script setup>

import { ref, watch } from 'vue';
import { useVModel, onClickOutside } from '@vueuse/core';

/**
 * 1. 输入内容 实现数据双向绑定
 * 2. 搜索按钮在 hover时展示
 * 3. 一键清空 文本功能
 * 4. 触发搜索功能
 * 5. 控制 下拉区展示
 * 6. 事件处理
 */

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})


const data = [1, 2, 3, 4, 5]

const emits = defineEmits([EMIT_UPDATE_MODELVALUE, EMIT_SEARCH, EMIT_CLEAR, EMIT_INPUT, EMIT_FOCUS, EMIT_BLUR])

const inputValue = useVModel(props)


/**
 *  监听用户输入行为
 */

watch(inputValue, (val) => {
    emits(EMIT_INPUT, 'val')
})




/**
 * 删除文本
 */
const onClearClick = () => {
    inputValue.value = ''
    emits(EMIT_CLEAR, '')
}


/**
 * 搜索
 */
const onSearchHandler = () => {
    emits(EMIT_SEARCH, inputValue.value)
}


/**
 * input 是否获取到焦点
 */
const isFocus = ref(false)
const onFocusHandler = () => {
    isFocus.value = true
    emits(EMIT_FOCUS)
}

/**
 * 失去焦点
 */
const onBlurHandler = () => {
    emits(EMIT_BLUR)
}


/**
 * 点击区域外 隐藏 dropdown
 */
const containerTarget = ref(null)
onClickOutside(containerTarget, () => {
    isFocus.value = false
})



</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.5;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(40px);
}
</style>