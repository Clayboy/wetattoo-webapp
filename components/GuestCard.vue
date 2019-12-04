<template>
    <div class="flex px-4 py-3">
        <div class="flex-shrink-0 mr-6">
            <div class="flex items-end justify-center">
                <div class="text-center">
                    <div class="uppercase text-xs font-medium text-gray-500">{{ formatDate(guest.start_date, 'ddd') }}</div>
                    <div class="text-2xl font-medium leading-none">{{ formatDate(guest.start_date, 'DD') }}</div>
                </div>
                <div class="mx-2 mb-1">
                    <font-awesome-icon class="text-gray-500 fa-sm" :icon="['fas', 'arrow-right']"></font-awesome-icon>
                </div>
                <div class="text-center">
                    <div class="uppercase text-xs font-medium text-gray-500">{{ formatDate(guest.end_date, 'ddd') }}</div>
                    <div class="text-2xl font-medium leading-none">{{ formatDate(guest.end_date, 'DD') }}</div>
                </div>
            </div>
            <div class="uppercase text-xs font-medium text-gray-500">{{ formatDate(guest.end_date, 'MMMM YYYY') }}</div>
        </div>
        <div class="flex-grow">
            <h3 class="text-lg leading-none">
                {{ guest.parlor }}
            </h3>
            <div class="text-sm text-gray-500">
                <font-awesome-icon class="mr-1" :icon="['fal', 'map-marker-alt']"></font-awesome-icon>
                {{ guest.city }}, {{ guest.country }}
            </div>

            <div class="text-sm flex items-center" v-if="guest.bookable">
                <div class="w-3 h-3 bg-green-600 rounded-full overflow-hidden inline-block mr-1"></div>
                <p class="m-0">{{ $t('Créneaux disponibles')}}</p>
            </div>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>

    import moment from 'moment';

    export default {
        props:{
            guest : {
                type:Object
            }
        },

        methods:{
            formatDate: (date, format) => moment(date).format(format),
        }

    }
</script>
