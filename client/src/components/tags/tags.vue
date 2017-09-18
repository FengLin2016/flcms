<template>
	<div class="sider">
		<h1><span>标签云</span></h1>
		<div class="tags">
			<router-link :key="tag" v-for="tag in tags"  :to="{ path: '/home/' + tag }">{{tag}}</router-link>
		</div>
	</div>
</template>

<script>
export default {
  name: 'tags',
  data () {
    return {
      tags: []
    }
  },
  created () {
    this.loading()
  },
  methods: {
    loading () {
      this.$http.get('http://47.94.95.106:3300/api/tags').then(res => {
        this.tags = res.data
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tags
  overflow:hidden;
  a
   padding:5px 15px;
   float:left;
   background:#007cc3;
   color:#fff;
   margin:15px 15px 0 0;
   &:hover,&.router-link-exact-active
     background:#e77817;
</style>