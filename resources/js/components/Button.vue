<template>
  <button :type="nativeType" :disabled="loading" :class="{
    [`btn-${type}`]: true,
    'btn-block': block,
    'btn-lg': large,
    'btn-loading': loading
  }" class="btn" :style="{ backgroundColor : backGroundColor, borderColor : theme.icons.color, color : textColor, borderRadius : btnBorderRadius }"
  >
    <slot />
  </button>
</template>

<!-- box-shadow : 0 0 0 .2rem !default rgba( , .25) !default -->

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'VButton',

  props: {
    type: {
      type: String,
      default: 'default'
    },

    nativeType: {
      type: String,
      default: 'submit'
    },

    loading: {
      type: Boolean,
      default: false
    },

    block: {
      type: Boolean,
      default: false
    },

    large: {
      type: Boolean,
      default: false
    }
  },
  computed : {

    ...mapGetters('tunepik', ['theme', 'button']),
    backGroundColor(){

      if(this.type === 'default') return ''
        else if(this.type === 'danger') return this.theme.colors.red
          else return (this.theme.icons.color == this.theme.colors.light ? this.theme.colors.blue : this.theme.icons.color)

      /*return this.type == 'default' ? '' : (this.theme.icons.color == this.theme.colors.light ? this.theme.colors.blue : this.theme.icons.color)*/
    },
    textColor : function(){
      
      if(this.type == 'default'){

        return this.theme.icons.color

      }

    },
    btnBorderRadius : function(){

      if(this.button.range >= 4 || this.button.range <= 20) return `${this.button.range}px`
        else if(this.button.range < 4) return 4 + 'px'
          else if (this.button.range > 20 ) return 20 + 'px'

    }

  }
};
</script>
