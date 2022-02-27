const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {},
  methods: {
    getJson(url) {
      console.log('from getJson')
      return fetch(url)
        .then(result => result.json())
        .catch(error => {
          this.$refs.requesterror.showErrMsg(error);
        })
    },
    postJson(url, data) {
      return fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(result => result.json())
        .catch(error => {
          this.$refs.requesterror.showErrMsg(error);
        });
    },
    putJson(url, data) {
      return fetch(url, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(result => result.json())
        .catch(error => {
          this.$refs.requesterror.showErrMsg(error);
        });
    },
    deleteJson(url, data) {
      return fetch(url, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).then(result => result.json())
        .catch(error => {
          this.$refs.requesterror.showErrMsg(error);
        });
    },
  },

  computed: {},
  beforeCreate() { },
  created() { },
  beforeMount() { },
  mounted() {
  },
  beforeUpdate() { },
  updated() { },
  beforeDestroy() { },
  destroyed() { },
});
