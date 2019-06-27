<!--
 * @Description: 找机手
 * @Author: chenchen
 * @Date: 2019-06-27 16:43:13
 * @LastEditTime: 2019-06-27 17:23:01
 -->
<template>
  <div id="findman">
    <!-- 找机手 -->
    <div class="navbar">
      <div class="navbar-location">
        <div>所在地</div>
        <div class="arrow"></div>
      </div>
      <div class="line"></div>
      <div class="work-type">
        <div>作业类型</div>
        <div class="arrow"></div>
      </div>
      <div class="line"></div>
      <div class="low-price">
        <div>价格最低</div>
        <div class="arrow"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
#findman {
  .navbar {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: #fff;
      height: 40px;
    .navbar-location,.work-type,.low-price {
        display: flex;
        justify-content: center;
        align-items: center;
     
    }
     .arrow {
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 8px solid #000;
        margin-left: 10px;
      }
    .line{
        height: 60%;
        width: 1px;
        background: #999;
      
    }
  }
}
</style>

