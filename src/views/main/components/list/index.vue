<template>
    <div>
        <m-infinite v-model="loading" :isFinished="isFinished" @onload="getPexlesData">
            <m-waterfall :class="{ 'px-1': isMobileTerminal }" :data="pexelsList" nodeKey="id"
                :column="isMobileTerminal ? 2 : 4" :picturePreloading="false">
                <template #waterfall="{ item, width }">
                    <item-vue :data="item" :width="width" @click="onToPins"></item-vue>
                </template>
            </m-waterfall>
        </m-infinite>
        <!-- 详情内容展示 -->
        <transition :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
            <pins-vue v-if="isVisiblePins" :id="currentPins.id"></pins-vue>
        </transition>

    </div>
</template>

<script setup>
import { getPexlesList } from '@/api/pexels';
import { ref, watch } from 'vue';
import itemVue from './item.vue';
import { isMobileTerminal } from '@/utils/flexible';
import pinsVue from '../../../pins/components/pins.vue';
import gsap from 'gsap'
import { useEventListener } from '@vueuse/core';
import { useCategoryStore } from '@/store/modules/category';

// 初始化useCategoryStore
const categoryStore = useCategoryStore()

/**
 *  构建数据请求
 */
let query = {
    page: 1,
    size: 20
}

/**
 *  与m-infinite组件的交互
 */
const loading = ref(false)
const isFinished = ref(false)


/**
 *  请求数据
 */
const pexelsList = ref([])
const getPexlesData = async () => {
    if (isFinished.value) {
        return
    }
    const res = await getPexlesList(categoryStore.currentCategoryQuery)
    categoryStore.currentCategoryQuery.page += 1
    pexelsList.value.push(...res.list)
    categoryStore.listData = pexelsList.value

    if (pexelsList.value.length === res.total) {
        isFinished.value = true
    }
    loading.value = false
}

watch(() => categoryStore.currentCategoryQuery.categoryId, () => {
    // 当 监听到 categoryId 切换时候，把listData数据清空
    categoryStore.listData = []
    pexelsList.value = []
    // 把 请求页 变回1
    categoryStore.currentCategoryQuery.page = 1
    getPexlesData()
}, { deep: true })


// 控制pins 展示
const isVisiblePins = ref(false)
// 当前选中的pins 属性
const currentPins = ref({})

/** 
 *  进入pins
 */
const onToPins = (item) => {
    console.log(item.location);
    // 只修改浏览器的url , 不可以使用 router.push()
    history.pushState(null, null, `/pins/${item.id}`)
    // router.push(`/pins/${item.id}`)
    // 使用 router.push 会导致页面抖动
    isVisiblePins.value = true
    currentPins.value = item

}

/**
 * 监听浏览器后退按钮事件
 */
useEventListener(window, 'popstate', () => {
    isVisiblePins.value = false
})

// 当 isVisiblePins 变为 true 时：
// 1. 首先触发 beforeEnter

const beforeEnter = (el) => {
    gsap.set(el, {
        // 初始缩放为0（完全缩小）  
        scale: 0,
        // 变换的原点（从哪里开始缩放）
        transformOrigin: `${currentPins.value.location?.translateX}px ${currentPins.value.location?.translateY}px`, // 设置变换的原点为点击位置
        opacity: 0,
    })

}

// 2. 然后触发 enter
const enter = (el, done) => {
    gsap.to(el, {
        duration: 0.3,
        scale: 1,
        opacity: 1,
        onComplete: () => {
            done()
        }
    })
}

// 当 isVisiblePins 变为 false 时：
// 3. 触发 leave
const leave = (el, done) => {
    gsap.to(el, {
        duration: 0.3,
        scale: 0,  // 缩小到消失
        opacity: 0,
        onComplete: () => {
            done()
        }
    })
}



</script>

<style lang="scss" scoped></style>