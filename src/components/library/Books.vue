<template>
  <div>
    <el-row style="height: 900px;">
      <!--<search-bar></search-bar>-->
      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books"
                  :key="item.id">
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 20px;height: 250px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="always">
          <div class="cover" @click="editBook(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
          </div>
          <div class="author">{{item.author}}
            <el-popover
              placement="top"
              width="160"
              v-model="item.visible">
              <p>确定删除本书？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="item.visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteBook(item.id);item.visible = false">确定</el-button>
              </div>
              <el-button slot="reference" class="el-icon-delete"></el-button>
            </el-popover>
<!--            <i class="el-icon-delete" @click="deleteBook(item.id)"></i>-->
          </div>
        </el-card>
      </el-tooltip>
      <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import EditForm from './EditForm'
import SearchBar from './SearchBar'
export default {
  name: 'Books',
  components: {
    EditForm,
    SearchBar
  },
  data () {
    return {
      books: [{
        visible: false
      }],
      currentPage: 1,
      pagesize: 17
    }
  },
  mounted: function () {
    this.loadBooks()
  },
  methods: {
    loadBooks () {
      var _this = this
      this.$axios.get('/books').then(resp => {
        if (resp && resp.status === 200) {
          _this.books = resp.data
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    searchResult () {
      var _this = this
      this.$axios
        .get('/search?keywords=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.books = resp.data
          }
        })
    },
    // deleteBook (id) {
    //   this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$axios
    //       .post('/delete', {id: id}).then(resp => {
    //         if (resp && resp.status === 200) {
    //           this.loadBooks()
    //         }
    //       })
    //   }
    //   ).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: '已取消删除'
    //     })
    //   })
    // },
    deleteBook (id) {
      console.log('shanchu')
      this.$axios.post('/delete', {id: id}).then(resp => {
        if (resp && resp.status === 200) {
          this.loadBooks()
        }
      })
      this.books.visible = false
    },
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
    }
  }
}
</script>

<style scoped>
  .cover {
    width: 115px;
    height: 172px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
    padding-bottom: 4px;
  }

  .author {
    color: #333;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
    width: 140px;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
  /deep/.el-button{
    border:1px solid white ;
    padding: 10px;
  }
</style>
