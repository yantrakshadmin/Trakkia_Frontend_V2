import { lazy } from 'react';

export const publicRoutes = [
  { Component: lazy(() => import('../components/SignInMaster/sign-in-master.component')), path: '/' },
  { Component: lazy(() => import('../components/forgetPassword')), path: '/forgot-password' },
  {
    Component: lazy(() => import('../components/confirmPassword')),
    path: '/confirm-password/:uname',
  },
  {
    Component: lazy(() => import('../components/SignUp/sign-up.component')),
    path: '/sign-up',
  },
  // {
  //   Component: lazy(() => import('../components/SignUp/sign-up-employee.component')),
  //   path: '/sign-up/employee/',
  // },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/employee/docket/:id',
    Component: lazy(() => import('components/Docket/Docket')),
  },
  {
    path: '/employee/return-docket/:id',
    key: 'return_docket',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
  },
];

export const extraRoutesClient = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/client/EditProfile.screen')),
  },
  {
    path: '/manage-profile/',
    Component: lazy(() => import('forms/manageUser.form')),
  },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/dashboard/',
    Component: lazy(() => import('screens/client/dashboard.screen')),
  },
 
];
export const outerRoutesEmployee = [
  {
    path: '/audit-access/',
    Component: lazy(() => import('screens/auditAccess'))
  },
  {
    path: '/docket/:id',
    Component: lazy(() => import('components/Docket/Docket')),
  },
  {
    path: '/return-docket/:id',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
  },
  {
    path: '/print-cp/:id',
    Component: lazy(() => import('components/printCP')),
  },
  {
    path: '/outward-docket/:id',
    Component: lazy(() => import('components/OutwardsDocket/outward-docket')),
  },
  {
    path: '/relocation-docket/:id',
    Component: lazy(() => import('components/RelocationDocket/RelocationDocket')),
  },
  {
    path: '/grn-barcode/',
    Component: lazy(() => import('components/GRN/barcodeContainer')),
  },
  {
    name: 'Purchase Order Print',
    path: '/purchase-order/:id',
    Component: lazy(() => import('screens/employee/GRNStuff/PurchaseOrderPrint')),
    props: {isEmployee: true},
  },
];
export const outerRoutesClient = [
  {
    path: '/return-docket/',
    Component: lazy(() => import('components/ReturnDocket/ReturnDocket')),
    props: { isClient: true },
  },
  {
    path: '/outward-docket/:id',
    Component: lazy(() => import('components/OutwardsDocket/outward-docket')),
  },
];

export const extraRoutesEmployee = [
  {
    path: '/edit-profile/',
    Component: lazy(() => import('screens/employee/EditProfile.screen')),
  },
  {
    path: '/manage-profile/',
    Component: lazy(() => import('forms/manageUser.form')),
  },
  {
    path: '/return-dockets/return/',
    Component: lazy(() => import('forms/return.form')),
  },
  {
    path: '*',
    Component: lazy(() => import('screens/404.screen')),
  },
  {
    path: '/create-allotment/',
    Component: lazy(() => import('forms/allotment.form')),
  },
  {
    path: '/edit-allotment/',
    Component: lazy(() => import('forms/allotment.form')),
  },
  {
    path: '/grn-barcode/',
    Component: lazy(() => import('components/GRN/barcodeContainer')),
  },
];

export const employeeRoutes = [
  {
    name: 'Dashboard',
    icon: ['fas', 'home'],
    path: '/dashboard/',
    Component: lazy(() => import('screens/employee/dashboard.screen')),
  },
  {
    name: 'Sales',
    key: 'sales',
    icon: ['fas', 'user-friends'],
    path: '/reports/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Leads',
        path: '/pfep/leads/',
        Component: lazy(() => import('screens/employee/Leads.screen')),
      },
      {
        name: 'SCS',
        path: '/pfep/scs/',
        Component: lazy(() => import('screens/employee/SCS.screen')),
      },
      {
        name: 'Technical Proposal',
        path: '/pfep/tp/',
        Component: lazy(() => import('screens/employee/TP.screen')),
      },
      // {
      //   name: 'PFEP',
      //   path: '/pfep/create/',
      //   Component: lazy(() => import('screens/employee/PFEP.screen')),
      // },
      {
        name: 'Commercial Proposal',
        path: '/cp/',
        Component: lazy(() => import('screens/employee/createCP.screen')),
      },
    ],
  },
  // {
  //   name: 'DEPS',
  //   icon: ['fas', 'ticket-alt'],
  //   path: '/deps/',
  //   isSubMenu: true,
  //   subMenu: [
  //     {
  //       name: 'Tickets',
  //       path: '/deps/tickets/',
  //       Component: lazy(() => import('screens/employee/Tickets.screen')),
  //     },
  //   ],
  // },
  {
    name: 'Masters',
    key: 'masters',
    icon: ['fas', 'layer-group'],
    path: '/masters/',
    Component: lazy(() => import('screens/employee/Product.employee.screen')),
    isSubMenu: true,
    subMenu: [
      {
        name: 'Products',
        key: 'masters_products',
        path: '/master/products/',
        Component: lazy(() => import('screens/employee/Product.employee.screen')),
      },
      {
        name: 'Kits',
        key: 'masters_kits',
        path: '/master/kits/',
        Component: lazy(() => import('screens/employee/Kit.employee.screen')),
      },
      {
        name: 'Flows',
        key: 'masters_flows',
        path: '/master/flows/',
        Component: lazy(() => import('screens/employee/Flow.screen')),
      },
      {
        name: 'Clients',
        key: 'masters_clients',
        path: '/clients/',
        Component: lazy(() => import('screens/superUser/clients.screen')),
      },
      // {
      //   name: 'Sender Clients',
      //   path: '/master/clients/',
      //   Component: lazy(() => import('screens/employee/Client.screen')),
      // },
      // {
      //   name: 'Receiver Clients',
      //   path: '/master/receiver-clients/',
      //   Component: lazy(() => import('screens/employee/ReceiverClient.screen')),
      // },
      {
        name: 'Warehouses',
        key: 'masters_warehouses',
        path: '/master/warehouses/',
        Component: lazy(() => import('screens/employee/Warehouse.employee.screen')),
      },
      {
        name: 'Vendors',
        key: 'masters_vendors',
        path: '/master/vendors/',
        Component: lazy(() => import('screens/employee/Vendors.screen')),
      },
    ],
  },
  {
    name: 'Volume Plan',
    key: 'volume_plan',
    icon: ['far', 'calendar-alt'],
    path: '/demands/',
    Component: lazy(() => import('screens/employee/DemandModule.screen')),
  },
  {
    name: 'Material Requests',
    key: 'material_request',
    icon: ['fas', 'notes-medical'],
    path: '/material-request/',
    Component: lazy(() => import('screens/employee/MaterialRequest.screen')),
  },
  {
    name: 'Allotment Dockets',
    key: 'allotment_docket',
    icon: ['fas', 'truck-loading'],
    path: '/allotment-dockets/',
    Component: lazy(() => import('screens/employee/AllotmentDockets.screen.js')),
  },
  {
    name: 'Outward Docket',
    key: 'outward_docket',
    icon: ['fas', 'sign-out-alt'],
    path: '/outward-docket/',
    Component: lazy(() => import('screens/employee/outwardDocket.screen')),
    props: { isEmployee: true },
  },
  {
    name: 'Return Dockets',
    key: 'return_docket',
    icon: ['fas', 'undo-alt'],
    path: '/return-dockets/',
    Component: lazy(() => import('screens/employee/Return.screen')),
  },
  {
    name: 'Relocation Docket',
    key: 'relocation_docket',
    icon: ['fas', 'money-check-alt'],
    path: '/relocation/',
    Component: lazy(() => import('screens/employee/Relocation.screen')),
    props: { isEmployee: true },
  },
  {
    name: 'GRN',
    key : 'grn',
    icon: ['fas', 'cart-arrow-down'],
    path: '/grn/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Purchase Order',
        path: '/grn/purchase-orders',
        Component: lazy(() => import('screens/employee/PurchaseOrders')),
        props: {isEmployee: true},   
      },
      {
        name: 'GRN',
        key: 'grn',
        path: '/grn/grns',
        Component: lazy(() => import('screens/employee/GRN.screen')),
        props: { isEmployee: true },
      },
      {
        name: 'Regenerate Barcodes',
        path: '/grn/regenerate-grn',
        Component: lazy(() => import('screens/employee/GRNStuff/RegenerateGRN.screen')),
        props: { isEmployee: true },
      },
      {
        name: 'End Of Life',
        path: '/grn/end-of-life-grn',
        Component: lazy(() => import('screens/employee/GRNStuff/EndOfLife.screen')),
        props: { isEmployee: true },
      },
    ],
  },
  // {
  //   name: 'Inventory',
  //   icon: ['fas', 'boxes'],
  //   path: '/inventory/',
  //   Component: lazy(() => import('screens/employee/inventory.screen')),
  // },
  {
    name: 'Inventory',
    key: 'inventory',
    icon: ['fas', 'boxes'],
    path: '/main-inventory/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Warehouse Inventory',
        path: '/main-inventory/yantra-inventory/',
        Component: lazy(() => import('screens/employee/yantraInventory.screen.employee')),
      },
      {
        name: 'InTransits',
        path: '/main-inventory/inventory-in-transits/',
        Component: lazy(() => import('screens/employee/transitInventory.screen')),
      },
      {
        name: 'Sender Client',
        path: '/main-inventory/inventory-clients/',
        Component: lazy(() => import('screens/employee/scInventoryMain.screen')),
      },
      // {
      //   name: 'Sender Client',
      //   path: '/main-inventory/inventory-clients/',
      //   Component: lazy(() => import('screens/employee/clientInventory.screen')),
      // },
      // {
      //   name: 'Sender Client II',
      //   path: '/main-inventory/sc-inventory-2/',
      //   Component: lazy(() => import('screens/employee/clientInventory2.screen')),
      // },
      {
        name: 'Receiver Client',
        path: '/main-inventory/inventory-rclients/',
        Component: lazy(() => import('screens/employee/rcInventoryMain.screen')),
      },
      
      // {
      //   name: 'Receiver Client',
      //   path: '/main-inventory/inventory-rclients/',
      //   Component: lazy(() => import('screens/employee/receiverClientInventory.screen')),
      // },
      // {
      //   name: 'Receiver Client II',
      //   path: '/main-inventory/rc-inventory-2/',
      //   Component: lazy(() => import('screens/employee/receiverClientInventory2.screen')),
      // },
      // {
      //   name: 'Adjustments',
      //   path: '/main-inventory/adjustments/',
      //   Component: lazy(() => import('screens/employee/adjustmentInventory.screen')),
      //   props: {isEmployee: true},
      // },
    ],
  },
  {
    name: 'Adjustments Inventory',
    icon: ['fas', 'boxes'],
    path: '/adjustments-inventory/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Warehouse Adjustments',
        path: '/adjustments-inventory/adjustments/',
        Component: lazy(() => import('screens/employee/adjustmentInventory.screen')),
        props: { isEmployee: true },
      },
      {
        name: 'Sender Client Adjustments',
        path: '/adjustments-inventory/sc-adjustments/',
        Component: lazy(() => import('screens/employee/adjustmentSCInventory.screen')),
        props: { isEmployee: true },
      },
      {
        name: 'Receiver Client Adjustments',
        path: '/adjustments-inventory/rc-adjustments/',
        Component: lazy(() => import('screens/employee/adjustmentRCInventory.screen')),
        props: { isEmployee: true },
      },
    ],
  },
  {
    name: 'Expense',
    key: 'expense',
    icon: ['fas', 'money-check-alt'],
    path: '/expense/',
    Component: lazy(() => import('screens/employee/Expense.screen')),
    props: { isEmployee: true },
  },
  {
    name: 'Reports',
    icon: ['fas', 'chart-pie'],
    path: '/reports/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Volume Plan',
        key: 'volume_plan_report',
        path: '/reports/demands/',
        Component: lazy(() => import('components/Reports/Demand.js')),
      },
      {
        name: 'Allotments',
        key: 'allotments_report',
        path: '/reports/allotments/',
        Component: lazy(() => import('components/Reports/Allotment.js')),
      },
      {
        name: 'Returns',
        key:'returns_report',
        path: '/reports/returns/',
        Component: lazy(() => import('components/Reports/Return.js')),
      },
      {
        name: 'Outwards',
        key: 'outwards_report',
        path: '/reports/outwards/',
        Component: lazy(() => import('components/Reports/Outward.js')),
      },
      {
        name: 'Floating',
        key: 'floating_report',
        path: '/reports/stocking/',
        Component: lazy(() => import('components/Reports/Stocking.js')),
      },
      // {
      //   name: 'GRN Count',
      //   path: '/reports/grn-count/',
      //   Component: lazy(() => import('components/Reports/grnCount')),
      // },
      // {
      //   name: 'Allotment Count',
      //   path: '/reports/allotment-count/',
      //   Component: lazy(() => import('components/Reports/allotmentCount')),
      // },
      // {
      //   name: 'Return Count',
      //   path: '/reports/return-count/',
      //   Component: lazy(() => import('components/Reports/returnCount')),
      // },
      {
        name: 'Loss/Excess',
        key: 'loss_excess_report',
        key: 'loss_excess',
        path: '/reports/loss-excess/',
        Component: lazy(() => import('components/Reports/LossExcess.js')),
      },
      {
        name: 'Report-beta',
        key: 'report_beta',
        path: '/reports/report-beta/',
        Component: lazy(() => import('components/Reports/Report-beta.js')),
      },
      {
        name: 'Missing Audit',
        key: 'missing_audit_report',
        path: '/reports/missing-audit/',
        Component: lazy(() => import('components/Reports/MissingAudit.js')),
      },
      {
        name: 'Audit Summary',
        key: 'audit_summary_report',
        path: '/main-inventory/audit-summary/',
        Component: lazy(() => import('screens/employee/ScannedData.screen')),
      },
      {
        name: 'Consolidated Reports',
        key: 'consolidated_report',
        path: '/reports/consolidated-reports/',
        Component: lazy(() => import('components/Reports/AuditSummary.js')),
      },
      {
        name: 'Assets Life',
        // key: 'assets_life',
        path: '/reports/assets-life/',
        Component: lazy(() => import('components/Reports/AssetsLife.js')),
      },
    ],
  },
];

export const clientRoutes = [
  {
    name: 'Masters',
    key: 'masters',
    icon: ['fas', 'layer-group'],
    path: '/masters/',
    Component: lazy(() => import('screens/client/kits.screen')),
    isSubMenu: true,
    subMenu: [
      {
        name: 'Kits',
        icon: ['fas', 'layer-group'],
        path: '/kits/',
        Component: lazy(() => import('screens/client/kits.screen')),
      },
      {
        name: 'Flows',
        icon: ['fas', 'layer-group'],
        path: '/client-flows/',
        Component: lazy(() => import('screens/client/clientFlows.screen')),
      },
      {
        name: 'Clients',
        path: '/master/clients/',
        Component: lazy(() => import('screens/client/ReceiverClient.screen')),
      },
    ],
  },
  {
    name: 'Material Requests',
    key: 'material_request',
    icon: ['fas', 'notes-medical'],
    path: '/material-request/',
    Component: lazy(() => import('screens/client/MaterialRequest.screen')),
    props: { isEmployee: false },
  },
  {
    name: 'Volume Plan',
    key: 'volume_plan',
    icon: ['far', 'calendar-alt'],
    path: '/demands/',
    Component: lazy(() => import('screens/client/DemandModule.screen')),
  },
  {
    name: 'My Allotments',
    icon: ['fas', 'truck-loading'],
    path: '/allotments/',
    Component: lazy(() => import('screens/client/Allotments.screen')),
  },
  {
    name: 'Outward Docket',
    key: 'outward_docket',
    icon: ['fas', 'sign-out-alt'],
    path: '/outward-docket/',
    props: { isEmployee: false },
    Component: lazy(() => import('screens/client/outwardDocket.screen')),
  },
  {
    name: 'Return Docket',
    key: 'return_docket',
    icon: ['fas', 'chart-pie'],
    path: '/return-dockets/',
    Component: lazy(() => import('screens/client/returnReports.screen')),
  },
  {
    name: 'Inventory',
    icon: ['fas', 'boxes'],
    path: '/main-inventory/sc-inventory-2/',
    Component: lazy(() => import('screens/client/clientInventory2.screen')),
  },
  {
    name: 'Reports',
    icon: ['fas', 'chart-pie'],
    path: '/reports/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Volume Plans',
        key: 'volume_plan_report',
        path: '/reports/demands/',
        Component: lazy(() => import('components/Reports/DemandClientSide.js')),
      },
      {
        name: 'Allotments',
        key: 'allotments_report',
        path: '/reports/allotments/',
        Component: lazy(() => import('components/Reports/AllotmentClientSide.js')),
      },
      {
        name: 'Returns',
        key: 'returns_report',
        path: '/reports/returns/',
        Component: lazy(() => import('components/Reports/ReturnClientSide.js')),
      },
      {
        name: 'Outwards',
        key: 'outwards_report',
        path: '/reports/outwards/',
        Component: lazy(() => import('components/Reports/OutwardClientSide.js')),
      },
      {
        name: 'Floating',
        key: 'floating_report',
        path: '/reports/floating/',
        Component: lazy(() => import('components/Reports/StockingClientSide.js')),
      },
      {
        name: 'Loss/Excess',
        key: 'loss_excess_report',
        path: '/reports/loss-excess/',
        Component: lazy(() => import('components/Reports/LossExcessClientSide.js')),
      },
    ],
  },
];

export const superUserRoutes = [
  {
    name: 'Manage Resources',
    icon: ['fas', 'user-friends'],
    path: '/manage/',
    isSubMenu: true,
    subMenu: [
      {
        name: 'Users',
        path: '/manage/users/',
        Component: lazy(() => import('screens/superUser/users.screen')),
      },
      {
        name: 'Groups',
        icon: ['fas', 'money-check-alt'],
        path: '/groups/',
        Component: lazy(() => import('screens/employee/Roles.screen')),
        props: { isEmployee: true },
      },
    ],
  },
 ];
export const extraRoutesSuperUser = [ ];
export const outerRoutesSuperUser = [ ];
