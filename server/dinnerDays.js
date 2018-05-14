// at this moment we do not need a history so we have those fix days
if (Dinners.find().count() === 0) {
  Dinners.insert({
    day: 'Montag',
    order_prio: 1
  });
  Dinners.insert({
    day: 'Dienstag',
    order_prio: 2
  });
  Dinners.insert({
    day: 'Mittwoch',
    order_prio: 3
  });
  Dinners.insert({
    day: 'Donnerstag',
    order_prio: 4
  });
}
