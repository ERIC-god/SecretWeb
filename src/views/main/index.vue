<template>
    <div class="h-full  bg-white dark:bg-zinc-800 duration-500 ">
        <navigation-vue />
        <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
            <list-vue></list-vue>
        </div>
    </div>
</template>

<script setup>
import navigationVue from '@/views/main/components/navigation/index.vue'
import listVue from '@/views/main/components/list/index.vue'
</script>

<style lang="scss" scoped></style>