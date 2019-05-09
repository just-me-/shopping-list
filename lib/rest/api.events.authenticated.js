Router.route(
  "/api/event/:loginToken/:movie",
  function() {
    if (this.params.loginToken && this.params.movie) {
      if (
        Meteor.users.findOne({
          "services.resume.loginTokens": this.params.loginToken
        })
      ) {
        this.response.statusCode = 200;
        this.response.setHeader("Content-Type", "application/json");
        this.response.setHeader("Access-Control-Allow-Origin", "*");
        this.response.setHeader(
          "Access-Control-Allow-Headers",
          "Origin, X-Requested-With, Content-Type, Accept"
        );

        if (this.request.method == "POST") {
          console.log("Do insert.... 2Do")
          //this.response.end(JSON.stringify(Posts.insert(this.request.body)));
        }
      } else {
        // they presented a login token, but we can't find it in the database
        this.response.statusCode = 401;
        this.response.end(
          "Unauthorized.  Login token not valid or not found.  Please login again."
        );
      }
    } else {
      // no loginToken, so we know that they can't be authorized
      this.response.statusCode = 401;
      this.response.end(
        "Unauthorized.  Authentication needed to access this resource.  Please login. (token + movie is missing)"
      );
    }
  },
  { where: "server" }
);
