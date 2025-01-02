<template>
    <div class="h-screen w-screen flex justify-center bg-zinc-700">
        <div class="h-full w-[400px]  ">
            <!-- 上方字体 -->
            <div class="w-full h-16  flex items-center justify-center">
                <span class="text-black">A Secret Man</span>
            </div>
            <!-- 下方注册-->
            <div class="w-full h-52 bg-zinc-300 rounded shadow-md relative">
                <!-- Register -->
                <div class="flex items-center justify-center h-8 text-xl">
                    <span>Register</span>
                </div>
                <!-- 表单 -->
                <form>
                    <!-- 用户名 -->
                    <div class="flex items-center justify-center h-8 text-xl ">
                        <div class="h-4 w-[80%] ">
                            <input type="text" name="usename" placeholder="请输入注册的用户名" v-model="registerForm.username"
                                class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400 ">
                        </div>
                    </div>
                    <!-- 密码 -->
                    <div class="flex items-center justify-center h-8 text-xl ">
                        <div class="h-4 w-[80%] border-b ">
                            <input type="password" name="password" placeholder="请输入密码" v-model="registerForm.password"
                                class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400">
                        </div>
                    </div>
                    <!-- 确认密码 -->
                    <div class="flex items-center justify-center h-8 text-xl ">
                        <div class="h-4 w-[80%] border-b ">
                            <input type="password" placeholder="请再次输入您的密码"
                                class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400">
                        </div>
                    </div>
                </form>
                <!-- 注册按钮 -->
                <div class="w-full h-8  mt-3 flex items-center justify-center">
                    <m-button icon="hacker" @click="onRegisterHandler" class="text-zinc-200 text-xl h-4 w-32 bg-zinc-400 rounded 
                        hover:bg-zinc-600" :loading="loading"></m-button>
                </div>
            </div>

        </div>
        <slider-captcha-vue v-if="sliderCaptcha" @close="onCloseHandler"
            @success="onSuccessHandler"></slider-captcha-vue>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import sliderCaptchaVue from '../login/slider-captcha.vue';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';
const text = ref('')
watch(() => text.value, (val) => {
    console.log(val);
})
// 初始化 useUserStore
const userStore = useUserStore()

// 初始化 useRouter
const router = useRouter()

// 控制 sliderCaptcha 展示
const sliderCaptcha = ref(false)

/** 
 *  触发登录 , 表单验证通过后触发
 */
const onRegisterHandler = () => {
    sliderCaptcha.value = true
}

// 处理 close 事件
const onCloseHandler = () => {
    sliderCaptcha.value = false
}

// 处理 success 事件
const onSuccessHandler = () => {
    sliderCaptcha.value = false
    onRegister()
}

/** 
 *  用户注册行为
 */
const loading = ref(false)
const registerForm = ref({
    username: 'qweqwe123123',
    password: '123456'
})
const onRegister = async () => {
    loading.value = true
    try {
        // 注册
        await userStore.userRegister(registerForm.value)
        // 注册完成 直接触发登录 去拿到token
        await userStore.userLogin({ ...registerForm.value, loginType: 'username' })
    }
    finally {
        loading.value = false
    }
    router.push('/')
    userStore.userProfile()
}



</script>

<style lang="scss" scoped></style>