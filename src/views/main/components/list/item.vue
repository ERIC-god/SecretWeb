<template>
    <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1 h-[280px] w-[230px]">
        <div class="relative w-full rounded cursor-zoom-in group">
            <!-- 图片 -->
            <img class="w-full rounded bg-transparent" :src="data.photo" alt="">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
        Required: true
    }
})

</script>

<style lang="scss" scoped></style>