Template.layout.helpers( {
  version: function() { return Version.findOne(); }
});

Meteor.users.find({ "status.online": true }).observe({
  added: function(user) {
    toastr.options = {
      "closeButton": true,
      "progressBar": true,
      "positionClass": "toast-bottom-right",
      "preventDuplicates": true,
      "timeOut": "5800"
    }
    // id just came online
    if(Meteor.user()._id != user._id) {
      toastr.success(
        user.profile.first_name +" "+ user.profile.last_name +" kam gerade online.",
        user.profile.first_name+" online",
        {toastClass: "toast online-msg"}
      );
    }
  },
  removed: function(user) {
    // id just went offline
    toastr.success(
      user.profile.first_name +" "+ user.profile.last_name +" ging eben offline.",
      user.profile.first_name+" offline",
      {toastClass: "toast offline-msg"}
    );
  }
});
