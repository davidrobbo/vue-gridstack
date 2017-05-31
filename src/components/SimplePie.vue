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
    name: 'simplePie',
    mixins: [ chart ],
    data() {
      return {
        chart: null,
        //@todo
        model: {
          date: "2017-01-01",
          value: 0
        },
        //@todo
        defaultModel:{
          date: "2017-01-01",
          value: 0
        },
        defaultOptions: {
          "type": "pie",
          "theme": "light",
          "valueField": "litres",
          "titleField": "country",
           "balloon":{
           "fixedPosition":true
          },
          "export": {
            "enabled": true
          }
        }
      }
    },
    computed: {
      isValid() {
        //@todo
        return true
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
