Vue.component('requesterror', {
  data() {
    return {
      errorVisible: false,
      errorMsg: '',
    }
  },
  methods: {
    showErrMsg(error) {
      this.errorMsg = `Server sent error: ${error}`;
      if (error !== '') {
        this.errorVisible = true;

      }
    }
  },
  template: `<span class="error" 
              :errorMsg="errorMsg"
              v-if="this.errorVisible === true">
              {{errorMsg}}
              </span>`,
})