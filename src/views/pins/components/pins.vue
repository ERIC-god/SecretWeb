<template>
    <div class="fixed top-0 left-0 w-screen h-screen  text-xl bg-slate-200 z-20">
        <!-- 移动端下的navBar -->
        <m-navbar v-if="isMobileTerminal">
            <template #center>
                {{ pexelsData.title }}
            </template>
            <template #right>
                <m-svg-icon name="share" class="w-3 h-3" fillClass="fill-zinc-900 dark:fill-zinc-200"></m-svg-icon>
            </template>
        </m-navbar>
        <!-- PC端 -->
        <m-svg-icon v-else name="close" class="w-3 h-3 ml-1 p-0.5 cursor-pointer duration-200 rounded-sm
        hover:bg-zinc-200 absolute right-2 top-2" fillClass="fill-zinc-400" @click="onPop"></m-svg-icon>
        <!-- 内容区 -->
        <div class="xl:w-[80%] xl:h-full xl:mx-auto xl:rounded-lg xl:flex">
            <img :src="pexelsData.photo" alt=""
                class="w-screen mb-2 xl:w-3/5 xl:h-full xl:rounded-tl-lg xl:rounded-bl-lg">
            <div class="xl:w-2/5 xl:h-full xl:bg-white xl:dark:bg-zinc-900 xl:rounded-tr-lg xl:rounded-br-lg
            xl:p-3 ">
                <!-- PC端下的 收藏分享 -->
                <div v-if="!isMobileTerminal" class="flex justify-between mb-2">
                    <!-- 分享 -->
                    <m-svg-icon name="share" class="p-1 w-4 h-4 cursor-pointer hover:bg-zinc-200 
                    dark:hover:bg-zinc-800 duration-300 rounded"></m-svg-icon>
                    <!-- 收藏 -->
                    <m-button type="info" icon="heart" iconClass="fill-zinc-900 dark:fill-zinc-200"></m-button>
                </div>
                <!-- 标题 -->
                <p class="text-base text-zinc-900 dark:text-zinc-200 ml-1 font-bold xl:text-xl xl:mb-5">
                    {{ pexelsData.title }}
                    {{ pexelsData.author }}
                </p>
                <!-- 作者 -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { getPexlesFromId } from '@/api/pexels';
import { onMounted, ref } from 'vue';
import { isMobileTerminal } from '@/utils/flexible';
import { useRouter } from 'vue-router';
const router = useRouter()
const props = defineProps({
    id: {
        type: String,
        Required: true
    }
})

const pexelsData = ref({})
const getPexlesData = async () => {
    const res = await getPexlesFromId(props.id)
    // console.log(res);
    pexelsData.value = res
}
onMounted(() => {
    getPexlesData()
})

/**
 *  PC端下 的关闭
 */
const onPop = () => {
    router.back()
}


</script>

<style lang="scss" scoped></style>