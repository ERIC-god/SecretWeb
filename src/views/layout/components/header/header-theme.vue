<template>
    <div>
        <m-popover placement="bottom-left">
            <!-- 具名插槽：触发弹层的视图 -->
            <template #reference>
                <m-svg-icon :name="svgIconName" class="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200
                outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900" fillClass="fill-zinc-900 dark:fill-zinc-300">
                </m-svg-icon>
            </template>
            <!-- 匿名插槽：弹出层视图中展示的内容 -->
            <div class="w-[140px] overflow-hidden ">
                <div class="flex hover:bg-zinc-100/60 p-1 dark:hover:bg-zinc-800 cursor-pointer rounded items-center"
                    v-for="item in themeArr" :key="item.id" @click="onItemClick(item)">
                    <m-svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1"
                        fillClass="fill-zinc-900 dark:fill-zinc-300"></m-svg-icon>
                    <span class="text-zinc-900 text-xm dark:text-zinc-300">{{ item.name }}</span>
                </div>
            </div>
        </m-popover>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from '../../../../constants';
import { useThemeStore } from '../../../../store';
const themeArr = [
    {
        id: '0',
        type: THEME_LIGHT,
        icon: 'theme-light',
        name: '极简白'
    },
    {
        id: '1',
        type: THEME_DARK,
        icon: 'theme-dark',
        name: "极夜黑"
    },
    {
        id: '2',
        type: THEME_SYSTEM,
        icon: 'theme-system',
        name: '跟随系统'
    }
]

/**
 *   初始化 useThemeStore
 *   初始化 展示的icon
 */
const themeStore = useThemeStore()
const svgIconName = ref(themeStore.themeType)

/**
 *  menu 切换事件
 */
const onItemClick = (themeItem) => {
    themeStore.ChangeThemeType(themeItem)
    svgIconName.value = themeStore.themeType
}

</script>

<style lang="scss" scoped></style>