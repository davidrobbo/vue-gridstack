<template>
      <div :class="[isFullScreen ? fullScreen : 'relative']">
        <div class="grid-stack-item-content">
          <div class="helper-bar">
            <div class="items">
            <span class="grid-stack-handle sq" v-if="!isFullScreen">
              <i class="fa fa-hand-spock-o"></i>
            </span>
              <span class="sq" @click="isFullScreen = !isFullScreen" v-if="!isFullScreen">
              <i class="fa fa-expand"></i>
            </span>
              <span class="sq" v-if="isFullScreen" @click="prevChartFullScreen">
              <i class="fa fa-arrow-left"></i>
            </span>
              <span class="sq" @click="isFullScreen = !isFullScreen" v-if="isFullScreen" >
              <i class="fa fa-compress"></i>
            </span>
              <span class="sq" v-if="isFullScreen" @click="nextChartFullScreen">
              <i class="fa fa-arrow-right"></i>
            </span>
            </div>
          </div>
            <div :id="outerId" :class="outerClasses" :style="{ height: heightCalcOuter, width: widthCalcOuter }" >
              <div :id="chartId" :class="chartClasses"  :style="{ height: heightCalcInner, width: widthCalcInner }">

                </div>
            </div>
        </div>
      </div>
</template>
<script>
    import chart from '../mixins/chart'
    export default {
        name: 'simpleBar',
        mixins: [ chart ],
        data() {
            return {
                chart: null,
                model: {
                    country: "",
                    visits: 0
                },
                defaultModel: {
                    country: "",
                    visits: 0
                },
              defaultOptions: {
                "type": "serial",
                "theme": "light",
                "valueAxes": [ {
                  "gridColor": "#FFFFFF",
                  "gridAlpha": 0.2,
                  "dashLength": 0
                } ],
                "gridAboveGraphs": true,
                "startDuration": 1,
                "graphs": [ {
                  "balloonText": "[[category]]: <b>[[value]]</b>",
                  "fillAlphas": 0.8,
                  "lineAlpha": 0.2,
                  "type": "column",
                  "valueField": "visits"
                } ],
                "chartCursor": {
                  "categoryBalloonEnabled": false,
                  "cursorAlpha": 0,
                  "zoomable": false
                },
                "categoryField": "country",
                "categoryAxis": {
                  "gridPosition": "start",
                  "gridAlpha": 0,
                  "tickPosition": "start",
                  "tickLength": 20,
                  "labelRotation": 72.5
                },
                "export": {
                  "enabled": true
                }
              },
              options: {}
            }
        },
        computed: {
            isValid() {
                return this.model.country.length && !isNaN(this.model.visits)
            }
        },
        methods: {
            add() {
                if(this.isValid) {
                    this.testData.push(this.model)
                    this.model = Object.assign({}, this.defaultModel)
                }
            }
        },
        mounted() {
        },
        created(){
        }
    }
</script>
<style>
</style>
