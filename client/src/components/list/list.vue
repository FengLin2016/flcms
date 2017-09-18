<template>
  <div class="main">
  	<ul>
      <li v-for="item in filterLoading">
          <h1>{{item.title}}</h1>
          <p>{{item.describe}}</p>
          <div><router-link :to="{path:'/home/show/' + item._id}">阅读全文</router-link>
          
          <span>标签：<i v-for="(tag,index) in item.tags">{{tag}} <template v-if="index!=(item.tags.length-1)">、</template> </i> &nbsp;&nbsp;&nbsp;&nbsp; 浏览：{{item.hits}}次 &nbsp;&nbsp;&nbsp;&nbsp; 时间：{{item.agoDate}}</span></div>
      </li>
    </ul>
    <div class="more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">{{msg}}</div>
  </div>
</template>

<script>
import moment from '../../../node_modules/moment'
export default {
  data () {
    return {
      dataList: [],
      moment: moment,
      page: 1,
      busy: true,
      msg: '加载中...'
    }
  },
  created: function () {
    this.loading()
  },
  methods: {
    loading: function (flage) {
      let that = this
      that.$http.get('http://47.94.95.106:3300/api/tags/' + this.$route.params.tag + '/' + that.page).then(res => {
        if (res.data.length) {
          if (flage) {
            that.dataList = that.dataList.concat(res.data)
          } else {
            that.dataList = res.data
          }
          that.busy = false
          that.page++
          if (res.data.length < 15) {
            this.msg = '最后一页！'
            that.busy = true
          }
        } else if (that.page === 1) {
          that.dataList = []
          this.msg = '暂无内容！'
          that.busy = true
        }
      })
    },
    loadMore: function () {
      let that = this
      that.busy = true
      setTimeout(function () {
        that.loading(true)
      }, 1000)
    },
    getStatus (urlStr) {
      var urlStrArr = urlStr.split('/')
      return urlStrArr[urlStrArr.length - 1]
    }
  },
  watch: {
    $route: function (to, from) {
      this.page = 1
      this.loading()
    }
  },
  computed: {
    filterLoading: function () {
      var that = this
      var tempList = that.dataList
      that.moment.locale('zh-cn')
      tempList.filter(function (item) {
        item.agoDate = that.moment(item.updateDate, 'YYYYMMDD').fromNow()
      })
      return tempList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.main
  padding-right:300px;
  ul
    overflow:hidden;
    padding-right:20px;
    li
      background:#fff;
      padding:20px;
      margin-bottom:20px;
      h1
        font:normal 18px/35px 'microsoft yahei';
        color:#000;
      p
        font:normal 14px/24px 'microsoft yahei';
        text-indent:2em;
      div
        overflow:hidden;
        color:#999;
        a
          float:left;
          background:#e77817;
          color:#fff;
          padding:2px 15px 4px;
        span
          float:right;
          i
            font:normal 12px/19px 'microsoft yahei';
            padding:4px 0;
  .more
    text-align:center;
    font:normal 14px/35px 'microsoft yahei';
    color:#999;
    margin-bottom:20px;
</style>
