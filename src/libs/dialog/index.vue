<template>
    <div>
        <!-- 蒙版 -->
        <transition name="fade">
            <div v-if="isVisable" @click="close" class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"></div>
        </transition>
        <!-- 内容 -->
        <transition name="up">
            <div v-if="isVisable"
                class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]">
                <!-- 标题 -->
                <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2" v-if="title">
                    {{ title }}
                </div>
                <!-- 内容 -->
                <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
                    <slot />
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
    // 控制开关
    modelValue: {
        type: Boolean,
        required: true
    },
    // 标题
    title: {
        type: String
    }
})

defineEmits(['update:modelValue'])

// 控制显示处理
const isVisable = useVModel(props)



const close = () => {
    isVisable.value = false
    if (props.close) {
        props.close()
    }
}


</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.up-enter-active,
.up-leave-active {
    transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
    opacity: 0;
    transform: translate3d(-50%, 100px, 0);
}
</style>