<template>
    <div>
        <item-vue v-for="item in pexelsList" :key="item._id" :data="item"></item-vue>
    </div>
</template>

<script setup>
import { getPexlesList } from '@/api/pexels';
import { ref } from 'vue';
import itemVue from './item.vue';

/**
 *  构建数据请求
 */
let query = {
    page: 1,
    size: 20
}

/**
 *  请求数据
 */
const pexelsList = ref([])
const getPexlesData = async () => {
    const res = await getPexlesList(query)
    pexelsList.value = res.list
}
getPexlesData()

</script>

<style lang="scss" scoped></style>