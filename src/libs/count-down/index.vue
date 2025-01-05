<template>
    <div>
        <slot>
            <p class="text-xm">{{ showTime }}</p>
        </slot>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import dayjs from './utils.js'

const props = defineProps({
    // 毫秒时间
    time: {
        type: Number,
        required: true
    },
    // 遵循dayjs format标准
    format: {
        type: String,
        default: 'HH:mm:ss'
    }
})

const emits = defineEmits(['finish', 'change'])

// 倒计时的时长
const duration = ref(0)


/**
 *  开始倒计时
 */
let timer
const start = () => {
    close()
    timer = setInterval(() => {
        durationFn
    }, 1000)
}


/**
*   倒计时的执行行为
*/
const durationFn = () => {
    duration.value -= 1000
    emits('change')
    // 监听结束的行为
    if (duration.value <= 0) {
        duration.value = 0
        emits('finish')
        close()
    }
}


/**
 *   倒计时结束   
 */
const close = () => {
    if (timer) {
        clearInterval(timer)
    }
}

/**
 *  组件销毁时候,清理倒计时
 */
onUnmounted(() => {
    close()
})

/**
 *  监听传过来的时间戳
 */
watch(() => props.time, (val) => {
    duration.value = val
    start()
}, { immediate: true })

/**
 *  显示时间格式
 */
const showTime = computed(() => {
    return dayjs.duration(duration.value).format(props.format)
})

</script>

<style lang="scss" scoped></style>