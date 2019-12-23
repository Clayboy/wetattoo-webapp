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

                firstname : '',
                lastname : '',
                tattooed : false,
                email : '',
                phone : '',
            }),
            zones : [],
        }
    },

    methods : {

        close(){
            this.$emit('close');
        }
    }
}