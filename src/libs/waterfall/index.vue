<template>
    <div class="relative" ref='containerTarget' :style="{
        height: containerHeight + 'px'
    }">
        <!-- 数据渲染 -->
        <template v-if="columnWidth && data.length">
            <div v-for="(item, index) in data" :key="nodeKey ? item[nodeKey] : index"
                class="m-waterfall-item absolute duration-300" :style="{
                    width: columnWidth + 'px',
                    left: item._style?.left + 'px',
                    top: item._style?.top + 'px'
                }">
                <slot :item="item" :width="columnWidth" :index="index"></slot>
            </div>
        </template>
        <!-- 加载中 -->
        <div v-else>加载中</div>
    </div>
</template>

<script setup>

import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { getImgElements, getAllImg, onCompleteImgs, getMinHeight, getMaxHeight, getMinHeightColumn } from './utils';
const props = defineProps({
    // 数据源
    data: {
        type: Array,
        Required: true
    },
    // 唯一标识key
    nodeKey: {
        type: String
    },
    // 列数
    column: {
        default: 2,
        type: Number
    },
    // 列间距
    columnSpacing: {
        default: 20,
        type: Number
    },
    // 行间距
    rowSpacing: {
        default: 20,
        type: Number
    },
    // 是否需要图片预读取
    picturePreloading: {
        type: Boolean,
        default: false,
    },
})

// 总高度 = 最高一列的高度
const containerHeight = ref(0)
// 记录每列高度的容器
const columnHeightObj = ref({})
/**
 *  构建记录每列高度的对象
 */
const useColumnHeightObj = () => {
    // 为每列创建一个高度记录，初始值为0
    for (let i = 0; i < props.column; i++) {
        columnHeightObj.value[i] = 0
    }
    console.log(columnHeightObj);

}

// 容器实例
const containerTarget = ref(null)
// 容器总宽度 (不包含margin,padding,border)
const containerWidth = ref(0)
// 容器的左边距，计算 item 的 left
const containerLeft = ref(0)

/**
 *  计算容器宽度
 */
const useContainerwidth = () => {
    const style = getComputedStyle(containerTarget.value, null)
    const { paddingLeft, paddingRight } = style
    // 容器的 左边距
    containerLeft.value = parseFloat(paddingLeft)
    // 容器的 宽度
    containerWidth.value = containerTarget.value.offsetWidth - parseFloat(paddingLeft) - parseFloat(paddingRight)
}

// 列宽
const columnWidth = ref(0)
// 列间距的合计
const columnSpacingTotal = computed(() => {
    return (props.column - 1) * props.columnSpacing
})

/**
 *  计算列宽
 */
const useColumnWidth = () => {
    useContainerwidth()
    // 列宽 = (容器宽度 - 所有列间距) / 列数
    return columnWidth.value = (containerWidth.value - columnSpacingTotal.value) / props.column
}

onMounted(() => {
    // 计算列宽
    useColumnWidth()
})

// item 高度集合
let itemHeights = []
/**
 *  监听图片加载完成 (需要图片预加载)
 */
const waitImgComplete = () => {
    itemHeights = []
    // 拿到 所有的元素
    let itemElements = [...document.querySelectorAll('.m-waterfall-item')]
    // itemElements.forEach((item, index) => {
    //     const imgs = item.getElementsByTagName('img')
    //     console.log(`元素 ${index} 中的图片数量:`, imgs.length)
    //     if (imgs.length > 0) {
    //         console.log(`元素 ${index} 的图片源:`, imgs[0].src)
    //     }
    // })

    // 获取到元素的 img标签
    const imgElements = getImgElements(itemElements)
    // 获取 所有img标签 的图片
    const allImgs = getAllImg(imgElements)
    // 等待图片加载完成
    onCompleteImgs(allImgs).then(() => {

        itemElements.forEach(item => {
            itemHeights.push(item.offsetHeight)
        })
        useItemLocation()
    })
}

/**
 *   不需要图片预加载
 */
const useItemHeight = () => {
    // 拿到所有的元素 
    let itemElements = [...document.querySelectorAll('.m-waterfall-item')]
    // 计算 item 高度
    itemElements.forEach(item => {
        itemHeights.push(item.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
}

/**
 *  渲染位置
 */
const useItemLocation = () => {
    // 遍历数据源
    props.data.forEach((item, index) => {
        if (item._style) {
            return
        } else {
            // 生成style属性
            item._style = {}
            // left 
            item._style.left = getItemLeft()
            // top
            item._style.top = getItemTop()
            // 指定的列 进行高度的自增
            increasingHeight(index)
        }
    })

    //  指定容器的高度
    containerHeight.value = getMaxHeight(columnHeightObj.value)
}

/**
 *   在组件销毁的时候，清除所有的_style
 */
onUnmounted(() => {
    props.data.forEach(item => {
        delete item._style
    })
})


/**
 *  返回下一个 item 的 left
 */
const getItemLeft = () => {
    // 拿到最小高度的列 
    const column = getMinHeightColumn(columnHeightObj.value)
    return column * (columnWidth.value + props.columnSpacing) + containerLeft.value
}

/**
 *  返回下一个 item 的 top
 */
const getItemTop = () => {
    return getMinHeight(columnHeightObj.value)
}

/**
 *  指定 列高度 自增
 */
const increasingHeight = (index) => {
    const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
    // 使该列 自增
    columnHeightObj.value[minHeightColumn] += (itemHeights[index] + props.rowSpacing)
}




/**
 *  触发计算
 */
watch(() => props.data, (newVal) => {
    nextTick(() => {
        // 第一次获取数据时候，构建高度记录容器
        const resetColumnHeight = newVal.every(item => !item._style)
        if (resetColumnHeight) {
            // 构建高度记录容器
            useColumnHeightObj()
        }
        if (props.picturePreloading) {
            waitImgComplete()
        } else {
            useItemHeight()
        }
    })
}, { deep: true, immediate: true })


/**
 *  监听列数的变化
 */
watch(() => props.column, () => {

})


</script>

<style lang="scss" scoped></style>