<template>
    <div v-for="output in store.history" class="flex flex-col">
        <div class="flex flex-row gap-2">
            <h1 class="antialiased font-ubuntu font-semibold text-green-400">
                <span>guest@typhooon</span>
                <span class="text-white">:</span>
                <span class="text-blue-500">~</span>
                <span class="text-white">$</span>
            </h1>
            <p class="font-ubuntu font-medium text-white">{{ output.stdin }}</p>
        </div>
        <div>
            <p class="whitespace-pre leading-5 text-white font-medium font-ubuntu">
                {{ output.stdout }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

const store = useHistory()


</script>