<template>
    <div ref="parent" style="width: 100%;height: 100%;;position: relative">


        <video ref="video" playsinline :src="url" x5-video-player-type="h5" muted
               x5-video-player-fullscreen="true" :loop="loop" x5-playsinline="true" webkit-playsinline="true" :x5-video-orientation="orientation"
               preload="auto" :autoplay="autoPlay">
        </video>

        <div  v-if="display_poster" style="z-index: 0;position: absolute;top:0px;left:0px;width: 100%;height:100%;background-size: cover;background-position: center center"
              :style="{'background-image':'url(/assets/video/poster.png)'}"></div>


    </div>
</template>
<style>
    .IIV::-webkit-media-controls-play-button,
    .IIV::-webkit-media-controls-start-playback-button {
        opacity: 0;
        pointer-events: none;
        width: 5px;
    }
</style>


<script>


    function bindEvent(dom, event, cb, useCapture) {
        function remove() {
            dom.removeEventListener(event, icc, useCapture)
        }

        function icc(e) {
            if (cb(e) === true) {
                remove();
            }
        }

        dom.addEventListener(event, icc, useCapture);
        return remove;
    }

    // ??
    export default {
        name: 'VideoSlider',
        // ?? props
        props: {
            url: {
                type: String,
                default: ''
            },
            align: {
                type: String,
                default: 'crop'
            },
            loop: {
                type: Boolean,
                default: true
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            scroll: {
                type: Boolean,
                default: false
            },
            poster: {
                type: String,
                default: ""
            },deblug:{
                type: Boolean,
                default: true
            },
            orientation:{
                type: String,
                default: 'portrait' //landscape
            }
        },
        data: function () {
            return {
                playing: false,
                stoped: true,
                video: null,
                parent: null,
                display_poster: true,
                canplay:false,
                eventRemoveHandle: function () {

                }
            }
        },
        watch:{
            url:function (ov) {
                this.canplay=false;

            }
        },
        methods: {

            playUrl: function (url) {
                let self = this;

                if (url !== this.url) {
                    self.canplay=false;
                    this.video.pause();
                    this.url = url;
                    this.video.load();
                    this.playing = false;


                    function autoPlay() {
                        try {
                            self.play()
                        } catch (err) {
                            //console.log('playfail')
                        }
                        //self.video.play()
                    }

                    setTimeout(autoPlay, 100)

                } else {
                    self.play()
                }


            },

            play: function () {
                this.playing = true;
                if(this.canplay){
                    this.display_poster = false;
                }

                if (this.stoped) {
                    this.stoped = false
                    this.video.currentTime = 0;
                    this.video.play();
                }
                this.video.play();
                this.$emit('play', this);
                this.update();


            },

            pause: function () {
                this.playing = false;
                this.video.pause();
                this.$emit('pause', this);
                this.update();
            },

            stop: function () {
                this.display_poster = true;
                this.playing = false;
                this.video.pause();
                this.stoped = true;
                // this.video.currentTime=0;

                this.$emit('stop', this);
            },
            update: function () {
                let width = this.parent.clientWidth;
                let height = this.parent.clientHeight;
                if(this.deblug){
                    //console.log(this.parent.clientWidth,this.parent.clientHeight)
                }
                let radio = width / height;
                let cut_w = this.video.videoWidth;
                let cut_h = this.video.videoHeight;
                let radio2 = cut_w / cut_h;
                let end_w, end_h;


                switch (this.align) {
                    case 'crop':
                        if (radio2 > radio) {
                            end_h = height;
                            end_w = end_h * radio2;
                        } else {
                            end_w = width;
                            end_h = end_w / radio2;
                        }
                        break;
                    case 'center':
                        if (radio2 > radio) {
                            end_w = width;
                            end_h = end_w / radio2;

                        } else {
                            end_h = height;
                            end_w = end_h * radio2;
                        }
                        break;
                }

                this.video.width = end_w;
                this.video.height = end_h;
                this.video.style.position='absolute'
                this.video.style.left = -(end_w - width) / 2 + 'px';
                this.video.style.top = -(end_h - height) / 2 + 'px';
            }
        },

        beforeDestroy: function () {
            let self = this;
            self.eventRemoveHandle();
        },

        mounted: function () {
            let self = this;
            this.parent = this.$refs.parent;
            this.video = this.$refs.video;
            //console.log(this.$refs.video)
            this.video.oncanplay = function () {
                self.canplay=true;
                if(self.playing){
                    self.display_poster=false;
                }
                self.update();
                if (self.autoPlay === true) {
                    setTimeout(self.play, 10)
                }
                self.$emit('canplay');
            };
            this.video.onended = function () {
                self.$emit('ended');
                self.update();
                if (self.loop !== true) {
                    self.stop()
                }
                // if (self.loop === true) {
                //     self.video.play()
                // } else {
                //     self.stop()
                // }
            };
            this.video.ontimeupdate = function () {
                //  self.display_poster=false;
                // if (self.loop === true) {
                //     self.video.play()
                // } else {
                //     self.stop()
                // }
            };



            this.video.addEventListener('x5videoenterfullscreen', function() {
                self.update();
            });
            this.video.addEventListener('x5videoexitfullscreen', function() {
                self.update();
            });



            self.eventRemoveHandle = bindEvent(window, 'resize', function () {
                self.update();
                setTimeout(self.update, 300)
            });

            if (false === this.scroll) {
                this.parent.setAttribute('ontouchmove', 'event.preventDefault();');
            }
        }


    }


</script>
