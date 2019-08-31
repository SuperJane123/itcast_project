<template>
    <div class="reports" >
       <v-chart :options="polar"></v-chart>
    </div>
</template>

<script>
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import { getReports } from '../../api/reports_index'
export default {
  data () {
    return {
      polar: {}
    }
  },
  components: {
    'v-chart': ECharts
  },
  mounted () {
    getReports()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.polar = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

}
</script>

<style lang="less" scoped>
.reports{
   width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
