(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[76],{565:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"a",(function(){return d}));var s=a(17),l=a(70),r=a(37),n=[{key:"standard_assets",type:r.a.SELECT,others:{selectOptions:["FLC","FSC","CRT6412","CRT6418","CRT6423","CRT6435","Palletized CRT6412","Palletized CRT6418","Palletized CRT6423","Palletized CRT6435","PP Box","Palletized PP Box","Plastic Pallet","Wooden Pallet"]},customLabel:"Standard Assets"},{key:"insert_type",type:r.a.SELECT,others:{selectOptions:["Insert","HDPE Tray"]},customLabel:"Insert Type"}],i=(r.a.INPUT,r.a.INPUT,r.a.INPUT,r.a.INPUT,r.a.INPUT,r.a.INPUT,r.a.INPUT,r.a.INPUT,[{key:"_quantity",kwargs:{placeholder:"Quantity",type:"number",disabled:!0},others:{formOptions:{noStyle:!0}},type:r.a.INPUT,customLabel:"Total Kit Qty"},{key:"_quantity_perkit",kwargs:{placeholder:"Quantity/Kit",type:"number"},others:{formOptions:{noStyle:!0}},type:r.a.INPUT,customLabel:"Quantity/Kit"},{key:"_rate",kwargs:{placeholder:"Rate",type:"number"},type:r.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Rate"},{key:"_tot_mat_req",kwargs:{placeholder:"Total Mat. Req.",disabled:!0},others:{formOptions:{noStyle:!0}},type:r.a.INPUT,customLabel:"Total Mat. Req."},{key:"_total_cost",kwargs:{placeholder:"Total Cost",type:"number",disabled:!0},others:{formOptions:{noStyle:!0}},type:r.a.INPUT,customLabel:"Total Cost"},{key:"_month",kwargs:{placeholder:"Month",type:"number",min:0},type:r.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Month"},{key:"_dep_cost",kwargs:{placeholder:"Dep Cost",disabled:!0},type:r.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Dep Cost"}]),d=function(e){var t=[];return e.map((function(e){return t=[].concat(Object(l.a)(t),Object(l.a)(i.map((function(t){return Object(s.a)(Object(s.a)({},t),{},{key:"".concat(e).concat(t.key)})})))),null})),t}},588:function(e,t,a){"use strict";a.d(t,"e",(function(){return r})),a.d(t,"d",(function(){return n})),a.d(t,"b",(function(){return i})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return c}));var s=a(194),l=a(565),r=function(e){return"FLC"===e.standard_assets||"FSC"===e.standard_assets||"PP Box"===e.standard_assets?Object(s.a)({},e.standard_assets,e.std_ast_quantity_perkit):"CRT6412"===e.standard_assets||"CRT6418"===e.standard_assets||"CRT6423"===e.standard_assets||"CRT6435"===e.standard_assets?Object(s.a)({},e.standard_assets,e.crate_lid_quantity_perkit):"Palletized CRT6412"===e.standard_assets||"Palletized CRT6418"===e.standard_assets||"Palletized CRT6423"===e.standard_assets||"Palletized CRT6435"===e.standard_assets||"Palletized PP Box"===e.standard_assets||"Plastic Pallet"===e.standard_assets||"Wooden Pallet"===e.standard_assets?Object(s.a)({Lid:1,Pallet:1},e.standard_assets,e.palletized_lid_quantity_perkit):{}},n=function(e,t){return{FLC:"Insert"===t?["FLC","Insert Type 1","Insert Type 2","Separator Sheet"]:["FLC","Separator Sheet","Mould","HDPE"],FSC:"Insert"===t?["FSC","Insert Type 1","Insert Type 2","Separator Sheet"]:["FSC","Separator Sheet","Mould","HDPE"],CRT6412:"Insert"===t?["CRT6412","Crate Lid","Insert Type 1","Insert Type 2","Separator Sheet"]:["CRT6412","Crate Lid","Separator Sheet","Mould","HDPE"],CRT6418:"Insert"===t?["CRT6418","Crate Lid","Insert Type 1","Insert Type 2","Separator Sheet"]:["CRT6418","Crate Lid","Separator Sheet","Mould","HDPE"],CRT6423:"Insert"===t?["CRT6423","Crate Lid","Insert Type 1","Insert Type 2","Separator Sheet"]:["CRT6423","Crate Lid","Separator Sheet","Mould","HDPE"],CRT6435:"Insert"===t?["CRT6435","Crate Lid","Insert Type 1","Insert Type 2","Separator Sheet"]:["CRT6435","Crate Lid","Separator Sheet","Mould","HDPE"],"Palletized CRT6412":"Insert"===t?["Palletized CRT6412","Palletized Lid","Pallet","Insert Type 1","Insert Type 2","Separator Sheet"]:["Palletized CRT6412","Palletized Lid","Pallet","Separator Sheet","Mould","HDPE"],"Palletized CRT6418":"Insert"===t?["Palletized CRT6418","Palletized Lid","Pallet","Insert Type 1","Insert Type 2","Separator Sheet"]:["Palletized CRT6418","Palletized Lid","Pallet","Separator Sheet","Mould","HDPE"],"Palletized CRT6423":"Insert"===t?["Palletized CRT6423","Palletized Lid","Pallet","Insert Type 1","Insert Type 2","Separator Sheet"]:["Palletized CRT6423","Palletized Lid","Pallet","Separator Sheet","Mould","HDPE"],"Palletized CRT6435":"Insert"===t?["Palletized CRT6435","Palletized Lid","Pallet","Insert Type 1","Insert Type 2","Separator Sheet"]:["Palletized CRT6435","Palletized Lid","Pallet","Separator Sheet","Mould","HDPE"],"PP Box":["PP Box"],"Palletized PP Box":["Palletized PP Box","Palletized Lid","Pallet"],"Plastic Pallet":["Plastic Pallet","Palletized Lid"],"Wooden Pallet":["Wooden Pallet","Palletized Lid"]}[e]},i=function(e,t){return{FLC:"Insert"===t?Object(l.a)(["std_ast","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","sep_sheet","mould","hdpe"]),FSC:"Insert"===t?Object(l.a)(["std_ast","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","sep_sheet","mould","hdpe"]),CRT6412:"Insert"===t?Object(l.a)(["std_ast","crate_lid","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","crate_lid","sep_sheet","mould","hdpe"]),CRT6418:"Insert"===t?Object(l.a)(["std_ast","crate_lid","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","crate_lid","sep_sheet","mould","hdpe"]),CRT6423:"Insert"===t?Object(l.a)(["std_ast","crate_lid","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","crate_lid","sep_sheet","mould","hdpe"]),CRT6435:"Insert"===t?Object(l.a)(["std_ast","crate_lid","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","crate_lid","sep_sheet","mould","hdpe"]),"Palletized CRT6412":"Insert"===t?Object(l.a)(["std_ast","palletized_lid","pallet","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","palletized_lid","pallet","sep_sheet","mould","hdpe"]),"Palletized CRT6418":"Insert"===t?Object(l.a)(["std_ast","palletized_lid","pallet","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","palletized_lid","pallet","sep_sheet","mould","hdpe"]),"Palletized CRT6423":"Insert"===t?Object(l.a)(["std_ast","palletized_lid","pallet","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","palletized_lid","pallet","sep_sheet","mould","hdpe"]),"Palletized CRT6435":"Insert"===t?Object(l.a)(["std_ast","palletized_lid","pallet","insert1","insert2","sep_sheet"]):Object(l.a)(["std_ast","palletized_lid","pallet","sep_sheet","mould","hdpe"]),"PP Box":Object(l.a)(["std_ast"]),"Palletized PP Box":Object(l.a)(["std_ast","palletized_lid","pallet"]),"Plastic Pallet":Object(l.a)(["std_ast","palletized_lid"]),"Wooden Pallet":Object(l.a)(["std_ast","palletized_lid"])}[e]},d=function(e,t){return"".concat(e,"_").concat(t)},o=function(e,t,a){return{FLC:"Insert"===t?[d("std_ast",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],FSC:"Insert"===t?[d("std_ast",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],CRT6412:"Insert"===t?[d("std_ast",a),d("crate_lid",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("crate_lid",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],CRT6418:"Insert"===t?[d("std_ast",a),d("crate_lid",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("crate_lid",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],CRT6423:"Insert"===t?[d("std_ast",a),d("crate_lid",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("crate_lid",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],CRT6435:"Insert"===t?[d("std_ast",a),d("crate_lid",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("crate_lid",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],"Palletized CRT6412":"Insert"===t?[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],"Palletized CRT6418":"Insert"===t?[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],"Palletized CRT6423":"Insert"===t?[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],"Palletized CRT6435":"Insert"===t?[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("insert1",a),d("insert2",a),d("sep_sheet",a)]:[d("std_ast",a),d("palletized_lid",a),d("pallet",a),d("sep_sheet",a),d("mould",a),d("hdpe",a)],"PP Box":[d("std_ast",a)],"Palletized PP Box":[d("std_ast",a),d("palletized_lid",a),d("pallet",a)],"Plastic Pallet":[d("std_ast",a),d("palletized_lid",a)],"Wooden Pallet":[d("std_ast",a),d("palletized_lid",a)]}[e]},c=function(e){switch(e){case"std_ast":return 18;case"crate_lid":case"palletized_lid":case"insert1":case"insert2":case"sep_sheet":return 12;case"mould":return 18;case"hdpe":return 12;default:return 0}}},928:function(e,t,a){"use strict";a.r(t),a.d(t,"LogisticCreateCPForm",(function(){return j}));a(245);var s=a(165),l=(a(110),a(59)),r=(a(242),a(82)),n=(a(243),a(49)),i=(a(246),a(143)),d=a(23),o=a.n(d),c=(a(419),a(176)),p=a(17),u=a(32),_=(a(396),a(397)),m=a(55),y=a(0),b=a.n(y),P=a(408),h=a(46),C=a(24),g=a(37),T=[{key:"direct_cost",kwargs:{placeholder:"Direct Cost",type:"number",disabled:!0},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Direct Cost"},{key:"operating_cost",kwargs:{placeholder:"Operating Cost",type:"number",disabled:!0},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Operating Cost"},{key:"contigency_margin",kwargs:{placeholder:"Contingency Margin",type:"number",disabled:!0},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Contingency Margin"},{key:"min_cost_for_trip",kwargs:{placeholder:"Min cost to bill for a trip",type:"number",disabled:!0},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Min cost to bill for a trip"},{key:"billing_price",kwargs:{placeholder:"Price should be billed @ 20% margin",type:"number",disabled:!0},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Price should be billed @ 20% margin"},{key:"agreed_margin",kwargs:{placeholder:"Margin agreed for this flow",type:"number",disabled:!0},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Margin agreed for this flow (%)"},{key:"trip_cost",kwargs:{placeholder:"TRIP COST (SALES)",type:"number"},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"TRIP COST (SALES)"},{key:"gross_margins",kwargs:{placeholder:"Gross Margins",type:"number",disabled:!0},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Gross Margins (%)"},{key:"remarks",kwargs:{placeholder:"Remarks"},type:g.a.INPUT,others:{formOptions:{noStyle:!0}},customLabel:"Remarks"}],f=a(588),S=a(418),O=(a(469),a(431)),I=a.n(O),j=function(e){var t=e.id,a=e.onCancel,d=e.onDone,g=e.active,O=(e.onNext,Object(y.useState)(!1)),j=Object(m.a)(O,2),k=j[0],z=j[1],R=_.a.useForm(),F=Object(m.a)(R,1)[0],E=Object(h.c)(),L=Object(h.d)((function(e){return e.data.createCPData})),V=function(){var e=Object(u.a)(o.a.mark((function e(s){var l,r;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return z(!0),e.next=3,E({type:C.b,data:s});case 3:if(z(!1),3!==g){e.next=18;break}if(!t){e.next=13;break}return e.next=8,Object(S.eb)(t,Object(p.a)(Object(p.a)({},L),s));case 8:l=e.sent,l.error?(c.a.warning({message:"Unable To Edit.",description:"Something went wrong CP editing failed."}),a()):d(),e.next=18;break;case 13:return e.next=15,Object(S.g)(Object(p.a)(Object(p.a)({},L),s));case 15:r=e.sent,r.error?(c.a.warning({message:"Unable To Create.",description:"Something went wrong CP creation failed."}),a()):(d(),c.a.success({message:"CP Created/Edited Successfully."}));case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();Object(y.useEffect)((function(){3!==g&&(F.submit(),E({type:C.p}))}),[g]);var N=Object(y.useCallback)((function(){if(F.getFieldValue("standard_assets")&&F.getFieldValue("insert_type")&&F.getFieldValue("kit_based_on_usage_ratio")){var e=0;Object(f.c)(F.getFieldValue("standard_assets"),F.getFieldValue("insert_type"),"dep_cost").forEach((function(t){e+=F.getFieldValue(t)})),e/=F.getFieldValue("kit_based_on_usage_ratio"),F.setFieldsValue({direct_cost:I.a.round(e,2)})}else F.setFieldsValue({direct_cost:0})}),[F]),w=Object(y.useCallback)((function(){F.getFieldValue("total_cost")?F.setFieldsValue({operating_cost:I.a.round(F.getFieldValue("total_cost"),2)}):F.setFieldsValue({operating_cost:0})}),[F]),U=Object(y.useCallback)((function(){F.getFieldValue("operating_cost")&&F.getFieldValue("direct_cost")?F.setFieldsValue({contigency_margin:I.a.round(.02*(F.getFieldValue("operating_cost")+F.getFieldValue("direct_cost")),2)}):F.setFieldsValue({contigency_margin:0})}),[F]),v=Object(y.useCallback)((function(){F.getFieldValue("operating_cost")&&F.getFieldValue("direct_cost")&&F.getFieldValue("contigency_margin")?F.setFieldsValue({min_cost_for_trip:I.a.round(F.getFieldValue("operating_cost")+F.getFieldValue("direct_cost")+F.getFieldValue("contigency_margin"),2)}):F.setFieldsValue({min_cost_for_trip:0})}),[F]),M=Object(y.useCallback)((function(){F.getFieldValue("min_cost_for_trip")?F.setFieldsValue({billing_price:I.a.round(F.getFieldValue("min_cost_for_trip")/.8,2)}):F.setFieldsValue({billing_price:0})}),[F]),x=Object(y.useCallback)((function(){F.getFieldValue("trip_cost")&&F.getFieldValue("min_cost_for_trip")?F.setFieldsValue({agreed_margin:I.a.round(100*(F.getFieldValue("trip_cost")/F.getFieldValue("min_cost_for_trip")-1),2)}):F.setFieldsValue({agreed_margin:0})}),[F]),D=Object(y.useCallback)((function(){F.getFieldValue("trip_cost")&&F.getFieldValue("operating_cost")?F.setFieldsValue({gross_margins:I.a.round((F.getFieldValue("trip_cost")-F.getFieldValue("operating_cost"))/F.getFieldValue("trip_cost")*100,2)}):F.setFieldsValue({gross_margins:0})}),[F]);Object(y.useEffect)((function(){N(),w(),U(),v(),M(),x(),D()}),[]);var B=Object(y.useCallback)((function(e){e[0]&&(e[0].name&&"trip_cost"===e[0].name[0]&&(x(),D()))}),[F]);return b.a.createElement(s.a,{spinning:k},b.a.createElement(i.a,{orientation:"left"},"Opex"),b.a.createElement(_.a,{onFinish:V,form:F,initialValues:Object(p.a)({},L),layout:"vertical",onFieldsChange:B,autoComplete:"off"},b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(0,4).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(0,4).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(P.a)(e)))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(4,8).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(4,8).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(P.a)(e)))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(8,12).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(8,12).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(P.a)(e)))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(12,16).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(12,16).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(P.a)(e)))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(16,18).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},e.customLabel))}))),b.a.createElement(r.a,{style:{justifyContent:"left"}},T.slice(16,18).map((function(e,t){return b.a.createElement(n.a,{span:6},b.a.createElement("div",{key:t.toString(),className:"p-2"},Object(P.a)(e)))}))),b.a.createElement(r.a,{justify:"space-between"},b.a.createElement("div",{className:"row"},b.a.createElement(l.a,{type:"primary",htmlType:"submit"},"Submit"),b.a.createElement("div",{className:"p-2"}),b.a.createElement(l.a,{type:"primary",onClick:a},"Cancel")))))};t.default=j}}]);
//# sourceMappingURL=76.2b357bee.chunk.js.map