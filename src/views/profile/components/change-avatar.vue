<template>
    <div class="overflow-auto relative flex flex-col items-center">
        <m-svg-icon v-if="isMobileTerminal" name="close" class="w-3 h-3 p-0.5 m-1 ml-auto"
            fillClass="fill-zinc-900 dark:fill-zinc-200 " @click="close">
        </m-svg-icon>
        <img class="" ref="imageTarget" :src="blob" />
        <!-- 按钮 -->
        <div class="flex justify-end" v-if="cancelHandler || confirmHandler">
            <m-button type="info" class="mr-2" @click="onCancelClick">{{
                cancelText
            }}</m-button>
            <m-button type="primary" @click="onConfirmClick">{{
                confirmText
            }}</m-button>
        </div>
    </div>
</template>

<script>
// 移动端配置对象
const mobileOptions = {
    // 将裁剪框限制在画布的大小
    viewMode: 1,
    // 移动画布，裁剪框不动
    dragMode: 'move',
    // 裁剪框固定纵横比：1:1
    aspectRatio: 1,
    // 裁剪框不可移动
    cropBoxMovable: false,
    // 不可调整裁剪框大小
    cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
    // 裁剪框固定纵横比：1:1
    aspectRatio: 1
}
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import { ref, onMounted } from 'vue';
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const props = defineProps({
    // blob对象 
    blob: {
        type: String,
        required: true
    },
    // 取消按钮文本
    cancelText: {
        type: String,
        default: 'No!!'
    },
    // 确定按钮文本
    confirmText: {
        type: String,
        default: 'Yes!!'
    },
    // 取消按钮点击事件
    cancelHandler: {
        type: Function
    },
    // 确定按钮点击事件
    confirmHandler: {
        type: Function
    },
    // 关闭的回调
    close: {
        type: Function
    }
})


const emits = defineEmits(['close'])

/**
 * 图片裁剪处理
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
    /**
     * 接收两个参数：
     * 1. 需要裁剪的图片 DOM
     * 2. options 配置对象
     */
    cropper = new Cropper(
        imageTarget.value,
        isMobileTerminal.value ? mobileOptions : pcOptions
    )
})

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
    if (props.confirmHandler) {
        props.confirmHandler()
    }
    emits('close')
}

/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
    if (props.cancelHandler) {
        props.cancelHandler()
    }
    emits('close')
}





</script>

<style lang="scss" scoped></style>