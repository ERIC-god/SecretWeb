<template>
    <div class="h-screen w-screen flex justify-center  bg-zinc-700">
        <div class="h-full w-[400px] xl:w-[30%]  ">
            <!-- 上方字体 -->
            <div class="w-full h-16 relative flex items-center justify-center text-center">
                <span class=" text-zinc-300 absolute top-[15%] xl:left-[5%]">Welcome To A Secret
                    Man's
                    WebSite</span>
            </div>
            <!-- 下方登录 -->
            <div class="w-full h-52 bg-zinc-300 rounded shadow-md relative">
                <!-- Login-->
                <div class="flex items-center justify-center h-8 text-xl">
                    <span>Login</span>
                </div>
                <!-- 表单 -->
                <Form @submit="onLoginHandler">
                    <!-- 用户名 -->
                    <div class=" flex items-center justify-center h-8 text-xl ">
                        <div class=" h-4 w-[80%] ">
                            <Field type=" text" name="username" placeholder="用户名" v-model="loginForm.username"
                                :rules="validateUsername"
                                class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400 ">
                            </Field>
                        </div>

                    </div>
                    <error-message class="text-xm text-red-600 absolute left-[10%] top-[28%]" name="username">
                    </error-message>

                    <!-- 密码 -->
                    <div class="flex items-center justify-center h-8 text-xl ">
                        <div class="h-4 w-[80%] border-b ">
                            <Field type="password" name="password" placeholder="密码" v-model="loginForm.password"
                                :rules="validatePassword"
                                class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400">
                            </Field>
                        </div>
                    </div>
                    <error-message class="text-xm text-red-600   
                    absolute left-[10%] top-[43%]" name="password">
                    </error-message>
                    <!-- 去注册 -->
                    <div>
                        <span @click="onToReg" class="text-zinc-500 text-xm absolute right-3 cursor-pointer">去注册</span>
                    </div>
                    <!-- 登录按钮 -->
                    <div class="w-full h-8 mt-3 flex items-center justify-center">
                        <m-button icon="hacker" class="text-zinc-200 text-xl h-4 w-12 dark:bg-zinc-500 rounded 
                        hover:bg-zinc-600 bg-zinc-200" :loading="loading"></m-button>
                    </div>
                </Form>



                <!-- 微信和qq图标 -->
                <div class="relative w-full h-12 ">
                    <!-- QQ -->
                    <qq-login-vue></qq-login-vue>
                    <!-- 微信 -->
                    <m-svg-icon class="w-4 cursor-pointer absolute top-[-4px] right-12" name="wexin"
                        @click="wechatLogin"></m-svg-icon>
                </div>
            </div>
        </div>
        <slider-captcha-vue v-if="sliderCaptcha" @close="onCloseHandler"
            @success="onSuccessHandler"></slider-captcha-vue>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import sliderCaptchaVue from './slider-captcha.vue';
import { useUserStore } from '@/store/modules/user';
import { useRouter } from 'vue-router';
import qqLoginVue from './qq-login.vue';
import { message } from '@/libs/message';
import { validateUsername, validatePassword } from '../validate.js';
import { Form, Field, ErrorMessage } from 'vee-validate';

// 初始化 useUserStore
const userStore = useUserStore()

// 初始化 useRouter
const router = useRouter()

// 控制 sliderCaptcha 展示
const sliderCaptcha = ref(false)

/** 
 *  触发登录 , 表单验证通过后触发
 */
const onLoginHandler = () => {
    sliderCaptcha.value = true
}

// 处理 close 事件
const onCloseHandler = () => {
    sliderCaptcha.value = false
}

// 处理 success 事件
const onSuccessHandler = () => {
    sliderCaptcha.value = false
    onLogin()
}

/** 
 *  用户登陆行为
 */
const loading = ref(false)
const loginForm = ref({
    username: '',
    password: ''
})
const onLogin = async () => {
    loading.value = true
    try {
        await userStore.userLogin({ ...loginForm.value, loginType: 'username' })
    }
    finally {
        loading.value = false
    }
    router.push('/')
    message('success', 'Login success!', 4000)
    userStore.userProfile()
}

/**
 *  去注册
 */
const onToReg = () => {
    router.push('/register')
}

/**
 *  微信登陆暂时不可用
 */
const wechatLogin = () => {
    message('error', 'The Wechat Accession is Temporarily Unavailable')
}

</script>

<style lang="scss" scoped></style>