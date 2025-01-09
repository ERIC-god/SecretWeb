<template>
    <div class="py-2 h-[70vh] flex flex-col">
        <h2 class="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">所有分类</h2>
        <ul class="overflow-y-scroll">
            <li v-for="(item, index) in categorys" :key="item.id" @click="emitClick(item, index)"
                class="text-lg text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duration-100 active:bg-zinc-100 dark:active:bg-zinc-900">
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
defineProps({
    categorys: {
        type: Array,
        Required: true
    }
})

const emits = defineEmits(['onClick'])

const emitClick = (item, index) => {
    emits('onClick', item, index)
}

</script>

<style lang="scss" scoped></style>