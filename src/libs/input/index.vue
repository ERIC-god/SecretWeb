<template>
    <!-- 单行 input-->
    <div v-if="props.inputType === 'row'" class="h-3 w-48 text-xm relative ">
        <input :value="modelValue" @input="onInputHandler" type="text" :maxlength="max"
            class="h-full w-full outline-none place-items-end placeholder:text-right">
        <!-- 字数限制 -->
        <span class="absolute right-0 top-[6px]" :class="{ 'text-red-600': modelValue.length >= props.max }">{{
            modelValue.length
        }}/20</span>
    </div>
    <!-- 多行 textarea -->
    <div v-else class="text-xm h-8 w-48 relative">
        <textarea :value="modelValue" @input="onInputHandler" name="" id="" :maxlength="max"
            class="h-full w-full outline-none"></textarea>
        <!-- 字数限制 -->
        <span class="absolute right-0 bottom-0 " :class="{ 'text-red-600': modelValue.length >= max }">{{
            modelValue.length
        }}/20</span>
    </div>
</template>

<script setup>

import { ref } from 'vue';
const props = defineProps({
    // 双向数据绑定
    modelValue: {
        type: String,
        required: true
    },
    // 需要的 input框 类型
    inputType: {
        type: String,
        default: 'row',
        validator(val) {
            if (val !== 'row' && val !== 'rows') {
                throw new Error('inputType必须是row或rows中的一种')
            } else {
                return true
            }
        }
    },
    // 最大可输入字符
    max: {
        type: Number,
        default: 20
    }

})

const emits = defineEmits(['update:modelValue'])

/**
 *  input 输入时候触发
 */
const onInputHandler = (e) => {
    emits('update:modelValue', e.target.value)
}

</script>

<style lang="scss" scoped></style>