<template>
    <select class="input" v-model="model" @change="change">
        <option v-for="timezone in timezones"
            :key="timezone.nameValue"
            :value="timezone.nameValue">
                {{ timezone.name }}
        </option>
    </select>
</template>

<script>

    import moment from 'moment-timezone';

    export default {
        props:{
            value : {
                type : String,
            }
        },
        data(){
            return {
                model : this.value,
                timezones : []
            }
        },

        mounted(){
            this.timezones = moment.tz.names()
                .filter(zone => zone.split('/').length > 1 && zone.split('/')[0] != 'Etc' && zone.split('/')[0] != 'US')
                .map((zone) => {
                    return this.setObjectZone(zone);
                })
                .sort((a, b) => {
                    let date = moment();

                    let aoffset = moment.tz.zone(a.nameValue).utcOffset(date.unix());
                    let boffset = moment.tz.zone(b.nameValue).utcOffset(date.unix());

                    if(aoffset < boffset){
                        return 1;
                    }else if(aoffset > boffset){
                        return -1;
                    }

                    return 0;
                })
        },

        methods:{
            change(evt){
                this.$emit('input', evt.target.value);
            },

            setObjectZone(zone){
                const utc = moment.tz(zone).format('Z');
                const abbr = moment.tz(zone).zoneAbbr();

                return {
                    name: `[${utc}] ${zone}`,
                    nameValue: zone,
                    timeValue: utc,
                    group: zone.split('/', 1)[0],
                    abbr: abbr,
                };
            }
        }
    }
</script>
