import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getPexlesList } from '@/api/pexels'

export const useCategoryStore = defineStore('category', () => {
  const listData = ref([])
  const currentCategoryQuery = ref({
    page: 1,
    size: 20,
    categoryId: '',
    searchText: '',
  })
  // navigation的category 被切换时候 调用此方法
  const toggleListData = (id) => {
    currentCategoryQuery.value.categoryId = id
    getPexlesList(currentCategoryQuery.value)
      .then((result) => {
        console.log(result.list)
        listData.value = result.list
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return {
    listData,
    currentCategoryQuery,
    toggleListData,
  }
})
