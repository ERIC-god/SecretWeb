<template>
    <div class="relative flex flex-col items-center">
        <m-svg-icon v-if="isMobileTerminal" name="close" class="w-3 h-3 p-0.5 m-1 ml-auto"
            fillClass="fill-zinc-900 dark:fill-zinc-200 " @click="onCancelClick">
        </m-svg-icon>
        <img class="h-44 w-60" ref="imageTarget" :src="imageSrc" />
        <!-- 按钮 -->
        <div class="flex justify-end translate-y-[4px]">
            <m-button type="info" class="mr-2" @click="onCancelClick">{{
                cancelText
            }}</m-button>
            <m-button type="primary" @click="onConfirmClick">{{
                confirmText
            }}</m-button>
        </div>
    </div>
</template>

<script>
// 移动端配置对象
const mobileOptions = {
    // 将裁剪框限制在画布的大小
    viewMode: 1,
    // 移动画布，裁剪框不动
    dragMode: 'move',
    // 裁剪框固定纵横比：1:1
    aspectRatio: 1,
    // 裁剪框不可移动
    cropBoxMovable: false,
    // 不可调整裁剪框大小
    cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
    // 裁剪框固定纵横比：1:1
    aspectRatio: 1
}
</script>

<script setup>
import { isMobileTerminal } from '@/utils/flexible.js'
import { ref, onMounted } from 'vue';
import { getOSSClient } from '@/utils/sts';
import { useUserStore } from '@/store/modules/user.js'
import { putProfile } from '../../../api/sys';
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

// 初始化useUserStore
const userStore = useUserStore()



const props = defineProps({
    // blob对象 
    blob: {
        type: String,
        required: true
    },
    // 取消按钮文本
    cancelText: {
        type: String,
        default: 'No!!'
    },
    // 确定按钮文本
    confirmText: {
        type: String,
        default: 'Yes!!'
    },
    // 取消按钮点击事件
    cancelHandler: {
        type: Function
    },
    // 确定按钮点击事件
    confirmHandler: {
        type: Function
    },
    // 关闭的回调
    close: {
        type: Function
    }
})

// 图片src
const imageSrc = ref(props.blob)

const emits = defineEmits(['close'])

/**
 * 图片裁剪处理
 */
const imageTarget = ref(null)
let cropper = null
onMounted(() => {
    /**
     * 接收两个参数：
     * 1. 需要裁剪的图片 DOM
     * 2. options 配置对象
     */
    cropper = new Cropper(
        imageTarget.value,
        isMobileTerminal.value ? mobileOptions : pcOptions
    )

})

/**
 * 确定按钮点击事件
 */
const onConfirmClick = () => {
    if (props.confirmHandler) {
        props.confirmHandler()
    }
    // 拿到裁剪后的图片
    cropper.getCroppedCanvas().toBlob((blob) => {
        // const urlBlob = URL.createObjectURL(blob)
        // console.log(urlBlob);
        putObjectToOSS(blob)
    })
    emits('close')
}

/**
 *  进行OSS上传
 */
let ossClient
const putObjectToOSS = async (file) => {
    // 找出上传图片的type
    const fileTypeArr = file.type.split('/')
    const type = fileTypeArr[fileTypeArr.length - 1]
    // 用户名(userName)+时间戳(Date.now())+文件类型(png)
    const fileName = `${userStore.userInfo.userName}/${Date.now()}.${type}`
    if (!ossClient) {
        ossClient = await getOSSClient()
    }
    try {
        // 1.存放的路径(包含名称)
        const res = await ossClient.put(`images/${fileName}`, file)
        // 2.发送请求更新头像
        putProfile({
            ...userStore.userInfo,
            avatar: res.url
        })
        // 3.更新userstore本地用户信息
        userStore.userInfo.avatar = res.url

    } catch (e) {
        console.log(e);
    }
}



/**
 * 取消按钮点击事件
 */
const onCancelClick = () => {
    if (props.cancelHandler) {
        props.cancelHandler()
    }
    emits('close')
}




</script>

<style lang="scss" scoped></style>
