(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[13],{541:function(e,a,t){},852:function(e,a,t){"use strict";t.r(a);t(224);var n=t(148),l=(t(221),t(70)),r=(t(222),t(45)),c=t(23),i=t.n(c),s=t(31),o=t(50),m=(t(227),t(160)),d=t(0),p=t.n(d),u=t(920),E=t(385),f=t.n(E),y=t(421),h=(t(541),t(587),m.a.Title);a.default=function(e){var a=e.location,t=(e.match,Object(d.useState)(null)),c=Object(o.a)(t,2),m=c[0],E=c[1],b=Object(d.useState)(0),g=Object(o.a)(b,2),w=g[0],v=g[1];Object(d.useEffect)(Object(s.a)(i.a.mark((function e(){return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(function(){var e=Object(s.a)(i.a.mark((function e(){var t,n,l,r,c,s,o,m;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!a.state){e.next=9;break}if(!a.state.id){e.next=7;break}return e.next=4,Object(y.ac)(a.state.id);case 4:t=e.sent,(n=t.data)&&E(n);case 7:e.next=24;break;case 9:return l=a.pathname.length,r=a.pathname.slice(17,l),e.next=13,Object(y.ac)(r);case 13:if(c=e.sent,void 0!==(s=c.data)){e.next=23;break}return e.next=18,Object(y.Yb)(r);case 18:o=e.sent,m=o.data,E(m),e.next=24;break;case 23:E(s);case 24:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()();case 2:case"end":return e.stop()}}),e)}))),[a]),Object(d.useEffect)((function(){!function(){var e=0;m&&m.flows.map((function(a){var t=a.alloted_quantity;return a.kit.products.map((function(a){return e+=t*a.quantity*a.product.priceperunit,null})),null})),v(e)}()}),[m]);var k=["","one ","two ","three ","four ","five ","six ","seven ","eight ","nine ","ten ","eleven ","twelve ","thirteen ","fourteen ","fifteen ","sixteen ","seventeen ","eighteen ","nineteen "],W=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];return m?p.a.createElement("div",{className:"container-docket"},p.a.createElement("div",{className:"header-docket"},p.a.createElement("div",{className:"logo-docket"},p.a.createElement("img",{src:"".concat("","/home-logo.png"),alt:"Yantraksh"})),p.a.createElement("div",{className:"heading-docket"},p.a.createElement(h,{level:2,style:{fontWeight:"bold"}},"DELIVERY CHALLAN"))),p.a.createElement("hr",null),p.a.createElement(l.a,{className:"meta-docket"},p.a.createElement(r.a,{span:17,className:"left"},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:22},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Transaction No. : "),p.a.createElement("p",{style:{display:"inline"}},m.transaction_no))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:22},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Transaction Date : "),p.a.createElement("p",{style:{display:"inline"}},f()(m.dispatch_date).format("DD/MM/YYYY")))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:22},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Dispatch Date : "),p.a.createElement("p",{style:{display:"inline"}},f()(m.dispatch_date).format("DD/MM/YYYY")))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:22},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Transaction Type : Allot"))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:22},p.a.createElement("p",{style:{display:"inline",fontWeight:"bold"}},"KIT ID : \xa0",m.flows.map((function(e,a){if(e.alloted_quantity>0)return"".concat(e.kit.kit_name.slice(3),", ")})))))),p.a.createElement(r.a,{span:7,className:"right",style:{fontFamily:"Arial, Helvetica, sans-serif"}},p.a.createElement("p",null,"[ \xa0] Original for Consignee"," ",p.a.createElement("br",null)," ","[ \xa0] Duplicate for Transporter"," ",p.a.createElement("br",null),"[ \xa0] Triplicate for Consignor"))),p.a.createElement("div",{className:"main-data-docket"},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:10},p.a.createElement("p",{style:{fontWeight:"bold"}},"Sender's Name : ")),p.a.createElement(r.a,{span:12,style:{wordWrap:"break-word"}},m.send_from_warehouse.name))),p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:10},p.a.createElement("p",{style:{fontWeight:"bold"}},"Receiver's Name : ")),p.a.createElement(r.a,{span:12,style:{wordWrap:"break-word"}},m.flows[0].flow.sender_client.name)))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:10},p.a.createElement("p",{style:{fontWeight:"bold"}},"Sender's Address : ")),p.a.createElement(r.a,{span:12,style:{wordWrap:"break-word"}},"".concat(m.send_from_warehouse.address,", ").concat(m.send_from_warehouse.city,", ").concat(m.send_from_warehouse.state,", ").concat(m.send_from_warehouse.pincode)))),p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:10},p.a.createElement("p",{style:{fontWeight:"bold"}},"Receiver's Address : ")),p.a.createElement(r.a,{span:12,style:{wordWrap:"break-word"}},"".concat(m.flows[0].flow.sender_client.address))))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:10},p.a.createElement("p",{style:{fontWeight:"bold"}},"GST : ")),p.a.createElement(r.a,{span:12,style:{wordWrap:"break-word"}},m.send_from_warehouse.gst))),p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:10},p.a.createElement("p",{style:{fontWeight:"bold"}},"GST : ")),p.a.createElement(r.a,{span:12,style:{wordWrap:"break-word"}},m.flows[0].flow.sender_client.gstin))))),p.a.createElement(l.a,{className:"table-docket"},p.a.createElement(u.a,{bordered:!0,size:"sm"},p.a.createElement("thead",null,p.a.createElement("tr",null,p.a.createElement("th",null,"Kit ID"),p.a.createElement("th",null,"Kit Name"),p.a.createElement("th",null,"Quantity"),p.a.createElement("th",null,"HSN/SAC"),p.a.createElement("th",null,"Product Code"),p.a.createElement("th",null,"Product Name"),p.a.createElement("th",null,"Product Qty"))),p.a.createElement("tbody",null,m.flows.map((function(e){return e.alloted_quantity>0?p.a.createElement("tr",null,p.a.createElement("td",null,e.kit.kit_name),p.a.createElement("td",null,e.kit.kit_info),p.a.createElement("td",null,e.alloted_quantity),p.a.createElement("td",null,e.kit.products.map((function(e){return p.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},p.a.createElement("p",null,e.product.hsn_code))}))),p.a.createElement("td",null,e.kit.products.map((function(e){return p.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},p.a.createElement("p",null,e.product.short_code))}))),p.a.createElement("td",null,e.kit.products.map((function(e){return p.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},p.a.createElement("p",null,e.product.name))}))),p.a.createElement("td",null,e.kit.products.map((function(a){return p.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},p.a.createElement("p",null,a.quantity*e.alloted_quantity))})))):null}))))),p.a.createElement(l.a,{className:"final-docket"},p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:7},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Amount in Words : ")),p.a.createElement(r.a,{span:16},p.a.createElement("p",{style:{display:"inline",wordWrap:"break-word",textTransform:"capitalize"}},"".concat(String.fromCharCode(8377)," ").concat(function(e){if((e=e.toString()).length>9)return"overflow";var a="000000000".concat(e).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);if(a){var t="";return t+=0!=a[1]?"".concat(k[Number(a[1])]||"".concat(W[a[1][0]]," ").concat(k[a[1][1]]),"crore "):"",t+=0!=a[2]?"".concat(k[Number(a[2])]||"".concat(W[a[2][0]]," ").concat(k[a[2][1]]),"lakh "):"",t+=0!=a[3]?"".concat(k[Number(a[3])]||"".concat(W[a[3][0]]," ").concat(k[a[3][1]]),"thousand "):"",t+=0!=a[4]?"".concat(k[Number(a[4])]||"".concat(W[a[4][0]]," ").concat(k[a[4][1]]),"hundred "):"",t+=0!=a[5]?"".concat((""!=t?"and ":"")+(k[Number(a[5])]||"".concat(W[a[5][0]]," ").concat(k[a[5][1]])),"only "):""}}(w)))),p.a.createElement("br",null)),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:24},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"SO No. : "),p.a.createElement("p",{style:{display:"inline"}},m.sales_order.id))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:24},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Transporter Name : "),p.a.createElement("p",{style:{display:"inline",wordWrap:"break-word"}},m.transport_by.name))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:24},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Driver Name : "),p.a.createElement("p",{style:{display:"inline",wordWrap:"break-word"}},m.driver_name))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:24},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Driver No. : "),p.a.createElement("p",{style:{display:"inline",wordWrap:"break-word"}},m.driver_number)))),p.a.createElement(r.a,{span:12},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:24},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Grand Total : "),p.a.createElement("p",{style:{fontWeight:"bold",display:"inline",wordWrap:"break-word"}},"".concat(String.fromCharCode(8377)," ").concat(w)))),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:24},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Vehicle No. : "),p.a.createElement("p",{style:{display:"inline",wordWrap:"break-word"}},m.vehicle_number))))),p.a.createElement("hr",null),p.a.createElement("table",{style:{pageBreakInside:"avoid"}},p.a.createElement("div",{className:"declaration"},p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Declaration : "),p.a.createElement("p",{style:{display:"inline"}},"The packaging products given on hire shall always remain the property of Yantraksh Logistics Private Limited and shall not be used for the purpose otherwise agreed upon. The same shall be returned at the address notified by Yantraksh Logistics Private Limited."),p.a.createElement("br",null),p.a.createElement("p",{style:{fontWeight:"bold",display:"inline"}},"Note : "),p.a.createElement("p",{style:{display:"inline"}}," ","No E-Way Bill is required for Empty Cargo Containers. Refer, Rule 14 of Central Goods and Services Tax (Second Amendment) Rules, 2018."))),p.a.createElement("hr",null),p.a.createElement("table",{style:{pageBreakInside:"avoid",width:"90vw"}},p.a.createElement("div",{className:"footer"},p.a.createElement(l.a,null,p.a.createElement(r.a,{span:1}),p.a.createElement(r.a,{span:11,style:{fontWeight:"bold"}},"For Sending Location :"),p.a.createElement(r.a,{span:6}),p.a.createElement(r.a,{span:6,style:{fontWeight:"bold"}},"For Receiving Location :")),p.a.createElement("br",null)," ",p.a.createElement("br",null),p.a.createElement("br",null),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:1}),p.a.createElement(r.a,{span:11,style:{fontWeight:"bold"}},"Authorized Signature"),p.a.createElement(r.a,{span:6}),p.a.createElement(r.a,{span:6,style:{fontWeight:"bold"}},"Authorized Signature")),p.a.createElement(l.a,null,p.a.createElement(r.a,{span:1}),p.a.createElement(r.a,{span:11},"(Company Seal & Signature)"),p.a.createElement(r.a,{span:6}),p.a.createElement(r.a,{span:6},"(Company Seal & Signature)")),p.a.createElement("br",null)," ",p.a.createElement("br",null),p.a.createElement("div",{style:{display:"flex",justifyContent:"Center",alignItems:"center",flexDirection:"column",padding:"0",margin:"0"}},p.a.createElement("p",{style:{fontSize:"26px",color:"#034efc"}},"Trakkia"),p.a.createElement("p",null,"CIN No: U74999GJ2018PTC105552"))))):p.a.createElement(n.a,{spinning:!0,style:{position:"absolute",marginLeft:"49vw",marginTop:"49vh"}})}}}]);
//# sourceMappingURL=13.ccf47f21.chunk.js.map