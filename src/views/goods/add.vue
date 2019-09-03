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
      <el-step title="步骤 1" :active="1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-tabs tab-position="left" v-model="activeName" @tab-click="getName" :before-leave="changTab">
      <el-tab-pane label="基本信息" name="0" :model="goodsForm">
        <el-form ref="form" label-width="80px">
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
            <el-input v-model="goodsForm.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 添加级联菜单 -->
            <el-cascader
              :options="cateList"
              change-on-select
              :props="catesProp"
              v-model="goodsForm.goods_cat"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销" >
            <el-radio-group v-model="checkedmodel" @change="getChecked">
              <el-radio   :label="true" border>是</el-radio>
            <el-radio  :label="false" border>否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数" name="1">
        <el-form ref="form" label-width="80px">
          <el-form-item :label="val.attr_name" v-for="val in goodsData" :key="val.attr_id">
            <el-checkbox-group
              v-model="first.attr_vals"
              v-for="first in goodsData"
              :key="first.attr_id"
            >
              <el-checkbox
                border
                :label="second"
                v-for="(second,index) in first.attr_vals"
                :key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="商品属性" name="2">
        <el-form ref="form" label-width="80px">
          <el-form-item :label="val.attr_name" v-for="(val,index) in goodsAttrForm" :key="index">
            <el-input :value="val.attr_vals"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3">
        <el-upload
          class="upload-demo"
          action="http://192.168.70.57:8888/api/private/v1/upload"
          :headers="setToken()"
          :on-preview="handlePreview"
          :before-upload="handelBefore"
          :on-remove="handleRemove"
          :on-success="handelSuccess"
          :file-list="fileList"
          list-type="picture"
          accept="image/gif, image/jpeg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-tab-pane>
      <el-tab-pane label="商品内容" name="4">
        <quillEditor v-model="goodsForm.goods_introduce"></quillEditor>
      </el-tab-pane>
    </el-tabs>
    <div class="btn">
      <el-button>取消</el-button>
      <el-button type="primary" @click="addGoods">确定</el-button>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import { getAllCate, getStaticData } from '../../api/cate_index'
import { addGoods, getGoodsById, editGoodsbyId } from '../../api/goods_index'
export default {
  data () {
    return {

      // 是否热销按钮
      checkedmodel: 'true',
      // 图片文件
      fileList: [],
      // 商品属性
      goodsAttrForm: [],

      // 商品参数
      goodsData: [],

      goodsForm: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
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

  // 注册组件
  components: {
    quillEditor
  },

  // 方法
  methods: {
    // 是否热销
    getChecked () {
      console.log(this.checkedmodel)
    },

    // 判断点击标签页时，判断商品参数和商品属性是否有添加商品分类，因为只有输入了商品分类，这个两个标签才能加载内容
    changTab (activeName, oldActiveName) {
      if (!this.goodsForm.goods_cat) {
        if (activeName === '1' || activeName === '2') {
          this.$message.warning('请选择商品分类！')
          activeName = '0'
          return false
        }
      }
    },

    // 判断点击商品参数、商品属性时所加载的内容
    async getName () {
      if (this.activeName === '1') {
        let id = this.goodsForm.goods_cat[2]
        // 获取动态数据
        let res = await getStaticData(id, 'many')
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.goodsData = res.data.data
          for (var i of this.goodsData) {
            i.attr_vals = i.attr_vals.split(',')
          }
        } else {
          this.$$message.error(res.data.meta.msg)
        }
      } else if (this.activeName === '2') {
        let id = this.goodsForm.goods_cat[2]
        let res = await getStaticData(id, 'only')
        console.log(res)
        this.goodsAttrForm = res.data.data
      }
    },

    // 获取token值
    setToken (obj) {
      let toekn = localStorage.getItem('itcast_manager_token')
      return { Authorization: toekn }
    },

    // 文件上传前触发的函数
    // 判断文件类型
    handelBefore (file) {
      if (file.type.indexOf('image/') !== 0) {
        this.$message.warning('请选择正确的文件类型格式,比如jpg,png,jpeg...')
        return false
      }
    },

    // 删除时触发的函数
    handleRemove (file, fileList) {
      if (!file.response) {
        return
      }
      var temp = file.response.data.tmp_path
      for (var i of this.goodsForm.pics) {
        if (i.pic === temp) {
          this.goodsForm.pics.splice(i, 1)
        }
      }
    },

    // 形成缩略图时触发的函数
    handlePreview (file) {
      console.log(file)
    },

    // 文件上传成功时触发的函数
    handelSuccess (response) {
      if (response.meta.status === 200) {
        this.$message.success(response.meta.msg)
        // 储存图片信息
        this.goodsForm.pics.push({ pic: response.data.tmp_path })
      }
    },

    // 添加商品/编辑商品
    async addGoods () {
      // 判断是否有id
      let id = this.$route.params.id
      this.goodsForm.goods_cat = this.goodsForm.goods_cat.join(',')
      // 判断是否有id，如果有id就请求编辑接口
      if (id) {
        console.log(this.goodsForm)
        try {
          let res = await editGoodsbyId(id, this.goodsForm)
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('编辑成功')
            this.$router.push({ name: 'list' })
          } else {
            this.$message.error('编辑失败')
          }
        } catch (error) {
          console.log(error)
          this.$message.error('服务器出错，请稍后重试')
        }
        // 如果有没有id，就是请求添加商品接口
      } else {
        this.goodsForm.goods_cat = this.goodsForm.goods_cat.join(',')
        for (var i of this.goodsData) {
          let id = i.attr_id
          for (var j of i.attr_vals) {
            this.goodsForm.attrs.push({ attr_id: id, attr_value: j })
          }
        }
        try {
          let res = await addGoods(this.goodsForm)
          // console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success('添加商品成功')
            this.$router.push({ name: 'list' })
          }
        } catch (error) {
          console.log(error)
          this.$message.error('服务器出错，请稍后重试')
        }
      }
      // console.log(this.goodsForm)
    }
  },

  mounted () {
    // console.log(this.$route)
    // 获取商品id
    let id = this.$route.params.id
    // 判断如果有id，就获取对应的商品数据
    if (id) {
      getGoodsById(id)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.goodsForm = res.data.data
            // 把goods_cat的"70,96,114"格式转换成数据["70","96","114"]
            this.goodsForm.goods_cat = this.goodsForm.goods_cat.split(',').map(e => { return Number(e) })

            console.log(this.goodsForm)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }

    // 获取商品分类数据
    getAllCate(3)
      .then(res => {
        // console.log(res)
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
