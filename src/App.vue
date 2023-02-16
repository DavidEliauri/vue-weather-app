<template>
    <div
        class="bg-slate-100 font-Inter flex flex-col min-h-screen min-w-[320px]"
    >
        <SiteNavigation />

        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>
