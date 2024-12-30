<template>
    <div>
        <!-- 内容    -->
        <slot></slot>
        <div ref="loadingTarget" class="h-6 py-4">
            <!-- 加载更多 -->
            <m-svg-icon v-show="loading" class="w-4 h-4 mx-auto animate-spin" name="infinite-load"></m-svg-icon>
            <!-- 没有更多数据 -->
            <p v-if="isFinished" class="text-center text-base text-zinc-900">
                已经没有更多数据了!
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useVModel, useIntersectionObserver } from '@vueuse/core';
const props = defineProps({
    // 是否处于加载状态
    modelValue: {
        type: Boolean,
        Required: true
    },
    // 数据是否全部加载完成
    isFinished: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['onload', 'update:modelValue'])

// 处理 loading 状态
const loading = useVModel(props)

// 滚动的元素
const loadingTarget = ref(null)
const targetIsIntersection = ref(false)
const { stop } = useIntersectionObserver(loadingTarget, ([{ isIntersecting }],) => {
    targetIsIntersection.value = isIntersecting
    emitLoad()
})
/**
 *  触发load事件
 */
const emitLoad = () => {
    setTimeout(() => {
        // 当加载更多的视图可见时, 同时loading为false,同时 数据尚未全部加载完
        // 处理逻辑
        if (targetIsIntersection.value && !loading.value && !props.isFinished) {
            // 修改加载数据标记
            loading.value = true
            // 触发加载更多行为 (本质就是自定义事件,绑定onload事件的会收到触发onload的参数)
            emits('onload')
        }
    }, 50)
}

watch(loading, emitLoad)


</script>

<style lang="scss" scoped></style>