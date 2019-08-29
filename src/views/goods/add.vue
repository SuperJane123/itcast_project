<template>
  <div class="add">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 步骤条 -->

    <el-steps :active="activeName-0" finish-status="success" class="process">
      <el-step title="步骤 1" :active=1></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>

    <!-- 标签页 -->

    <el-tabs tab-position="left" v-model="activeName">
      <el-tab-pane label="基本信息" name="0">
        <el-form ref="form" :model="goodsForm" label-width="80px">
          <el-form-item label="商品名称">
            <el-input v-model="goodsForm.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="goodsForm.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="goodsForm.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="goodsForm. goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 添加级联菜单 -->
            <el-cascader
  :options="cateList"
  change-on-select
  :props="catesProp"
  v-model="goodsForm.goods_name"
></el-cascader>
          </el-form-item>
             <el-form-item label="是否促销">
            <el-radio  label="1" border>是</el-radio>
    <el-radio  label="2" border>否</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button>取消</el-button>
            <el-button type="primary">确定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性" name="2">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片" name="3">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容" name="4">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getAllCate } from '../../api/cate_index'
export default {
  data () {
    return {
      // active的值是数字类型
      goodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      cateList: [],
      catesProp: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      activeName: 0
    }
  },
  mounted () {
    getAllCate(3)
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.cateList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style lang="less" scoped>
.process {
  margin: 50px 0 50px 0;
}
</style>
