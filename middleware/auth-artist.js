export default async function({$auth, redirect}){
    let user = $auth.state.user;
    if(user && user.profile_type == 'artist'){
        //in in in
    }else{
        redirect('/auth/login')
    }
}