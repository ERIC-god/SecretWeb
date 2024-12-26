<template>
    <m-popover placement="bottom-left">
        <template #reference>
            <div class="flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-200">
                <!-- 头像 -->
                <a href="http://baidu.com"><m-svg-icon name="hacker1" class="h-4 cursor-pointer w-6"></m-svg-icon></a>
                <!-- 下箭头 -->
                <m-svg-icon name="down-arrow" class="h-1.5 w-1.5 ml-0.5"></m-svg-icon>
                <!-- vip -->
                <m-svg-icon name="vip" class="h-1.5 w-1.5 absolute right-[16px] bottom-0"></m-svg-icon>
            </div>
        </template>
        <!-- 气泡 -->
        <div class="w-[140px] overflow-hidden">
            <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60" v-for="item in menuArr"
                :key="item.id">
                <m-svg-icon class="w-1.5 h-1.5 mr-1" :name="item.icon"></m-svg-icon>
                <span class="text-zinc-900 text-xm">{{ item.title }}</span>
            </div>
        </div>
    </m-popover>
</template>

<script>

</script>

<script setup>
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


</script>

<style lang="scss" scoped></style>