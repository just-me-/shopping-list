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

    console.log("U calles login...", this.request.method, this.params.username, this.params.password);

    if (this.request.method === "POST") {
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
          $push: { "services.resume.loginTokens": stampedLoginToken }
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
    } else if (this.request.method == "OPTIONS") {
      this.response.setHeader(
        "Access-Control-Allow-Methods",
        "POST, PUT, GET, DELETE, OPTIONS"
      );
      this.response.end(
        "OPTIONS Response, as per the Cross-Origin Resource Sharing standard."
      );
    } else {
      this.response.end("Please send as a POST request.");
    }
  },
  { where: "server" }
);
