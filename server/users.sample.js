// Customise this file and move it to users.js
if (Meteor.users.find().count() === 0) {
  Accounts.createUser({
    username: 'jane',
    email: 'jane@example.com',
    password: 'janes_pwd',
    profile: {
      first_name: 'Jane',
      last_name: 'Doe',
      icon: 'heart', // select an icon from Bootstrap glyphicons
    }
  });
  Accounts.createUser({
    username: 'john',
    email: 'john@example.com',
    password: 'johns_pwd',
    profile: {
      first_name: 'John',
      last_name: 'Smith'
    }
  });
}
