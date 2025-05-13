<template>
    <transition name="slide" @after-leave="destroy">
        <div v-show="isVisable" class="vw-w-700 h-[30px] fixed top-[7%] left-[50%] translate-x-[-50%] z-50 
            flex items-center 
            px-3 py-1.5 rounded-sm border cursor-pointer" :class="styles[type].containerClass">
            <m-svg-icon :name="styles[type].icon" :fillClass="styles[type].fillClass"
                class="h-1.5 w-1.5 mr-1.5"></m-svg-icon>
            <span class="text-xm" :class="styles[type].textClass">
                {{ content }}
            </span>
        </div>
    </transition>
</template>

<script>
import mSvgIcon from '../svg-icon/index.vue'

/**
 * 消息类型可选项
 */
const typeEnum = ['success', 'warn', 'error']
</script>


<script setup>

import { ref, onMounted, nextTick } from 'vue'
const props = defineProps({
    /**
     * message 的消息类型
     */
    type: {
        type: String,
        required: true,
        default: 'success',
        validator(val) {
            const result = typeEnum.includes(val)
            if (!result) {
                throw new Error(`你的 type 必须是 ${typeEnum.join('、')} 中的一个`)
            }
            return result
        }
    },
    /**
     * 描述文本
     */
    content: {
        type: String,
        required: true
    },
    /**
     * 展示时长
     */
    duration: {
        type: Number
    },
    /**
     * 关闭时的回调
     */
    destroy: {
        type: Function
    }
})

// 样式表数据
const styles = {
    // 警告
    warn: {
        icon: 'warn',
        fillClass: 'fill-warn-300',
        textClass: 'text-warn-300',
        containerClass:
            'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
    },
    // 错误
    error: {
        icon: 'error',
        fillClass: 'fill-error-300',
        textClass: 'text-error-300',
        containerClass:
            'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
    },
    // 成功
    success: {
        icon: 'success',
        fillClass: 'fill-success-300',
        // textClass: 'text-success-300',
        containerClass:
            'bg-zinc-100 border-zinc-100  hover:shadow-lg'
    }
}

// 控制显示处理
const isVisable = ref(false)
/**
 * 保证动画展示，需要在 mounted 之后进行展示
 */
onMounted(() => {
    nextTick(() => {
        isVisable.value = true
        /**
         * 延迟时间关闭
         */
        setTimeout(() => {
            isVisable.value = false
        }, props.duration)
    })
})
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.4s, transform 0.4s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateX(-200px)
}
</style>