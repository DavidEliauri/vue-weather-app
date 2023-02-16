<template>
    <main>
        <div class="container md:max-w-screen-md">
            <input
                type="text"
                v-model="searchQuery"
                @input="sendQuery"
                placeholder="Найти город"
                class="w-full h-14 px-2 border border-gray-300 rounded-md"
            />

            <div
                class="mt-10 bg-white overflow-hidden shadow-md rounded-xl"
                v-if="showSuggestions"
            >
                <p
                    class="py-3 px-4 font-medium text-lg"
                    v-if="!suggestions.length"
                >
                    К сожалению, ничего не найдено 😞
                </p>

                <ul
                    v-else
                    class="divide-y"
                >
                    <li
                        v-for="suggestion in suggestions"
                        :key="suggestion"
                        @click="onSuggestionClick(suggestion)"
                        class="py-3 px-4 cursor-pointer transition-colors duration-100 hover:bg-indigo-100 active:transition-none active:bg-indigo-200"
                    >
                        <span v-html="suggestion.printAddress"></span>
                    </li>
                </ul>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";
import debounce from "debounce";

const searchQuery = ref("");
const suggestions = ref(null);

const showSuggestions = computed(() => {
    if (suggestions.value !== null) {
        return true;
    }

    return false;
});

/**
 * @param {String} suggestion
 */
function onSuggestionClick(suggestion) {
    console.log(suggestion);
}

const sendQuery = debounce(async () => {
    if (!searchQuery.value) {
        suggestions.value = null;
        return;
    }

    const rawSuggestions = await getTowns(searchQuery.value);

    suggestions.value = Array.from(rawSuggestions, (suggestion) => {
        const rawAddress = suggestion.value;
        const arrInsert = [];

        searchQuery.value.split(" ").forEach((word) => {
            let iterableValue = rawAddress;
            let prepend = 0;
            recursive();

            function recursive() {
                let startPos = iterableValue
                    .toLowerCase()
                    .indexOf(word.toLowerCase());

                if (startPos === -1) {
                    return;
                }

                startPos += prepend;

                for (let i = 0; i < arrInsert.length; i++) {
                    const positions = arrInsert[i];
                    if (positions.start !== startPos) continue;
                    iterableValue = iterableValue.slice(
                        positions.end,
                        iterableValue.length
                    );
                    prepend = positions.end;
                    recursive();
                    return;
                }

                const endPos = startPos + word.length;

                arrInsert.push({
                    start: startPos,
                    end: endPos,
                });
            }
        });

        if (!arrInsert.length) {
            return {
                printAddress: rawAddress,
                address: address,
                data: suggestion.data,
            };
        }

        let address = rawAddress.slice(0, arrInsert[0].start);

        arrInsert.forEach((positions, index) => {
            address +=
                "<b>" +
                rawAddress.slice(positions.start, positions.end) +
                "</b>";
            if (index + 1 in arrInsert) {
                address += rawAddress.slice(
                    positions.end,
                    arrInsert[index + 1].start
                );
            } else {
                address += rawAddress.slice(positions.end, rawAddress.length);
            }
        });

        return {
            printAddress: address,
            address: rawAddress,
            data: suggestion.data,
        };
    });
}, 500);

/**
 * @param {String} query Текст запроса
 * @returns {Promise<[Object]>} Массив предложений
 */
async function getTowns(query) {
    const token = "f52220b7342bf11febc40beb082eb2a4ffccf488";

    return await axios
        .post(
            "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
            {
                query: query,
                from_bound: { value: "city" },
                to_bound: { value: "city" },
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    Authorization: "Token " + token,
                },
            }
        )
        .then((response) => {
            return response["data"]["suggestions"];
        })
        .catch((error) => {
            throw new Error(error);
        });
}
</script>
