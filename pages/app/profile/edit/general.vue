<template>
<div>
    <form @submit.prevent="save" class="mb-8" v-if="profile">
        <h3 class="title-3 flex items-center">
            <div class="flex-grow">
                {{ $t("Profil") }}
            </div>


            <artist-publish-button :artist-id="profile.id"
                :value="published"
                class="btn btn-small text-sm btn-primary-outline"></artist-publish-button>

        </h3>
        <div class="mb-8">
            <div class="md:flex">
                <div class="field md:w-1/4 md:mr-3">
                <client-only placeholder="Loading...">
                    <avatar-upload></avatar-upload>
                </client-only>
                </div>
                <div class="md:w-3/4">
                    <div class="field mb-2" v-if="profile.hasField('pseudo')">
                        <label class="label mb-1 block" for="pseudo" v-text="$i18n.t('Pseudo')" />
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                :class="{'error' : profile.errors.has('pseudo')}"
                                name="pseudo"
                                v-model="profile.pseudo">
                            <div class="error-msg" v-if="profile.errors.has('pseudo')" v-text="profile.errors.get('pseudo')" />
                        </div>
                    </div>
                    <div class="field mb-2" v-if="profile.hasField('slug')">
                        <label class="label mb-1 block" for="pseudo">
                            {{ $t('Adresse profil') }}
                            <span class="text-sm text-gray-600 ml-2">({{ $t('lettres, chiffres sans espaces et accents (tirets)') }}</span>
                        </label>
                        <div class="control flex items-center">
                            <div class="border border-gray-400 bg-gray-100 text-gray-500 flex-shrink-0 p-2 text-sm border-r-0 rounded-l pr-0">
                                https://we-tattoo.com/artists/
                            </div>
                            <input
                                type="text"
                                class="bg-white border rounded border-gray-400 p-2 pl-0 w-full text-sm border-l-0 rounded-l-none"
                                :class="{'error' : profile.errors.has('slug')}"
                                name="slug"
                                v-model="profile.slug">
                        </div>
                        <div class="error-msg" v-if="profile.errors.has('slug')" v-text="profile.errors.get('slug')" />
                    </div>
                    <div class="field mb-2" v-if="profile.hasField('parlor')">
                        <label class="label mb-1 block" for="parlor" v-text="$i18n.t('Salon')" />
                        <div class="control">
                            <input
                                type="text"
                                class="input"
                                :class="{'error' : profile.errors.has('parlor')}"
                                name="parlor"
                                v-model="profile.parlor">
                            <div class="error-msg" v-if="profile.errors.has('parlor')" v-text="profile.errors.get('parlor')" />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <style-selector v-model="profile.preferred_styles" :label="$t('Vos style(s) de tatouage')" />
                <div class="error-msg" v-if="profile.errors.has('parlor')" v-text="profile.errors.get('parlor')" />
            </div>
            <div class="field mb-2" v-if="profile.hasField('bio')">
                <label class="label mb-1 block" for="bio" v-text="$i18n.t(`Bio`)" />
                <div class="control">
                    <textarea
                        class="input"
                        :class="{'error' : profile.errors.has('bio')}"
                        name="bio"
                        height="50"
                        placeholder="Décrivez-vous en quelques mots"
                        v-model="profile.bio"
                        ></textarea>
                    <div class="error-msg" v-if="profile.errors.has('bio')" v-text="profile.errors.get('bio')" />
                </div>
            </div>
        </div>
        <div v-if="usertype == 'artist'">
            <h3 class="title-3" v-text="$i18n.t(`Social`)"></h3>
            <div class="mb-6">
                <div class="field mb-2">
                    <label class="label mb-1 block" for="instagram">
                        Instagram
                    </label>
                    <div class="control">
                        <input
                            class="input"
                            :class="{'error' : profile.errors.has('instagram')}"
                            name="instagram"
                            placeholder="@votre_pseudo_instagram"
                            v-model="profile.instagram" />
                        <div class="error-msg" v-if="profile.errors.has('instagram')" v-text="profile.errors.get('instagram')" />
                    </div>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="facebook">
                        Facebook
                    </label>
                    <div class="control">
                        <input
                            class="input"
                            :class="{'error' : profile.errors.has('facebook')}"
                            name="facebook"
                            placeholder="https://facebook.com/votre.page.facebook"
                            v-model="profile.facebook" />
                        <div class="error-msg" v-if="profile.errors.has('facebook')" v-text="profile.errors.get('facebook')" />
                    </div>
                </div>
                <div class="field mb-2">
                    <label class="label mb-1 block" for="website" v-text="$i18n.t(`Site internet`)" />
                    <div class="control">
                        <input
                            class="input"
                            :class="{'error' : profile.errors.has('facebook')}"
                            name="website"
                            placeholder="https://votresiteinternet.com"
                            v-model="profile.website" />
                        <div class="error-msg" v-if="profile.errors.has('website')" v-text="profile.errors.get('website')" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center mt-6">
            <button class="button">
                {{ $t("Enregistrer") }}
            </button>
        </div>
    </form>

    <form @submit.prevent="saveAddress">
        <h3 class="title-3 flex items-center" v-if="address">
            {{ $t("Adresse") }}
        </h3>
        <address-form v-if="address" :prefill="address" v-model="address"></address-form>
        <div class="flex justify-center mt-6">
            <button class="button">
                {{ $t("Enregistrer") }}
            </button>
        </div>
    </form>
</div>
</template>


<script>

import ArtistPublishButton from '@/components/forms/ArtistPublishButton';
import AddressForm from '@/components/forms/AddressForm';
import {tattooStyles} from '@/utilities/TattooVars';
import { mapGetters, mapState } from 'vuex';

import StyleSelector from '@/components/forms/StyleSelector';
import _ from 'lodash'
import AvatarUpload from '@/components/forms/AvatarUpload';
import Form from '@/utilities/Form'

function slugify(str) {
    str = String(str).toString();
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    const swaps = {
        '0': ['°', '₀', '۰', '０'],
        '1': ['¹', '₁', '۱', '１'],
        '2': ['²', '₂', '۲', '２'],
        '3': ['³', '₃', '۳', '３'],
        '4': ['⁴', '₄', '۴', '٤', '４'],
        '5': ['⁵', '₅', '۵', '٥', '５'],
        '6': ['⁶', '₆', '۶', '٦', '６'],
        '7': ['⁷', '₇', '۷', '７'],
        '8': ['⁸', '₈', '۸', '８'],
        '9': ['⁹', '₉', '۹', '９'],
        'a': ['à', 'á', 'ả', 'ã', 'ạ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ', 'ā', 'ą', 'å', 'α', 'ά', 'ἀ', 'ἁ', 'ἂ', 'ἃ', 'ἄ', 'ἅ', 'ἆ', 'ἇ', 'ᾀ', 'ᾁ', 'ᾂ', 'ᾃ', 'ᾄ', 'ᾅ', 'ᾆ', 'ᾇ', 'ὰ', 'ά', 'ᾰ', 'ᾱ', 'ᾲ', 'ᾳ', 'ᾴ', 'ᾶ', 'ᾷ', 'а', 'أ', 'အ', 'ာ', 'ါ', 'ǻ', 'ǎ', 'ª', 'ა', 'अ', 'ا', 'ａ', 'ä'],
        'b': ['б', 'β', 'ب', 'ဗ', 'ბ', 'ｂ'],
        'c': ['ç', 'ć', 'č', 'ĉ', 'ċ', 'ｃ'],
        'd': ['ď', 'ð', 'đ', 'ƌ', 'ȡ', 'ɖ', 'ɗ', 'ᵭ', 'ᶁ', 'ᶑ', 'д', 'δ', 'د', 'ض', 'ဍ', 'ဒ', 'დ', 'ｄ'],
        'e': ['é', 'è', 'ẻ', 'ẽ', 'ẹ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ', 'ë', 'ē', 'ę', 'ě', 'ĕ', 'ė', 'ε', 'έ', 'ἐ', 'ἑ', 'ἒ', 'ἓ', 'ἔ', 'ἕ', 'ὲ', 'έ', 'е', 'ё', 'э', 'є', 'ə', 'ဧ', 'ေ', 'ဲ', 'ე', 'ए', 'إ', 'ئ', 'ｅ'],
        'f': ['ф', 'φ', 'ف', 'ƒ', 'ფ', 'ｆ'],
        'g': ['ĝ', 'ğ', 'ġ', 'ģ', 'г', 'ґ', 'γ', 'ဂ', 'გ', 'گ', 'ｇ'],
        'h': ['ĥ', 'ħ', 'η', 'ή', 'ح', 'ه', 'ဟ', 'ှ', 'ჰ', 'ｈ'],
        'i': ['í', 'ì', 'ỉ', 'ĩ', 'ị', 'î', 'ï', 'ī', 'ĭ', 'į', 'ı', 'ι', 'ί', 'ϊ', 'ΐ', 'ἰ', 'ἱ', 'ἲ', 'ἳ', 'ἴ', 'ἵ', 'ἶ', 'ἷ', 'ὶ', 'ί', 'ῐ', 'ῑ', 'ῒ', 'ΐ', 'ῖ', 'ῗ', 'і', 'ї', 'и', 'ဣ', 'ိ', 'ီ', 'ည်', 'ǐ', 'ი', 'इ', 'ی', 'ｉ'],
        'j': ['ĵ', 'ј', 'Ј', 'ჯ', 'ج', 'ｊ'],
        'k': ['ķ', 'ĸ', 'к', 'κ', 'Ķ', 'ق', 'ك', 'က', 'კ', 'ქ', 'ک', 'ｋ'],
        'l': ['ł', 'ľ', 'ĺ', 'ļ', 'ŀ', 'л', 'λ', 'ل', 'လ', 'ლ', 'ｌ'],
        'm': ['м', 'μ', 'م', 'မ', 'მ', 'ｍ'],
        'n': ['ñ', 'ń', 'ň', 'ņ', 'ŉ', 'ŋ', 'ν', 'н', 'ن', 'န', 'ნ', 'ｎ'],
        'o': ['ó', 'ò', 'ỏ', 'õ', 'ọ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ', 'ø', 'ō', 'ő', 'ŏ', 'ο', 'ὀ', 'ὁ', 'ὂ', 'ὃ', 'ὄ', 'ὅ', 'ὸ', 'ό', 'о', 'و', 'θ', 'ို', 'ǒ', 'ǿ', 'º', 'ო', 'ओ', 'ｏ', 'ö'],
        'p': ['п', 'π', 'ပ', 'პ', 'پ', 'ｐ'],
        'q': ['ყ', 'ｑ'],
        'r': ['ŕ', 'ř', 'ŗ', 'р', 'ρ', 'ر', 'რ', 'ｒ'],
        's': ['ś', 'š', 'ş', 'с', 'σ', 'ș', 'ς', 'س', 'ص', 'စ', 'ſ', 'ს', 'ｓ'],
        't': ['ť', 'ţ', 'т', 'τ', 'ț', 'ت', 'ط', 'ဋ', 'တ', 'ŧ', 'თ', 'ტ', 'ｔ'],
        'u': ['ú', 'ù', 'ủ', 'ũ', 'ụ', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự', 'û', 'ū', 'ů', 'ű', 'ŭ', 'ų', 'µ', 'у', 'ဉ', 'ု', 'ူ', 'ǔ', 'ǖ', 'ǘ', 'ǚ', 'ǜ', 'უ', 'उ', 'ｕ', 'ў', 'ü'],
        'v': ['в', 'ვ', 'ϐ', 'ｖ'],
        'w': ['ŵ', 'ω', 'ώ', 'ဝ', 'ွ', 'ｗ'],
        'x': ['χ', 'ξ', 'ｘ'],
        'y': ['ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ', 'ÿ', 'ŷ', 'й', 'ы', 'υ', 'ϋ', 'ύ', 'ΰ', 'ي', 'ယ', 'ｙ'],
        'z': ['ź', 'ž', 'ż', 'з', 'ζ', 'ز', 'ဇ', 'ზ', 'ｚ'],
        'aa': ['ع', 'आ', 'آ'],
        'ae': ['æ', 'ǽ'],
        'ai': ['ऐ'],
        'ch': ['ч', 'ჩ', 'ჭ', 'چ'],
        'dj': ['ђ', 'đ'],
        'dz': ['џ', 'ძ'],
        'ei': ['ऍ'],
        'gh': ['غ', 'ღ'],
        'ii': ['ई'],
        'ij': ['ĳ'],
        'kh': ['х', 'خ', 'ხ'],
        'lj': ['љ'],
        'nj': ['њ'],
        'oe': ['ö', 'œ', 'ؤ'],
        'oi': ['ऑ'],
        'oii': ['ऒ'],
        'ps': ['ψ'],
        'sh': ['ш', 'შ', 'ش'],
        'shch': ['щ'],
        'ss': ['ß'],
        'sx': ['ŝ'],
        'th': ['þ', 'ϑ', 'ث', 'ذ', 'ظ'],
        'ts': ['ц', 'ც', 'წ'],
        'ue': ['ü'],
        'uu': ['ऊ'],
        'ya': ['я'],
        'yu': ['ю'],
        'zh': ['ж', 'ჟ', 'ژ'],
        '(c)': ['©'],
        'A': ['Á', 'À', 'Ả', 'Ã', 'Ạ', 'Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'Å', 'Ā', 'Ą', 'Α', 'Ά', 'Ἀ', 'Ἁ', 'Ἂ', 'Ἃ', 'Ἄ', 'Ἅ', 'Ἆ', 'Ἇ', 'ᾈ', 'ᾉ', 'ᾊ', 'ᾋ', 'ᾌ', 'ᾍ', 'ᾎ', 'ᾏ', 'Ᾰ', 'Ᾱ', 'Ὰ', 'Ά', 'ᾼ', 'А', 'Ǻ', 'Ǎ', 'Ａ', 'Ä'],
        'B': ['Б', 'Β', 'ब', 'Ｂ'],
        'C': ['Ç', 'Ć', 'Č', 'Ĉ', 'Ċ', 'Ｃ'],
        'D': ['Ď', 'Ð', 'Đ', 'Ɖ', 'Ɗ', 'Ƌ', 'ᴅ', 'ᴆ', 'Д', 'Δ', 'Ｄ'],
        'E': ['É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ', 'Ë', 'Ē', 'Ę', 'Ě', 'Ĕ', 'Ė', 'Ε', 'Έ', 'Ἐ', 'Ἑ', 'Ἒ', 'Ἓ', 'Ἔ', 'Ἕ', 'Έ', 'Ὲ', 'Е', 'Ё', 'Э', 'Є', 'Ə', 'Ｅ'],
        'F': ['Ф', 'Φ', 'Ｆ'],
        'G': ['Ğ', 'Ġ', 'Ģ', 'Г', 'Ґ', 'Γ', 'Ｇ'],
        'H': ['Η', 'Ή', 'Ħ', 'Ｈ'],
        'I': ['Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị', 'Î', 'Ï', 'Ī', 'Ĭ', 'Į', 'İ', 'Ι', 'Ί', 'Ϊ', 'Ἰ', 'Ἱ', 'Ἳ', 'Ἴ', 'Ἵ', 'Ἶ', 'Ἷ', 'Ῐ', 'Ῑ', 'Ὶ', 'Ί', 'И', 'І', 'Ї', 'Ǐ', 'ϒ', 'Ｉ'],
        'J': ['Ｊ'],
        'K': ['К', 'Κ', 'Ｋ'],
        'L': ['Ĺ', 'Ł', 'Л', 'Λ', 'Ļ', 'Ľ', 'Ŀ', 'ल', 'Ｌ'],
        'M': ['М', 'Μ', 'Ｍ'],
        'N': ['Ń', 'Ñ', 'Ň', 'Ņ', 'Ŋ', 'Н', 'Ν', 'Ｎ'],
        'O': ['Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'Ø', 'Ō', 'Ő', 'Ŏ', 'Ο', 'Ό', 'Ὀ', 'Ὁ', 'Ὂ', 'Ὃ', 'Ὄ', 'Ὅ', 'Ὸ', 'Ό', 'О', 'Θ', 'Ө', 'Ǒ', 'Ǿ', 'Ｏ', 'Ö'],
        'P': ['П', 'Π', 'Ｐ'],
        'Q': ['Ｑ'],
        'R': ['Ř', 'Ŕ', 'Р', 'Ρ', 'Ŗ', 'Ｒ'],
        'S': ['Ş', 'Ŝ', 'Ș', 'Š', 'Ś', 'С', 'Σ', 'Ｓ'],
        'T': ['Ť', 'Ţ', 'Ŧ', 'Ț', 'Т', 'Τ', 'Ｔ'],
        'U': ['Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'Û', 'Ū', 'Ů', 'Ű', 'Ŭ', 'Ų', 'У', 'Ǔ', 'Ǖ', 'Ǘ', 'Ǚ', 'Ǜ', 'Ｕ', 'Ў', 'Ü'],
        'V': ['В', 'Ｖ'],
        'W': ['Ω', 'Ώ', 'Ŵ', 'Ｗ'],
        'X': ['Χ', 'Ξ', 'Ｘ'],
        'Y': ['Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ', 'Ÿ', 'Ῠ', 'Ῡ', 'Ὺ', 'Ύ', 'Ы', 'Й', 'Υ', 'Ϋ', 'Ŷ', 'Ｙ'],
        'Z': ['Ź', 'Ž', 'Ż', 'З', 'Ζ', 'Ｚ'],
        'AE': ['Æ', 'Ǽ'],
        'Ch': ['Ч'],
        'Dj': ['Ђ'],
        'Dz': ['Џ'],
        'Gx': ['Ĝ'],
        'Hx': ['Ĥ'],
        'Ij': ['Ĳ'],
        'Jx': ['Ĵ'],
        'Kh': ['Х'],
        'Lj': ['Љ'],
        'Nj': ['Њ'],
        'Oe': ['Œ'],
        'Ps': ['Ψ'],
        'Sh': ['Ш'],
        'Shch': ['Щ'],
        'Ss': ['ẞ'],
        'Th': ['Þ'],
        'Ts': ['Ц'],
        'Ya': ['Я'],
        'Yu': ['Ю'],
        'Zh': ['Ж'],
    };

    Object.keys(swaps).forEach((swap) => {
        swaps[swap].forEach(s => {
            str = str.replace(new RegExp(s, "g"), swap);
        })
    });
    return str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-") // collapse dashes
        .replace(/^-+/, "") // trim - from start of text
        .replace(/-+$/, "");
}

export default {
    data(){
        return {
            slug : this.$store.state.auth.user.profile.slug,
            tattooStyles : tattooStyles,
            endpoint : '',
            userid : this.$store.state.auth.user.id,
            avatar : this.$store.state.auth.user.avatar_url,
            avatarSrc : null,
            email : this.$store.state.auth.user.email,
            hasAddress : false,
            published : false,
            address: false,
            profile: false,
        }
    },

    computed: {
        ...mapState({
            usertype : state => state.auth.user.profile_type
        }),
    },

    watch:{
        'profile.pseudo'(newVal){
            this.profile.slug = slugify(newVal)
        },
        'profile.slug' :_.debounce(function(newVal){
            this.profile.slug = slugify(newVal)
            }, 300)
    },

    created(){

        this.endpoint = `/profiles/${this.usertype}/${this.$store.state.auth.user.profile_id}`;

        this.$axios.get(this.endpoint)
            .then(({data}) => {

                console.log(data);
                this.hasAddress = data.address != undefined;
                this.published = data.published;

                if(this.hasAddress){
                    this.address =  new Form(data.address);
                    delete data.address;
                }else{
                    this.address = new Form({
                        name : '',
                        name_more : '',
                        postcode : '',
                        city : '',
                        administrative : '',
                        country_code : '',
                        country : '',
                        lat:'',
                        lng:'',
                    })
                }

                this.profile =  new Form(data);
            });
    },
    methods : {
        save(){
            this.profile.put(this.endpoint)
                .then((data) => {
                    this.$message({
                        message: this.$i18n.t('Votre profil est mis à jour !'),
                        type: 'success',
                        customClass: 'bg-teal-100 border-0 border-t-4 border-teal-500 rounded-none rounded-b text-teal-900 px-4 py-3 shadow-md'
                    })

                    let user = JSON.parse(JSON.stringify(this.$store.state.auth.user));
                    user.profile = this.profile.data();
                    this.$auth.$storage.setState('user', user);
                })
                .catch((data) => {
                    this.$message({
                        message: this.$i18n.t('Erreur de mise à jour du profil'),
                        type: 'error',
                        customClass: 'bg-red-100 border-0 border-t-4 border-red-500 rounded-none rounded-b text-red-900 px-4 py-3 shadow-md'
                    })
                })
        },


        saveAddress(){

            let promise = '';
            if(!this.hasAddress){
                promise = this.address.post(`/addresses`)

            }else{
                promise = this.address.put(`/addresses/${this.address.id}`)

            }

            promise.then(({data, status}) => {
                if(status == 201){
                    this.hasAddress = true;
                }

                this.$message({
                    message: this.$i18n.t('Votre adresse mise à jour !'),
                    type: 'success',
                    customClass: 'bg-teal-100 border-0 border-t-4 border-teal-500 rounded-none rounded-b text-teal-900 px-4 py-3 shadow-md'
                })
            }).catch(() => {
                this.$message({
                    message: this.$i18n.t('Problème lors de la mise à jour de votre adresse'),
                    type: 'warning',
                })
            })
        },
    },

    components : {
        StyleSelector,
        ArtistPublishButton,
        AvatarUpload,
        AddressForm
    },

    metaInfo(){
        return {
            title : this.$i18n.t("Profil")
        }
    }
}
</script>
