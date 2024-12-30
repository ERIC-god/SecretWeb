<template>
    <div>
        <div v-html="highlightText(item)" @click="onItemClick(item)" v-for="(item, index) in hintData" :key="index"
            class="py-1 pl-1 text-base font-bold text-zinc-500
        rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900">
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { getHint } from '@/api/pexels';
import { useDebounceFn } from '@vueuse/core';
const props = defineProps({
    // 搜索文本
    searchText: {
        type: String,
        Required: true
    }
})

const emits = defineEmits(['itemClick'])

/**
 *  处理搜索 提示数据获取
 */
const hintData = ref([])

const getHintData = async () => {
    if (!props.searchText) return
    const res = await getHint(props.searchText)
    hintData.value = res.result
}
// 使用vueuse中的useDebounceFn处理防抖
const debounceFn = useDebounceFn(getHintData, 800)
watch(() => props.searchText, () => {
    debounceFn()
})

/**
 *  item 点击事件
 */
const onItemClick = (item) => {
    emits('itemClick', item)
}


/**
 *  处理 关键字高亮
 */
const highlightText = (text) => {
    const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
    // 创造一个正则表达式
    const reg = new RegExp(props.searchText, 'gi')
    // 使用 replace 方法 按照 正则表达式的规则 去替换
    return text.replace(reg, highlightStr)
}


</script>

<style lang="scss" scoped></style>