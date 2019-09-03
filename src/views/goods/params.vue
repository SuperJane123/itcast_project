<template>
  <div class="params">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/goods' }">商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 级联菜单 -->
    <el-cascader
      :options="cateList"
      :show-all-levels="false"
      :props="cateProps"
      v-model="selectedCat_id"
      @change="change"
    ></el-cascader>

    <!-- 卡片化标签页 -->
    <el-tabs type="border-card">
      <el-tab-pane label="动态参数">
        <el-row class="addGoodsdata">
          <el-col :span="24">
            <el-button type="success" plain size="small" @click="showAddDialog">添加参数名称</el-button>
          </el-col>
        </el-row>

        <el-table :data="paramsFrom" border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-tag
                style="margin-right:10px"
                :key="index"
                v-for="(item,index) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{item}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50" label="编号"></el-table-column>
          <el-table-column prop="attr_name" label="商品参数" width="500"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
              <el-button
                type="danger"
                plain
                icon="el-icon-delete"
                size="small"
                @click="delAttr(scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性">
        <!-- 按钮 -->
        <el-row class="addGoodsstatic">
          <el-col :span="24">
            <el-button type="success" plain size="small">添加静态属性</el-button>
          </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="staticFrom" border style="width: 100%">
          <el-table-column type="index" width="50" label="编号"></el-table-column>
          <el-table-column prop="attr_name" label="属性名称" width="180"></el-table-column>

          <el-table-column prop="attr_vals" label="属性值" width="180"></el-table-column>
          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" plain icon="el-icon-edit" size="small"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" size="small"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- 添加参数对话框 -->
    <el-dialog title="添加参数名称" :visible.sync="assdialogFormVisible">
      <el-form :model="addform" label-width="80px" :rules="rules" ref="addform">
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="addform.attr_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="assdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addAttr">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入组件
import {
  getAllCate,
  getStaticData,
  delAttrById,
  addNewAttr
} from '../../api/cate_index'
export default {
  data () {
    return {
      // 静态参数
      staticFrom: [],
      // 动态tab标签
      inputVisible: false,
      inputValue: '',
      // 分类id
      cat_id: '',
      // 添加参数数据
      addform: {
        attr_name: '',
        attr_sel: 'many',
        attr_vals: ''
      },
      // 添加参数对话框
      assdialogFormVisible: false,

      // 级联菜单默认的选中值
      selectedCat_id: [1, 3, 6],

      // 级联菜单的商品分类数据

      cateList: [],
      // 表格所显示的参数
      paramsFrom: [],

      // 级联菜单的配置
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      rules: {
        attr_name: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //  获取动态表格动态数据
    init () {
      getStaticData(this.selectedCat_id[2], 'many').then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
          this.cat_id = this.paramsFrom = res.data.data
          for (var i of this.paramsFrom) {
            i.attr_vals = i.attr_vals.split(',')
          }
        }
      })
    },

    // 获取静态表格数据
    getStatic () {
      getStaticData(this.selectedCat_id[2], 'only')
        .then(res => {
          console.log(res)
          this.staticFrom = res.data.data
        })
    },

    // 级联参数发生改变
    change () {
      if (this.selectedCat_id) {
        this.init()
      }
    },

    // 删除参数
    delAttr (row) {
      console.log(row)
      let id = row.cat_id
      let attrid = row.attr_id
      delAttrById(id, attrid).then(res => {
        console.log(res)
      })
    },

    // 显示添加参数对话框
    showAddDialog () {
      this.asssdialogFormVisible = true
    },

    // 添加参数
    addAttr () {
      this.$refs.addform.validate(valid => {
        console.log(valid)
        if (valid) {
          this.addform.attr_vals = this.inputValue
          addNewAttr(this.selectedCat_id[2], this.addform).then(res => {
            console.log(res)
            if (res.data.meta.status === 201) {
              this.$message.success(res.data.meta.msg)
              this.assdialogFormVisible = false
              this.init()
            }
          })
        }
      })
    },

    handleClose (tag) {
      this.row.attr_vals.splice(this.row.attr_vals.indexOf(tag), 1)
    },

    // 以下是在标签中添加参数
    showInput () {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm (row) {
      console.log(this.inputValue)
      console.log(row)
      let inputValue = this.inputValue
      if (inputValue) {
        row.attr_vals.push(inputValue)
        this.addform.attr_vals = this.inputValue
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  },

  mounted () {
    // 获取级联菜单的数据
    getAllCate(3).then(res => {
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.cateList = res.data.data
      }
    })
    this.init()

    this.getStatic()
  }
}
</script>

<style lang="less" scoped>
.addGoodsdata {
  background-color: #f5f7fa;
}
</style>
