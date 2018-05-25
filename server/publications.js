Meteor.publish( 'items', function() {
  return Items.find();
});
Meteor.publish( 'dinners', function() {
  return Dinners.find();
});
Meteor.publish( 'version', function () {
  return Version.find();
});
Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});
