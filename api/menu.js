const Menu = [
  {
    meta: {
      icon: 'mdi-cog-outline',
      title: 'Master',
      name: 'master',
      hiddenInMenu: false,
    },
    children: [
      {
        meta: {
          title: 'Satuan',
          icon: 'mdi-alpha-s-circle-outline',
          name: 'masterSatuan',
          hiddenInMenu: false,
        },
        path: '/master/satuan',
      },
      {
        meta: {
          title: 'Gudang',
          icon: 'mdi-alpha-g-circle-outline',
          name: 'masterGudang',
          hiddenInMenu: false,
        },
        path: '/master/gudang',
      },
    ],
  },
  {
    meta: {
      icon: 'mdi-cog-outline',
      title: 'Pengaturan',
      name: 'pengaturan',
      hiddenInMenu: false,
    },
    children: [
      {
        meta: {
          title: 'User',
          icon: 'mdi-alpha-p-circle-outline',
          name: 'pengaturanUser',
          hiddenInMenu: false,
        },
        path: '/pengaturan/user',
      },
      {
        meta: {
          title: 'Role',
          icon: 'mdi-alpha-p-circle-outline',
          name: 'pengaturanRole',
          hiddenInMenu: false,
        },
        path: '/pengaturan/role',
      },

    ],
  },
]

export default Menu
