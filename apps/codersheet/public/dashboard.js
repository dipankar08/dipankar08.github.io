
/////////////// Uisng Vue ///////////////
var app = new Vue({
  el: '#app',
  data: {
    cur_page: "loading",
    cur_dialog: null,

    // user info
    user: {
      "name": "Guest User",
      "email": "",
      "auth_token": "",
      "img": "https://img.icons8.com/cute-clipart/64/000000/user-male.png"
    },
    new_pad: {},
    codersheet_pads: [],
    auth_resp: null,
    simplestore_resp: {},
    session_resp: []
  },

  methods: {


    loadPads() {
      $.ajax("https://simplestore.dipankar.co.in:8443/api/codersheet_pads/", {
        data: JSON.stringify({
          auth_token: app.user.auth_token
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processNetworkResp(data);
          if (data.out) {
            app.codersheet_pads = data.out;
          }
        },
        error: function () {
          processNetworkResp(data);
        }
      })
    },


    createPad() {
      this.new_pad.author = this.user.email
      this.new_pad.auth_token = $.cookie('auth_token')
      this.new_pad.status ='unused'
      $.ajax("https://simplestore.dipankar.co.in:8443/api/codersheet_pads/insert", {
        data: JSON.stringify(this.new_pad),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processNetworkResp(data);
          app.loadPads()
          app.cur_dialog = null;
        },
        error: function () {
          processNetworkResp(data);
        }
      })
    },


    tryMailLogin() {
      $.ajax("https://simplestore.dipankar.co.in:8443/api/auth2/mail_token", {
        data: JSON.stringify({
          email: app.user.email,
          template: `
Hi there,

Thanks for joining CoderSheet.com!

We know that remebering password is hard thing to do, that's why do not support password login.

Please click in the below link to login. 

https://codersheet-b59fa.web.app/dashboard.html?token={token}

Please note that:
a) This link will work only one time.
b) This will be valid for 1hrs from now.

Thanks,
CoderSheet Team.
`
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processNetworkResp(data)
          app.auth_resp = data;
        },
        error: function (data) {
          processNetworkResp(data)
        }
      })
    },


    invite_send() {
      $.ajax("https://simplestore.dipankar.co.in:8443/api/utils/email", {
        data: JSON.stringify({
          to: app.invite_email,
          'subject': 'You are invited to the coder sheet',
          'body': `Please click the link ${app.getLink()} to join the codersheet now!`
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processSimpleStoreResp(data);
          app.auth_resp = data;
        },
        error: function () {

        }
      })
    },



    logout() {
      $.ajax("https://simplestore.dipankar.co.in:8443/api/auth2/logout", {
        data: JSON.stringify({
          auth_token: app.user.auth_token
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processNetworkResp(data);
          $.cookie('auth_token', '')
          app.auth_resp = data;
          app.cur_page = 'login'
        },
        error: function () {
          processNetworkResp(data);
          $.cookie('auth_token', '')
          app.cur_page = 'login'
        }
      })
    },



    logout_all() {
      $.ajax("https://simplestore.dipankar.co.in:8443/api/auth2/logout_all", {
        data: JSON.stringify({
          auth_token: app.user.auth_token
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processNetworkResp(data);
          $.cookie('auth_token', '')
          app.auth_resp = data;
          app.cur_page = 'login'
        },
        error: function () {
          processNetworkResp(data);
          $.cookie('auth_token', '')
          app.cur_page = 'login'
        }
      })
    },


    loadSession() {
      $.ajax("https://simplestore.dipankar.co.in:8443/api/auth2/me", {
        data: JSON.stringify({
          auth_token: app.user.auth_token
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          processNetworkResp(data);
          if (data.out) {
            app.session_resp = data.out
          }
        },
        error: function () {
          processNetworkResp(data);
        }
      })
    }
  },
  computed: {

  },

  watch: {
    'user.auth_token': function (val) {
      if (!val) {
        return
      }
      // auth Token chnages - 
      this.loadPads()
      this.loadSession()
    },
  },

  created() {
    // have Auth token
    if ($.cookie('auth_token')) {
      $.ajax("https://simplestore.dipankar.co.in:8443/api/auth2/login_by_session", {
        data: JSON.stringify({
          auth_token: $.cookie('auth_token')
        }),
        contentType: 'application/json',
        type: 'POST',
        success: function (data) {
          auth_resp = data;
          processNetworkResp(data);
          if (data.out) {
            app.user.auth_token = $.cookie('auth_token')
            app.user.email = data.out.email
            app.cur_page = "home"
          }
        },
        error: function () {
          processNetworkResp(data);
          app.cur_page = "login"
        }
      })
    } else {
      let token = new URL(window.document.location.href).searchParams.get('token');
      if (token) {
        $.ajax("https://simplestore.dipankar.co.in:8443/api/auth2/login_by_token", {
          data: JSON.stringify({
            token: token
          }),
          contentType: 'application/json',
          type: 'POST',
          success: function (data) {
            auth_resp = data;
            processNetworkResp(data);
            if (data.out) {
              app.user.auth_token = data.out.auth_token
              $.cookie('auth_token', app.user.auth_token)
              app.user.email = data.out.email
              app.cur_page = "home"
            } else {
              app.cur_page = "login"
            }
          },
          error: function () {
            processNetworkResp(data);
            app.cur_page = "login"
          }
        })
      } else {
        this.cur_page = "login"
      }
    }
    console.log("created");
  }
});

function processNetworkResp(data) {
  if (data) {
    app.simplestore_resp = data
    $('.notification').removeClass('hide');
    setTimeout(function () {
      $('.notification').addClass('hide');
    }, 10000);
  }
  console.log(JSON.stringify(data))
}