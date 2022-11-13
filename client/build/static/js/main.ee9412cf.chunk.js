(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{111:function(e,t,n){},120:function(e,t,n){"use strict";n.r(t);var a,r,o,s,i,c=n(0),l=n(37),d=n.n(l),b=(n(111),n(27)),j=n(103),u=n(139),h=n(141),m=n(136),g=n(101),O=n(62),p=n(9),v=n(26),x=n(11),k=n(19),f=n(12),w=n(132),S=n(128),y=n(138),I=n(130),L=n(129),N=n(145),B=n(38),$=n(39),_=n(77),C=n.n(_),F=new(function(){function e(){Object(B.a)(this,e)}return Object($.a)(e,[{key:"getProfile",value:function(){return this.getToken}},{key:"loggedIn",value:function(){var e=this.getToken();return!!e&&!this.isTokenExpired(e)}},{key:"isTokenExpired",value:function(e){try{return C()(e).exp<Date.now()/1e3}catch(t){return!1}}},{key:"getToken",value:function(){return localStorage.getItem("id_token")}},{key:"login",value:function(e){localStorage.setItem("id_token",e),window.location.assign("/")}},{key:"logout",value:function(){localStorage.removeItem("id_token"),localStorage.removeItem("saved_books"),window.location.assign("/")}},{key:"clearStorage",value:function(){localStorage.removeItem("id_token"),localStorage.removeItem("saved_books")}}]),e}()),D=n(3),P=function(e){var t=e.searchedBooks,n=e.savedBookIds,a=e.handleSaveBook;e.source;return Object(D.jsx)(D.Fragment,{children:Object(D.jsxs)(S.a,{children:[Object(D.jsx)("h2",{children:t.length?"Viewing ".concat(t.length," results:"):"Search for a book to begin"}),Object(D.jsx)(L.a,{xs:1,md:2,lg:2,xl:3,className:"p-2 g-2",children:t.map((function(e){return Object(D.jsxs)(N.a,{border:"dark",className:"p-1",children:[e.image?Object(D.jsx)(N.a.Img,{src:e.image,alt:"The cover for ".concat(e.title),variant:"top",style:{height:"475px",width:"100%",objectPosition:"top",overflow:"scroll"}}):null,Object(D.jsxs)(N.a.Body,{children:[Object(D.jsx)(N.a.Title,{className:"mb-0",children:e.title}),Object(D.jsxs)("p",{className:"small mb-0",children:[1===e.authors.length?"Author: ":"Authors: "," ","".concat(e.authors.join(", "))]}),Object(D.jsxs)("p",{className:"small mt-0",children:["Published Date: ",e.publishedDate]}),Object(D.jsx)(N.a.Text,{style:{height:"300px",overflow:"scroll"},children:e.description}),F.loggedIn()&&Object(D.jsx)(I.a,{disabled:null===n||void 0===n?void 0:n.some((function(t){return t===e.bookId})),className:"btn-block btn-info",onClick:function(){return a(e.bookId)},children:null!==n&&void 0!==n&&n.some((function(t){return t===e.bookId}))?"Book Already Saved!":"Save this Book!"}),Object(D.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(D.jsx)(I.a,{className:"btn-block btn-info mt-1 mr-1",size:"sm",target:"_blank",href:e.infoLink,children:"Google Info"}),Object(D.jsx)(I.a,{className:"btn-block btn-info mt-1 ml-1",size:"sm",target:"_blank",href:e.previewLink,children:"Google Preview"})]})]})]},e.bookId)}))})]})})},T=function(){var e=F.loggedIn()?F.getToken():null,t=e&&C()(e);return e&&t.data._id},q=n(55),G=n(140),E=Object(G.a)(a||(a=Object(q.a)(["\n  mutation login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      token\n      user {\n        _id\n        username\n      }\n    }\n  }\n"]))),Y=Object(G.a)(r||(r=Object(q.a)(["\n  mutation addUser($username: String!, $email: String!, $password: String!) {\n    addUser(username: $username, email: $email, password: $password) {\n      token\n      user {\n        _id\n        username\n      }\n    }\n  }\n"]))),J=Object(G.a)(o||(o=Object(q.a)(["\n  mutation addBook(\n    $id: ID!\n    $bookId: ID!\n    $authors: [String]\n    $description: String\n    $image: String\n    $title: String\n    $infoLink: String\n    $previewLink: String\n    $publishedDate: String\n  ) {\n    addBook(\n      _id: $id\n      bookId: $bookId\n      authors: $authors\n      description: $description\n      image: $image\n      title: $title\n      infoLink: $infoLink\n      previewLink: $previewLink\n      publishedDate: $publishedDate\n    ) {\n      _id\n      savedBooks {\n        _id\n        bookId\n        title\n        authors\n        description\n        image\n        infoLink\n        previewLink\n        publishedDate\n      }\n    }\n  }\n"]))),K=Object(G.a)(s||(s=Object(q.a)(["\n  mutation removeBook($id: ID!, $bookId: ID!) {\n    removeBook(_id: $id, bookId: $bookId) {\n      _id\n      savedBooks {\n        title\n        _id\n      }\n    }\n  }\n"]))),U=n(131),V=function(e){var t=localStorage.getItem("saved_books")?JSON.parse(localStorage.getItem("saved_books")):null;if(!t)return!1;var n=null===t||void 0===t?void 0:t.filter((function(t){return t!==e}));return localStorage.setItem("saved_books",JSON.stringify(n)),!0},z=function(e){for(var t=e.map((function(e){return e.id})),n=e.map((function(e){return e.volumeInfo})),a=[],r=[],o=[],s=0;s<t.length;s++)r.includes(t[s])?a.push({id:t[s],index:s}):(r.push(t[s]),o.push(n[s]));for(var i=0;i<o.length;i++)o[i].id=r[i];return o},A=function(){var e=Object(c.useState)([]),t=Object(f.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(""),o=Object(f.a)(r,2),s=o[0],i=o[1],l=Object(c.useState)(localStorage.getItem("saved_books")?JSON.parse(localStorage.getItem("saved_books")):[]),d=Object(f.a)(l,2),j=d[0],u=d[1];Object(c.useEffect)((function(){var e;(e=j).length?localStorage.setItem("saved_books",JSON.stringify(e)):localStorage.removeItem("saved_books")}),[j]);var h=function(){var e=Object(k.a)(Object(x.a)().mark((function e(t){var n,r,o,c,l;return Object(x.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),s){e.next=3;break}return e.abrupt("return",!1);case 3:return e.prev=3,e.next=6,fetch("https://www.googleapis.com/books/v1/volumes?q=".concat(s,"&&orderBy=newest&startIndex=0&maxResults=10"));case 6:if((n=e.sent).ok){e.next=9;break}throw new Error("something went wrong!");case 9:return e.next=11,n.json();case 11:r=e.sent,o=r.items,c=z(o),l=c.map((function(e){var t;return{bookId:e.id,authors:e.authors||["No author to display"],title:e.title,description:e.description||"No description available.",image:(null===(t=e.imageLinks)||void 0===t?void 0:t.thumbnail)||"https://placehold.jp/16/0000FF/ffffff/300x500.png?text=No%20Image%20Available",publishedDate:e.publishedDate||"No publish date",previewLink:e.previewLink||"No preview link",infoLink:e.infoLink||"No info link"}})),a(l),i(""),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(3),console.error(e.t0);case 22:case"end":return e.stop()}}),e,null,[[3,19]])})));return function(t){return e.apply(this,arguments)}}(),m=Object(U.a)(J),g=Object(f.a)(m,1)[0],O=T(),p=function(){var e=Object(k.a)(Object(x.a)().mark((function e(t){var a,r,o;return Object(x.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.find((function(e){return e.bookId===t})),e.prev=1,e.next=4,g({variables:Object(b.a)({id:O},a)});case 4:r=e.sent,o=r.data,console.log(o),u([].concat(Object(v.a)(j),[a.bookId])),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.error(e.t0);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}();return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(w.a,{fluid:!0,className:"text-light bg-dark",children:Object(D.jsxs)(S.a,{children:[Object(D.jsx)("h1",{children:"Search for Books!"}),Object(D.jsx)(y.a,{onSubmit:h,children:Object(D.jsxs)(y.a.Row,{children:[Object(D.jsx)(y.a.Control,{name:"searchInput",style:{width:"65%"},value:s,onChange:function(e){return i(e.target.value)},type:"text",size:"lg",placeholder:"Search for a book"}),Object(D.jsx)(I.a,{type:"submit",variant:"success",className:"ml-1",style:{width:"30%"},size:"lg",children:"Search"})]})})]})}),Object(D.jsx)(P,{searchedBooks:n,savedBookIds:j,handleSaveBook:p,source:"search"})]})},H=function(e){var t=e.savedBooks,n=e.handleDeleteBook;e.source;return Object(D.jsx)(D.Fragment,{children:Object(D.jsxs)(S.a,{children:[Object(D.jsx)("h2",{children:!1===F.loggedIn()?"Your login session has expired. Please signin again":t.length?"Viewing ".concat(t.length," saved ").concat(1===t.length?"book":"books",":"):"You have no saved books!"}),Object(D.jsx)(L.a,{xs:1,md:2,lg:2,xl:3,className:"p-2 g-2",children:t.map((function(e){return Object(D.jsxs)(N.a,{border:"dark",className:"p-1",children:[e.image?Object(D.jsx)(N.a.Img,{src:e.image,alt:"The cover for ".concat(e.title),variant:"top",style:{height:"475px",width:"100%",objectFit:"cover",objectPosition:"top",overflow:"scroll"}}):null,Object(D.jsxs)(N.a.Body,{children:[Object(D.jsx)(N.a.Title,{className:"mb-0",children:e.title}),Object(D.jsxs)("p",{className:"small mb-0",children:["Authors: ",e.authors]}),Object(D.jsxs)("p",{className:"small mt-0",children:["Published Date: ",e.publishedDate]}),Object(D.jsx)(N.a.Text,{style:{height:"500px",overflow:"scroll"},children:e.description}),Object(D.jsxs)("div",{className:"d-flex justify-content-between",children:[Object(D.jsx)(I.a,{className:"btn-block btn-info mt-1 mr-1 btn-sm",target:"_blank",href:e.infoLink,children:"Google Info"}),Object(D.jsx)(I.a,{className:"btn-block btn-info mt-1 ml-1 btn-sm",target:"_blank",href:e.previewLink,children:"Google Preview"})]}),Object(D.jsx)(I.a,{className:"btn-block btn-danger mt-2 btn-sm",onClick:function(){return n(e.bookId)},children:"Delete this Book!"})]})]},e.bookId)}))})]})})},R=n(147),W=Object(G.a)(i||(i=Object(q.a)(["\n  query me($id: ID!) {\n    me(_id: $id) {\n      _id\n      username\n      email\n      bookCount\n      savedBooks {\n        _id\n        bookId\n        authors\n        description\n        image\n        title\n        infoLink\n        previewLink\n        publishedDate\n      }\n    }\n  }\n"]))),M=function(){var e=T(),t=Object(U.a)(K),n=Object(f.a)(t,1)[0],a=[];if(F.loggedIn()){var r=Object(R.a)(W,{variables:{id:e}}),o=r.loading,s=r.data;if(o)return Object(D.jsx)("div",{children:"Loading..."});e&&(a=s.me.savedBooks,!localStorage.getItem("saved_books")&&a.length>0&&localStorage.setItem("saved_books",JSON.stringify(a.map((function(e){return e.bookId})))))}var i=function(){var t=Object(k.a)(Object(x.a)().mark((function t(a){var r,o;return Object(x.a)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,n({variables:{id:e,bookId:a}});case 3:r=t.sent,o=r.data,console.log(o),V(a),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.log(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(e){return t.apply(this,arguments)}}();return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(w.a,{fluid:!0,className:"text-light bg-dark",children:Object(D.jsx)(S.a,{children:Object(D.jsx)("h1",{children:"Viewing saved books!"})})}),Object(D.jsx)(H,{savedBooks:a,handleDeleteBook:i,source:"saved"})]})},Q=n(143),X=n(142),Z=n(137),ee=n(144),te=n(17),ne=n(134),ae=function(){var e=Object(c.useState)({username:"",email:"",password:""}),t=Object(f.a)(e,2),n=t[0],a=t[1],r=Object(U.a)(Y),o=Object(f.a)(r,2),s=o[0],i=o[1].error,l=Object(c.useState)(!1),d=Object(f.a)(l,1)[0],j=Object(c.useState)(!1),u=Object(f.a)(j,2),h=u[0],m=u[1],g=function(e){var t=e.target,r=t.name,o=t.value;a(Object(b.a)(Object(b.a)({},n),{},Object(te.a)({},r,o)))},O=function(){var e=Object(k.a)(Object(x.a)().mark((function e(t){var r,o;return Object(x.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),!1===t.currentTarget.checkValidity()&&(t.preventDefault(),t.stopPropagation()),e.prev=3,e.next=6,s({variables:Object(b.a)({},n)});case 6:r=e.sent,o=r.data,console.log(o),F.login(o.addUser.token),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(3),console.error(e.t0),m(!0);case 16:a({username:"",email:"",password:""});case 17:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(t){return e.apply(this,arguments)}}();return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsxs)(y.a,{noValidate:!0,validated:d,onSubmit:O,children:[Object(D.jsxs)(y.a.Group,{children:[Object(D.jsx)(y.a.Label,{htmlFor:"username",children:"Username"}),Object(D.jsx)(y.a.Control,{type:"text",placeholder:"Your username",name:"username",onChange:g,value:n.username,required:!0}),Object(D.jsx)(y.a.Control.Feedback,{type:"invalid",children:"Username is required!"})]}),Object(D.jsxs)(y.a.Group,{children:[Object(D.jsx)(y.a.Label,{htmlFor:"email",children:"Email"}),Object(D.jsx)(y.a.Control,{type:"email",placeholder:"Your email address",name:"email",onChange:g,value:n.email,required:!0}),Object(D.jsx)(y.a.Control.Feedback,{type:"invalid",children:"Email is required!"})]}),Object(D.jsxs)(y.a.Group,{children:[Object(D.jsx)(y.a.Label,{htmlFor:"password",children:"Password"}),Object(D.jsx)(y.a.Control,{type:"password",placeholder:"Your password",name:"password",onChange:g,value:n.password,required:!0}),Object(D.jsx)(y.a.Control.Feedback,{type:"invalid",children:"Password is required!"})]}),Object(D.jsx)(I.a,{disabled:!(n.username&&n.email&&n.password),type:"submit",variant:"success",children:"Submit"})]}),i&&Object(D.jsx)(ne.a,{dismissible:!0,onClose:function(){return m(!1)},show:h,variant:"danger",className:"my-3 p-3 bg-danger text-white",children:"Something went wrong with your signup!"})]})},re=function(){var e=Object(c.useState)({email:"",password:""}),t=Object(f.a)(e,2),n=t[0],a=t[1],r=Object(U.a)(E),o=Object(f.a)(r,2),s=o[0],i=o[1].error,l=Object(c.useState)(!1),d=Object(f.a)(l,1)[0],j=Object(c.useState)(!1),u=Object(f.a)(j,2),h=u[0],m=u[1],g=function(e){var t=e.target,r=t.name,o=t.value;a(Object(b.a)(Object(b.a)({},n),{},Object(te.a)({},r,o)))},O=function(){var e=Object(k.a)(Object(x.a)().mark((function e(t){var r,o;return Object(x.a)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),!1===t.currentTarget.checkValidity()&&(t.preventDefault(),t.stopPropagation()),e.prev=3,e.next=6,s({variables:Object(b.a)({},n)});case 6:r=e.sent,o=r.data,F.login(o.login.token),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(3),console.error(e.t0),m(!0);case 15:a({username:"",email:"",password:""});case 16:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(t){return e.apply(this,arguments)}}();return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsxs)(y.a,{noValidate:!0,validated:d,onSubmit:O,children:[Object(D.jsxs)(y.a.Group,{children:[Object(D.jsx)(y.a.Label,{htmlFor:"email",children:"Email"}),Object(D.jsx)(y.a.Control,{type:"text",placeholder:"Your email",name:"email",onChange:g,value:n.email,required:!0}),Object(D.jsx)(y.a.Control.Feedback,{type:"invalid",children:"Email is required!"})]}),Object(D.jsxs)(y.a.Group,{children:[Object(D.jsx)(y.a.Label,{htmlFor:"password",children:"Password"}),Object(D.jsx)(y.a.Control,{type:"password",placeholder:"Your password",name:"password",onChange:g,value:n.password,required:!0}),Object(D.jsx)(y.a.Control.Feedback,{type:"invalid",children:"Password is required!"})]}),Object(D.jsx)(I.a,{disabled:!(n.email&&n.password),type:"submit",variant:"success",children:"Submit"})]}),i&&Object(D.jsx)(ne.a,{dismissible:!0,onClose:function(){return m(!1)},show:h,variant:"danger",className:"my-3 p-3 bg-danger text-white",children:"Something went wrong with your login credentials!"})]})},oe=function(){var e=Object(c.useState)(!1),t=Object(f.a)(e,2),n=t[0],a=t[1];return Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(Q.a,{collapseOnSelect:!0,bg:"dark",variant:"dark",expand:"lg",children:Object(D.jsxs)(S.a,{fluid:!0,children:[Object(D.jsx)(Q.a.Brand,{as:O.b,to:"/",children:"Google Books Search"}),Object(D.jsx)(Q.a.Toggle,{"aria-controls":"navbar"}),Object(D.jsx)(Q.a.Collapse,{id:"navbar",children:Object(D.jsx)(X.a,{className:"ml-auto",children:F.loggedIn()?Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(X.a.Link,{as:O.b,to:"/",eventKey:"1",children:"Search For Books"}),Object(D.jsx)(X.a.Link,{as:O.b,to:"/saved",eventKey:"2",children:"See Your Books"}),Object(D.jsx)(X.a.Link,{onClick:F.logout,children:"Logout"})]}):Object(D.jsx)(X.a.Link,{onClick:function(){return a(!0)},children:"Login/Sign Up"})})})]})}),Object(D.jsx)(Z.a,{size:"lg",show:n,onHide:function(){return a(!1)},"aria-labelledby":"signup-modal",children:Object(D.jsxs)(ee.a.Container,{defaultActiveKey:"login",children:[Object(D.jsx)(Z.a.Header,{closeButton:!0,children:Object(D.jsx)(Z.a.Title,{id:"signup-modal",children:Object(D.jsxs)(X.a,{variant:"pills",children:[Object(D.jsx)(X.a.Item,{children:Object(D.jsx)(X.a.Link,{eventKey:"login",children:"Login"})}),Object(D.jsx)(X.a.Item,{children:Object(D.jsx)(X.a.Link,{eventKey:"signup",children:"Sign Up"})})]})})}),Object(D.jsx)(Z.a.Body,{children:Object(D.jsxs)(ee.a.Content,{children:[Object(D.jsx)(ee.a.Pane,{eventKey:"login",children:Object(D.jsx)(re,{})}),Object(D.jsx)(ee.a.Pane,{eventKey:"signup",children:Object(D.jsx)(ae,{})})]})})]})})]})},se=Object(j.a)({uri:"/graphql"}),ie=Object(g.a)((function(e,t){var n=t.headers,a=localStorage.getItem("id_token");return{headers:Object(b.a)(Object(b.a)({},n),{},{authorization:a?"Bearer ".concat(a):""})}})),ce=new u.a({link:ie.concat(se),cache:new h.a});var le=function(){return Object(D.jsx)(m.a,{client:ce,children:Object(D.jsx)(O.a,{children:Object(D.jsxs)(D.Fragment,{children:[Object(D.jsx)(oe,{}),Object(D.jsxs)(p.c,{children:[Object(D.jsx)(p.a,{path:"/",element:Object(D.jsx)(A,{})}),Object(D.jsx)(p.a,{path:"/saved",element:Object(D.jsx)(M,{})}),Object(D.jsx)(p.a,{path:"*",element:Object(D.jsx)("h1",{className:"display-2",children:"Wrong page!"})})]})]})})})},de=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,148)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),o(e),s(e)}))};n(119);d.a.render(Object(D.jsx)(le,{}),document.getElementById("root")),de()}},[[120,1,2]]]);
//# sourceMappingURL=main.ee9412cf.chunk.js.map