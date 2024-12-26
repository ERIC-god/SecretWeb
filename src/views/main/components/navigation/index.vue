<template>
    <mobile-navigation-vue v-if="isMobileTerminal" :data="categorys" />
    <pc-navigation-vue v-else :data=categorys />
</template>

<script setup>
import { isMobileTerminal } from '@/utils/flexible';
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
import { getCategory } from '@/api/categoty';
import { ref, onMounted } from 'vue';
import { ALL_CATEGORY_DATA } from '@/constants';

const categorys = ref([])
const getCategoryData = async () => {
    const res = await getCategory()
    categorys.value = res.categorys
    categorys.value.unshift(ALL_CATEGORY_DATA)
}
onMounted(() => {
    getCategoryData()
})

</script>

<style lang="scss" scoped></style>