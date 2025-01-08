<template>
    <m-popover placement="bottom-left">
        <!-- 具名插槽：触发弹层的视图 -->
        <template #reference>
            <div v-if="userStore.token" class="flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none
             hover:bg-zinc-200 dark:hover:bg-zinc-900">
                <!-- 头像 -->
                <a href="http://baidu.com"><m-svg-icon name="hacker1" class="h-4 cursor-pointer w-6"></m-svg-icon></a>
                <!-- 下箭头 -->
                <m-svg-icon name="down-arrow" class="h-1.5 w-1.5 ml-0.5"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"></m-svg-icon>
                <!-- vip -->
                <m-svg-icon name="vip" class="h-1.5 w-1.5 absolute right-[16px] bottom-0"></m-svg-icon>
            </div>
            <div v-else>
                <m-button icon="profile" iconColor="black" type="info" @click="onToLogin"></m-button>
            </div>
        </template>
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <div class="w-[140px] overflow-hidden" v-if="userStore.token">
            <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
                v-for="item in menuArr" :key="item.id" @click="onClickItem(item)">
                <m-svg-icon class="w-1.5 h-1.5 mr-1" :name="item.icon"
                    fillClass="fill-zinc-900 dark:fill-zinc-300"></m-svg-icon>
                <span class="text-zinc-900 text-xm dark:text-zinc-300">{{ item.title }}</span>
            </div>
        </div>
    </m-popover>
</template>

<script>

</script>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user';
import { confirm } from '@/libs/confirm/index.js';
// 初始化 useRouter
const router = useRouter()
// 初始化 useUserStore
const userStore = useUserStore()
// 构建 Menu 数据源
const menuArr = [
    {
        id: 0,
        title: '个人资料',
        icon: 'profile',
        path: '/profile'
    },
    {
        id: 1,
        title: '升级VIP',
        icon: 'vip-profile',
        path: '/member'
    },
    {
        id: 2,
        title: '退出登录',
        icon: 'logout'
    }
]

/**
 *  按钮点击事件 
 */
const onToLogin = () => {
    router.push('/login')
}

/**
 *  退出登录
 */
const onClickItem = (item) => {
    if (item.id === 2) {
        confirm('Are u want to Logout?').then(() => {
            userStore.userLogout()
        })
    }
    if (item.id === 0) {
        router.push('/profile')
    }
    if (item.id === 1) {
        router.push('/member')
    }
}

</script>

<style lang="scss" scoped></style>