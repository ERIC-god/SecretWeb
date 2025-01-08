<template>
    <div class="w-full">
        <m-search v-model="inputValue" @search="onSearchHandler">
            <template #dropdown>
                <div>
                    <!-- 搜索提示 -->
                    <hint-vue :searchText="inputValue" v-if="inputValue" @itemClick="onSearchHandler"></hint-vue>
                    <!-- 搜索历史 -->
                    <history-vue v-show="!inputValue" v-model="inputValue"></history-vue>
                    <!-- 主题推荐 -->
                    <theme-vue></theme-vue>
                </div>
            </template>
        </m-search>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import hintVue from './hint.vue';
import historyVue from './history.vue';
import themeVue from './theme.vue';
import { useSearchStore } from '@/store/modules/search';
import { useCategoryStore } from '@/store/modules/category';


/**
 *  初始化 useCategoryStore
 */

const categoryStore = useCategoryStore()

/**
 *  初始化 useSearchStore
 */

const searchStore = useSearchStore()

// 输入的value
const inputValue = ref('')


/**
 *  执行 @search的回调
 */
const onSearchHandler = (value) => {
    inputValue.value = value
    searchStore.itemSearch(value)
    categoryStore.toggleSearchText(value)
}


</script>

<style lang="scss" scoped></style>