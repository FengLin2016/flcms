<template>
  <div class="header">
  	<p><img src="../../assets/logo.png" alt=""></p>
   	<ul class="nav">
   		<li><router-link :to="{path:'/home'}" > 首页</router-link></li>
   		<li><router-link :to="{path:'/about'}" >关于我</router-link></li>
   	</ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
.nav
  background: #fff; 
  font:normal 14px/56px 'microsoft yahei'; 
  text-align: center;
  li
    display: inline-block;
    padding:0 20px;
    .router-link-active
      border-bottom:1px solid #e77817;
      display:block;
.header
  p
    margin:0;
    text-align:center;
    img
      width:100px;
      background:#fff;
      height:100px;
      border-radius:50%;
      margin:15px 0;
</style>
