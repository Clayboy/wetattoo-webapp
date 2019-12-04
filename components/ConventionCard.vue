<template>
    <div class="block h-full flex flex-col bg-white shadow p-2 mb-2 hover:bg-gray-300">
                <div class="flex items-start justify-center mb-2">
                    <div class="text-center">
                        <div class="uppercase text-xs font-medium text-gray-500">{{ formatDate(conv.start_date, 'ddd') }}</div>
                        <div class="text-2xl font-medium leading-none">{{ formatDate(conv.start_date, 'DD') }}</div>
                    </div>
                    <div class="mx-2 mb-1">
                        <font-awesome-icon class="text-gray-500 fa-sm" :icon="['fas', 'arrow-right']"></font-awesome-icon>
                    </div>
                    <div class="text-center">
                        <div class="uppercase text-xs font-medium text-gray-500">{{ formatDate(conv.end_date, 'ddd') }}</div>
                        <div class="text-2xl font-medium leading-none">{{ formatDate(conv.end_date, 'DD') }}</div>
                    </div>
                </div>

            <div class="w-full overflow-hidden flex-grow relative overflow-hidden">
                <div class="w-full border-gray-300 border bg-gray-800">
                    <img :src="conv.image_url" class="w-full h-full top-0 object-contain" alt="">
                </div>
            </div>
            <h3 class="mt-2 text-base sm:text-lg leading-tight">
                {{ conv.name }}
            </h3>
            <div class="mt-2 text-xs leading-none text-gray-600">
                <font-awesome-icon :icon="['fal', 'map-marker-alt']" class="mr-1"></font-awesome-icon>{{ conv.city }}, {{ conv.country }}
            </div>
    </div>
</template>

<script>

    import moment from 'moment';

    export default {
        props : {
            conv : {
                type: Object,
            }
        },

        methods : {
            formatDate: (date, format) => moment(date).format(format),
            snippet: (tosnip) => tosnip.substr(tosnip, 0, 100),
        }
    }
</script>
