<template>
    <div class="header clearfix">
        <div class="headerLogo fLeft w50"><a class="logo"><img src="../assets/img/headerImg.png" /></a></div>
        <div class="headerContent fLeft w50">
            <a href="javascript:void(0)" >Hello {{name}}</a>
        </div>
    </div>
</template>
<script>
 
export default {

     data() {
      return {
          name: 'ram',
      };
  },

 methods: {
   
    }
}
</script>
<style lang="scss" scoped>
    .header {
        overflow: hidden;
        background-color: #f1f1f1;
        padding: 16px 20px;
        .fRght{float:right;}
        .fLeft{float:left;}
        .w50{width:50%;}
        .headerLogo{height:45px;line-height:45px;
        a{height:45px;width:45px;
            img{height:45px;width:45px;}}
            
        }
        .headerContent{height:45px;line-height:45px;
            text-align:right;
            a{
                font-size: 14px;
                line-height: 14px;
                color: #fff;
                text-decoration:none;
                background: #01796F;
                border: 1px solid #01796F;
                border-radius: 4px;
                padding: 6px 8px;
                text-transform: uppercase;
                &:hover{   
                     background-color: #00A572;
                     border-color: #00A572;}
            }
        }
    }
    .clearfix::after{
        content:'';
        clear:both;
        height:0px;

    }
</style>
