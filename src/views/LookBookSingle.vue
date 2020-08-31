<template>
    <main class="look-book-single-page">
        <div class="space-55"></div>
        <div class="look-book-single-container">
            <div class="container">
                <div class="title">{{lookbook.name}}</div>
            </div>
            <div class="gallery-container">
                <article>
                    <img :src="lookbook.thumbnail" :alt="lookbook.name">
                </article>
                <article v-for="image in lookbook.additional_images" :key="image.id">
                    <img :src="image.url" :alt="lookbook.name + '_' + image.id">
                </article>
            </div>
        </div>
        <div class="container">
            <ArchiveLookBook title="Look Book" :posts="lookbooks"></ArchiveLookBook>
        </div>
        <div class="space-233"></div>
    </main>
</template>

<script>

    import LookBook from '@/mixins/look-book';
    import ArchiveLookBook from '../components/products/ArchiveLookBook';
    import lookbooks from "../bootstrap/lookbooks";
    import LookbookResource from "../api/resources/LookbookResource";

    export default {
        name: "LookBookSingle",
        mixins: [LookBook],
        components: {ArchiveLookBook},
        data: function () {
            return {
                lookbook: {}
            }
        },
        created: function () {
            this.fetchInitialData();
        },
        methods: {
            fetchInitialData: function () {
                LookbookResource.getLookbook(this.$route.params.url).then(res => {
                    this.lookbook = res.data;
                });

                LookbookResource.getLookbooks().then(res => {
                    this.lookbooks = res.data;
                });
            }
        },
    }
</script>

<style lang="scss">
    .look-book-single-page {
        .gallery-container {
            img {
                width: 100%;
                display: block;
            }
        }
    }
</style>
