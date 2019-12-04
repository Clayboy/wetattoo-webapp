<template>
    <div>
        <h1>Hello {{ $auth.user.name }}</h1>
    </div>
</template>

<script>
export default {
    middleware : 'auth',
    layout : 'member'
}
</script>