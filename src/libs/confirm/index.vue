<template>
    <div>
        <!-- 蒙版 -->
        <transition name="fade">
            <div v-if="isVisible" class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0" @click="close"></div>
        </transition>
        <!-- 内容 -->
        <transition name="up">
            <div v-if="isVisible" class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm
            dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]">
                <!-- 标题 -->
                <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
                    {{ title }}
                </div>
                <!-- 文本 -->
                <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
                    {{ content }}
                </div>
                <!-- 按钮 -->
                <div class="flex justify-end">
                    <m-button type="info" class="mr-2" @click="onCancelClick">
                        {{ cancelText }}
                    </m-button>
                    <m-button type="primary" class="mr-2" @click="onConfirmClick">
                        {{ confirmText }}
                    </m-button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>

// 因为将来 confirm 组件 会以方法调用的形式展示,需要 主动导入组件
import { onMounted, ref } from 'vue';
import mButton from '@/libs/button/index.vue'
import mSvgIcon from '@/libs/svg-icon/index.vue'


const props = defineProps({
    // 标题
    title: {
        type: String
    },
    // 描述
    content: {
        type: String,
        required: true
    },
    // 取消按钮文本
    cancelText: {
        type: String,
        default: '取消'
    },
    // 确定按钮文本
    confirmText: {
        type: String,
        default: '确定'
    },
    // 取消按钮事件
    cancelHandler: {
        type: Function
    },
    // 确定按钮事件
    confirmHandler: {
        type: Function
    },
    // 关闭 confirm 的回调
    close: {
        type: Function
    }

})
// 控制显示处理
const isVisible = ref(false)
const show = () => {
    isVisible.value = true
}

/**
 *  处理动画 (render函数 的渲染 , 会直接 进行)
 */
onMounted(() => {
    show()
})


/**
 *  关闭事件
 */
const close = () => {
    isVisible.value = false
    setTimeout(() => {
        if (props.close) {
            props.close()
        }
    }, 550);
}

/**
 *  取消按钮 点击事件
 */
const onCancelClick = () => {
    if (props.cancelHandler) {
        props.cancelHandler()
    }
    close()
}

/**
 *  确定按钮 点击事件
 */
const onConfirmClick = () => {
    if (props.confirmHandler) {
        props.confirmHandler()
    }
    close()
}

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* 进入和离开的过渡状态 */
.up-enter-active,
.up-leave-active {
    transition: all 0.5s;
}

/* 进入前和离开后的状态 */
.up-enter-from,
.up-leave-to {
    opacity: 0;
    transform: translate3d(-50%, 100px, 0);
}
</style>
