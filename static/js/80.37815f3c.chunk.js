(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[80],{469:function(e,t,a){"use strict";a.d(t,"e",(function(){return c})),a.d(t,"g",(function(){return o})),a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return s})),a.d(t,"d",(function(){return m})),a.d(t,"f",(function(){return p}));var n=a(17),r=a(431),l=a.n(r),c=function(e,t){return e.map((function(e){var a=l.a.find(t,(function(t){return t.mr===e.id}));return a?Object(n.a)(Object(n.a)({},e),{},{is_rejected:a.is_rejected,reason:a.reason,mr:a.mr,remarks:a.remarks}):e}))},o=function(e,t){var a="Allocated";return e||t?e&&!t?a="Allocated":!e&&t&&(a="Rejected"):a="Pending",a},u=function(e,t){return e.filter(t,(function(e){return e.active}))},i=function(e){return parseInt(e)?parseInt(e):0},s=function(e){return parseFloat(e)?parseFloat(e):0},m=function(e){return String(e)?String(e):"a"},p=function(e){return e.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},923:function(e,t,a){"use strict";a.r(t),a.d(t,"PFEPStockKeepingForm",(function(){return E}));a(245);var n=a(165),r=(a(254),a(195)),l=(a(242),a(82)),c=(a(110),a(59)),o=(a(243),a(49)),u=a(17),i=(a(246),a(143)),s=a(23),m=a.n(s),p=a(32),d=(a(396),a(397)),y=a(55),b=a(0),f=a.n(b),h=a(408),k=a(46),T=a(24),v=a(414),g=a(173),w=a(411),S=a(37),_=[{key:"sender",kwargs:{placeholder:"Name & Location"},type:S.a.INPUT,others:null,customLabel:"Sender",colSpan:4},{key:"receiver",kwargs:{placeholder:"Name & Location"},type:S.a.INPUT,others:null,customLabel:"Receiver",colSpan:4},{key:"min_volume",kwargs:{placeholder:"Min. Volume Per Month"},type:S.a.INPUT,others:null,customLabel:"Min. Volume Per Month",colSpan:4},{key:"peak_volume",kwargs:{placeholder:"Peak Volume Per Month"},type:S.a.INPUT,others:null,customLabel:"Peak Volume Per Month",colSpan:4},{key:"sender_inventory",kwargs:{placeholder:"Sender Inventory TAT"},type:S.a.INPUT,others:null,customLabel:"Sender Inventory TAT",colSpan:4},{key:"sender_warehouse",kwargs:{placeholder:"Sender Warehouse TAT"},type:S.a.INPUT,others:null,customLabel:"Sender Warehouse TAT",colSpan:4},{key:"transit_time",kwargs:{placeholder:"Transit Time"},type:S.a.INPUT,others:null,customLabel:"Transit Time",colSpan:3},{key:"receiver_inventory",kwargs:{placeholder:"Receiver Inventory TAT"},type:S.a.INPUT,others:null,customLabel:"Receiver Inventory TAT",colSpan:4},{key:"receiver_warehouse",kwargs:{placeholder:"Receiver Warehouse TAT"},type:S.a.INPUT,others:null,customLabel:"Receiver Warehouse TAT",colSpan:4},{key:"return_tat",kwargs:{placeholder:"Return TAT"},type:S.a.INPUT,others:null,customLabel:"Return TAT",colSpan:3},{key:"total_cycle_time",kwargs:{placeholder:"Total Cycle Time"},type:S.a.INPUT,others:null,customLabel:"Total Cycle Time",colSpan:3},{key:"dispatch_frequency",kwargs:{placeholder:"Dispatch Frequency"},type:S.a.INPUT,others:null,customLabel:"Dispatch Frequency",colSpan:3},{key:"remarks",kwargs:{placeholder:"Remarks"},type:S.a.INPUT,others:null,customLabel:"Remarks",colSpan:3}],j=a(469),E=function(e){e.id;var t=e.onCancel,a=(e.onDone,e.onNext),s=e.active,S=Object(b.useState)(!1),E=Object(y.a)(S,2),O=E[0],P=E[1],I=d.a.useForm(),F=Object(y.a)(I,1)[0],N=Object(k.c)(),L=Object(k.d)((function(e){return e.data.pfepData})),A=function(){var e=Object(p.a)(m.a.mark((function e(t){return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return P(!0),e.next=3,N({type:T.d,data:t});case 3:P(!1),1===s&&a();case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(b.useEffect)((function(){1!==s&&(F.submit(),N({type:T.p}))}),[s]);var U=Object(b.useCallback)((function(e){if(e[0]&&e[0].name&&e[0].name[2]){var t=e[0].name[0],a=e[0].name[1],n=e[0].name[2];if("sender_inventory"===n||"sender_warehouse"===n||"transit_time"===n||"receiver_inventory"===n||"receiver_warehouse"===n||"return_tat"===n){var r=Object(j.b)(F.getFieldValue([t,a,"sender_inventory"]))+Object(j.b)(F.getFieldValue([t,a,"sender_warehouse"]))+Object(j.b)(F.getFieldValue([t,a,"transit_time"]))+Object(j.b)(F.getFieldValue([t,a,"receiver_inventory"]))+Object(j.b)(F.getFieldValue([t,a,"receiver_warehouse"]))+Object(j.b)(F.getFieldValue([t,a,"return_tat"])),l=F.getFieldValue(t);Object.assign(l[a],{total_cycle_time:r}),F.setFieldsValue({formListName:l})}}}),[F]);return f.a.createElement(n.a,{spinning:O},f.a.createElement(d.a,{onFinish:A,initialValues:L,form:F,layout:"vertical",onFieldsChange:U,autoComplete:"off"},f.a.createElement(i.a,{orientation:"left"},"Supply chain details"),f.a.createElement(d.a.List,{name:"sks"},(function(e,t){var a=t.add,n=t.remove;return f.a.createElement(f.a.Fragment,null,e.map((function(e,t){return f.a.createElement(r.a,{title:"Flow ".concat(t+1)},f.a.createElement(l.a,{gutter:5,align:"middle"},_.map((function(t){return f.a.createElement(o.a,{span:t.colSpan},Object(h.a)(Object(u.a)(Object(u.a)({},t),{},{form:F,others:{formOptions:Object(u.a)(Object(u.a)({},e),{},{name:[e.name,t.key],fieldKey:[e.fieldKey,t.key]})}})))})),f.a.createElement(o.a,{span:1},f.a.createElement(c.a,{type:"danger",onClick:function(){n(e.name)},block:!0},f.a.createElement(v.a,null)))))})),f.a.createElement("br",null),f.a.createElement(d.a.Item,null,f.a.createElement(c.a,{type:"dashed",onClick:function(){a()},block:!0},f.a.createElement(g.a,null)," Add")))})),f.a.createElement(l.a,{justify:"space-between"},f.a.createElement("div",{className:"row"},f.a.createElement(c.a,{type:"primary",htmlType:"submit",disabled:!0},"Submit"),f.a.createElement("div",{className:"p-2"}),f.a.createElement(c.a,{type:"primary",onClick:t},"Cancel")),f.a.createElement(c.a,{type:"link",htmlType:"submit"},f.a.createElement(w.a,{style:{fontSize:30}})))))};t.default=E}}]);
//# sourceMappingURL=80.37815f3c.chunk.js.map