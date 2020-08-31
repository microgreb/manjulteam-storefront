<template>
    <transition name="component-fade" mode="out-in">
        <div v-show="loading" class="vc_progressbar">
            <div class="vc_progressbar_container" :style="getOpacityStyle">
                <div class="vc_progressbar_indicator" :style="getProgressStyle">
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

    import { mapState } from 'vuex';

    export default {
        name: "ProgressBar",
        data() {
            return {
                step: 5,
                max: 100,
                timer: undefined,
            };
        },
        watch: {
            loading(isContentLoad) {
                if (!isContentLoad) {
                    this.stopTick();
                    this.progress = 0;
                    this.startTick(function() {
                        this.tick();
                    });
                } else {
                    this.stopTick();
                    this.tick(this.stepsLeft());
                }
            },
        },
        computed: {
            getProgressStyle: function () {
                return {
                    width: '' + this.progress + '%'
                }
            },
            getOpacityStyle: function () {
                return {
                    opacity: 1 - (this.progress / this.max).toFixed(2)
                }
            },
            ...mapState({loading: state => state.settings.loading > 0})
        },
        methods: {
            startTick: function (callback) {
                this.timer = setInterval(callback.bind(this), 50);
            },
            stopTick: function () {
                if (typeof this.timer !== undefined) {
                    clearInterval(this.timer);
                    this.timer = undefined;
                }
            },
            tick: function (ticksCount) {
                ticksCount = ticksCount || 1;

                if (!this.stepsLeft()) {
                    this.stopTick();
                } else {
                    while (ticksCount) {
                        this.progress += this.step;
                        ticksCount--;
                    }
                }
            },
            stepsLeft() {
                return Math.ceil((this.max - this.progress) / this.step)
            },
        }
    }
</script>

<style lang="scss">

    @import "../../../../src/assets/scss/variables";

    .vc_progressbar {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 0;
        z-index: 5;

        .vc_progressbar_container {
            background: $c_dark_white;
            margin-top: $vw_55;

            .vc_progressbar_indicator {
                //height: 3px;
                background: $c_progressbar_hl;
                transition: width 0.5s ease;
            }
        }
    }
</style>
