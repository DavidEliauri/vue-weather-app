<template>
    <Teleport to="body">
        <Transition
            name="modal"
            @after-enter="toggleScroll"
            @after-leave="toggleScroll"
        >
            <div
                @click.self="close"
                v-if="props.show"
                class="modal fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm flex justify-center items-start p-4"
            >
                <div
                    class="modal__container max-w-screen-md bg-white px-4 rounded-lg sm:rounded-xl max-h-full overflow-x-hidden overflow-y-auto relative"
                >
                    <div
                        class="flex justify-between sticky right-0 top-0 pt-7 pb-4 mb-4 bg-white"
                    >
                        <span class="text-xl font-medium truncate">{{
                            props.title
                        }}</span>
                        <div class="ml-6 flex-none">
                            <BaseIcon
                                class="fa-solid fa-circle-xmark"
                                @click="close"
                            />
                        </div>
                    </div>
                    <div>
                        <slot />
                    </div>
                    <div class="bg-white sticky bottom-0 left-0 pt-4 pb-7">
                        <button>Закрыть</button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup>
import BaseIcon from "./BaseIcon.vue";

const emit = defineEmits(["close"]);

const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    show: {
        type: Boolean,
        default: false,
    },
});

function close() {
    emit("close");
}

function toggleScroll() {
    document.body.classList.toggle("overflow-hidden");
}
</script>

<style>
.modal-enter-active {
    transition: opacity 0.2s ease;
}

.modal-leave-active {
    transition: opacity 0.15s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .modal__container {
    transition: transform 0.2s ease;
}

.modal-leave-active .modal__container {
    transition: transform 0.15s ease;
}

.modal-enter-from .modal__container,
.modal-leave-to .modal__container {
    transform: scale(1.05);
}
</style>
