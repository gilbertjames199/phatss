"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[748],{1588:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(3645),o=n.n(r)()((function(e){return e[1]}));o.push([e.id,".mapdiv[data-v-60500fb1]{height:500px;width:100%}",""]);const l=o},748:(e,t,n)=>{n.r(t),n.d(t,{default:()=>j});var r=n(821),o=function(e){return(0,r.pushScopeId)("data-v-60500fb1"),e=e(),(0,r.popScopeId)(),e},l={class:"row gap-20 masonry pos-r"},a={class:"masonry-item w-100"},i={class:"row gap-20"},c=o((function(){return(0,r.createElementVNode)("div",{class:"col-md-9"},[(0,r.createElementVNode)("div",{class:"layers bd bgc-white p-20"},[(0,r.createElementVNode)("div",{id:"leafletMapid",class:"mapdiv border border-dark"})])],-1)})),u={class:"col-md-3"},s={class:"layers bd bgc-white p-20"},p={class:"layer w-100 mB-10"},d=o((function(){return(0,r.createElementVNode)("h4",null,[(0,r.createTextVNode)("FILTERS"),(0,r.createElementVNode)("br")],-1)})),m=o((function(){return(0,r.createElementVNode)("hr",null,null,-1)})),h=o((function(){return(0,r.createElementVNode)("b",null,"Municipality:",-1)})),f=(0,r.createTextVNode)("   "),b=o((function(){return(0,r.createElementVNode)("option",null,null,-1)})),g=(0,r.createTextVNode)("   "),V=o((function(){return(0,r.createElementVNode)("b",null,"Barangays: ",-1)})),E=o((function(){return(0,r.createElementVNode)("option",null,null,-1)})),N=(0,r.createTextVNode)("   "),v=o((function(){return(0,r.createElementVNode)("b",null,"Puroks: ",-1)})),k=o((function(){return(0,r.createElementVNode)("option",null,null,-1)})),y=(0,r.createTextVNode)("   "),_=o((function(){return(0,r.createElementVNode)("b",null,"Type: ",-1)})),w=[o((function(){return(0,r.createElementVNode)("option",null,null,-1)})),o((function(){return(0,r.createElementVNode)("option",null,"G0",-1)})),o((function(){return(0,r.createElementVNode)("option",null,"G1",-1)})),o((function(){return(0,r.createElementVNode)("option",null,"G2",-1)})),o((function(){return(0,r.createElementVNode)("option",null,"G3",-1)}))],S=o((function(){return(0,r.createElementVNode)("br",null,null,-1)})),B=o((function(){return(0,r.createElementVNode)("hr",null,null,-1)})),L=o((function(){return(0,r.createElementVNode)("h4",null,"Additional Details",-1)})),x=o((function(){return(0,r.createElementVNode)("b",null,"Count: ",-1)})),C=(0,r.createTextVNode)();var M=n(974),D=n.n(M),F=n(5243),T=n.n(F);const O={components:{},props:{count:String,p_mun:String,p_bar:String,p_pur:String,p_relrisk:String,p_data:Object,barangays:Object,municipalities:Object,puroks:Object},data:function(){return{myData:{max:1e3,data:this.$props.p_data,lat_val:0,lng_val:0},baseLayer:null,heatmapLayer:null,map:null,mun:this.$props.p_mun,bar:this.$props.p_bar,relrisk:this.$props.p_relrisk,pur:this.$props.p_pur}},watch:{},computed:{},mounted:function(){this.initMap()},methods:{getLocation:function(){var e=this;navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){e.lat_val=t.coords.latitude,e.lng_val=t.coords.longitude,e.initMap()})):alert("Geolocation is not supported by this browser.")},initMap:function(){if(this.getLocation(),0!=this.lat_val&&0!=this.lng_val){this.baseLayer=T().tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',maxZoom:18,minZoom:0});this.heatmapLayer=new(D())({radius:30,maxOpacity:.5,scaleRadius:!1,useLocalExtrema:!0,latField:"x",lngField:"y",valueField:"count"}),this.map=new(T().map)("leafletMapid",{center:new(T().LatLng)(7.6165921,126.0364403),zoom:9}),this.heatmapLayer.setData(this.myData),this.baseLayer.addTo(this.map),this.heatmapLayer.addTo(this.map)}},filter_me:function(e){"mun"===e&&(this.bar="",this.pur=""),"bar"===e&&(this.pur=""),this.$inertia.get("/map/heat",{mun:this.mun,bar:this.bar,pur:this.pur,relrisk:this.relrisk},{preserveScroll:!0,preserveState:!0,replace:!0,onSuccess:function(){window.location.reload()}})},clearFilter:function(){this.mun="",this.bar="",this.pur="",this.relrisk="",this.filter_me("")}}};var Z=n(3379),$=n.n(Z),G=n(1588),I={insert:"head",singleton:!1};$()(G.Z,I);G.Z.locals;const j=(0,n(3744).Z)(O,[["render",function(e,t,n,o,M,D){return(0,r.openBlock)(),(0,r.createElementBlock)("div",l,[(0,r.createElementVNode)("div",a,[(0,r.createElementVNode)("div",i,[c,(0,r.createElementVNode)("div",u,[(0,r.createElementVNode)("div",s,[(0,r.createElementVNode)("div",p,[d,m,h,f,(0,r.withDirectives)((0,r.createElementVNode)("select",{class:"form-control","onUpdate:modelValue":t[0]||(t[0]=function(e){return M.mun=e}),onChange:t[1]||(t[1]=function(e){return D.filter_me("mun")})},[b,((0,r.openBlock)(!0),(0,r.createElementBlock)(r.Fragment,null,(0,r.renderList)(n.municipalities,(function(e){return(0,r.openBlock)(),(0,r.createElementBlock)("option",null,(0,r.toDisplayString)(e),1)})),256))],544),[[r.vModelSelect,M.mun]]),g,V,(0,r.withDirectives)((0,r.createElementVNode)("select",{class:"form-control","onUpdate:modelValue":t[2]||(t[2]=function(e){return M.bar=e}),onChange:t[3]||(t[3]=function(e){return D.filter_me("bar")})},[E,((0,r.openBlock)(!0),(0,r.createElementBlock)(r.Fragment,null,(0,r.renderList)(n.barangays,(function(e){return(0,r.openBlock)(),(0,r.createElementBlock)("option",null,(0,r.toDisplayString)(e),1)})),256))],544),[[r.vModelSelect,M.bar]]),N,v,(0,r.withDirectives)((0,r.createElementVNode)("select",{class:"form-control","onUpdate:modelValue":t[4]||(t[4]=function(e){return M.pur=e}),onChange:t[5]||(t[5]=function(e){return D.filter_me("pur")})},[k,((0,r.openBlock)(!0),(0,r.createElementBlock)(r.Fragment,null,(0,r.renderList)(n.puroks,(function(e){return(0,r.openBlock)(),(0,r.createElementBlock)("option",null,(0,r.toDisplayString)(e),1)})),256))],544),[[r.vModelSelect,M.pur]]),y,_,(0,r.withDirectives)((0,r.createElementVNode)("select",{class:"form-control","onUpdate:modelValue":t[6]||(t[6]=function(e){return M.relrisk=e}),onChange:t[7]||(t[7]=function(e){return D.filter_me("relrisk")})},w,544),[[r.vModelSelect,M.relrisk]]),S,(0,r.createElementVNode)("button",{class:"btn btn-danger text-white",onClick:t[8]||(t[8]=function(){return D.clearFilter&&D.clearFilter.apply(D,arguments)})},"Clear Filters"),B,(0,r.createElementVNode)("span",null,[L,x,C,(0,r.createElementVNode)("u",null,(0,r.toDisplayString)(e.format_number(n.count,0,!0)),1)])])])])])])])}],["__scopeId","data-v-60500fb1"]])}}]);