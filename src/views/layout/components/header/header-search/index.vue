<template>
    <div class="w-full">
        <m-search v-model="inputValue" @search="onSearchHandler">
            <template #dropdown>
                <div>
                    <!-- 搜索提示 -->
                    <hint-vue :searchText="inputValue" v-if="inputValue" @itemClick="onSearchHandler"></hint-vue>
                    <history-Vue v-show="!inputValue" v-model="inputValue"></history-Vue>
                </div>
            </template>
        </m-search>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import hintVue from './hint.vue';
import historyVue from './history.vue';

/**
 *  初始化 useSearchStore
 */
import { useSearchStore } from '@/store/modules/search';
const searchStore = useSearchStore()

// 输入的value
const inputValue = ref('')


/**
 *  执行 @seacrch的回调
 */
const onSearchHandler = (value) => {
    inputValue.value = value
    searchStore.itemSearch(value)
}

</script>

<style lang="scss" scoped></style>