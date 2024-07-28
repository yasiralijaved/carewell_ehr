const { AbilityBuilder, Ability } = require('@casl/ability');

const defineAbilitiesFor = (user) => {
  const { can, build } = new AbilityBuilder(Ability);

  if (user.role === 'Admin') {
    can('manage', 'all');
  } else if (user.role === 'receptionist') {
    can('read', 'Patient');
    can('create', 'Patient');
  } else if (user.role === 'doctor') {
    can('read', 'Patient');
    can('update', 'Patient');
  } else if (user.role === 'patient') {
    can('read', 'Patient', { id: user.id });
  }

  return build();
};

module.exports = { defineAbilitiesFor };