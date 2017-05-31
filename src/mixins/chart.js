import TEST_DATA from '../test-data'
import event from '../event'

export default {
  props: ['chartData', 'isTest', 'columns', 'height', 'h', 'y', 'w', 'x', 'i', 'chartOptions'],
  data() {
    return {
      testData: TEST_DATA[this.$options.name],
      cols: 6,
      isFullScreen: false,
      options: {}
    }
  },
  computed: {
    outerId() {
      return "chart-outer-" + this._uid
    },
    chartId() {
      return "chart-" + this._uid
    },
    outerClasses() {
      return "chart-outer"
    },
    chartClasses() {
      return "chart-inner"
    },
    colSpan() {
      return `col-sm-12 col-md-${this.cols} width-anim `
    },
    fullScreen() {
      return 'full-screen'
    },
    heightCalcOuter() {
      return this.isFullScreen ? "50vh" : ""
    },
    widthCalcOuter() {
      return this.isFullScreen ? "90vw" : "100%"
    },
    heightCalcInner() {
      return this.isFullScreen ? "100%" : ( this.height * this.h ) + "px"
    },
    widthCalcInner() {
      return "100%"
    }
  },
  watch: {
    testData: {
      handler: function (val, oldVal) {
        this.chart.dataProvider = val
        this.chart.validateData()
      },
      deep: true
    },
    chartData: {
      handler: function (val, oldVal) {
        this.chart.dataProvider = val
        this.chart.validateData()
      },
      deep: true
    }
  },
  methods: {
    init() {
      this.chart = AmCharts.makeChart( this.chartId, this.options )
    },
    col(n) {
      this.cols = n
    },
    prevChartFullScreen() {
      event.$emit("prev-chart-screen", { index: this.i -1 })
      this.isFullScreen = false
    },
    nextChartFullScreen() {
      event.$emit("next-chart-screen", { index: this.i +1 } )
      this.isFullScreen = false
    },
    checkForFullScreen({index}){
      this.isFullScreen = this.i == index
    }
  },
  mounted() {
    let data = {}
    if(!this.isTest) {
      data.dataProvider = this.chartData
    } else {
      data.dataProvider = this.testData
    }
    this.options = Object.assign({}, data, this.defaultOptions, this.chartOptions)
    this.init()
    this.cols = this.columns ? this.columns : this.cols
    event.$on("next-chart-screen", this.checkForFullScreen)
    event.$on("prev-chart-screen", this.checkForFullScreen)
    event.$on("close-full-screen", () => this.isFullScreen = false)
  }
}
