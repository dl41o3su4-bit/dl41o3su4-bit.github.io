from pathlib import Path
p = Path("assets/index-cB77LQkQ.js")
js = p.read_text()

i = js.find("drawPlatform(e){")
j = js.find("drawCoin(e){", i)
assert i > 0 and j > i, (i, j)
plat = (
"drawPlatform(e){let t=this.ctx,n=e.sprite===`wood`,H=e.h>40?36:16,x=Math.round(e.x),y=Math.round(e.y),w=Math.round(e.w),s=x*13+y*7|0,N=this.level.route===`xian`||this.level.midKey===`hall`,h=k=>Math.imul(k^1566083941,668265261)>>>0,g=t.createLinearGradient(x,y,x,y+H);"
"n?(g.addColorStop(0,N?`#3a281e`:`#4a3224`),g.addColorStop(.4,N?`#241610`:`#2c1c14`),g.addColorStop(1,`#0a0604`)):N?(g.addColorStop(0,`#4a382c`),g.addColorStop(.25,`#2a1e18`),g.addColorStop(1,`#080604`)):(g.addColorStop(0,`#5a3e2c`),g.addColorStop(.22,`#3a261c`),g.addColorStop(.7,`#1a100c`),g.addColorStop(1,`#080604`));"
"t.fillStyle=g;t.fillRect(x,y,w,H);"
"if(!n){let B=N?[`rgba(90,68,54,0.22)`,`rgba(42,30,24,0.18)`,`rgba(70,52,40,0.14)`]:[`rgba(130,88,54,0.22)`,`rgba(58,36,24,0.16)`,`rgba(110,72,44,0.12)`];for(let b=0;b<3;b++)t.fillStyle=B[b],t.fillRect(x,y+8+b*8+(h(s+b)%3),w,4+(h(s+b*3)%4))}"
"for(let i=0,bl=Math.max(4,w/28|0);i<bl;i++){let bx=x+4+(h(s+i*17)%Math.max(1,w-16)),by=y+6+(h(s+i*31)%Math.max(1,H-10)),bw=8+(h(s+i*9)%18),bh=3+(h(s+i*5)%7),a=.1+(h(s+i)%12)/90;t.fillStyle=`rgba(12,6,4,${a})`;t.fillRect(bx,by,bw,bh);i%2==0&&(t.fillStyle=N?`rgba(150,104,72,${.06+a*.4})`:`rgba(186,120,64,${.08+a*.4})`,t.fillRect(bx+2,y+3,Math.max(4,bw-4),2))}"
"for(let i=0,sn=Math.max(2,w/72|0);i<sn;i++){let sx=x+6+(h(s+i*41)%Math.max(1,w-12)),sh=H-8-(h(s+i*3)%8);t.fillStyle=`rgba(8,4,4,0.22)`;t.fillRect(sx,y+5,1,sh);t.fillStyle=`rgba(8,4,4,0.1)`;t.fillRect(sx+2,y+8,2,sh-6)}"
"for(let cx=x+24;cx<x+w-16;cx+=48)if(h(s+cx)%8==0){t.fillStyle=`#080604`;t.fillRect(cx,y,6+(h(s+cx+3)%8),3)}"
"t.fillStyle=n?N?`rgba(120,84,56,0.4)`:`rgba(168,112,68,0.48)`:N?`rgba(176,128,88,0.28)`:`rgba(210,148,88,0.36)`;t.fillRect(x,y,w,2);"
"t.fillStyle=N?`rgba(255,168,90,0.1)`:`rgba(255,186,100,0.18)`;t.fillRect(x+3,y,w-6,1);"
"t.fillStyle=`rgba(0,0,0,0.28)`;t.fillRect(x,y+2,w,1);t.fillStyle=`rgba(4,2,2,0.5)`;t.fillRect(x,y+H-2,w,2);"
"e.h>40&&(t.fillStyle=`rgba(4,2,4,0.36)`,t.fillRect(x+8,y+H,w-16,5));t.fillStyle=`rgba(0,0,0,0.22)`;t.fillRect(x,y,2,H);t.fillRect(x+w-2,y,2,H)}"
)
js = js[:i] + plat + js[j:]

old_ck = "drawCheckpoint(e){let t=this.ctx,n=!!e.active;t.fillStyle=n?`#8a6a3c`:`#4a4038`;t.fillRect(e.x+4,e.y+42,e.w-8,12);t.fillStyle=n?`#c4a36a`:`#6e6256`;t.fillRect(e.x+10,e.y+28,e.w-20,16);t.fillStyle=n?`#e6c07a`:`#8a7a68`;t.fillRect(e.x+16,e.y+8,3,24);t.fillRect(e.x+22,e.y+4,3,28);t.fillRect(e.x+28,e.y+10,3,22);if(n){t.fillStyle=`rgba(230,192,122,0.35)`;t.beginPath();t.arc(e.x+e.w/2,e.y+6,9+Math.sin(this.time*3)*2,0,Math.PI*2);t.fill()}}"
new_ck = (
"drawCheckpoint(e){let t=this.ctx,n=!!e.active,x=Math.round(e.x),y=Math.round(e.y),w=e.w,h=e.h,cx=x+(w>>1),N=this.level.route===`xian`||this.level.midKey===`hall`;"
"t.fillStyle=`rgba(0,0,0,0.35)`;t.fillRect(x+6,y+h-3,w-12,3);"
"t.fillStyle=n?`#3a2a1c`:`#2a2018`;t.fillRect(x+8,y+h-10,5,8);t.fillRect(cx-2,y+h-10,5,8);t.fillRect(x+w-13,y+h-10,5,8);"
"let b=t.createLinearGradient(x,y+22,x,y+h-8);n?(b.addColorStop(0,N?`#8a6238`:`#a07040`),b.addColorStop(.45,`#5a3c24`),b.addColorStop(1,`#2a1810`)):(b.addColorStop(0,N?`#5a4636`:`#6a5040`),b.addColorStop(.5,`#3a2c22`),b.addColorStop(1,`#1a120e`));"
"t.fillStyle=b;t.fillRect(x+7,y+28,w-14,h-38);t.fillRect(x+4,y+24,w-8,8);"
"t.fillStyle=n?`rgba(210,150,80,0.35)`:`rgba(160,120,80,0.18)`;t.fillRect(x+4,y+24,w-8,2);"
"t.fillStyle=`rgba(0,0,0,0.35)`;t.fillRect(x+8,y+30,w-16,3);t.fillStyle=`#1a100c`;t.fillRect(x+10,y+32,w-20,6);"
"for(let s of[{d:-7,h:22},{d:0,h:28},{d:7,h:20}]){t.fillStyle=n?`#4a2c18`:`#2e2218`;t.fillRect(cx+s.d,y+32-s.h,2,s.h);t.fillStyle=n?`#c45a28`:`#5a4030`;t.fillRect(cx+s.d,y+32-s.h,2,3)}"
"for(let i=0,sm=n?5:3;i<sm;i++){let tm=this.time*(.55+i*.08)+e.x*.01+i,sy=y+6-((tm*14+i*7)%28),sx=cx+Math.sin(tm*1.4+i)*(4+i),sr=3+i%3+Math.sin(tm)*.8;t.fillStyle=n?`rgba(190,170,140,${.1+(i%3)*.04})`:`rgba(140,128,110,${.06+(i%3)*.03})`;t.beginPath();t.ellipse(sx,sy,sr,sr*1.5,0,0,Math.PI*2);t.fill()}"
"n&&(t.fillStyle=`rgba(230,150,70,0.16)`,t.beginPath(),t.arc(cx,y+10,11,0,Math.PI*2),t.fill())}"
)
assert old_ck in js, "checkpoint missing"
js = js.replace(old_ck, new_ck, 1)

old_cam = "this.cam.x=wr(this.cam.x,0,Math.max(0,this.level.width-ir)),this.cam.y=wr(this.cam.y,0,Math.max(0,this.level.height-ar))}"
new_cam = "this.cam.x=Math.round(wr(this.cam.x,0,Math.max(0,this.level.width-ir))),this.cam.y=Math.round(wr(this.cam.y,0,Math.max(0,this.level.height-ar)))}"
assert old_cam in js, "cam missing"
js = js.replace(old_cam, new_cam, 1)

js = js.replace("e.imageSmoothingQuality=`high`", "e.imageSmoothingQuality=`low`", 1)

p.write_text(js)
print("ok", len(plat), len(new_ck))
