<template>
    <div class="h-[665px] bg-zinc-200 dark:bg-zinc-800 duration-400 overflow-auto xl:pt-1">
        <div
            class="relative top-3 max-w-screen-lg mx-auto bg-white dark:bg-zinc-900 duration-400 xl:rounded-sm xl:border-zinc-200 xl:dark:border-zinc-600 xl:border-[1px] xl:px-4 xl:py-2">
            <!-- 移动端 navbar -->
            <m-navbar sticky v-if="isMobileTerminal" :clickLeft="onNavbarLeftClick">
                个人资料
            </m-navbar>
            <!-- pc 端 -->
            <div v-else class="text-lg font-bold text-center mb-4 dark:text-zinc-300">
                个人资料
            </div>
            <div class="h-full text-xm w-full px-1 pb-4  mt-2 xl:w-2/3 xl:pb-0">
                <!-- 头像 -->
                <div class="py-1 xl:absolute xl:right-[16%] xl:text-center">
                    <span
                        class="w-8 inline-block mb-2 font-bold text-xm dark:text-zinc-300 xl:block xl:mx-auto">我的头像</span>
                    <!-- 头像部分 -->
                    <div class="relative w-[80px] h-[80px] group xl:cursor-pointer xl:left-[50%] xl:translate-x-[-50%]"
                        @click="onAvatarClick">
                        <img :src="userStore.userInfo.avatar" alt=""
                            class="rounded-[50%] w-full h-full xl:inline-block" />
                        <div
                            class="absolute top-0 rounded-[50%] w-full h-full bg-[rgba(0,0,0,.4)] hidden xl:group-hover:block">
                            <m-svg-icon name="change-header-image" class="w-2 h-2 m-auto mt-2"></m-svg-icon>
                            <div class="text-xs text-white dark:text-zinc-300 scale-90 mt-0.5">
                                点击更换头像
                            </div>
                        </div>
                    </div>
                    <!-- 隐藏域 -->
                    <input v-show="false" ref="inputFileTarget" type="file" accept=".png, .jpeg, .jpg, .gif"
                        @change="onSelectImgHandler" />
                    <p class="mt-1 text-zinc-500 dark:text-zinc-400 text-xs xl:w-10">
                        支持 jpg、png、jpeg 格式大小 5M 以内的图片
                    </p>
                </div>
                <!-- 用户名 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1 border-b border-zinc-300">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">用户名</span>
                    <m-input v-model="userInfo.nickname" class="w-full" type="row"></m-input>
                </div>
                <!-- 职位 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1 border-b border-zinc-300">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">职位</span>
                    <m-input v-model="userInfo.title" class="w-full" type="row"></m-input>
                </div>
                <!-- 公司 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1 border-b border-zinc-300">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">公司</span>
                    <m-input v-model="userInfo.company" class="w-full" type="row"></m-input>
                </div>
                <!-- 个人主页 -->
                <div class="py-1 xl:flex xl:items-center xl:my-1 border-b border-zinc-300">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人主页</span>
                    <m-input v-model="userInfo.homePage" class="w-full" type="row"></m-input>
                </div>
                <!-- 个人介绍 -->
                <div class="py-1 xl:flex xl:my-1">
                    <span class="w-8 block mb-1 font-bold dark:text-zinc-300 xl:mb-0">个人介绍</span>
                    <m-input v-model="userInfo.introduction" class="w-full border-b border-zinc-300" inputType="rows"
                        :max="50"></m-input>
                </div>
                <!-- 保存修改 -->
                <m-button
                    class="w-full mt-2 mb-4 dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
                    :loading="loading" @click="onChangeProfile" type="info">保存修改</m-button>
                <!-- 移动端退出登录 -->
                <m-button v-if="isMobileTerminal" type="info"
                    class="w-full dark:text-zinc-300 dark:bg-zinc-800 xl:w-[160px] xl:ml-[50%] xl:translate-x-[-50%]"
                    @click="onLogoutClick">
                    退出登录
                </m-button>
            </div>
        </div>

        <!-- PC 端 -->
        <m-dialog v-if="!isMobileTerminal" v-model="isDialogVisible">
            <change-avatar-vue :blob="currentImgBlob" @close="isDialogVisible = false"></change-avatar-vue>
        </m-dialog>
        <!-- 移动端 -->
        <m-popup v-else :class="{ 'h-screen': isDialogVisible }" v-model="isDialogVisible">
            <change-avatar-vue :blob="currentImgBlob" @close="isDialogVisible = false"></change-avatar-vue>
        </m-popup>
    </div>
</template>

<script>
export default {
    name: 'profile'
}
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { putProfile } from '@/api/sys'
import { confirm } from '@/libs/confirm/index.js'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import changeAvatarVue from './components/change-avatar.vue'
import { useUserStore } from '@/store/modules/user.js'
import { message } from '../../libs/message'
// 初始化 useUserStore
const userStore = useUserStore()
// 初始化 useRouter
const router = useRouter()

// 隐藏域
const inputFileTarget = ref(null)
// 头像 dialog 展示
const isDialogVisible = ref(false)
// 选中的图片
const currentImgBlob = ref('')
/**
 * 更换头像点击事件
 */
const onAvatarClick = () => {
    inputFileTarget.value.click()
}

/**
 * 头像选择之后的回调
 */
const onSelectImgHandler = () => {
    // 获取选中的文件
    const imgFile = inputFileTarget.value.files[0]
    // 生成 blob 对象
    const blob = URL.createObjectURL(imgFile)
    // 获取选中的图片
    currentImgBlob.value = blob
    // 展示 Dialog
    isDialogVisible.value = true
}

/**
 * 监听 dialog 关闭
 */
watch(isDialogVisible, (val) => {
    if (!val) {
        // 防止 change 不重复触发
        inputFileTarget.value.value = null
    }
})

/**
 * 数据本地的双向同步
 */
const userInfo = ref(userStore.userInfo)
// const changeStoreUserInfo = (key, value) => {
//   store.commit('user/setUserInfo', {
//     ...store.getters.userInfo,
//     [key]: value
//   })
// }

/**
 * 修改个人信息
 */
const loading = ref(false)
const onChangeProfile = () => {
    loading.value = true
    confirm('Are u want to change your profile？').then(async () => {
        try {
            await putProfile(userInfo.value)
            userStore.userInfo = userInfo.value
            // 成功后才显示成功消息
            setTimeout(() => {
                message('success', 'Update your Profile Success!', 3000)
            }, 500)
        } catch (error) {
            // 失败时显示错误消息
            message('error', error.message || 'Failed to update profile', 3000)
        }
    }).finally(() => {
        loading.value = false
    })
}

/**
 * 移动端后退处理
 */
const onNavbarLeftClick = () => {
    // 配置跳转方式
    // store.commit('app/changeRouterType', 'back')
    router.back()
}

/**
 * 移动端：退出登录
 */
const onLogoutClick = () => {
    confirm('确定要退出登录吗？').then(() => {
        userStore.userLogout()
        message('success', 'Logout success!', 4000)
    })
}
</script>

<style lang="scss" scoped></style>
