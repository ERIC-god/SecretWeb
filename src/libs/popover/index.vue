<template>

    <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
        <div ref="referenceTarget">
            <!-- 具名插槽：触发弹层的视图-->
            <slot name="reference"></slot>
        </div>

        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <transition name="slide">
            <div v-show="isVisible" :style="contentStyle" class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border 
            dark:border-zinc-700 rounded-md" ref="contentTarget">
                <slot />
            </div>
        </transition>

    </div>

</template>

<script>
// 左上
const PROP_TOP_LEFT = 'top-left'
// 右上
const PROP_TOP_RIGHT = 'top-right'
// 左下
const PROP_BOTTOM_LEFT = 'bottom-left'
// 右下
const PROP_BOTTOM_RIGHT = 'bottom-right'
// Enum
const placementEnum = [
    PROP_TOP_LEFT, PROP_TOP_RIGHT, PROP_BOTTOM_LEFT, PROP_BOTTOM_RIGHT
]
</script>

<script setup>
/**
 *  1.指定所有可选位置的常量，并生成enum
 *  2.通过prop控制指定位置
 *  3.获取元素的Dom，创建读取元素尺寸的方法
 *  4.生成气泡的样式对象，用来控制每个位置对应的样式
 *  5.根据prop，计算样式对象
 */

import { nextTick, ref, watch } from 'vue';
const isVisible = ref(false)


const props = defineProps({
    placement: {
        type: String,
        default: PROP_TOP_LEFT,
        validator(val) {
            const result = placementEnum.includes(val)
            if (!result) {
                throw new Error(`您输入的值不在${placementEnum.join('、')}中！`)
            } else {
                // return true就证明通过。
                return result
            }
        }
    }
})

/**
 *  鼠标移入触发
 */
let timer = null;
const onMouseenter = () => {
    clearTimeout(timer)
    isVisible.value = true
}

/**
*  鼠标移出触发
*/
const onMouseleave = () => {
    timer = setTimeout(() => {
        isVisible.value = false
        clearTimeout(timer)
    }, 1000)
}

/**
 *  计算元素的尺寸  referenceTarget 或 contentTarget 的尺寸)
 */
// 触发弹层的视图
const referenceTarget = ref(null)
// 弹出层视图中展示的内容
const contentTarget = ref(null)
const useElementSize = (target) => {
    if (!target) return {}
    return {
        width: target.offsetWidth,
        height: target.offsetHeight
    }
}

/**
 *  气泡样式
 */
const contentStyle = ref({
    top: 0,
    left: 0
})

/**
 *  计算：期望气泡展示的时候再计算
 */
watch(isVisible, (val) => {
    if (!val) return
    // 等待元素渲染
    else {
        // vue在数据改变之后，需要等待一段时间DOM才会变化
        nextTick(() => {
            switch (props.placement) {
                // 左上
                case PROP_TOP_LEFT:
                    contentStyle.value.top = 0;
                    contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
                    break
                // 右上
                case PROP_TOP_RIGHT:
                    contentStyle.value.top = 0;
                    contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
                    break
                // 左下
                case PROP_BOTTOM_LEFT:
                    contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
                    contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
                    break
                // 右下
                case PROP_BOTTOM_RIGHT:
                    contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
                    contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
                    break
            }
        })
    }
}, { immediate: true })


</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: opacity 0.4s, transform 0.4s;
}

.slide-enter-from,
.slide-leave-to {
    opacity: 0;
    transform: translateY(20px);
}
</style>