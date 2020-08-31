<template>
    <main class="look-book-page">
        <div class="space-55"></div>
        <div class="container">
            <ArchiveLookBook title="Look Book" :posts="lookbooks"></ArchiveLookBook>
        </div>
        <div class="space-233"></div>
    </main>
</template>

<script>

    import LookBook from '@/mixins/look-book';
    import ArchiveLookBook from '../components/products/ArchiveLookBook';
    import LookbookResource from "../api/resources/LookbookResource";

    export default {
        components: {
            ArchiveLookBook
        },
        data: function () {
            return {
                lookbooks: []
            }
        },
        name: "LookBook",
        created: function () {
            this.fetchInitialData();
        },
        methods: {
            fetchInitialData: function () {
                LookbookResource.getLookbooks().then(res => {
                    this.lookbooks = res.data;
                });
            },
        }
        // data(){
        //     return{
        //         lookBooks: [
        //             {id: 1, url: 'looks-1', title: 'Looks 1', thumbnail: 'product7.jpg'},
        //             {id: 2, url: 'looks-2', title: 'Looks 2', thumbnail: 'product8.jpg'},
        //             {id: 3, url: 'looks-3', title: 'Looks 3', thumbnail: 'product10.jpg'},
        //             {id: 4, url: 'looks-4', title: 'Looks 4', thumbnail: 'product11.jpg'},
        //             {id: 5, url: 'looks-5', title: 'Looks 5', thumbnail: 'product12.jpg'},
        //             {id: 6, url: 'looks-6', title: 'Looks 6', thumbnail: 'product6.jpg'}
        //         ]
        //     }
        // }
    }
</script>

<style>

</style>
