<template>
    <div class="h-screen w-screen flex justify-center bg-zinc-700">
        <div class="h-full w-[400px] xl:w-[25%]  ">
            <!-- 上方字体 -->
            <div class=" h-16 w-full flex items-center justify-center">
                <span class="text-zinc-300 absolute top-[4%] xl:top-[6%]  text-center">Welcome To A Secret
                    Man's
                    WebSite</span>
            </div>
            <!-- 下方注册-->
            <div class="w-full h-52 bg-zinc-300 rounded shadow-md relative">
                <!-- Register -->
                <div class="flex items-center justify-center h-8 text-xl">
                    <span>Register</span>
                </div>
                <!-- 表单 -->
                <Form @submit="onRegisterHandler">
                    <!-- 用户名 -->
                    <div>
                        <div class="flex items-center justify-center h-9 text-xl ">
                            <div class="h-4 w-[80%] ">
                                <Field type="text" name="username" placeholder=" 请输入注册的用户名" autocomplete="on"
                                    :rules="validateUsername" v-model="registerForm.username"
                                    class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400 ">
                                </Field>
                            </div>
                        </div>
                        <!-- 错误提示 -->
                        <error-message class="text-xm text-red-600 absolute left-[10%] top-[29%]" name="username">
                        </error-message>
                    </div>
                    <!-- 密码 -->
                    <div>
                        <div class="flex items-center justify-center h-9 text-xl ">
                            <div class="h-4 w-[80%] border-b ">
                                <Field type="password" name="password" placeholder="请输入密码"
                                    v-model="registerForm.password"
                                    class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400"
                                    autocomplete="on" :rules="validatePassword">
                                </Field>
                            </div>
                        </div>
                        <!-- 错误提示 -->
                        <error-message class="text-xm text-red-600 absolute left-[10%] top-[47%]" name="password">
                        </error-message>
                    </div>
                    <!-- 确认密码 -->
                    <div>
                        <div class="flex items-center justify-center h-9 text-xl ">
                            <div class="h-4 w-[80%] border-b ">
                                <Field type="password" placeholder="请再次输入您的密码" autocomplete="on" name="confirmPassword"
                                    class="h-full w-full text-xm outline-0 bg-zinc-300 border-b border-b-zinc-400"
                                    rules="validateConfirmPassword:@password">
                                </Field>
                            </div>
                        </div>
                        <!-- 错误提示 -->
                        <error-message class="text-xm text-red-600 absolute left-[10%] top-[63%]"
                            name="confirmPassword">
                        </error-message>
                    </div>

                    <!-- 注册按钮 -->
                    <div class="w-full h-8 mt-3 flex items-center justify-center">
                        <m-button icon="hacker" class="!h-4 !w-20 !text-zinc-200 !text-xl  dark:!bg-zinc-400 !rounded 
                        hover:!bg-zinc-600 !bg-zinc-200" :loading="loading"></m-button>
                    </div>
                </Form>
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
import { useRouter, useRoute } from 'vue-router';
import { message } from '@/libs/message';
import { Form, Field, ErrorMessage, defineRule } from 'vee-validate'
import { validateUsername, validatePassword, validateConfirmPassword } from '../validate';

const text = ref('')
watch(() => text.value, (val) => {
    console.log(val);
})
// 初始化 useUserStore
const userStore = useUserStore()

// 初始化 useRouter
const router = useRouter()

// 初始化 useRoute
const route = useRoute()

// 控制 sliderCaptcha 展示
const sliderCaptcha = ref(false)

/**
 * 插入规则
 */
defineRule('validateConfirmPassword', validateConfirmPassword)


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
    username: '',
    password: ''
})
const onRegister = async () => {
    loading.value = true
    try {
        // 注册
        console.log(route.query);

        await userStore.userRegister({ ...registerForm.value, ...route.query })
        // 注册完成 直接触发登录 去拿到token
        await userStore.userLogin({ ...registerForm.value, loginType: 'username' })

    }
    finally {
        loading.value = false
    }
    router.push('/')
    userStore.userProfile()
    message('success', 'Register success and Login success!', 4000)
}



</script>

<style lang="scss" scoped></style>