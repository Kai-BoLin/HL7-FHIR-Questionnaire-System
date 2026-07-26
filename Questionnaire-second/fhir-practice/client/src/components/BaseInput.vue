<script setup> 
import { defineProps,defineEmits } from 'vue';      //defineProps 接收父組件 defineEmits傳送子組件

const props = defineProps ({
    label : String,
    type : String,
    modelValue : [String , Number , Boolean],
    options : {
        type : Array,
        default : () => []
    }
});

const emit = defineEmits (['update:modelValue']);
</script>

<template>
    <div>
        <label> {{ props.label }}</label>
        <select v-if = "props.type === 'Boolean'"
        :value = "props.modelValue"
        @change = "emit('update:modelValue' , $event.target.value)">

        <option :value="null">請選擇選項</option>
        <option value="true">是</option>
        <option value="false">否</option>

        </select>

        <select v-else-if="props.type === 'choice'"
            :value = "props.modelValue"
            @change = "emit('update:modelValue' , $event.target.value)">

            <option value="">請選擇選項</option>
            <option v-for="(option , index) in props.options"
                :key="option.valueCoding?.code || index "
                :value = "option.valueCoding?.code">
                {{ option.valueCoding?.display }}
            </option>
        </select>

        <input v-else :type ="props.type" :value="props.modelValue" @input="emit('update:modelValue' , $event.target.value)">
    </div>
</template>

<style scoped>

</style>