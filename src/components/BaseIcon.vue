<script setup>
const props = defineProps({
    class: {
        type: String,
        required: true,
    },
});

const emit = defineEmits(["click"]);
</script>

<template>
    <i
        :class="{
            [props.class]: true,
            'text-xl transition-colors cursor-pointer hover:text-indigo-300': true,
        }"
        @click="emit('click')"
    ></i>
</template>
