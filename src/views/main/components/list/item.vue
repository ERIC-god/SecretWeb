<template>
    <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
        <div class="relative w-full rounded cursor-zoom-in group" :style="{ backgroundColor: randomRGB() }"
            @click="onToPinsClick">
            <!-- 图片 -->
            <img ref="imgTarget" class="w-full rounded bg-transparent" :src="data.photo" alt=""
                :style="{ height: (width / data.photoWidth) * data.photoHeight + 'px ' }">
            <!-- 遮罩层 -->
            <div class="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded
            duration-300 group-hover:opacity-100 xl:block">
                <!-- 分享 -->
                <m-button class="absolute top-1.5 left-1.5">分享</m-button>
                <!-- 点赞 -->
                <m-button class="absolute top-1.5 right-1.5" type="info" icon="heart"
                    iconClass="fill-zinc-900 dark:fill-zinc-200"></m-button>
                <!-- 下载 -->
                <m-button class="absolute bottom-1.5 left-1.5 bg-zinc-100/70" type="info" icon="download" size="small"
                    iconClass="fill-zinc-900 dark:fill-zinc-200" @click="onDownload"></m-button>
                <!-- 全屏 -->
                <m-button class="absolute bottom-1.5 right-1.5 bg-zinc-100/70" type="info" icon="full" size="small"
                    iconClass="fill-zinc-900 dark:fill-zinc-200" @click="onImgFullScreen"></m-button>
            </div>
        </div>
        <!-- 标题 -->
        <p class="text-xm mt-1 font-bold text-zinc-900 dark:text-zinc-300 px-1">{{ data.title }}</p>
        <!-- 作者信息 -->
        <div class="flex justify-center mt-1 px-1">
            <img class="h-2 w-2 rounded-full" :src="data.avatar" alt="">
            <span class="text-xm text-zinc-500 ml-1">{{ data.author }}</span>
        </div>
    </div>
</template>

<script setup>
import { nextTick, computed, ref } from 'vue';
import { randomRGB } from '@/utils/color';
import { saveAs } from 'file-saver'
import { useFullscreen } from '@vueuse/core'
import { useElementBounding } from '@vueuse/core';

const props = defineProps({
    data: {
        type: Object,
        Required: true
    },
    width: {
        type: Number
    }
})

const emits = defineEmits(['click'])

/**
 *  下载点击事件
 */
const onDownload = () => {
    console.log(props.data);

    /**
     *  下载的图片链接
     */
    saveAs(props.data.photoDownLink)
}

/**
 *  生成全屏的方法
 */
const imgTarget = ref(null)
const { enter: onImgFullScreen } = useFullscreen(imgTarget)


/**
 *   pins跳转记录,记录图片的中心点
 */
// const imgContainerX = ref(0)
// const imgContainerY = ref(0)
// const imgContainerWidth = ref(0)
// const imgContainerHeight = ref(0)

const {
    x: imgContainerX,
    y: imgContainerY,
    width: imgContainerWidth,
    height: imgContainerHeight,
} = useElementBounding(imgTarget)

const imgContainerCenter = computed(() => {

    return {
        translateX: parseInt(imgContainerX.value + 0.5 * imgContainerWidth.value),
        translateY: parseInt(imgContainerY.value + 0.5 * imgContainerHeight.value)
    }
})

/**
 *   进入详情点击事件
 */
const onToPinsClick = async () => {
    if (!imgTarget.value) return
    emits('click', {
        id: props.data.id,
        location: imgContainerCenter.value
    })
}

</script>

<style lang="scss" scoped></style>