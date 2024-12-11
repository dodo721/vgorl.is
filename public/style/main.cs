.vertical-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.horizontal-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.vertical-right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}
.vertical-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.mv {
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.mt {
  margin-top: 2rem;
}
.mb {
  margin-bottom: 2rem;
}
.mh {
  margin-left: 2rem;
  margin-right: 2rem;
}
.ml {
  margin-left: 2rem;
}
.mr {
  margin-right: 2rem;
}
hr {
  margin: 0;
}
hr.v {
  padding-top: 50px;
  padding-bottom: 50px;
}
hr.h {
  padding-left: 50px;
  padding-right: 50px;
}
@font-face {
  font-family: 'Fira Code';
  src: url('/woff2/FiraCode-Light.woff2') format('woff2'), url("/woff/FiraCode-Light.woff") format("woff");
  font-weight: 300;
  font-style: normal;
}
@font-face {
  font-family: 'Fira Code';
  src: url('/woff2/FiraCode-Regular.woff2') format('woff2'), url("/woff/FiraCode-Regular.woff") format("woff");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Fira Code';
  src: url('/woff2/FiraCode-Medium.woff2') format('woff2'), url("/woff/FiraCode-Medium.woff") format("woff");
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Fira Code';
  src: url('/woff2/FiraCode-SemiBold.woff2') format('woff2'), url("/woff/FiraCode-SemiBold.woff") format("woff");
  font-weight: 600;
  font-style: normal;
}
@font-face {
  font-family: 'Fira Code';
  src: url('/woff2/FiraCode-Bold.woff2') format('woff2'), url("/woff/FiraCode-Bold.woff") format("woff");
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Fira Code VF';
  src: url('/woff2/FiraCode-VF.woff2') format('woff2-variations'), url('/woff/FiraCode-VF.woff') format('woff-variations');
  /* font-weight requires a range: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Fonts/Variable_Fonts_Guide#Using_a_variable_font_font-face_changes */
  font-weight: 300 700;
  font-style: normal;
}
@keyframes marquee-slide-1 {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
@keyframes marquee-slide-2 {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}
.marquee {
  overflow: hidden;
  position: relative;
}
.marquee .innerOne {
  position: absolute;
  animation: marquee-slide-1 5s linear infinite;
  padding-left: 0.5rem;
}
.marquee .innerTwo {
  animation: marquee-slide-2 5s linear infinite;
  padding-left: 0.5rem;
}
@keyframes alert-flash {
  0% {
    transform: translate(0px, 0px);
    box-shadow: #600000 -8px -8px 0px 0px;
  }
  50% {
    transform: translate(5px, 5px);
    box-shadow: #600000 -15px -15px 0px 0px;
  }
}
.alert {
  background-color: #d30000;
  color: black;
  padding: 0.2rem 3rem;
  font-weight: 600;
  font-family: 'Fira Code';
  position: relative;
  animation: alert-flash 2s steps(1, end) infinite;
}
#sidebar {
  position: absolute;
  width: 25vw;
  right: 0;
  top: 0;
  padding: 20px;
}
#sidebar a {
  text-decoration: none;
}
span[class^="font-size-"] {
  padding: 0 0.5em;
}
.font-size-0 {
  font-size: 0.75em;
}
.font-size-1 {
  font-size: 0.8em;
}
.font-size-2 {
  font-size: 0.85em;
}
.font-size-3 {
  font-size: 0.9em;
}
.font-size-4 {
  font-size: 0.95em;
}
.font-size-5 {
  font-size: 1em;
}
.font-size-6 {
  font-size: 1.05em;
}
.font-size-7 {
  font-size: 1.1em;
}
.font-size-8 {
  font-size: 1.15em;
}
.font-size-9 {
  font-size: 1.2em;
}
.font-size-10 {
  font-size: 1.25em;
}
.font-size-hover-0:hover {
  font-size: 0.75em;
}
.font-size-hover-1:hover {
  font-size: 0.8em;
}
.font-size-hover-2:hover {
  font-size: 0.85em;
}
.font-size-hover-3:hover {
  font-size: 0.9em;
}
.font-size-hover-4:hover {
  font-size: 0.95em;
}
.font-size-hover-5:hover {
  font-size: 1em;
}
.font-size-hover-6:hover {
  font-size: 1.05em;
}
.font-size-hover-7:hover {
  font-size: 1.1em;
}
.font-size-hover-8:hover {
  font-size: 1.15em;
}
.font-size-hover-9:hover {
  font-size: 1.2em;
}
.font-size-hover-10:hover {
  font-size: 1.25em;
}
#tranarchy {
  width: 100px;
}
#halt {
  width: 300px;
  margin-top: 20px;
}
body {
  background-color: black;
  color: white;
}
#main {
  max-width: 1000px;
}
img {
  image-rendering: pixelated;
}
code {
  font-family: 'Fira Code';
  font-weight: normal;
}
