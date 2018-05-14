Template.dinnerList.helpers({
  dinners: function() {
    return Dinners.find({}, {sort: {order_prio: 1}});
  }
});

Template.dinnerList.events({

});
