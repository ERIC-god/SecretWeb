<template>
    <transition name='fade'>
        <div v-if="isMobileTerminal" class="fixed top-[600px] left-[50%] translate-x-[-50%] rounded-full duration-300
        h-6 w-6 flex bg-zinc-200 dark:bg-zinc-700" :class="{ 'w-[200px]': isExpanded }">
            <!-- 左方登录按钮 -->
            <m-svg-icon name="profile" v-if="isExpanded"
                class="fixed h-3 w-3 left-[20%] translate-x-[-50%] top-[14px] text-xl" fillClass="fill-zinc-800"
                @click="onHandlerProfile">Login</m-svg-icon>
            <!-- 中间黑客图标 -->
            <m-svg-icon name="hacker" @click="onFloatFallClick"
                class="fixed h-4 w-4  left-[50%] translate-x-[-50%] top-[8px]"></m-svg-icon>
            <!-- 右方切换色调  默认极简白 -->
            <!-- 极简白 -->
            <m-svg-icon v-if="isThemeLight && isExpanded" name="theme-light"
                class="fixed h-4 w-4  left-[80%] translate-x-[-50%] top-[8px]" @click="onChangeTheme"></m-svg-icon>
            <!-- 极简黑 -->
            <m-svg-icon v-if="!isThemeLight && isExpanded" name="theme-dark"
                class="fixed h-4 w-4  left-[80%] translate-x-[-50%] top-[8px]" @click="onChangeTheme"></m-svg-icon>
        </div>
    </transition>
</template>

<script setup>
import { ref } from 'vue';
import { isMobileTerminal } from '@/utils/flexible.js'
import { useThemeStore } from '../../store/modules/theme';
import { useUserStore } from '../../store/modules/user';
import { useRouter } from 'vue-router';
// 初始化useRouter
const router = useRouter()

// 初始化 useUserStore
const themeStore = useThemeStore()
const userStore = useUserStore()

// 控制 展开状态
const isExpanded = ref(false)

// 控制 浅色深色模式
const isThemeLight = ref(themeStore.themeType === 'theme-light' ? true : false)

// 处理 floatBall 点击事件
const onFloatFallClick = () => {
    isExpanded.value = !isExpanded.value
}

// 处理 profile 点击事件
const onHandlerProfile = () => {
    if (userStore.token) {
        router.push('/profile')
        return
    }
    router.push('/login')
}

// 处理 changeTheme事件
const onChangeTheme = () => {
    isThemeLight.value = !isThemeLight.value
    if (isThemeLight.value) {
        themeStore.themeType = 'theme-light'
    } else {
        themeStore.themeType = 'theme-dark'
    }
}


</script>

<style lang="scss" scoped>
.fade-enter-from,
.fade-leave-to {
    transform: translateY(-40px);
    opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 1s;
}


.fade-enter-to,
.fade-leave-from {
    transform: translateY(0px);
    opacity: 1;
}
</style>