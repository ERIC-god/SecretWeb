<template>
    <div class="w-screen h-5 border-b flex items-center z-10 bg-white dark:bg-slate-800
    border-b-zinc-200" :class="[sticky ? 'sticky top-0 left-0' : 'relative']">
        <!-- 左 -->
        <div class="h-full w-5 absolute left-0 flex items-center" @click="onClickLeft">
            <!-- 给一个插槽 , 不传的话 默认就是一个后退按钮 -->
            <slot name="left">
                <m-svg-icon name="back" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200"></m-svg-icon>
            </slot>
        </div>
        <!-- 中 -->
        <div
            class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200">
            <slot name="center"></slot>
        </div>
        <!-- 右 -->
        <div class="h-full w-5 absolute right-0 flex items-center justify-center" @click="onClickRight">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

//  注册 useRouter
const router = useRouter()


const props = defineProps({
    // 左边按钮的点击
    clickLeft: {
        type: Function
    },
    // 右边按钮的点击
    clickRight: {
        type: Function
    },
    // 是否吸顶
    sticky: {
        type: Boolean,
        default: true
    }
})

/**
 *  左侧按钮 点击事件
 */
const onClickLeft = () => {
    if (props.clickLeft) {
        props.clickLeft()
        return
    } else {
        // 若用户没传,则
        router.back()
    }

}


/**
 *  右侧按钮 点击事件
 */
const onClickRight = () => {
    if (props.clickRight) {
        props.clickRight()
        return
    }
}

</script>

<style lang="scss" scoped></style>