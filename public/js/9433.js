"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[9433],{230:(t,e,o)=>{o.d(e,{Z:()=>r});var n=o(3645),a=o.n(n)()((function(t){return t[1]}));a.push([t.id,"#app,body,html{box-sizing:border-box;height:100%;margin:0;padding:0;width:100%}.map{height:100vh;position:relative;width:100%}@media (max-width:768px){.map{height:80vh;height:70vh;width:100%}}.suggestions{background-color:#fff;border:1px solid #ccc;list-style:none;margin:0;max-height:150px;overflow-y:auto;padding:0}.suggestions li{cursor:pointer;padding:8px}.suggestions li:hover{background-color:#f0f0f0}",""]);const r=a},9433:(t,e,o)=>{o.r(e),o.d(e,{default:()=>F});var n=o(821),a=(0,n.createElementVNode)("h1",null,"Route Optimization",-1),r={id:"app"},i=(0,n.createElementVNode)("label",{for:"from"},"From:",-1),s={key:0,class:"suggestions"},l=["onClick"],c=(0,n.createElementVNode)("label",{for:"to"},"To:",-1),u={key:1,class:"suggestions"},h=["onClick"],m=["id"];var p=o(491),g=(o(5215),o(5243)),d=o.n(g),f=o(7676),y=o(4373),w=o(4083);d().Icon.Default.mergeOptions({iconRetinaUrl:y.Z,iconUrl:f.Z,shadowUrl:w.Z});const b={components:{LRoutingMachine:p.Z},data:function(){return{mapId:"map",mapObject:null,zoom:6,center:{lat:7.60332,lng:125.992595},osmUrl:"http://{s}.tile.osm.org/{z}/{x}/{y}.png",attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',from:{lat:null,lng:null},to:{lat:null,lng:null},searchFrom:"",searchTo:"",showSuggestions:null,suggestions:[],waypoints:[]}},watch:{from:function(t){this.updateWaypoints()},to:function(t){this.updateWaypoints()}},mounted:function(){this.mapObject=d().map(this.mapId,{zoom:this.zoom,center:this.center}),d().tileLayer(this.osmUrl,{attribution:this.attribution}).addTo(this.mapObject),this.mapObject.on("click",this.handleMapClick);var t=localStorage.getItem("searchFrom"),e=localStorage.getItem("searchTo");t&&(this.searchFrom=t,this.from=JSON.parse(localStorage.getItem("fromCoord"))),e&&(this.searchTo=e,this.to=JSON.parse(localStorage.getItem("toCoord"))),this.from.lat&&this.to.lat&&(this.center={lat:(this.from.lat+this.to.lat)/2,lng:(this.from.lng+this.to.lng)/2})},methods:{searchLocation:function(t){var e=this,o="from"===t?this.searchFrom:this.searchTo;if(o){var n="https://nominatim.openstreetmap.org/search?format=json&q=".concat(o);fetch(n).then((function(t){return t.json()})).then((function(t){e.suggestions=t}))}else this.suggestions=[]},selectLocation:function(t,e){this.showSuggestions=null,"from"===e?(this.from={lat:parseFloat(t.lat),lng:parseFloat(t.lon)},this.searchFrom=t.display_name):(this.to={lat:parseFloat(t.lat),lng:parseFloat(t.lon)},this.searchTo=t.display_name)},handleMapClick:function(t){var e=t.latlng,o=e.lat,n=e.lng;"from"===this.showSuggestions?(this.from={lat:o,lng:n},this.searchFrom="lat: ".concat(o,", lng: ").concat(n),this.showSuggestions=null):"to"===this.showSuggestions&&(this.to={lat:o,lng:n},this.searchTo="lat: ".concat(o,", lng: ").concat(n),this.showSuggestions=null)},updateWaypoints:function(){this.waypoints=[this.from,this.to].filter((function(t){return t.lat&&t.lng}))},reloadPage:function(){this.searchFrom&&this.searchTo?(localStorage.setItem("searchFrom",this.searchFrom),localStorage.setItem("searchTo",this.searchTo),localStorage.setItem("fromCoord",JSON.stringify(this.from)),localStorage.setItem("toCoord",JSON.stringify(this.to)),location.reload()):alert("Both 'From' and 'To' fields must be filled to reload the page.")}}};var k=o(3379),v=o.n(k),S=o(230),O={insert:"head",singleton:!1};v()(S.Z,O);S.Z.locals;const F=(0,o(3744).Z)(b,[["render",function(t,e,o,p,g,d){var f=(0,n.resolveComponent)("LRoutingMachine");return(0,n.openBlock)(),(0,n.createElementBlock)(n.Fragment,null,[a,(0,n.createElementVNode)("div",r,[(0,n.createElementVNode)("div",null,[i,(0,n.withDirectives)((0,n.createElementVNode)("input",{type:"text",id:"from","onUpdate:modelValue":e[0]||(e[0]=function(t){return g.searchFrom=t}),onInput:e[1]||(e[1]=function(t){return d.searchLocation("from")}),onFocus:e[2]||(e[2]=function(t){return g.showSuggestions="from"}),placeholder:"Search or click on map"},null,544),[[n.vModelText,g.searchFrom]]),"from"===g.showSuggestions?((0,n.openBlock)(),(0,n.createElementBlock)("ul",s,[((0,n.openBlock)(!0),(0,n.createElementBlock)(n.Fragment,null,(0,n.renderList)(g.suggestions,(function(t,e){return(0,n.openBlock)(),(0,n.createElementBlock)("li",{key:e,onClick:function(e){return d.selectLocation(t,"from")}},(0,n.toDisplayString)(t.display_name),9,l)})),128))])):(0,n.createCommentVNode)("",!0),c,(0,n.withDirectives)((0,n.createElementVNode)("input",{type:"text",id:"to","onUpdate:modelValue":e[3]||(e[3]=function(t){return g.searchTo=t}),onInput:e[4]||(e[4]=function(t){return d.searchLocation("to")}),onFocus:e[5]||(e[5]=function(t){return g.showSuggestions="to"}),placeholder:"Search or click on map"},null,544),[[n.vModelText,g.searchTo]]),"to"===g.showSuggestions?((0,n.openBlock)(),(0,n.createElementBlock)("ul",u,[((0,n.openBlock)(!0),(0,n.createElementBlock)(n.Fragment,null,(0,n.renderList)(g.suggestions,(function(t,e){return(0,n.openBlock)(),(0,n.createElementBlock)("li",{key:e,onClick:function(e){return d.selectLocation(t,"to")}},(0,n.toDisplayString)(t.display_name),9,h)})),128))])):(0,n.createCommentVNode)("",!0)]),(0,n.createElementVNode)("button",{onClick:e[6]||(e[6]=function(){return d.reloadPage&&d.reloadPage.apply(d,arguments)}),class:"reload-button"},"Reload Page"),(0,n.createElementVNode)("div",{id:g.mapId,class:"map"},null,8,m),(0,n.createVNode)(f,{mapObject:g.mapObject,waypoints:g.waypoints},null,8,["mapObject","waypoints"])])],64)}]])},491:(t,e,o)=>{o.d(e,{Z:()=>i});o(1455);var n=o(5243),a=o.n(n),r=o(7820);const i={props:{mapObject:{type:Object},visible:{type:Boolean,default:!0},waypoints:{type:Array,required:!0},router:{type:r.IRouter},plan:{type:a().Routing.Plan},geocoder:{type:r.IGeocoder},fitSelectedRoutes:{type:[String,Boolean],default:"smart"},lineOptions:{type:r.LineOptions},routeLine:{type:Function},autoRoute:{type:Boolean,default:!0},routeWhileDragging:{type:Boolean,default:!1},routeDragInterval:{type:Number,default:500},waypointMode:{type:String,default:"connect"},useZoomParameter:{type:Boolean,default:!1},showAlternatives:{type:Boolean,default:!0},altLineOptions:{type:r.LineOptions}},name:"LRoutingMachine",data:function(){return{ready:!1,map:null,layer:null}},watch:{mapObject:function(){null!=this.mapObject&&this.add()}},mounted:function(){this.add()},beforeUnmount:function(){return this.layer?this.layer.remove():null},methods:{add:function(){if(null!=this.mapObject){var t={waypoints:this.waypoints,fitSelectedRoutes:this.fitSelectedRoutes,autoRoute:this.autoRoute,routeWhileDragging:this.routeWhileDragging,routeDragInterval:this.routeDragInterval,waypointMode:this.waypointMode,useZoomParameter:this.useZoomParameter,showAlternatives:this.showAlternatives},e=a().Routing.control(t);e.addTo(this.mapObject),this.layer=e,this.ready=!0}}}}}}]);