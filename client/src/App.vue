<template>
  <div id="app">
    <v-header></v-header>  
    <div class="content">
      <v-side></v-side>
      <router-view></router-view>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import Header from '@/components/header/header'
import Side from '@/components/side/side'
import Footer from '@/components/footer/footer'
export default {
  name: 'app',
  components: {
    vHeader: Header,
    vSide: Side,
    vFooter: Footer
  }
}
</script>

<style>
@charset "utf-8";
/* CSS Document */
html, body { height: 100%; }
body  { min-height: 100%; margin: 0px auto; color: #555; font: normal 14px/1.5 Tahoma,"Lucida Grande",Verdana,"Microsoft Yahei",STXihei,hei; background: #ebebeb; }
img   { margin: 0px; border: 0px; }
ul,li,dl,dt,dd { margin: 0px; padding: 0px; list-style: none; }
a { color: #555; text-decoration: none; outline: 0 none; -webkit-tap-highlight-color:rgba(0,0,0,0); }
input,textarea,button { outline: 0 none; font: normal 14px/1.5 Tahoma,"Lucida Grande",Verdana,"Microsoft Yahei",STXihei,hei; box-sizing:border-box; }
input,textarea,select { resize: none; -webkit-appearance : none; }
h1,h2,h3,h4,h5,h6 { margin: 0px; padding: 0px; font-weight: normal; }
*{ -webkit-tap-highlight-color: transparent; }

.content{margin:0 auto; overflow: hidden;margin-top:20px;}
@media (max-width: 768px) {
  .content {
    width: 100%;
  }
  .main{
    padding: 0!important;
    margin-left: 20px;
  }
  .minHide{
    display: none;
  }
}
@media (min-width: 768px) {
  .content {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .content {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .content {
    width: 1170px;
  }
}

.side{width: 300px;float:right;}
</style>
