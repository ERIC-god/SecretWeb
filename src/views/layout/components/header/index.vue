<template>
    <div class=" w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700 px-2 py-1">
        <div class="flex items-center">
            <!-- <img class="h-4  cursor-pointer mr-2"
                src="https://m.imooc.com/static/wap/static/common/img/logo-small@2x.png" alt="" @click="onToHome"> -->
            <m-svg-icon :name="themeStore.themeType === 'theme-light' ? 'hacker' : 'hacker2'"
                class="h-4 cursor-pointer w-6" @click="onToHome"></m-svg-icon>
            <header-search-vue class="mr-1"></header-search-vue>
            <header-theme-vue class="mr-1"></header-theme-vue>
            <header-my-vue class=""></header-my-vue>
        </div>
    </div>
</template>

<script setup>
import headerSearchVue from './header-search/index.vue'
import headerMyVue from './header-my.vue'
import headerThemeVue from './header-theme.vue'
import { useRouter } from 'vue-router';
import { useThemeStore } from '../../../../store';

const router = useRouter()
const onToHome = () => {
    router.push('/')
}

// 初始化useThemeStore
const themeStore = useThemeStore()



</script>

<style lang="scss" scoped></style>