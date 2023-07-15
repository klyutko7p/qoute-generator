<script setup lang="ts">
import { useQuotesStore } from '../store/quotes'

const storeQuotes = useQuotesStore()

let copyCategories = ref<Array<string>>([])
let query = ref("")
let isLoading = ref(true)
let isHide = ref(true)
let quotes = ref<Array<Quote>>([])

function searchCategories() {
    storeQuotes.searchCategories(query.value)
    copyCategories.value = storeQuotes.getCategories
    isHide.value = false
}

async function getQuotes(category: string) {
    isLoading.value = true
    await storeQuotes.searchQuotes(category)
    query.value = ""
    copyCategories.value = storeQuotes.getOriginalCategories
    isLoading.value = false
    isHide.value = true
    quotes.value = storeQuotes.getQuotes
}


onMounted(() => {
    copyCategories.value = storeQuotes.getOriginalCategories
    isLoading.value = false
    isHide.value = false
})

</script>

<template>
    <Head>
        <Title>
            Generation Quotes
        </Title>
    </Head>
    <div v-cloak style="background-image: url('../asset\s/imgs/bg-1.svg');" v-if="!isLoading"
        class="bg-contain h-full min-h-[800px] z-10 bg-no-repeat bg-center">
        <div class="container mx-auto flex items-center flex-col space-y-5">
            <h1 class="text-center text-6xl">Quote Generator</h1>
            <div>
                <div class="flex items-center justify-center mb-10 mt-3">
                    <input type="text" @input="searchCategories()" v-model="query" placeholder="Write category"
                        class="min-w-[500px] max-sm:min-w-[300px] border-2 font-bold text-xl px-5 py-3 border-white bg-transparent rounded-full">
                </div>
                <div class="flex items-center justify-center gap-5 mb-7">
                    <h1 class="text-4xl">Categories</h1>
                    <Icon @click="isHide = !isHide" class="cursor-pointer" name="ic:outline-keyboard-arrow-down"
                        size="35px" />
                </div>
                <div v-if="!isHide" class="flex items-center justify-center flex-wrap gap-3 mb-10">
                    <div v-for="category in copyCategories" @click="getQuotes(category)"
                        class="border-white border-2 py-3 rounded-full text-lg text-center px-5 min-h-[30px] min-w-[100px] text-white cursor-pointer duration-200 hover:bg-white hover:text-black">
                        <h1 class="font-medium">{{ category }}</h1>
                    </div>
                </div>
                <QouteList :quotes="quotes" />
            </div>
        </div>
    </div>
    <div v-else class="h-screen  flex items-center justify-center">
        <UISpinner />
    </div>
</template>../store/quotes