<template>
    <div class="fixed bottom-10 right-2">
        <!-- 引导页 -->
        <m-popover class="flex items-center" placement="top-left">
            <!-- 触发弹层内容的图标 -->
            <template #reference>
                <div class="w-5 h-5 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 hover:shadow-lg group
                border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200">
                    <m-svg-icon name="guide" class="w-3 h-3" fillClass="fill-zinc-900 
                    dark:fill-zinc-200 group-hover:fill-main"></m-svg-icon>
                </div>
            </template>
            <!-- 鼠标移入显示的弹层内容 -->
            <div class="w-[140px] overflow-hidden">
                <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 
                dark:hover:bg-zinc-800" @click="showASecretMan">
                    <m-svg-icon name="feedback" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300">
                    </m-svg-icon>
                    <span class="text-zinc-800 dark:text-zinc-500 text-xm">查看我</span>
                </div>
            </div>
        </m-popover>
        <!-- 反馈 -->
        <m-popover class="flex items-center" placement="top-left">
            <!-- 触发弹层内容的图标 -->
            <template #reference>
                <div class="w-5 h-5 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 hover:shadow-lg group
                    border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200">
                    <m-svg-icon name="feedback" class="w-3 h-3" fillClass="fill-zinc-900 
                    dark:fill-zinc-200 group-hover:fill-main"></m-svg-icon>
                </div>
            </template>
            <!-- 鼠标移入显示的弹层内容 -->
            <div class="w-[140px] overflow-hidden">
                <div class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 
                dark:hover:bg-zinc-800" @click="showWechat">
                    <m-svg-icon name="feedback" class="w-1.5 h-1.5 mr-1" fillClass="fill-zinc-900 dark:fill-zinc-300">
                    </m-svg-icon>
                    <span class="text-zinc-800 dark:text-zinc-500 text-xm">联系我</span>
                </div>
            </div>
        </m-popover>
    </div>
</template>

<script setup>
import pdfUrl from '@/assets/files/profile.pdf'
import jpgUrl from '@/assets/files/profile.jpg'
// 展示我的个人简介
const showASecretMan = () => {
    window.open(pdfUrl)
}

// 展示我的个人微信
const showWechat = () => {
    window.open(jpgUrl)
}

</script>

<style lang="scss" scoped></style>