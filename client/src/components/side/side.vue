<template>
  <div class="side minHide" >
   <div :class="fixedClass">
      <div class="sider">
      	<h1><span>社区</span></h1>
        <p>QQ群:151828462</p>
      </div>
      <v-tags></v-tags>
     </div>
   </div>
</template>

<script>
import Tags from '@/components/tags/tags'
export default {
  data () {
    return {
      fixedClass: ''
    }
  },
  components: {
    vTags: Tags
  },
  created: function () {
    let that = this
    window.addEventListener('scroll', winScroll)
    function winScroll (e) {
      if (document.body.scrollTop > 210) {
        that.fixedClass = 'fixed'
      } else {
        that.fixedClass = ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
.sider
  background:#fff;
  position:relative;
  padding:15px;
  margin-bottom:20px;
  h1
   font:normal 18px/30px 'microsoft yahei';
   border-bottom:1px solid #ccc;
   height:31px;
   span
    display:block;
    float:left;
    padding-right:15px;
    margin-bottom:-1px;
    border-bottom:1px solid #e77817;
.fixed
  position:fixed;
  top:0;
  width:300px;
</style>
