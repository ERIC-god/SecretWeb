<template>
    <svg aria-hidden="true">
        <use :xlink:href="symbolId" :class="fillClass" :fill="color" />
    </svg>
</template>

<script setup>

import { computed } from 'vue';
const props = defineProps({
    //显示的 svg
    name: {
        type: String,
        Required: true
    },
    //svg 图标的颜色
    color: {
        type: String
    },
    //tailwind 指定svg 颜色的类名
    fillClass: {
        type: String
    }
})

const symbolId = computed(() => `#icon-${props.name}`)

</script>

<style lang="scss" scoped></style>