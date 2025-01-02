<template>
    <div>
        <div class="flex items-center text-xm mb-1 text-zinc-400">
            <span>最近搜素</span>
            <m-svg-icon name="delete" class="w-2.5 h-2.5 ml-1 p-0.5 cursor-pointer duration-300 
            rounded-sm hover:bg-zinc-100" fillClass="fill-zinc-400" @click="onDeleteAllClick"></m-svg-icon>
        </div>
        <div class="flex flex-wrap">
            <div class="mr-2 mb-1.5 flex items-center cursor-pointer bg-zinc-100 px-1.5 py-0.5 text-zinc-900 
            text-xm font-bold rounded-sm duration-300 hover:bg-zinc-200" @click="onHistoryClick(item, index)"
                v-for="(item, index) in searchList" :key="index">
                <span>{{ item }}</span>
                <m-svg-icon name="input-delete" class="w-2.5 h-2.5 p-0.5 ml-1 duration-300 rounded-sm hover:bg-zinc-100"
                    @click.stop="onDeleteClick(item, index)"></m-svg-icon>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSearchStore } from '@/store/modules/search';
import { onUpdated, ref } from 'vue';
import { confirm } from '@/libs';


// 双向绑定 v-model
const props = defineProps({
    modelValue: {
        type: String
    }
})
const emits = defineEmits(['update:modelValue'])

// 初始化 useSearchStore searchLsit
const searchStore = useSearchStore()
const searchList = ref([])
searchList.value = searchStore.searchList
/**
 *  删除全部
 */
const onDeleteAllClick = () => {
    confirm('标题', '你要删除所有记录吗', 'No!!', 'Yes!!')
        .then(() => {
            searchStore.allItemDelete()
        })
        .catch(() => {
            console.log('点击了No!!');
        })
    searchList.value = searchStore.searchList
}

/**
 *  删除单个
 */
const onDeleteClick = (item, index) => {
    searchStore.itemDelete(item, index)
    searchList.value = searchStore.searchList
    emits()
}

/**
 *  触发历史记录点击
 */
const onHistoryClick = (item, index) => {
    searchStore.itemClick(item, index)
    emits('update:modelValue', item)
    searchList.value = searchStore.searchList
}

onUpdated(() => {
    searchList.value = searchStore.searchList
})

</script>

<style lang="scss" scoped></style>