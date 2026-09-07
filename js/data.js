export const SEED_LEADS = [
  {id:"harbor",name:"Harbor & Pine Supply Co.",contact:"Maria Alvarez",role:"Owner / Applicant",city:"San Francisco",status:"In review",ask:85000,requested:180000,deposits:48200,mtdDeposits:36480,balance:18340,inflow:1860,outflow:1425,industry:"Commercial supplies",legal:"Harbor Pine Supply Co.",since:"2016-04-21",address:"1850 Folsom Street, San Francisco, CA 94103",phones:["(415) 555-0148","(415) 555-0182"],emails:["maria@harborandpine.co","ops@harborandpine.co"],mca:[{name:"Elevate Capital",amount:16140,note:"$760 daily weekday ACH"},{name:"Blue Ridge Funding",amount:5650,note:"$1280 weekly Friday debit"}],payroll:21600},
  {id:"ironwood",name:"Ironwood Fleet Service",contact:"Daniel Cho",role:"Controller",city:"Oakland",status:"New",ask:120000,requested:120000,deposits:62100,mtdDeposits:41200,balance:9880,inflow:2140,outflow:1970,industry:"Fleet maintenance",legal:"Ironwood Fleet Service LLC",since:"2019-08-12",address:"410 Maritime St, Oakland, CA 94607",phones:["(510) 555-0190"],emails:["daniel@ironwoodfleet.com"],mca:[{name:"Summit Advance",amount:9800,note:"Weekly draft"}],payroll:31200},
  {id:"lumen",name:"Lumen Dental Group",contact:"Priya Shah",role:"Managing partner",city:"San Jose",status:"Follow-up",ask:60000,requested:60000,deposits:39400,mtdDeposits:28900,balance:22100,inflow:1420,outflow:1110,industry:"Healthcare",legal:"Lumen Dental Group",since:"2014-02-03",address:"88 Almaden Blvd, San Jose, CA 95113",phones:["(408) 555-0166"],emails:["priya@lumendental.com"],mca:[],payroll:18400},
  {id:"atlas",name:"Atlas Cold Storage",contact:"Owen Grant",role:"Owner",city:"Stockton",status:"Qualified",ask:200000,requested:200000,deposits:118000,mtdDeposits:74000,balance:41000,inflow:3900,outflow:3100,industry:"Warehousing",legal:"Atlas Cold Storage Inc.",since:"2011-11-09",address:"220 Harbor Way, Stockton, CA 95203",phones:["(209) 555-0112"],emails:["owen@atlascold.com"],mca:[],payroll:54000},
  {id:"marlowe",name:"Marlowe Kitchen",contact:"Elena Ruiz",role:"Chef-owner",city:"Napa",status:"In review",ask:45000,requested:45000,deposits:28600,mtdDeposits:19100,balance:6400,inflow:980,outflow:910,industry:"Restaurant",legal:"Marlowe Kitchen LLC",since:"2018-05-22",address:"14 First St, Napa, CA 94559",phones:["(707) 555-0144"],emails:["elena@marlowekitchen.com"],mca:[{name:"Harbor Advance",amount:4200,note:"Daily split"}],payroll:16200},
  {id:"northline",name:"Northline HVAC",contact:"Chris Patel",role:"Owner",city:"Sacramento",status:"Nurture",ask:95000,requested:95000,deposits:51000,mtdDeposits:22000,balance:15100,inflow:1700,outflow:1480,industry:"Trades",legal:"Northline HVAC",since:"2013-07-01",address:"901 J St, Sacramento, CA 95814",phones:["(916) 555-0177"],emails:["chris@northlinehvac.com"],mca:[],payroll:27500}
];
export const SEED_NOTES = { harbor: [
  {id:"n1",text:"Asked for a clearer picture of the two existing MCA payments before reviewing a new offer.",author:"Jordan Lee",at:"Today, 9:42 AM",pinned:true},
  {id:"n2",text:"Strong February deposits. Follow up after payroll clears on Thursday.",author:"Jordan Lee",at:"Yesterday, 3:18 PM",pinned:false}
]};
export const SEED_MESSAGES = { harbor: [
  {id:"m1",from:"Maria Alvarez",meta:"Opened - 12m",body:"Opened a working-capital option for Harbor and Pine twice."},
  {id:"m2",from:"You -> Maria Alvarez",meta:"Yesterday 4:06 PM",body:"Deposits are consistent. Payroll timing and two MCA drafts are the constraint."},
  {id:"m3",from:"Ops - Harbor and Pine",meta:"Mon",body:"February statement and March MTD export are in the file tray."}
]};
export const SEED_FILES = { harbor: [
  {id:"app",title:"Funding application",pages:3,body:"Working-capital application. Guarantor: Maria Alvarez."},
  {id:"feb",title:"February 2026 statement",pages:6,body:"Deposits consistent. Two MCA drafts mid-cycle. Payroll Thursday."},
  {id:"jan",title:"January 2026 statement",pages:7,body:"January deposits in line with trailing average."},
  {id:"mtd",title:"March MTD export",pages:2,body:"MTD deposits tracking February run-rate."}
]};
export const STATUSES = ["New","In review","Follow-up","Qualified","Nurture","Closed"];
export const money = (n) => "$" + Number(n).toLocaleString("en-US");
