const RBAC = require('rbac').RBAC;

const _rbac = new RBAC({
  roles: ['admin', 'user', 'guest'],
  permissions: {
    user: ['create', 'delete'],
    password: ['change', 'delete'],
  },
  grants: {
    admin: ['create_user', 'delete_user', 'change_password', 'delete_password'],
    user: ['change_password', 'delete_password'],
    guest: [],
  },
});
_rbac.init();

module.exports = options => {
  return async function rbac(ctx, next) {
    // await _rbac.init();
    // const guestRole = await _rbac.can('guest', 'create', 'user');
    // console.log('guestRole: ', guestRole);
    // const adminRole = await _rbac.can('admin', 'create', 'user');
    // console.log('adminRole: ', adminRole);
    const admin = await _rbac.getRole('admin');
    const can  = await admin.can('create', 'user');
    console.log('can: ', can);
    // const canAll = admin.canAll([]);
    await next();
  };
};
