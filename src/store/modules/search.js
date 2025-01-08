import { defineStore } from 'pinia'
// import { getPexlesList } from "@/api/pexels";
import { ref } from 'vue'

export const useSearchStore = defineStore(
  'search',
  () => {
    const searchList = ref([])
    /**
     * 触发点击事件
     */
    const itemClick = (item, index) => {
      if (!searchList.value.includes(item)) {
        searchList.value.push(item)
      } else {
        searchList.value.splice(index, 1)
        searchList.value.unshift(item)
      }
    }
    /**
     *  删除一个item
     */
    const itemDelete = (item, index) => {
      searchList.value.splice(index, 1)
    }
    /**
     *  删除所有的item
     */
    const allItemDelete = () => {
      searchList.value = []
    }

    /**
     *  触发搜索事件
     */
    const itemSearch = async (item) => {
      searchList.value = searchList.value.filter((listItem) => {
        return listItem !== item
      })
      searchList.value.unshift(item)
    }
    return {
      searchList,
      itemClick,
      itemDelete,
      allItemDelete,
      itemSearch,
    }
  },
  { persist: true }
)
