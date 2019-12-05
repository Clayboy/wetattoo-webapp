import https from 'https';

import {setClient} from '~/utilities/Form';

export default function ({ $axios, redirect }){
    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })

    setClient($axios);
}
