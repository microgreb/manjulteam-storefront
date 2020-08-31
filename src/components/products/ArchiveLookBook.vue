<template>
    <section class="archive-look-book">
        <div class="title">{{title}}</div>
        <div class="archive-block-container clearfix">
            <article v-for="(post, index) in posts"
                     class="archive-single-look-book"
                     vue-wow="{ 'animation-name': 'fadeInUp','animation-duration': '1s'}"
                     :id="post.id"
                     :key="index"
            >
                <router-link :to="{ name: 'lookBookSingle', params: {url: post.id}}">
                    <img :src="post.thumbnail">
                </router-link>
                <div class="description">
                    <h4>{{post.name}}</h4>
                    <router-link :to="{ name: 'lookBookSingle', params: {url: post.id}}">Подробнее</router-link>
                </div>
            </article>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ArchiveLookBook",
        props: ['posts', 'title']
    }
</script>

<style lang="scss">

    @import "../../../src/assets/scss/variables";

    .archive-block-container {
        overflow: hidden;
        margin-left: -$vw_34;
        article {
            width: 50%;
            overflow: hidden;
            float: left;
            height: $vw_610;
            padding-left: $vw_34;
            padding-bottom: $vw_34;
            box-sizing: border-box;
            position: relative;
            img {
                width: 100%;
                transition: .4s;
                height: 100%;
                object-fit: cover;
            }
            &:hover img {
                transform: scale(1.1);
                transition: .4s;
            }
            a {
                height: 100%;
                width: 100%;
                overflow: hidden;
                display: block;
            }
        }
        .description {
            position: absolute;
            left: $vw_68;
            bottom: $vw_68;
            h4 {
                font-weight: 600;
                font-size: $vw_34;
                color: $c_white;
            }
            a {
                font-size: $vw_21;
                color: $c_white;
                text-decoration: none;
            }
        }
    }
</style>
