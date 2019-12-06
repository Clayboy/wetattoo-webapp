
export default ({ app }, inject) => {

    app.global = {};

    app.global.tattooZones = [
        { name : 'hand'       , label : app.i18n.t('Main')},
        { name : 'forearm'    , label : app.i18n.t('Avant-bras')},
        { name : 'upperarm'   , label : app.i18n.t('Bras')},
        { name : 'shoulder'   , label : app.i18n.t('Épaule')},
        { name : 'lowerleg'   , label : app.i18n.t('Jambe')},
        { name : 'upperleg'   , label : app.i18n.t('Cuisse')},
        { name : 'foot'       , label : app.i18n.t('Pieds')},
        { name : 'rib'        , label : app.i18n.t('Côtes')},
        { name : 'stomach'    , label : app.i18n.t('Estomac')},
        { name : 'buttcheeks' , label : app.i18n.t('Reins')},
        { name : 'back'       , label : app.i18n.t('Dos')},
        { name : 'chest'      , label : app.i18n.t('Poitrine')},
        { name : 'head'       , label : app.i18n.t('Tête')},
        { name : 'neck'       , label : app.i18n.t('Cou')},
    ]


    app.global.tattooStyles = [
        {name : 'neo-traditional',  label : app.i18n.t('Néo-traditionnel')},
        {name : 'blackwork',        label : app.i18n.t('Noir')},
        {name : 'black-gray',       label : app.i18n.t('Noir et gris')},
        {name : 'dotwork',          label : app.i18n.t('Dot work')},
        {name : 'watercolor',       label : app.i18n.t('Aquarelle')},
        {name : 'realism',          label : app.i18n.t('Réaliste')},
        {name : 'traditional',      label : app.i18n.t('Traditionnel')},
        {name : 'new school',       label : app.i18n.t('New School')},
        {name : 'japanese',         label : app.i18n.t('Japonais')},
        {name : 'geometric',        label : app.i18n.t('Géométrique')},
        {name : 'fineline',         label : app.i18n.t('Linéaire')},
        {name : 'trash polka',      label : app.i18n.t('Trash polka')},
        {name : 'tribal',           label : app.i18n.t('Tribal')},
        {name : 'minimalism',       label : app.i18n.t('Minimalisme')},
        {name : 'abstract',         label : app.i18n.t('Abstrait')},
        {name : 'ornamental',       label : app.i18n.t('Ornemental')},
        {name : 'sketch',           label : app.i18n.t('Sketch')},
        {name : 'chicano',          label : app.i18n.t('Chicano')},
        {name : 'hand-poked',       label : app.i18n.t('Main levée')},
        {name : 'horror',           label : app.i18n.t('Horreur')},
        {name : 'lettering',        label : app.i18n.t('Lettrages')},
    ];
    
    
    
    app.global.bookingStatus = [
        {name : 'pending', label : app.i18n.t('En attente'), tabLabel : app.i18n.t('Demandes'), class : 'text-gray-600', color : 'gray-600', icon : ['far', 'clock']},
        {name : 'accepted', label : app.i18n.t('Acceptée'), tabLabel : app.i18n.t('En cours'), class : 'text-green-600', color : 'green-600', icon : ['fal', 'thumbs-up']},
        {name : 'refused', label : app.i18n.t('Refusée'), tabLabel : app.i18n.t('Refus'), class : 'text-red-600', color : 'red-600', icon : ['far', 'times-circle']},
        {name : 'completed', label : app.i18n.t('Projet terminé'), tabLabel : app.i18n.t('Terminés'), class : 'text-blue-600', color : 'blue-600', icon : ['far', 'check-circle']},
    ];
    
}

