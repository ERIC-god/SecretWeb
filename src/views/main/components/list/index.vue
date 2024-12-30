<template>
    <div>
        <m-infinite v-model="loading" :isFinished="isFinished" @onload="getPexlesData">
            <m-waterfall :class="{ 'px-1': isMobileTerminal }" :data="pexelsList" nodeKey="id"
                :column="isMobileTerminal ? '2' : '5'" :picturePreloading="false">
                <template #waterfall="{ item, width }">
                    <item-vue :data="item" :width="width"></item-vue>
                </template>
            </m-waterfall>
        </m-infinite>
    </div>
</template>

<script setup>
import { getPexlesList } from '@/api/pexels';
import { ref } from 'vue';
import itemVue from './item.vue';
import { isMobileTerminal } from '@/utils/flexible';

/**
 *  构建数据请求
 */
let query = {
    page: 1,
    size: 10
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

    const res = await getPexlesList(query)
    query.page += 1
    pexelsList.value.push(...res.list)


    if (pexelsList.value.length === res.total) {
        isFinished.value = true
    }
    loading.value = false
}






</script>

<style lang="scss" scoped></style>