<script setup lang="ts">

defineProps({
    quotes: { type: Array as PropType<Quote[]>, required: true }
})
</script>

<template>
    <div v-if="quotes.length > 0">
        <div class="flex items-center justify-center flex-col gap-5">
            <div v-for="quote in quotes" class="bg-[#9E95CA] py-5 px-5 rounded-lg shadow-2xl w-full">
                <blockquote class="text-xl text-center font-medium">
                    «{{ quote.quote }}»
                </blockquote>
                <h1 class="text-right font-bold">Author: {{ quote.author }}</h1>
            </div>
        </div>
    </div>
</template>


