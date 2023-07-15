import { defineStore } from "pinia";

export const useQuotesStore = defineStore("quotes", () => {
  const urlLink = "https://api.api-ninjas.com/v1/quotes?category=";
  const API_KEY = "BniWO5nRE7gOES9UELmMRA==wyciHAVvyRMPa0WA";

  const categories = ref<Array<string>>([
    "age",
    "alone",
    "amazing",
    "anger",
    "architecture",
    "art",
    "attitude",
    "beauty",
    "best",
    "birthday",
    "business",
    "car",
    "change",
    "communications",
    "computers",
    "cool",
    "courage",
    "dad",
    "dating",
    "death",
    "design",
    "dreams",
    "education",
    "environmental",
    "equality",
    "experience",
    "failure",
    "faith",
    "family",
    "famous",
    "fear",
    "fitness",
    "food",
    "forgiveness",
    "freedom",
    "friendship",
    "funny",
    "future",
    "god",
    "good",
    "government",
    "graduation",
    "great",
    "happiness",
    "health",
    "history",
    "humor",
    "imagination",
    "inspirational",
    "intelligence",
    "jealousy",
    "knowledge",
    "leadership",
    "learning",
    "legal",
    "life",
    "love",
    "marriage",
    "medical",
    "men",
    "mom",
    "money",
    "morning",
    "movies",
    "success",
  ]);
  let copyCategories = ref<Array<string>>([]);
  let quotes = ref();

  function searchCategories(query: string): void {
    if (query !== "") {
      copyCategories.value = categories.value.filter((category) =>
        category.toLowerCase().includes(query)
      );
    } else {
      copyCategories.value = categories.value;
    }
  }

  async function searchQuotes(category: string) {
    let { data: quotesData } = await useFetch(
      urlLink + category + "&limit=10",
      {
        headers: { "X-Api-Key": API_KEY },
      }
    );
    quotes.value = quotesData.value;
  }

  const getCategories = computed(() => copyCategories.value);
  const getOriginalCategories = computed(() => categories.value);
  const getQuotes = computed(() => quotes.value);

  return {
    getCategories,
    getOriginalCategories,
    getQuotes,
    searchCategories,
    searchQuotes,
  };
});
