Router.route(
  "/api/login/:username/:password",
  function() {
    this.response.statusCode = 200;
    this.response.setHeader("Campaigns-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Campaigns-Type, Accept"
    );

    if (this.request.method === "GET") {
      if (!this.params.username) {
        this.response.end("Please specify a username.");
      } else if (!this.params.password) {
        this.response.end("Please specify a password.");
      } else {
        var loginResult = false;

        // make sure the user exists
        var user = Meteor.users.findOne({ username: this.params.username });
        if (!user) {
          this.response.statusCode = 403;
          this.response.end("User not found.");
        }

        if (!user.services.password.srp) {
          var passwordCheckResult = Accounts._checkPassword(user, this.params.password);

          if (passwordCheckResult.error) {
            this.response.statusCode = 403;
            this.response.end("Incorrect password.");
          }
        }
        var stampedLoginToken = Accounts._generateStampedLoginToken();

        Meteor.users.update(user._id, {
          $set: { "services.resume.loginToken": stampedLoginToken }
        });

        this.response.end(
          JSON.stringify({
            result: {
              userId: user._id,
              loginToken: stampedLoginToken.token
            }
          })
        );
      }
    } else {
      this.response.end("Please send as a GET request.");
    }
  },
  { where: "server" }
);
