
<template>
  <div id="app">
    <x-chart :id="id" :option="option"></x-chart>
  </div>
</template>

<script>
// 导入chart组件
import XChart from '../../components/highcharts'
import { getReports } from '../../api/reports_index'

// 导入chart组件模拟数据
export default {
  name: 'app',
  data () {
    return {
      id: 'test',
      option: {}
    }
  },
  components: {
    XChart
  },
  mounted () {
    getReports()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.option = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
#test {
  width: 400px;
  height: 400px;
  margin: 40px auto;
}
</style>
