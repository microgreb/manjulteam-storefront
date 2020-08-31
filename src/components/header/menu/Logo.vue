<template>
    <div class="main-logo">
        <router-link :to="{ name: 'home'}"><img src="@/assets/img/logo.svg"></router-link>
    </div>
</template>

<script>
    export default {
        name: "Logo"
    }
</script>

<style lang="scss">
    .main-logo{
        position:absolute;
        left:calc(50% - 8.3vw);
        img{
            width:15vw;
            height:auto;
            display: block;
        }
    }

    /* Mobile */
    @media only screen and (max-width: 767px) {
        .main-logo{
            position: relative;
            left: auto;
            img {
                width: calc( var(--vw_610) - var(--vw_55) );
            }
        }
    }
</style>
