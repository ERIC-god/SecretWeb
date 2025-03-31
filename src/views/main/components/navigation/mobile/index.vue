<template>
    <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10">
        <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-zinc-600 text-xs overflow-y-hidden">
            <!-- 滑块 -->
            <li ref="sliderTarget" :style="sliderStyle"
                class="absolute h-[22px]  bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-300">
            </li>
            <!-- 汉堡按钮 -->
            <li @click="onShowPopup" class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900
                 z-20 shadow-l-white dark:shadow-l-zinc">
                <m-svg-icon name="hamburger" class="w-1.5 h-1.5 " />
            </li>
            <!-- items -->
            <li v-for="(item, index) in data" :key="item.id" :ref="setItemRef" @click="onItemClick(item, index)"
                class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4"
                :class="{ 'text-white': currentCategoryIndex === index }">
                {{ item.name }}
            </li>
        </ul>
        <m-popup v-model="isVisible">
            <menu-vue :categorys="data" @onClick="onItemClick"></menu-vue>
        </m-popup>
    </div>
    <!-- <div>
        {{ ulScrollLeft }}

    </div> -->

</template>

<script setup>
import { onBeforeUpdate, ref, watch } from 'vue';
import { useScroll } from '@vueuse/core';
import MenuVue from '@/views/main/components/menu/index.vue'
import { useCategoryStore } from '@/store/modules/category';

// 初始化useCategoryStore
const categoryStore = useCategoryStore()

defineProps({
    data: {
        type: Array,
        requeired: true
    }
})

const sliderStyle = ref({
    transform: 'tranlateX(0px)',
    width: '50px'
})

// 选中 Item 的下标
const currentCategoryIndex = ref(0)

// 获取所有的 item 元素
const itemRefs = ref([])
const setItemRef = (el) => {
    // console.log(el);
    if (el) {
        itemRefs.value.push(el)
    }
}

// 数据变化之后，DOM 变化之前
onBeforeUpdate(() => {
    itemRefs.value = []
})

// 获取 ul 元素
const ulTarget = ref(null)
// 通过VueUse --> useScroll 获取响应式的 scroll 滚动距离
const { x: ulScrollLeft } = useScroll(ulTarget)



// watch 监听
watch(currentCategoryIndex, (val) => {
    const { width, left } = itemRefs.value[val].getBoundingClientRect()
    sliderStyle.value = {
        // 滑块的位置 = ul 横向的位置 + 当前元素的 left - ul 的 padding
        transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
        width: width + 'px'
    }
    console.log(itemRefs.value);

})

// item 点击事件
const onItemClick = (item, index) => {
    currentCategoryIndex.value = index
    isVisible.value = false
    categoryStore.toggleCategoryId(item.id)
}

//控制popup展示
const isVisible = ref(false)
const onShowPopup = () => {
    isVisible.value = true
}

</script>
