/* WebGL AI Core: progressive enhancement for the portfolio experience. */
(() => {
  const canvas = document.querySelector('#ai-core-canvas');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canvas || !window.THREE || reduceMotion) return;
  try {
    const T = window.THREE;
    const renderer = new T.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(42, 1, .1, 100);
    camera.position.z = 8;
    const root = new T.Group(); root.position.set(2.25, .1, 0); scene.add(root);
    const uniforms = { uTime: { value: 0 }, uScroll: { value: 0 } };
    const core = new T.Mesh(new T.IcosahedronGeometry(1.2, 5), new T.ShaderMaterial({ transparent:true, blending:T.AdditiveBlending, uniforms,
      vertexShader:'uniform float uTime; uniform float uScroll; varying vec3 vNormal; void main(){vNormal=normal; float wave=sin(position.y*5.0+uTime*1.8)*.035+sin(position.x*7.0-uTime)*.025; vec3 p=position+normal*wave*(1.0-uScroll*.35); gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.0);}',
      fragmentShader:'varying vec3 vNormal; void main(){float fres=pow(1.0-abs(vNormal.z),2.2); vec3 color=mix(vec3(.95,.18,.035),vec3(1.0,.58,.12),fres); gl_FragColor=vec4(color,.2+fres*.44);}'
    })); root.add(core);
    const inner = new T.Mesh(new T.IcosahedronGeometry(.55, 3), new T.MeshBasicMaterial({ color:0xff6a2a, transparent:true, opacity:.72 })); root.add(inner);
    root.add(new T.PointLight(0xff7a2f, 5.5, 8));
    const orbitGroup = new T.Group(); root.add(orbitGroup);
    [0,.8,-1].forEach((tilt,index) => { const ring = new T.Mesh(new T.TorusGeometry(1.7+index*.23,.009,6,96),new T.MeshBasicMaterial({color:index===1?0xff9a3c:0xf4512a,transparent:true,opacity:.5})); ring.rotation.set(tilt,index*.7,index*.48); orbitGroup.add(ring); });
    [0,.82,1.65,2.5,3.22,4.15,5.05].forEach((angle,index) => { const node=new T.Mesh(new T.SphereGeometry(.075,12,12),new T.MeshBasicMaterial({color:0xff7138})); node.userData={angle,radius:1.72+(index%3)*.22,speed:.18+index*.022}; orbitGroup.add(node); });
    const geometry = new T.BufferGeometry(), count=850, positions=new Float32Array(count*3);
    for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*18;positions[i*3+1]=(Math.random()-.5)*12;positions[i*3+2]=(Math.random()-.5)*7-2;}
    geometry.setAttribute('position',new T.BufferAttribute(positions,3)); const cloud=new T.Points(geometry,new T.PointsMaterial({color:0xe74b24,size:.016,transparent:true,opacity:.26,depthWrite:false})); scene.add(cloud);
    let targetScroll=0, scroll=0, mouseX=0, mouseY=0;
    const updateScroll=()=>{targetScroll=scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight);}; addEventListener('scroll',updateScroll,{passive:true}); updateScroll();
    addEventListener('pointermove',e=>{mouseX=e.clientX/innerWidth-.5;mouseY=e.clientY/innerHeight-.5;},{passive:true});
    const resize=()=>{renderer.setSize(innerWidth,innerHeight,false);camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();}; addEventListener('resize',resize); resize();
    const clock=new T.Clock();
    const render=()=>{const time=clock.getElapsedTime(); scroll+=(targetScroll-scroll)*.045; uniforms.uTime.value=time;uniforms.uScroll.value=scroll;root.rotation.y+=((mouseX*.75+scroll*2.1)-root.rotation.y)*.028;root.rotation.x+=((-mouseY*.38)-root.rotation.x)*.03;root.position.y=.1-scroll*2.4;root.scale.setScalar(1-scroll*.23);core.rotation.y=time*.21;inner.rotation.set(time*.45,-time*.32,0);orbitGroup.rotation.z=time*.14;orbitGroup.children.forEach(item=>{if(!item.userData.angle)return;const d=item.userData;item.position.set(Math.cos(time*d.speed+d.angle)*d.radius,Math.sin(time*d.speed+d.angle)*d.radius*.52,Math.sin(time*d.speed*.7+d.angle)*.5);});cloud.rotation.y=time*.008+scroll*.28;renderer.render(scene,camera);requestAnimationFrame(render);}; render();
    if(window.gsap&&window.ScrollTrigger){window.gsap.registerPlugin(window.ScrollTrigger);window.gsap.fromTo('.project-spotlight-media img',{scale:1.18,yPercent:10},{scale:1,yPercent:-5,ease:'none',scrollTrigger:{trigger:'.project-spotlight',start:'top bottom',end:'bottom top',scrub:true}});window.gsap.from('.project-spotlight-copy > *',{y:35,opacity:0,stagger:.1,duration:.7,scrollTrigger:{trigger:'.project-spotlight',start:'top 72%'}});}
  } catch (error) { canvas.style.display='none'; }
})();
