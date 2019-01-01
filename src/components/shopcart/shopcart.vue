<template lang="html">
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight': totalCount > 0}">
            <span class="icon-shopping_cart" :class="{'highlight': totalCount > 0}"></span>
          </div>
          <div class="num" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{'highlight': totalPrice > 0}">¥ {{ totalPrice }}</div>
        <div class="desc">另需配送费¥ {{ deliveryPrice }} 元</div>
      </div>
      <div class="content-right">
        <div class="pay" @click.stop.prevent="pay" :class="{'highlight': totalPrice >= minPrice}">{{ payDesc }}</div>
      </div>
    </div>
    <!-- <div class="ball-container"> -->
      <!-- <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"> -->
        <!-- <div class="ball" v-for="(ball, index) in balls" :key="index" v-show="ball.show" v-bind:css="false">
          <div class="inner inner-hook"></div>
        </div> -->
      <!-- </transition> -->
    <!-- </div> -->
    <transition name="fold">
      <div class="shopcart-list" v-show="listShow" :key="fold">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="(food, index) in selectFoods" v-bind:key="index">
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>¥ {{ food.price * food.count }}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade-mask">
      <div class="list-Musk" @click="hideList" v-show="listShow"></div>
    </transition>
    <transition name="pay-info">
      <div class="payInfo" v-show="payShow">
        <p class="pay-desc">总共需要支付 {{ this.totalPrice }} 元</p>
        <button class="payBtn" type="button" name="button">确 定</button>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';

export default {
 props: {
   selectFoods: {
     type: Array,
     default () {
       return [];
     }
   },
   deliveryPrice: {
     type: Number,
     default: 0
   },
   minPrice: {
     type: Number,
     default: 0
   }
 },
 data () {
   return {
     fold: false,
     payShow: false
     // balls: [
     //   {show: false},
     //   {show: false},
     //   {show: false},
     //   {show: false},
     //   {show: false}
     // ],
     // dropBalls: [],
   };
 },
 components: {
   cartcontrol
 },
 computed: {
   totalPrice () {
     let total = 0;
     this.selectFoods.forEach((food) => {
       total += food.price * food.count;
     });
     return total;
   },
   totalCount () {
     let count = 0;
     this.selectFoods.forEach((food) => {
       count += food.count;
     });
     return count;
   },
   payDesc () {
     if (this.totalPrice === 0) {
       return `¥ ${this.minPrice} 元起送`;
     } else if (this.totalPrice < this.minPrice) {
       let diff = this.minPrice - this.totalPrice;
       return '还差¥ ' + diff + ' 元起送';
     } else if (this.totalPrice >= this.minPrice) {
       return '去结算';
     }
   },
   listShow () {
     if (!this.totalCount) {
       this.fold = true;
       return false;
     }
     let show = !this.fold;
     if (show) {
       this.$nextTick(() => {
         if (!this.scroll) {
           this.scroll = new BScroll(this.$refs.listContent, {
             click: true
           });
         } else {
           this.scroll.refresh();
         }
       });
     }
     return show;
   }
 },
 methods: {
   toggleList () {
     if (!this.totalCount) {
       return false;
     }
     this.fold = !this.fold;
     this.payShow = false;
   },
   empty () {
     this.selectFoods.forEach((food) => {
       food.count = 0;
     });
   },
   hideList () {
     this.fold = true;
     this.payShow = false;
   },
   pay () {
     if (this.totalPrice < this.minPrice) {
       return;
     }
     this.payShow = true;
     this.fold = false;
   }
 }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin';
.shopcart
  position: fixed
  left: 0
  bottom: 0
  z-index: 50
  width: 100%
  height: 48px
  background-color: #000
  .content
     display: flex
     font-size: 0
     background: #141d27
     .content-left
       flex: 1
       .logo-wrapper
         display: inline-block
         position: relative
         top: -10px
         margin: 0 12px
         padding: 6px
         width: 56px
         height: 56px
         box-sizing: border-box
         vertical-align: top
         border-radius: 50%
         background: #141d27
         .logo
           width: 100%
           height: 100%
           border-radius: 50%
           text-align: center
           background: #2b343c
           &.highlight
             background: rgb(0, 160, 220)
           .icon-shopping_cart
             line-height: 44px
             font-size: 24px
             color: #80858a
             &.highlight
               color: #fff
         .num
           position: absolute
           top: 0
           right: 0
           width: 24px
           height: 16px
           line-height: 16px
           text-align: center
           border-radius: 16px
           font-size: 9px
           font-weight: 700
           color: #f3f5f7
           background: rgb(240, 20, 20)
           box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
       .price
         display: inline-block
         vertical-align: top
         margin-top: 12px
         line-height: 24px
         padding-right: 12px
         box-sizing: border-box
         border-right: 1px solid rgba(255, 255, 255, 0.1)
         font-size: 16px
         font-weight: 700
         color: rgba(255, 255, 255, 0.4)
         &.highlight
           color: #fff
       .desc
         display: inline-block
         vertical-align: top
         margin: 12px 0 0 12px
         line-height: 24px
         color: rgba(255, 255, 255, 0.4)
         font-size: 10px
     .content-right
       flex: 0 0 105px
       width: 105px
       .pay
         height: 48px
         line-height: 48px
         text-align: center
         font-size: 12px
         font-weight: 700
         background: #2b333b
         color: rgba(255, 255, 255, 0.4)
         &.highlight
           background: #00b43c
           color: #fff
  .ball-container
    .ball
      position: fixed
      left: 32px
      bottom: 22px
      z-index: 900
      transform: translate3d(0,0,0)
      transition: all 0.6s cubic-bezier(0.49,-0.29,0.75,0.41)  //这个很重要，要变成曲线就需要这个贝赛尔曲线
      .inner
        width: 16px
        height: 16px
        border-radius: 100%
        background: rgb(0,160,220)
        transition: all 0.6s linear
        transform: translate3d(0,0,0)
  .shopcart-list
    position: absolute
    top: 0
    left: 0
    z-index: -1
    width: 100%
    transition: all 0.3s linear
    transform: translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active
      transition: all 0.3s linear
    &.fold-enter, &.fold-leave-to
      transform: translate3d(0, 0, 0)
    .list-header
      height: 40px
      line-height: 40px
      padding: 0 18px
      background: #f3f5f7
      border-bottom: 1px solid rgba(7, 17, 27, 0.1)
      .title
        float: left
        font-size: 14px
        color: rgb(7, 17, 27, 0.1)
      .empty
        float: right
        font-size: 12px
        color: rgb(0, 160, 220)
    .list-content
      padding: 0 18px
      max-height: 217px
      overflow: hidden
      background: #fff
      .food
        position: relative
        padding: 12px 0
        box-sizing: border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height: 24px
          font-size: 14px
          color: rgb(7, 17, 27)
        .price
          position: absolute
          right: 90px
          bottom: 12px
          font-size: 14px
          line-height: 24px
          font-weight: 700
          color: rgb(240, 20, 20)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 6px
  .list-Musk
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: -2
    background: rgba(7, 17, 27, 0.6)
    backdrop-filter: blur(10px)
    transition: all 0.3s linear
    &.fade-mask-enter-active
      opacity: 1
    &.fade-mask-enter, &.fade-mask-leave-to
      opacity: 0
  .payInfo
    position: fixed
    top: 50%
    left: 50%
    margin-left: -150px
    margin-top: -50px
    width: 300px
    height: 100px
    overflow: hidden
    text-align: center
    background: #fff
    border-radius: 5px
    z-index: -1
    transition: all 0.3s linear
    &.pay-info-enter-active, &.pay-info-leave-active
      opacity: 1
    &.pay-info-enter, &.pay-info-leave-to
      opacity: 0
    .pay-desc
      line-height: 59px
      font-size: 18px
      text-align: center
    .payBtn
      width: 100%
      height: 41px
      margin-bottom: 0
      font-size: 16px
      line-height: 41px
      font-weight: 500
      color: #fff
      font-family: Arial
      background: rgb(0, 160, 220)
      border: 0
      border-radius:0 0 5px 5px
</style>
