<template>
    <div class="font-Inter flex flex-col min-h-screen">
        <SiteNavigation />

        <RouterView />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>
