<template>
    <teleport to='body'>
        <!-- 蒙版 -->
        <transition name="fade">
            <div v-if="modelValue" @click="emits('update:modelValue', false)"
                class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0">
            </div>
        </transition>
        <!-- 内容 -->
        <transition name="pop-up-down">
            <div v-bind="$attrs" v-if="modelValue" class="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0">
                <slot />
            </div>
        </transition>
    </teleport>


    <!-- <div class="fixed bottom-0 left-0 right-0 bg-pink-400 h-56 py-[10px] flex">
        <ul class="py-[20px] overflow-y-scroll overflow-x-hidden flex-col  ">
            <h2 class="text-xl text-zinc-900 px-[10px] mb-[20px] ">所有分类</h2>
            <li v-for="item in data" :key="item.id" class="text-lg px-[10px] py-[15px] ">{{ item.name }}</li>
        </ul>
    </div> -->
</template>

<script setup>
import { ref, watch } from 'vue';
import { useScrollLock, useVModel } from '@vueuse/core';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true
    }
})

const emits = defineEmits(
    ['update:modelValue']
)

// 锁定滚动 , 使用 VueUse 中的 useScrollLock
const isLock = useScrollLock(document.documentElement)
watch(() => props.modelValue, (val) => {
    isLock.value = val
}, {
    immediate: true
})

</script>

<style lang="scss" scoped>
// fade动画
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s
}

// 准备进入，即将离开
.fade-enter-from,
.fade-leave-to {
    opacity: 0
}

.pop-up-down-enter-active,
.pop-up-down-leave-active {
    transition: all 0.5s
}

.pop-up-down-enter-from,
.pop-up-down-leave-to {
    transform: translateX(-100%);
}
</style>
