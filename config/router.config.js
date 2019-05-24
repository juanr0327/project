export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', name: 'login', component: './User/Login' },
      { path: '/user/register', name: 'register', component: './User/Register' },
      {
        path: '/user/register-result',
        name: 'register.result',
        component: './User/RegisterResult',
      },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/dashboard/analysis' },
      {
        path: '/dashboard',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            component: './Dashboard/Analysis',
          },
         // {
           // path: '/dashboard/monitor',
          //  name: 'monitor',
         //   component: './Dashboard/Monitor',
         // },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            component: './Dashboard/Workplace',
          },
        ],
      },
      // forms
      {
        path: '/form',
        icon: 'form',
        name: 'form',
        authority: ['user'],
        routes: [
          {
            path: '/form/step-form',
            name: 'stepform',
            component: './Forms/StepForm',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/form/step-form',
                redirect: '/form/step-form/info',
              },
              {
                path: '/form/step-form/info',
                name: 'info',
                component: './Forms/StepForm/Step1',
              },
              {
                path: '/form/step-form/confirm',
                name: 'confirm',
                component: './Forms/StepForm/Step2',
              },
              {
                path: '/form/step-form/result',
                name: 'result',
                component: './Forms/StepForm/Step3',
              },
            ],
          },
        ],
      },
      // list
      {
        path: '/list',
        icon: 'table',
        name: 'list',
        routes: [
          {
            path: '/list/table-list',
            name: 'searchtable',
            component: './List/TableList',
            authority: ['user'],
          },
          {
            path: '/list/table-list2',
            name: 'searchtable2',
            component: './List/TableList2',
            authority: ['admin'],
          }
        ],
      },
      // Card
      {
        path: '/card',
        icon: 'table',
        name: 'card',
        authority: ['user'],
        routes: [
          {
            path: '/card/card-list',
            name: 'cardlist',
            component: './List/CardList',
          },
          {
            path: '/card/cardto-list',
            name: 'cardtolist',
            component: './List/CardtoList',
          },
    
        ],
      },
      {
        path: '/profile',
        name: 'profile',
        icon: 'profile',
        routes: [
          // profile
          {
            path: '/profile/basic',
            name: 'basic',
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/basic/:id',
            name: 'basic',
            hideInMenu: true,
            component: './Profile/BasicProfile',
          },
          {
            path: '/profile/advanced',
            name: 'advanced',
            authority: ['admin'],
            component: './Profile/AdvancedProfile',
          },
        ],
      },

      
      {
        // admin
        path: '/admin',
        icon: 'robot',
        name: 'admin',
        Routes: ['src/pages/Authorized'],
        authority: ['admin'],
        routes: [
          {
            path: '/admin/card-list',
            name: 'card-list',
            component: './Admin/CardList',
            hideChildrenInMenu: true,
          },
          {
            path: '/admin/cardto-list',
            name: 'cardto-list',
            component: './Admin/CardtoList',
            hideChildrenInMenu: true,
          },
          {
            path: '/admin/operator-table',
            name: 'operator-table',
            component: './Admin/Table',
            hideChildrenInMenu: true,
          },
          {
            path: '/admin/operator-card',
            name: 'operator-card',
            component: './Admin/opcard',
            hideChildrenInMenu: true,
            hideInMenu: true
          },
        ],
      },
      {
        name: 'account',
        icon: 'user',
        path: '/account',
        routes: [
          {
            path: '/account/center',
            name: 'center',
            component: './Account/Center/Center',
            authority: ['user'],
            routes: [
              {
                path: '/account/center',
                redirect: '/account/center/articles',
              },
              {
                path: '/account/center/articles',
                component: './Account/Center/Articles',
              },
              {
                path: '/account/center/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/center/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/macenter',
            name: 'macenter',
            component: './Account/Center/maCenter',
            authority: ['admin'],
            routes: [
              {
                path: '/account/macenter',
                redirect: '/account/macenter/maarticles',
              },
              {
                path: '/account/macenter/maarticles',
                component: './Account/Center/MaArticles',
              },
              {
                path: '/account/macenter/applications',
                component: './Account/Center/Applications',
              },
              {
                path: '/account/macenter/projects',
                component: './Account/Center/Projects',
              },
            ],
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: './Account/Settings/Info',
            routes: [
              {
                path: '/account/settings',
                redirect: '/account/settings/base',
              },
              {
                path: '/account/settings/base',
                component: './Account/Settings/BaseView',
              },
              {
                path: '/account/settings/security',
                component: './Account/Settings/SecurityView',
              },
              {
                path: '/account/settings/binding',
                component: './Account/Settings/BindingView',
              },
              {
                path: '/account/settings/notification',
                component: './Account/Settings/NotificationView',
              },
            ],
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
