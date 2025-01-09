<template>

    <button class="text-xm text-center rounded duration-150 flex justify-center items-center" :class="[
        typeEnum[type],
        sizeEnum[sizeKey].button,
        { 'active:scale-105': isActiveAnim }]" @click="onBtnClick">
        <!-- loading -->
        <m-svg-icon name="loading" v-if="loading" class="w-2 h-2 animate-spin mr-1"></m-svg-icon>
        <!-- icon 按钮 -->
        <m-svg-icon :name="icon" v-if="icon" :class="sizeEnum[sizeKey].icon" :color="iconColor"
            :fillClass="iconClass"></m-svg-icon>
        <!-- 文字按钮 -->
        <slot v-else />
    </button>

</template>

<script>
import { computed } from 'vue';

const EMITS_CLICK = 'click'

// type 可选项：表示按钮风格
const typeEnum = {
    primary: 'text-white  bg-zinc-800 dark:bg-zinc-900  hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:active:bg-zinc-700',
    main: 'text-white  bg-main dark:bg-zinc-900  hover:bg-hover-main dark:hover:bg-zinc-700 active:bg-main dark:active:bg-zinc-700',
    info: 'text-zinc-800 dark:text-zinc-300  bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 active:bg-zinc-200 dark:active:bg-zinc-700 '
}

// size 可选项：表示按钮的大小。 区分文字按钮 和 icon按钮
const sizeEnum = {
    // 文字按钮
    default: {
        button: 'w-8 h-4 text-base',
        icon: ''
    },
    // icon按钮
    'icon-default': {
        button: 'w-4 h-4',
        icon: 'w-2 h-2'
    },
    small: {
        button: 'w-7 h-3 text-base',
        icon: ''
    },
    'icon-small': {
        button: 'w-3 h-3',
        icon: 'w-1.5 h-1.5'
    }
}


</script>



<script setup>
/**
 * 1. 构建 type 风格可选项 和size 大小 可选项
 * 2. 通过 props 让开发者 控制按钮
 * 3. 区分 icon-button 和 text-button
 * 4. 依据当前的数据 实现试图
 * 5. 处理点击事件
 */

const props = defineProps({
    // icon图标
    icon: String,
    // icon颜色
    iconColor: String,
    // icon图标类名（tailwind）
    iconClass: String,
    // 按钮风格
    type: {
        type: String,
        default: 'main',
        validator(val) {
            // 获取 所有可选项
            const keys = Object.keys(typeEnum)
            // 开发者 指定的风格 是否在可选项中
            const res = keys.includes(val)
            if (!res) {
                throw new Error(`你的type必须是${keys.join(',')}中的一种`)
            }
            return res
        }
    },
    // 大小风格
    size: {
        type: String,
        default: 'default',
        validator(val) {
            const keys = Object.keys(sizeEnum).filter(item => !item.includes('icon'))
            const res = keys.includes(val)
            if (!res) {
                throw new Error(`你的size必须是${keys.join(',')}中的一种`)
            }
            return res
        }
    },
    // 按钮点击时，是否需要动画
    isActiveAnim: {
        type: Boolean,
        default: true
    },
    // 加载状态
    loading: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([EMITS_CLICK])

// props.size
const sizeKey = computed(() => {
    return props.icon ? 'icon-' + props.size : props.size
})

// 处理 点击事件
const onBtnClick = (e) => {
    // 阻止冒泡，防止点击全屏或分享等按钮时候导致进入详情页
    e.stopPropagation()
    if (props.loading) return
    emits(EMITS_CLICK)
}


</script>

<style lang="scss" scoped></style>