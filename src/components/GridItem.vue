<template>
    <div :id="gridItemId" class="grid-stack-item relative" :data-gs-x="model.x" :data-gs-y="model.y" :data-gs-width="model.w" :data-gs-height="model.h" :key="i">
        <component :is="item.comp" :height="height" :h="model.h" :w="model.w" :x="model.x" :y="model.y" :isTest="true" :i="calcIndex"></component>
    </div>
</template>

<script>
  import event from '../event'
  import test from './Test'
  import bar from './SimpleBar.vue'
  import line from './SimpleLine.vue'
  import pie from './SimplePie.vue'
  import donut from './SimpleDonut.vue'
  export default {
    name: 'griditem',
    props: [ 'item', 'i', 'height' ],
    components: {
      test: test,
      bar: bar,
      myline: line,
      pie: pie,
      donut: donut
    },
    data () {
      return {
          model: {
              x: 0,
              y: 0,
              h: 0,
              w: 0,
              i: 0
          },
          calcIndex: null
      }
    },
    computed: {
      gridItemId() {
        return "grid-stack-item-" + this._uid
      }
    },
    methods: {
        respondToItemMove({ id, item }) {
            if(this.shouldRespondToEvent(id)){
                this.model.h = item.height
                this.model.w = item.width
                this.model.x = item.x
                this.model.y = item.y
            }
        },
        shouldRespondToEvent(id) {
            return id === this.gridItemId
        },
        reCalcIndexes(obj) {
            this.calcIndex = obj[this.gridItemId] ? obj[this.gridItemId] : 0
        }
    },
    mounted() {
        this.calcIndex = this.i
        event.$on("item-moved", this.respondToItemMove)
        event.$on("re-indexed-items", this.reCalcIndexes)
        this.model = Object.assign({}, this.item)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
