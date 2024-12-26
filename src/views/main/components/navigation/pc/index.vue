<template>
    <div class="bg-white sticky top-0 left-0 w-full z-10 flex justify-center">
        <ul class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px]
        py-1 text-xs text-zinc-600 duration-300 overflow-hidden" :class="[isOpen ? 'h-[206px]' : 'h-[56px]']">
            <!-- 展示箭头 -->
            <div class="absolute right-1 bottom-[10px] z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200"
                @click="triggerState">
                <m-svg-icon :name="isOpen ? 'unfold' : 'fold'" class="w-1 h-1" fillClass="fill-zinc-900"></m-svg-icon>
            </div>
            <!-- 列表 -->
            <li v-for="(item, index) in data" :key="item.id" @click="onItemClick(index)" class="shrink-0 px-1.5 py-0 z-10 duration-200 
            text-zinc-900 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200
            rounded mr-1 mb-1" :class="[{ 'text-zinc-900 bg-zinc-200': currentCategoryIndex === index }]">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const props = defineProps({
    data: {
        type: Object,
        Required: true
    }
})

/**
 *  状态切换处理
 */
const isOpen = ref(false)
const triggerState = () => {
    isOpen.value = !isOpen.value
}

/**
 *  选中状态处理
 */
const currentCategoryIndex = ref(0)
const onItemClick = (index) => {
    currentCategoryIndex.value = index
}

</script>

<style lang="scss" scoped></style>