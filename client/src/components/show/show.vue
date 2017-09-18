<template>
  <div class="main">
    <div class="show">
    	<h1>{{filterLoading.title}}</h1>
      <div class="tags">
        <span>浏览：{{filterLoading.hits}}</span><span>作者：{{filterLoading.author}}</span><span>时间：{{filterLoading.agoDate}}</span>
      </div>
      <div class="info markdown-body" v-html="filterLoading.contentHtml">
      </div>
    </div>
  </div>
</template>

<script>
import moment from '../../../node_modules/moment'
import marked from '../../../node_modules/marked'

export default {
  data () {
    return {
      content: [],
      moment: moment,
      marked: marked
    }
  },
  created: function () {
    this.loading()
  },
  methods: {
    loading: function (flage) {
      let that = this
      that.$http.get('http://47.94.95.106:3300/api/art/' + that.$route.params.id).then(res => {
        if (res.data) {
          that.content = res.data
        }
      })
    }
  },
  computed: {
    filterLoading: function () {
      var that = this
      var tempList = that.content
      that.moment.locale('zh-cn')
      tempList.agoDate = that.moment().format('LL')
      tempList.contentHtml = that.marked(String(tempList.content))
      return tempList
    }
  }
}
</script> 

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '/static/css/github-markdown.css'
.main 
  padding-right:300px;
  margin-bottom:20px;
  .show
    padding:20px;
    margin-right:20px;
    background:#fff;
    min-height:650px;
    h1
      font:normal 20px/80px 'microsoft yahei';
      color:#000;
      text-align:center;
    .tags
      background:#f5f5f5;
      color:#555;
      text-align:center;
      font:normal 14px/20px 'microsoft yahei';
      padding:10px;
      span
        padding:0 15px;
    .info
      padding-top:40px;
  
</style>
