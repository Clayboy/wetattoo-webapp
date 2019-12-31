import RightPanel from '@/components/layout/RightPanel';
import Form from '@/utilities/Form'

export default {

    components : {
        RightPanel
    },
    props:{
        artistId : {
            type:Number,
            required:true,
        },
        artistPseudo : {
            type: String
        },
        flash : {
            type: Object,
            required:false,
            default(){
                return null
            }
        }
    },

    data(){
        return {
            bookingRequest : new Form({
                artist_id : this.artistId,
                gRecaptchaResponse : null,
                user_id : null,
                flash_id : null,
                zone : '',
                size_l : '',
                size_h : '',
                style : 'color',
                title : '',
                description : '',
                availabilities : '',
                budget : '',
                status : 'pending',
                firstname : '',
                lastname : '',
                tattooed : false,
                email : '',
                phone : '',
            }),
            zones : [],
        }
    },

    async mounted(){
        this.zones = await this.$store.dispatch('tattooZones')
    },
    created(){
        if(this.flash){
            this.bookingRequest.flash_id = this.flash.id;

            this.bookingRequest.size_l = this.flash.size_w;
            this.bookingRequest.size_h = this.flash.size_h;
            this.bookingRequest.budget = this.flash.price;
            this.bookingRequest.title = `Réservation flash : ${this.flash.ref}`;
        }
    },
    methods : {

        close(){
            this.$emit('close');
        }
    }
}