<template>
  <div id="app">
    <AppHeader></AppHeader>
    <conversionHistory></conversionHistory>
    <loader v-if="showLoader"></loader>
    <error-warning-modal v-if="showErrorAndWarning" :warningFor="warningFor"></error-warning-modal>
  </div>
</template>

<script>
import Loader from './components/helpers/Loader';
import AppHeader from './components/AppHeader';
import conversionHistory from './components/ConversionHistory';
import ErrorWarningModal from './components/helpers/ErrorAndWarningModal';
import { subscribeEvent } from './common/Observer';
import * as Constants from './common/Constants';

export default {
  data() {
    return {
      showLoader: false,
      showErrorAndWarning: false
    }
  },
  methods: {
    showLoaderModal() {
      this.showLoader = true;
    },
    hideLoaderModal() {
      this.showLoader = false;
    },
    showErrorAndWarningModal(data) {
        console.log('called modal', data);
        this.warningFor = data;
        this.showErrorAndWarning = true;
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';

        let doc = document.documentElement;
        this.scrollPos = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    },
    closeProfileModal() {
        this.showErrorAndWarning = false;
        document.body.style.overflow = 'initial';
        document.body.style.position = 'unset';
        // console.log(this.scrollPos);
        // window.scrollTo(0, this.scrollPos);
    },
  },
  components: {
    Loader,
    AppHeader,
    conversionHistory,
    ErrorWarningModal,
  },
  created() {
    subscribeEvent(Constants.SHOW_LOADER, this.showLoaderModal);
    subscribeEvent(Constants.HIDE_LOADER, this.hideLoaderModal);
    subscribeEvent(Constants.SHOW_MODAL, this.showErrorAndWarningModal);
    subscribeEvent(Constants.CLOSE_MODAL, this.closeProfileModal);
  }
}
</script>


<style lang="scss">
@import "./assets/scss/fonts.scss";
@import "./assets/scss/global.scss";
@import "./assets/scss/button.scss";
</style>
