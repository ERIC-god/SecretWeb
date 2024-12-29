<template>
    <div>
        <m-infinite v-model="loading" :isFinished="isFinished" @onload="getPexlesData">
            <m-waterfall :class="{ 'px-1': isMobileTerminal }" :data="pexelsList" nodeKey="id"
                :column="isMobileTerminal ? '2' : '5'" :picturePreloading="false">
                <template v-slot="{ item, width }">
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
import { isMobileTerminal } from '../../../../utils/flexible';

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
    const res = await getPexlesList(query)
    if (query.page === 1) {
        pexelsList.value = res.list
    } else {
        pexelsList.value.push(...res.list)
    }
    query.page += 1

    if (pexelsList.value.length === res.total) {
        isFinished.value = true
    }
    loading.value = false
}
getPexlesData()

</script>

<style lang="scss" scoped></style>