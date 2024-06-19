<template>
  <div class="title-cont">
    <!-- <div class="skew-line"></div> -->
    <div class="title-main" :class="{ cover: isCover }">
      <span class="title-text">{{ text }}</span>
      <img class="icon-arrow" src="@/assets/arrow.png" />
    </div>
    <!-- <span class="title-line"></span>
    <span class="title-line"></span> -->
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '标题',
    },
    isCover: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.title-cont {
  display: flex;
  margin-top: 40px;
}
.skew-line {
  width: 5px;
  height: 34px;
  background: #0086f9;
  transform: rotate(-30deg);
  margin-right: 10px;
}
.title-main {
  background: url('~@/assets/bg-title.png') center;
  background-repeat: no-repeat;
  flex: 1;
  text-align: left;
  padding-left: 60px;
}
.cover {
  background-size: cover;
}
.title-main1 {
  position: relative;
  width: 416px;
  height: 36px;
  background: linear-gradient(135deg, rgba(0, 129, 250, 0.14) 0%, rgba(28, 30, 45, 0.14) 100%);
  border-bottom-left-radius: 20px;
  overflow: hidden;
  text-align: left;
  padding-left: 30px;
  // border-left: 1px solid;
  // border-bottom: 1px solid;
  // border-image: linear-gradient(135deg, rgba(0, 187, 253, 1), rgba(25, 27, 42, 1)) 1 1;
  // clip-path: inset(0 round 30px);
  // &::after {
  //   content: '';
  //   width: 416px;
  //   height: 36px;
  //   position: absolute;
  //   top: 50%;
  //   left: 50%;
  //   // top: 80px;
  //   // left: 50%;
  //   transform: translate(-50%, -50%);
  //   border-bottom-left-radius: 30px;
  //   border-left: 30px solid;
  //   border-image: linear-gradient(135deg, rgba(0, 187, 253, 1), rgba(25, 27, 42, 1)) 1 1;
  // }
}
.title-text {
  display: inline-block;
  vertical-align: middle;
  max-width: 380px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  // text-shadow: 0 0 10px rgb(248, 245, 245);
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  line-height: 36px;
  letter-spacing: 4px;
  text-shadow: 0px 2px 4px #0086f9;
  margin-right: 10px;
}
.icon-arrow {
  width: 16px;
  vertical-align: middle;
}
.title-line {
  width: 1px;
  height: 32px;
  background: #0086f9;
  margin-left: 5px;
}
</style>
