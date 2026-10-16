import * as THREE from 'three';

/**
 * LIFE WORLD / DELIVERY E — lightweight procedural atmosphere.
 * No external textures, sound, dependencies or network requests. Everything
 * is decorative, above and outside the walkable area, with no new collisions.
 */
export default function createWorldAtmosphere(scene,{mobile=false}={}){
 const root=new THREE.Group();scene.add(root);
 const white=new THREE.MeshBasicMaterial({color:0xeefdff,transparent:true,opacity:.68,depthWrite:false,fog:false});
 const warm=new THREE.MeshBasicMaterial({color:0xfff5df,transparent:true,opacity:.39,depthWrite:false,fog:false});
 const puff=new THREE.IcosahedronGeometry(1,1);
 const clouds=[];
 // Offset from the working buildings: these cloud clusters stay high in the sky.
 const positions=[[-65,40,-75],[-30,48,-83],[12,42,-89],[56,45,-71],[72,35,-17],[-76,40,24],[-50,46,84],[19,51,87],[69,42,69]];
 positions.slice(0,mobile?5:positions.length).forEach(([x,y,z],i)=>{
   const cloud=new THREE.Group();cloud.position.set(x,y,z);root.add(cloud);
   for(let p=0;p<4;p++){
     const mesh=new THREE.Mesh(puff,p%3===0?warm:white);
     mesh.position.set((p-1.5)*4.9,Math.sin(p*2+i)*1.2,Math.cos(p+i)*1.2);
     mesh.scale.set(5.0+(p%2)*1.6,1.6+((p+i)%3)*.44,2.4+(i%2));
     mesh.castShadow=false;mesh.receiveShadow=false;cloud.add(mesh);
   }
   clouds.push({cloud,x,rate:(i%3+1)*.035});
 });
 const haloMat=new THREE.MeshBasicMaterial({color:0xffeac5,transparent:true,opacity:.16,depthWrite:false,side:THREE.DoubleSide,fog:false});
 const sunHalo=new THREE.Mesh(new THREE.CircleGeometry(10,40),haloMat);
 sunHalo.position.set(-80,76,-87);sunHalo.lookAt(0,0,0);root.add(sunHalo);
 const sunDisc=new THREE.Mesh(new THREE.CircleGeometry(5.1,32),
   new THREE.MeshBasicMaterial({color:0xfff3de,transparent:true,opacity:.37,depthWrite:false,side:THREE.DoubleSide,fog:false}));
 sunDisc.position.set(-80,76,-86.7);sunDisc.lookAt(0,0,0);root.add(sunDisc);
 // Very few ambient light motes near the main court. Static vertices and
 // one points draw-call; subtle opacity pulsing on desktop only.
 let motes=null;
 if(!mobile){
   const count=42,data=new Float32Array(count*3);
   for(let i=0;i<count;i++){
     const angle=i*2.399963,rad=14+Math.sqrt((i+1)/count)*28;
     data[i*3]=Math.sin(angle)*rad;data[i*3+1]=1.7+(i%8)*.55;data[i*3+2]=Math.cos(angle)*rad;
   }
   const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(data,3));
   const points=new THREE.PointsMaterial({color:0xfff4cc,size:.11,transparent:true,opacity:.39,sizeAttenuation:true,depthWrite:false});
   motes=new THREE.Points(geo,points);root.add(motes);
 }
 return {
   update(dt,time,reduced){
     if(reduced)return;
     clouds.forEach(({cloud,x,rate},i)=>{
       cloud.position.x=x+Math.sin(time*rate+i*.3)*4.5;
       cloud.position.y+=Math.sin(time*.27+i)*dt*.004;
     });
     if(motes)motes.material.opacity=.31+Math.sin(time*.65)*.08;
   }
 };
}
