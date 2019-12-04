export default async function({$auth, redirect}){
    let user = $auth.state.user;
    console.log( user.profile_type);
    if(user && user.profile_type == 'member'){
        //in in in
    }else{
        // redirect('/auth/login')
    }
}