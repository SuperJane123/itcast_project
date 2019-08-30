<template>
  <div class="cate">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 输入框+搜索+添加商品按钮 -->
    <div style="margin-top: 15px;">
      <el-input
        placeholder="请输入内容"
        v-model="goodsObj.query"
        class="input-with-select"
        style="width:300px;margin-right:5px"
        @keydown.enter.native="init"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button type="success" plain @click="$router.push({name: 'add'})">添加商品</el-button>
    </div>

    <!-- 表格 -->

    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" width="50" label="编号"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="300"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="80"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态" width="80"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
      <el-table-column prop="add_time" label="创建时间">
        <template slot-scope="scope">{{scope.row.add_time | timeFormat}}</template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-tooltip class="item" effect="dark" content="编辑" placement="bottom">
          <el-button type="success" plain icon="el-icon-edit" size="small"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="审核" placement="bottom">
          <el-button type="danger" plain icon="el-icon-check" size="small"></el-button>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="删除" placement="bottom">
          <el-button type="warning" plain icon="el-icon-delete" size="small"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>

    <!-- 分页 -->

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="goodsObj.pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="goodsObj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getAllGoods } from '../../api/goods_index'
import { timeFormat } from '../../utils/myfilters'
export default {
  data () {
    return {
      total: 0,
      goodsList: [],
      goodsObj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      }
    }
  },
  filters: {
    timeFormat
  },

  methods: {

    // 获取商品列表数据
    init () {
      getAllGoods(this.goodsObj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.goodsList = res.data.data.goods
            // 储存总记录数
            this.total = res.data.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.goodsObj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.goodsObj.pagenum = val
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>

<style lang="less" scoped>
</style>
