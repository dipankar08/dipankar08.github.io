
/////////////// Uisng Vue ///////////////
var app = new Vue({
  el: '#app',
  data: {
    cur_page: "loading",

    // user info
    user: {
      "name": "Guest User",
      "email": "",
      "auth_token": "",
      "img": "https://img.icons8.com/cute-clipart/64/000000/user-male.png"
    },

    codersheet_pads: [
      { _id: 1, title: 'Test', status: 'unused', creator: 'dip', ts_insert: '10days', language: 'java' },
      { _id: 2, title: 'Test', status: 'unused', creator: 'dip', ts_insert: '10days', language: 'java' },
      { _id: 3, title: 'Test', status: 'unused', creator: 'dip', ts_insert: '10days', language: 'java' },
    ],
    auth_resp: null,
    simplestore_resp: {},
  },
  methods: {
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
  },
  computed: {

  },
  watch: {
    'notification': function (val) {

    }
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
            processNetworkResp(data);
            auth_resp = data;
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
  console.log(data)
}