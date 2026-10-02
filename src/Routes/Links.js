//System Admin Links
const SystemAdminLinks = [
  {
    menuName: "Dispute Cases",
    icon: "icon-doc-edit icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 1,
        name: "Pending Deletion Approvals",
        link: "/SystemAdmin/PendingDeletionApprovals",
        sttid: 12,
      },
      {
        key: 2,
        name: "View Delete Cases",
        link: "/SystemAdmin/ViewDeleteCases",
        sttid: 12,
      },
      // { key: 18, name: "User Audit", link: "/SystemAdmin/UserAudit" },
    ],
  },
  {
    menuName: "User Management",
    icon: "icon-manage-user mr-1 icon-size-one",
    ttid: 12,
    subMenu: [
      { key: 3, name: "Edit Users", link: "/SystemAdmin/EditUser", sttid: 12 },
    ],
  },
  {
    menuName: "Setup",
    icon: "icon-setting icon-size-one",
    ttid: 12,
    subMenu: [
      { key: 4, name: "Fraud Type", link: "/SystemAdmin/FraudType", sttid: 12 },
      { key: 5, name: "Source", link: "/SystemAdmin/Source", sttid: 12 },
      {
        key: 6,
        name: "Individual Involved",
        link: "/SystemAdmin/IndividualInvolved",
        sttid: 12,
      },
      { key: 7, name: "Channel", link: "/SystemAdmin/Channel", sttid: 12 },
      {
        key: 8,
        name: "Forged Documents",
        link: "/SystemAdmin/ForgedDocuments",
        sttid: 12,
      },
      {
        key: 9,
        name: "Fraud / Not A Fraud",
        link: "/SystemAdmin/Fraud-NotAFraud",
        sttid: 12,
      },
      {
        key: 10,
        name: "Company Segment",
        link: "/SystemAdmin/CompanySegment",
        sttid: 12,
      },
      {
        key: 11,
        name: "Holiday",
        link: "/SystemAdmin/Holiday",
        sttid: 12,
      },
      {
        key: 12,
        name: "Case Decision",
        link: "/SystemAdmin/CaseDecision",
        sttid: 12,
      },
      {
        key: 13,
        name: "Source of IB Channel Creation",
        link: "/SystemAdmin/SourceOfIB",
        sttid: 12,
      },
      { key: 14, name: "City", link: "/SystemAdmin/City", sttid: 12 },
      { key: 15, name: "Region", link: "/SystemAdmin/Region", sttid: 12 },
      {
        key: 16,
        name: "City And Region Mapping",
        link: "/SystemAdmin/CityAndRegionMapping",
        sttid: 12,
      },
      {
        key: 17,
        name: "Escalation Matrix",
        link: "/SystemAdmin/EscalationMatrix",
        sttid: 12,
      },
      {
        key: 18,
        name: "Approval Reasons",
        link: "/SystemAdmin/ApprovalReasons",
        sttid: 12,
      },
      {
        key: 19,
        name: "Rejection Reasons",
        link: "/SystemAdmin/RejectionReasons",
        sttid: 12,
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 20,
        name: "Credit Card Disputes",
        link: "/SystemAdmin/Reports/CreditCardDisputes",
        sttid: 12,
      },
      {
        key: 21,
        name: "Debit Card Disputes",
        link: "/SystemAdmin/Reports/DebitCardDisputes",
        sttid: 12,
      },
      {
        key: 22,
        name: "ADC Disputes",
        link: "/SystemAdmin/Reports/ADCDisputes",
        sttid: 12,
      },
      {
        key: 23,
        name: "Non API Disputes",
        link: "/SystemAdmin/Reports/NONAPIDisputes",
        sttid: 12,
      },
      {
        key: 24,
        name: "BB Konnect Disputes",
        link: "/SystemAdmin/Reports/BBKonnectDisputes",
        sttid: 12,
      },
      {
        key: 25,
        name: "Negative DataBase",
        link: "/SystemAdmin/Reports/NegativeDataBase",
        sttid: 12,
      },
      {
        key: 26,
        name: "Ageing MIS",
        link: "/SystemAdmin/Reports/AgeingMIS",
        sttid: 12,
      },
      {
        key: 27,
        name: "Region Wise Staff List",
        link: "/SystemAdmin/Reports/RegionWiseStaffList",
        sttid: 12,
      },
    ],
  },
];

//InvestigationOfficer
const InvestigationOfficer = [
  {
    menuName: "Dispute Cases",
    icon: "icon-doc-edit icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 1,
        name: "Search",
        link: "/DisputeCases/Search",
        sttid: 12,
      },
    ],
  },
  {
    menuName: "Credit Card Disputes",
    icon: "icon-card icon-size-one",
    ttid: 1,
    subMenu: [
      {
        key: 2,
        name: "Add / Edit",
        link: "/CreditCardDispute/AddEdit",
        sttid: 1,
      },
      {
        key: 3,
        name: "Search",
        link: "/CreditCardDispute/Search",
        sttid: 1,
      },
    ],
  },
  {
    menuName: "Debit Card Disputes",
    icon: "icon-card icon-size-one",
    ttid: 2,
    subMenu: [
      {
        key: 4,
        name: "Add / Edit",
        link: "/DebitCardDisputes/AddEdit",
        sttid: 2,
      },
      {
        key: 5,
        name: "Search",
        link: "/DebitCardDisputes/Search",
        sttid: 2,
      },
    ],
  },
  {
    menuName: "Alternate Delivery Channels Disputes",
    icon: "icon-channel icon-size-one",
    ttid: 3,
    subMenu: [
      {
        key: 6,
        name: "Add / Edit",
        link: "/ADCD/AddEdit",
        sttid: 3,
      },
      {
        key: 7,
        name: "Search",
        link: "/ADCD/Search",
        sttid: 3,
      },
    ],
  },
  {
    menuName: "Non API (E-Com) Disputes",
    icon: "icon-setting icon-size-one",
    ttid: 4,
    subMenu: [
      {
        key: 8,
        name: "Add / Edit",
        link: "/NONAPIDisputes/AddEdit",
        sttid: 4,
      },
      {
        key: 9,
        name: "Search",
        link: "/NONAPIDisputes/Search",
        sttid: 4,
      },
    ],
  },
  {
    menuName: "BB - Konnect Disputes",
    icon: "icon-konnect icon-size-one",
    ttid: 5,
    subMenu: [
      {
        key: 10,
        name: "Add / Edit",
        link: "/BBKonnect/AddEdit",
        sttid: 5,
      },
      {
        key: 11,
        name: "Search",
        link: "/BBKonnect/Search",
        sttid: 5,
      },
    ],
  },
  {
    menuName: "Negative Database",
    icon: "icon-database icon-size-one",
    ttid: 6,
    subMenu: [
      {
        key: 12,
        name: "Add / Edit",
        link: "/NegativeDatabase/AddEdit",
        sttid: 6,
      },
      {
        key: 13,
        name: "Search",
        link: "/NegativeDatabase/Search",
        sttid: 6,
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 14,
        name: "Credit Card Disputes",
        link: "/Reports/CreditCardDisputes",
        sttid: 1,
      },
      {
        key: 15,
        name: "Debit Card Disputes",
        link: "/Reports/DebitCardDisputes",
        sttid: 2,
      },
      {
        key: 16,
        name: "ADC Disputes",
        link: "/Reports/ADCDisputes",
        sttid: 3,
      },
      {
        key: 17,
        name: "Non API Disputes",
        link: "/Reports/NONAPIDisputes",
        sttid: 4,
      },
      {
        key: 18,
        name: "BB Konnect Disputes",
        link: "/Reports/BBKonnectDisputes",
        sttid: 5,
      },
      {
        key: 19,
        name: "Negative DataBase",
        link: "/Reports/NegativeDataBase",
        sttid: 6,
      },
      {
        key: 20,
        name: "Ageing MIS",
        link: "/Reports/AgeingMIS",
        sttid: 12,
      },
      {
        key: 21,
        name: "Region Wise Staff List",
        link: "/Reports/RegionWiseStaffList",
        sttid: 12,
      },
    ],
  },
];

//InvestigationManager
const InvestigationManager = [
  {
    menuName: "Dispute Cases",
    icon: "icon-doc-edit icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 1,
        name: "Pending Approvals",
        link: "/DisputeCases/PendingApprovals",
        sttid: 12,
      },
      {
        key: 2,
        name: "Search",
        link: "/DisputeCases/SearchDisputeCases",
        sttid: 12,
      },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 3,
        name: "Credit Card Disputes",
        link: "/Reports/CreditCardDisputes",
        sttid: 1,
      },
      {
        key: 4,
        name: "Debit Card Disputes",
        link: "/Reports/DebitCardDisputes",
        sttid: 2,
      },
      {
        key: 5,
        name: "ADC Disputes",
        link: "/Reports/ADCDisputes",
        sttid: 3,
      },
      {
        key: 6,
        name: "Non API Disputes",
        link: "/Reports/NONAPIDisputes",
        sttid: 4,
      },
      {
        key: 7,
        name: "BB Konnect Disputes",
        link: "/Reports/BBKonnectDisputes",
        sttid: 5,
      },
      {
        key: 9,
        name: "Negative DataBase",
        link: "/Reports/NegativeDataBase",
        sttid: 6,
      },
      {
        key: 10,
        name: "Ageing MIS",
        link: "/Reports/AgeingMIS",
        sttid: 12,
      },
      {
        key: 11,
        name: "Region Wise Staff List",
        link: "/Reports/RegionWiseStaffList",
        sttid: 12,
      },
    ],
  },
  // {
  //   menuName: "Reports",
  //   icon: "icon-files icon-size-one",
  //   ttid:12,
  //   subMenu: [
  //     {
  //       key: 3,
  //       name: "Credit Card Disputes",
  //       link: "/DisputeCases/CreditCardDisputes",
  //       sttid:1,
  //     },
  //     {
  //       key: 4,
  //       name: "Debit Card Disputes",
  //       link: "/DisputeCases/DebitCardDisputes",
  //       sttid:2,
  //     },
  //     {
  //       key: 5,
  //       name: "ADC Disputes",
  //       link: "/DisputeCases/ADCDisputes",
  //       sttid:3,
  //     },
  //     {
  //       key: 6,
  //       name: "Non API Disputes",
  //       link: "/DisputeCases/NONAPIDisputes",
  //       sttid:4,
  //     },
  //     {
  //       key: 7,
  //       name: "BB Konnect Disputes",
  //       link: "/DisputeCases/BBKonnectDisputes",
  //       sttid:5,
  //     },
  //     {
  //       key: 8,
  //       name: "Ageing MIS",
  //       link: "/DisputeCases/AgeingMIS",
  //       sttid:12,
  //     },
  //     {
  //       key: 9,
  //       name: "Region Wise Staff List",
  //       link: "/DisputeCases/RegionWiseStaffList",
  //       sttid:12,
  //     },
  //   ],
  // },
];

//QAManager
const QAManager = [
  {
    menuName: "Dispute Cases",
    icon: "icon-doc-edit icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 1,
        name: "Delete Dispute Cases",
        link: "/DisputeCases/DeleteDisputeCases",
        sttid: 12,
      },
    ],
  },
  {
    menuName: "Audit Trail",
    icon: "icon-search-list2 icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 2,
        name: "Audit Trail",
        link: "/QAM/AuditTrail",
        sttid: 12,
      },
      // { key: 18, name: "User Audit", link: "/SystemAdmin/UserAudit" },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 3,
        name: "Credit Card Disputes",
        link: "/Reports/CreditCardDisputes",
        sttid: 1,
      },
      {
        key: 4,
        name: "Debit Card Disputes",
        link: "/Reports/DebitCardDisputes",
        sttid: 2,
      },
      {
        key: 5,
        name: "ADC Disputes",
        link: "/Reports/ADCDisputes",
        sttid: 3,
      },
      {
        key: 6,
        name: "Non API Disputes",
        link: "/Reports/NONAPIDisputes",
        sttid: 4,
      },
      {
        key: 7,
        name: "BB Konnect Disputes",
        link: "/Reports/BBKonnectDisputes",
        sttid: 5,
      },
      {
        key: 8,
        name: "Negative DataBase",
        link: "/Reports/NegativeDataBase",
        sttid: 6,
      },
      {
        key: 9,
        name: "Ageing MIS",
        link: "/Reports/AgeingMIS",
        sttid: 12,
      },
      {
        key: 10,
        name: "Region Wise Staff List",
        link: "/Reports/RegionWiseStaffList",
        sttid: 12,
      },
    ],
  },
  // {
  //   menuName: "Reports",
  //   icon: "icon-files icon-size-one",
  //   subMenu: [
  //     {
  //       key: 2,
  //       name: "Credit Card Disputes",
  //       link: "/DisputeCases/CreditCardDisputes",
  //     },
  //     {
  //       key: 3,
  //       name: "Debit Card Disputes",
  //       link: "/DisputeCases/DebitCardDisputes",
  //     },
  //     {
  //       key: 4,
  //       name: "ADC Disputes",
  //       link: "/DisputeCases/ADCDisputes",
  //     },
  //     {
  //       key: 5,
  //       name: "Non API Disputes",
  //       link: "/DisputeCases/NONAPIDisputes",
  //     },
  //     {
  //       key: 6,
  //       name: "BB Konnect Disputes",
  //       link: "/DisputeCases/BBKonnectDisputes",
  //     },
  //     {
  //       key: 7,
  //       name: "Ageing MIS",
  //       link: "/DisputeCases/AgeingMIS",
  //     },
  //     {
  //       key: 8,
  //       name: "Region Wise Staff List",
  //       link: "/DisputeCases/RegionWiseStaffList",
  //     },
  //   ],
  // },
];

//MISManager
const MISManager = [
  {
    menuName: "Audit Trail",
    icon: "icon-search-list2 icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 1,
        name: "Audit Trail",
        link: "/MIS/AuditTrail",
        sttid: 12,
      },
      // { key: 18, name: "User Audit", link: "/SystemAdmin/UserAudit" },
    ],
  },
  {
    menuName: "Reports",
    icon: "icon-files icon-size-one",
    ttid: 12,
    subMenu: [
      {
        key: 2,
        name: "Credit Card Disputes",
        link: "/Reports/CreditCardDisputes",
        sttid: 1,
      },
      {
        key: 3,
        name: "Debit Card Disputes",
        link: "/Reports/DebitCardDisputes",
        sttid: 2,
      },
      {
        key: 4,
        name: "ADC Disputes",
        link: "/Reports/ADCDisputes",
        sttid: 3,
      },
      {
        key: 5,
        name: "Non API Disputes",
        link: "/Reports/NONAPIDisputes",
        sttid: 4,
      },
      {
        key: 6,
        name: "BB Konnect Disputes",
        link: "/Reports/BBKonnectDisputes",
        sttid: 5,
      },
      {
        key: 7,
        name: "Negative DataBase",
        link: "/Reports/NegativeDataBase",
        sttid: 6,
      },
      {
        key: 8,
        name: "Ageing MIS",
        link: "/Reports/AgeingMIS",
        sttid: 12,
      },
      {
        key: 9,
        name: "Region Wise Staff List",
        link: "/Reports/RegionWiseStaffList",
        sttid: 12,
      },
    ],
  },
];

export {
  SystemAdminLinks,
  InvestigationOfficer,
  InvestigationManager,
  QAManager,
  MISManager,
};