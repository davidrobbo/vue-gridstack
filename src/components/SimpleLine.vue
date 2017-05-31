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
  import TEST_DATA from '../test-data'
  export default {
    name: 'simpleLine',
    mixins: [ chart ],
    data() {
      return {
        chart: null,
        model: {
          date: "2017-01-01",
          value: 0
        },
        defaultModel:{
          date: "2017-01-01",
          value: 0
        },
        defaultOptions: {
          "type": "serial",
          "theme": "light",
          "marginRight": 40,
          "marginLeft": 40,
          "autoMarginOffset": 20,
          "mouseWheelZoomEnabled":true,
          "dataDateFormat": "YYYY-MM-DD",
          "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true
          }],
          "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
          },
          "graphs": [{
            "id": "g1",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
          }],
          "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
          },
          "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#258cbb",
            "limitToGraph":"g1",
            "valueLineAlpha":0.2,
            "valueZoomable":true
          },
          "valueScrollbar":{
            "oppositeAxis":false,
            "offset":50,
            "scrollbarHeight":10
          },
          "categoryField": "date",
          "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
          },
          "export": {
            "enabled": true
          }
        }
      }
    },
    computed: {
      isValid() {
        return this.model.date.length && !isNaN(this.model.value)
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
