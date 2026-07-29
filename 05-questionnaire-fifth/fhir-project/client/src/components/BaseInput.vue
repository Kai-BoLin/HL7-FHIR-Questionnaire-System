<script setup>
import { defineProps , defineEmits } from 'vue';  //defineProps 接收父組件資料 defineEmits通知父組件更新資料

const props = defineProps ({
    label : String,                                             //規定外部資料傳進必須是字串String
    type : String,                                              //規定外部資料傳進必須是字串String
    modelValue : [String , Number , Boolean],                   //允許接收多種型態的資料（可以是字串、數字或布林值）。
    options : {                                                  //規定傳入的必須是陣列（Array）
        type : Array,
        default : () => []                                      //設定「預設值」
    }
});

const emit = defineEmits (['update:modelValue']);
</script>

<template>
    <div>
        <label> {{ props.label }} </label>

        <select v-if="props.type === 'boolean'"
            class="form-select"
            :value="props.modelValue"
            @change="emit('update:modelValue' , $event.target.value)">
            <option :value="null">請選擇</option>
            <option value="true">是</option>
            <option value="false">否</option>
        </select>

        <select v-else-if="props.type === 'choice'"
            class="form-select"
            :value="props.modelValue"
            @change="emit('update:modelValue' , $event.target.value)">
                <option :value="null">請選擇</option>
                <option v-for="(option,index) in props.options"
                    :key="option.valueCoding?.code || index"
                    :value="option.valueCoding?.code">
                    {{ option.valueCoding?.display }}
                </option>
        </select>

        <input v-else class="form-control" :type="props.type" :value="props.modelValue" @input="emit('update:modelValue' , $event.target.value)">
    </div>
</template>

<style scoped>

</style>