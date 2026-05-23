// ═══════════════════════════════════════════════════════════════════
// WHISPER APP — COMPLETE — Part 1: Constants, Data, Shared UI
// ═══════════════════════════════════════════════════════════════════
import { useState, useEffect, useRef, useCallback } from "react";

// ─── TOKENS ──────────────────────────────────────────────────────────
const O="#FF5C1A",OL="#FF8A52",OD="#CC3D00";
const D="#0A0A0A",D2="#111",D3="#1A1A1A",D4="#222",D5="#2A2A2A";
const G="#888",GL="#BBB",GD="#555";
const W="#FFF";
const GOLD="#D4A942",SILVER="#9BA3AF",DIA="#7DD3F7";
const GRN="#4ADE80",RED="#F87171",YEL="#FFC300";

// ─── SCREENS ─────────────────────────────────────────────────────────
const S={
  SPLASH:"splash",ONBOARD:"onboard",LOGIN:"login",REGISTER:"register",
  PROFILE_SETUP:"profile_setup",
  HOME:"home",STATUS:"status",NOTIFS:"notifs",SEARCH:"search",USER_VIEW:"user_view",
  MESSAGES:"messages",CHAT:"chat",
  ROOMS:"rooms",ROOM_CHAT:"room_chat",CREATE_ROOM:"create_room",
  WALLET:"wallet",BUY_COINS:"buy_coins",SEND_COINS:"send_coins",
  BADGE_APPLY:"badge_apply",UPGRADE:"upgrade",
  PROFILE:"profile",SETTINGS:"settings",REPORT:"report",
  ADMIN:"admin",ADMIN_USERS:"admin_users",ADMIN_ROOMS:"admin_rooms",
  ADMIN_COINS:"admin_coins",ADMIN_BADGES:"admin_badges",ADMIN_ANALYTICS:"admin_analytics",
};

// ─── DATA ────────────────────────────────────────────────────────────
const NEARBY=[
  {id:1,name:"Amara K.",av:"AK",tier:"diamond",mode:"visible",online:true,dist:"12m",age:24,occ:"Designer",interests:["🎨 Art","💻 Tech","✈️ Travel"],tender:"Networking"},
  {id:2,name:"Tariq O.",av:"TO",tier:"gold",mode:"visible",online:true,dist:"34m",age:28,occ:"Engineer",interests:["💻 Tech","🎮 Gaming","📚 Reading"],tender:"Friendship"},
  {id:3,name:"Zara M.",av:"ZM",tier:"silver",mode:"partial",online:true,dist:"89m",age:22,occ:"Student",interests:["🎵 Music","📸 Photography"],tender:"Just exploring"},
  {id:4,name:"Kwame B.",av:"KB",tier:"diamond",mode:"visible",online:false,dist:"142m",age:31,occ:"Analyst",interests:["💼 Business","📚 Reading","🌿 Nature"],tender:"Networking"},
  {id:5,name:"Lena P.",av:"LP",tier:"gold",mode:"visible",online:true,dist:"203m",age:26,occ:"Doctor",interests:["🏥 Health","🧘 Wellness","🎬 Film"],tender:"Friendship"},
  {id:6,name:"Emeka J.",av:"EJ",tier:"silver",mode:"partial",online:true,dist:"310m",age:29,occ:"Lawyer",interests:["⚖️ Law","💼 Business"],tender:"Networking"},
];

const CONVOS=[
  {id:1,name:"Amara K.",av:"AK",tier:"diamond",last:"Hey! I saw you were nearby 👀",time:"2m",unread:3,online:true},
  {id:2,name:"Tariq O.",av:"TO",tier:"gold",last:"That was a great convo earlier",time:"15m",unread:0,online:true},
  {id:3,name:"Zara M.",av:"ZM",tier:"silver",last:"Send me that link!",time:"1h",unread:1,online:false},
  {id:4,name:"Kwame B.",av:"KB",tier:"diamond",last:"Are you still at the conference?",time:"2h",unread:0,online:false},
  {id:5,name:"Lena P.",av:"LP",tier:"gold",last:"See you around! 🌟",time:"3h",unread:0,online:true},
];

const INIT_MSGS=[
  {id:1,from:"them",text:"Hey! Got a Whisper you were nearby 👀",time:"10:21"},
  {id:2,from:"me",text:"Haha yeah! I'm at the coffee shop on 5th",time:"10:22"},
  {id:3,from:"them",text:"No way, I was just there 20 mins ago!",time:"10:22"},
  {id:4,from:"me",text:"Small world 😂 what do you do?",time:"10:23"},
  {id:5,from:"them",text:"I'm a designer. Working on a brand project. You?",time:"10:24"},
  {id:6,from:"me",text:"Software engineer. We should collaborate! 👀",time:"10:25"},
  {id:7,from:"them",text:"Absolutely! Let's keep chatting here 😄",time:"10:26"},
];

const ROOMS=[
  {id:1,name:"Love Zone",emoji:"❤️",members:1247,active:true,exclusive:false},
  {id:2,name:"Politics Zone",emoji:"🗳️",members:892,active:true,exclusive:false},
  {id:3,name:"Business Zone",emoji:"💼",members:2104,active:true,exclusive:false},
  {id:4,name:"Creative Art Zone",emoji:"🎨",members:678,active:false,exclusive:false},
  {id:5,name:"Health Zone",emoji:"🏥",members:445,active:true,exclusive:false},
  {id:6,name:"Gossip Zone",emoji:"🗞️",members:3312,active:true,exclusive:false},
  {id:7,name:"Trend Zone",emoji:"🔥",members:5021,active:true,exclusive:false},
  {id:8,name:"Technology Zone",emoji:"💻",members:1893,active:true,exclusive:false},
  {id:9,name:"Buy & Sell Zone",emoji:"🛒",members:756,active:false,exclusive:false},
  {id:10,name:"Platinum Diamond Zone",emoji:"💎",members:312,active:true,exclusive:true},
];

const ROOM_MSGS_INIT=[
  {id:1,user:"Tariq O.",av:"TO",tier:"gold",text:"Anyone think the market is about to flip?",time:"10:12"},
  {id:2,user:"Zara M.",av:"ZM",tier:"silver",text:"100% agree. The signals are all there 📈",time:"10:13"},
  {id:3,user:"Amara K.",av:"AK",tier:"diamond",text:"Been saying this for weeks! Nobody listens lol",time:"10:14"},
  {id:4,user:"Kwame B.",av:"KB",tier:"diamond",text:"Stay patient 🙏",time:"10:15"},
  {id:5,user:"Lena P.",av:"LP",tier:"gold",text:"What sectors are you watching?",time:"10:16"},
];

const ALL_GIFTS=[
  {name:"Universal Whisper",cost:20000,emoji:"🌌"},
  {name:"Spaceship Whisper",cost:15000,emoji:"🚀"},
  {name:"Unicorn Whisper",cost:10000,emoji:"🦄"},
  {name:"Jet Whisper",cost:5000,emoji:"✈️"},
  {name:"Dinosaur Whisper",cost:1000,emoji:"🦕"},
  {name:"Enjoy Whisper",cost:500,emoji:"🎉"},
  {name:"Gold Whisper",cost:250,emoji:"🏆"},
  {name:"Love Whisper",cost:200,emoji:"💖"},
  {name:"Ghost Whisper",cost:100,emoji:"👻"},
  {name:"Silver Whisper",cost:50,emoji:"🥈"},
  {name:"Perfume Whisper",cost:30,emoji:"🌸"},
  {name:"Danger Whisper",cost:20,emoji:"⚠️"},
  {name:"Loud Whisper",cost:20,emoji:"📢"},
  {name:"Diamond Whisper",cost:10,emoji:"💎"},
  {name:"Bold Whisper",cost:10,emoji:"⚡"},
  {name:"Hearts",cost:5,emoji:"💝"},
  {name:"Gentle Whisper",cost:5,emoji:"🕊️"},
  {name:"Cat Whisper",cost:5,emoji:"🐱"},
  {name:"Soft Whisper",cost:2,emoji:"🌙"},
  {name:"Fake Whisper",cost:2,emoji:"🎭"},
  {name:"Baby Whisper",cost:2,emoji:"🍼"},
  {name:"Mice Whisper",cost:2,emoji:"🐭"},
];

const MOCK_STATUSES=[
  {id:1,user:"Amara K.",av:"AK",tier:"diamond",seen:false,count:3,time:"2h",emoji:"🌆",caption:"City life ✨"},
  {id:2,user:"Tariq O.",av:"TO",tier:"gold",seen:true,count:1,time:"5h",emoji:"☕",caption:"Morning grind"},
  {id:3,user:"Lena P.",av:"LP",tier:"gold",seen:false,count:2,time:"8h",emoji:"🌊",caption:"Beach day!"},
  {id:4,user:"Zara M.",av:"ZM",tier:"silver",seen:true,count:1,time:"12h",emoji:"🎵",caption:"Current playlist 🔥"},
  {id:5,user:"Kwame B.",av:"KB",tier:"diamond",seen:false,count:5,time:"20h",emoji:"💼",caption:"Closing deals"},
];

const NOTIFS=[
  {id:1,type:"whisper",text:"Amara K. is 12m away from you",time:"Just now",read:false,emoji:"📡"},
  {id:2,type:"message",text:"Tariq O. sent you a message",time:"5m ago",read:false,emoji:"💬"},
  {id:3,type:"gift",text:"Lena P. sent you a Love Whisper 💖",time:"20m ago",read:false,emoji:"🎁"},
  {id:4,type:"coin",text:"You received 200 coins from Lena P.",time:"20m ago",read:true,emoji:"🪙"},
  {id:5,type:"badge",text:"Your Blue Badge application is pending review",time:"1h ago",read:true,emoji:"✅"},
  {id:6,type:"room",text:"New message in Business Zone",time:"2h ago",read:true,emoji:"⬡"},
  {id:7,type:"whisper",text:"Kwame B. is 142m away from you",time:"3h ago",read:true,emoji:"📡"},
  {id:8,type:"system",text:"Your Gold subscription is active",time:"1d ago",read:true,emoji:"⚙️"},
];

const COIN_PACKS=[
  {coins:100,price:"$1.00",bonus:"",popular:false},
  {coins:550,price:"$5.00",bonus:"+50 free",popular:false},
  {coins:1200,price:"$10.00",bonus:"+200 free",popular:true},
  {coins:2750,price:"$20.00",bonus:"+750 free",popular:false},
  {coins:7500,price:"$50.00",bonus:"+2,500 free",popular:false},
  {coins:16000,price:"$100.00",bonus:"+6,000 free",popular:false},
];

const ADMIN_USERS=[
  {id:1,name:"Amara K.",av:"AK",tier:"diamond",status:"active",joined:"Jan 2024",coins:24500,banned:false,reports:0},
  {id:2,name:"Tariq O.",av:"TO",tier:"gold",status:"active",joined:"Mar 2024",coins:4250,banned:false,reports:1},
  {id:3,name:"Zara M.",av:"ZM",tier:"silver",status:"banned",joined:"Feb 2024",coins:320,banned:true,reports:4},
  {id:4,name:"Kwame B.",av:"KB",tier:"diamond",status:"active",joined:"Dec 2023",coins:88200,banned:false,reports:0},
  {id:5,name:"Lena P.",av:"LP",tier:"gold",status:"suspended",joined:"Apr 2024",coins:1100,banned:false,reports:2},
  {id:6,name:"Emeka J.",av:"EJ",tier:"silver",status:"active",joined:"May 2024",coins:450,banned:false,reports:0},
];

// ─── HELPERS ─────────────────────────────────────────────────────────
const tc=t=>t==="diamond"?DIA:t==="gold"?GOLD:SILVER;
const te=t=>t==="diamond"?"💎":t==="gold"?"🥇":"🥈";
const nowT=()=>new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});

// ─── SHARED COMPONENTS ───────────────────────────────────────────────

function Avatar({av,tier,size=44,online}){
  return(
    <div style={{position:"relative",width:size,height:size,flexShrink:0}}>
      <div style={{width:size,height:size,borderRadius:size/2,background:`linear-gradient(135deg,${tc(tier)}33,${tc(tier)}88)`,border:`2px solid ${tc(tier)}`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:size*.32,color:W}}>{av}</div>
      {online!==undefined&&<div style={{position:"absolute",bottom:1,right:1,width:size*.26,height:size*.26,borderRadius:"50%",background:online?GRN:G,border:`2px solid ${D}`}}/>}
    </div>
  );
}

function TBadge({tier}){
  return <span style={{fontSize:9,padding:"1px 5px",borderRadius:4,background:`${tc(tier)}22`,border:`1px solid ${tc(tier)}55`,color:tc(tier),fontWeight:700,fontFamily:"monospace",letterSpacing:"0.06em"}}>{tier.toUpperCase()}</span>;
}

function Hdr({title,onBack,right,dark}){
  return(
    <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px 12px",borderBottom:`1px solid ${D4}`,background:dark?"#0E0E0E":D2,flexShrink:0}}>
      {onBack&&<button onClick={onBack} style={{background:"none",border:"none",color:O,fontSize:22,cursor:"pointer",padding:"0 4px 0 0",lineHeight:1}}>‹</button>}
      <div style={{flex:1,fontFamily:"'DM Serif Display',serif",fontSize:20,color:W}}>{title}</div>
      {right}
    </div>
  );
}

function Pill({label,active,onClick,color}){
  return(
    <button onClick={onClick} style={{background:active?(color||O):D3,border:`1px solid ${active?(color||O):D5}`,borderRadius:20,padding:"6px 14px",color:active?W:GL,fontSize:12,fontWeight:600,cursor:"pointer",flexShrink:0,transition:"all 0.2s"}}>
      {label}
    </button>
  );
}

function Inp({label,placeholder,type="text",value,onChange,multiline,rows=3}){
  const base={width:"100%",background:D3,border:`1px solid ${D5}`,borderRadius:11,padding:"13px 14px",color:W,fontSize:14,outline:"none",boxSizing:"border-box"};
  return(
    <div style={{marginBottom:14}}>
      {label&&<div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:5}}>{label}</div>}
      {multiline
        ?<textarea value={value} onChange={onChange} placeholder={placeholder||label} rows={rows} style={{...base,resize:"none",fontFamily:"'DM Sans',sans-serif"}}/>
        :<input type={type} value={value} onChange={onChange} placeholder={placeholder||label} style={base}/>
      }
    </div>
  );
}

function BigBtn({label,onClick,color,disabled,outline}){
  const bg=disabled?"#222":outline?"transparent":(color||O);
  const brd=outline?`1px solid ${color||O}`:undefined;
  const clr=disabled?G:outline?(color||O):W;
  return(
    <button onClick={onClick} disabled={disabled} style={{width:"100%",background:bg,color:clr,border:brd||"none",borderRadius:14,padding:"15px",fontSize:15,fontWeight:700,cursor:disabled?"not-allowed":"pointer",boxShadow:disabled||outline?"none":`0 0 20px ${(color||O)}44`,transition:"all 0.2s"}}>
      {label}
    </button>
  );
}

function StatusBar(){
  const [t,setT]=useState("");
  useEffect(()=>{
    const f=()=>{const n=new Date();setT(n.getHours().toString().padStart(2,"0")+":"+n.getMinutes().toString().padStart(2,"0"));};
    f();const i=setInterval(f,1000);return()=>clearInterval(i);
  },[]);
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 22px 4px",fontSize:12,fontWeight:600,color:W}}>
      <span>{t}</span>
      <div style={{display:"flex",gap:5,alignItems:"center",fontSize:11}}>
        <span>●●●</span><span>WiFi</span><span>🔋</span>
      </div>
    </div>
  );
}

function BottomNav({active,onNav,badge}){
  const tabs=[
    {id:"home",icon:"⊙",label:"Nearby"},
    {id:"discover",icon:"✦",label:"Discover"},
    {id:"messages",icon:"✉",label:"Chats"},
    {id:"rooms",icon:"⬡",label:"Rooms"},
    {id:"profile",icon:"◉",label:"Profile"},
  ];
  return(
    <div style={{display:"flex",background:D2,borderTop:`1px solid ${D4}`,padding:"6px 0 14px",flexShrink:0}}>
      {tabs.map(t=>(
        <button key={t.id} onClick={()=>onNav(t.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"4px 0",position:"relative"}}>
          {t.id==="messages"&&badge>0&&<div style={{position:"absolute",top:0,right:"22%",width:16,height:16,borderRadius:8,background:O,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,fontWeight:700,color:W}}>{badge}</div>}
          <span style={{fontSize:19,filter:active===t.id?`drop-shadow(0 0 6px ${O})`:"none",opacity:active===t.id?1:0.4}}>{t.icon}</span>
          <span style={{fontSize:9,fontWeight:600,letterSpacing:"0.06em",color:active===t.id?O:G,textTransform:"uppercase"}}>{t.label}</span>
        </button>
      ))}
    </div>
  );
}


function SplashScreen({onDone}){
  const [p,setP]=useState(0);
  useEffect(()=>{
    const t1=setTimeout(()=>setP(1),300);
    const t2=setTimeout(()=>setP(2),1100);
    const t3=setTimeout(()=>onDone(),2500);
    return()=>{clearTimeout(t1);clearTimeout(t2);clearTimeout(t3);};
  },[]);
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:0}}>
      <div style={{position:"relative",width:170,height:170,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {[0,1,2,3].map(i=>(
          <div key={i} style={{position:"absolute",width:60+i*34,height:60+i*34,borderRadius:"50%",border:`1px solid ${O}`,opacity:p>=1?(0.55-i*.12):0,transform:p>=1?"scale(1)":"scale(0.5)",transition:`all 0.8s ${i*.12}s ease`}}/>
        ))}
        <div style={{width:76,height:76,borderRadius:22,background:`linear-gradient(135deg,${O},${OD})`,display:"flex",alignItems:"center",justifyContent:"center",opacity:p>=1?1:0,transform:p>=1?"scale(1)":"scale(0.3)",transition:"all 0.6s ease",boxShadow:`0 0 48px ${O}99`}}>
          <svg width={48} height={48} viewBox="0 0 32 32" fill="none">
            <path d="M4 6L9 22L16 12L23 22L28 6" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10 27Q16 31.5 22 27" stroke="white" strokeWidth="2.1" strokeLinecap="round" fill="none"/>
            <path d="M12 27Q16 30 20 27" fill="white" opacity="0.45"/>
          </svg>
        </div>
      </div>
      <div style={{opacity:p>=2?1:0,transform:p>=2?"translateY(0)":"translateY(16px)",transition:"all 0.55s 0.1s ease",textAlign:"center",marginTop:18}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:40,fontWeight:700,color:W,letterSpacing:"-0.5px"}}>Whisper</div>
        <div style={{fontSize:11,color:G,letterSpacing:"0.24em",textTransform:"uppercase",marginTop:5}}>Feel who's near you</div>
      </div>
    </div>
  );
}

// ─── ONBOARD ─────────────────────────────────────────────────────────
function OnboardScreen({onLogin,onReg}){
  const [i,setI]=useState(0);
  const slides=[
    {emoji:"📡",title:"Feel Who's Near",desc:"A soft whisper sound alerts you the moment another Whisper user is physically close to you."},
    {emoji:"🔐",title:"Signal-Level Privacy",desc:"All DMs use Signal Protocol end-to-end encryption. Nobody reads your messages — not even us."},
    {emoji:"💎",title:"Rooms, Gifts & Coins",desc:"Join themed chat zones, send animated coin gifts, and unlock Gold or Diamond tiers for more power."},
  ];
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",paddingBottom:32}}>
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 36px",textAlign:"center"}}>
        <div style={{fontSize:90,marginBottom:24,lineHeight:1}}>{slides[i].emoji}</div>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:W,marginBottom:14,lineHeight:1.2}}>{slides[i].title}</div>
        <div style={{fontSize:15,color:GL,lineHeight:1.7}}>{slides[i].desc}</div>
        <div style={{display:"flex",gap:7,marginTop:34}}>
          {slides.map((_,idx)=>(
            <div key={idx} onClick={()=>setI(idx)} style={{width:idx===i?28:7,height:7,borderRadius:4,background:idx===i?O:D4,cursor:"pointer",transition:"all 0.3s"}}/>
          ))}
        </div>
      </div>
      <div style={{padding:"0 24px",display:"flex",flexDirection:"column",gap:12}}>
        <button onClick={onReg} style={{background:`linear-gradient(135deg,${O},${OD})`,color:W,border:"none",borderRadius:14,padding:"16px",fontSize:16,fontWeight:700,cursor:"pointer",boxShadow:`0 0 28px ${O}55`}}>Create Account</button>
        <button onClick={onLogin} style={{background:D3,color:W,border:`1px solid ${D5}`,borderRadius:14,padding:"16px",fontSize:16,fontWeight:600,cursor:"pointer"}}>Sign In</button>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────
function LoginScreen({onBack,onDone}){
  const [em,setEm]=useState("");const [pw,setPw]=useState("");const [loading,setLoading]=useState(false);
  const submit=()=>{setLoading(true);setTimeout(()=>{setLoading(false);onDone();},1000);};
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"14px 20px 0"}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:O,fontSize:14,fontWeight:600,cursor:"pointer",padding:0}}>← Back</button>
      </div>
      <div style={{flex:1,padding:"22px 28px 40px",display:"flex",flexDirection:"column",overflowY:"auto"}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:32,color:W,marginBottom:4}}>Welcome back</div>
        <div style={{fontSize:14,color:G,marginBottom:30}}>Sign in to your Whisper account</div>
        <Inp label="Email" type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="you@example.com"/>
        <Inp label="Password" type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••"/>
        <div style={{textAlign:"right",marginBottom:28}}><span style={{fontSize:13,color:O,cursor:"pointer"}}>Forgot password?</span></div>
        <BigBtn label={loading?"Signing in…":"Sign In"} onClick={submit} disabled={loading}/>
        <div style={{textAlign:"center",marginTop:24,fontSize:13,color:G}}>No account? <span style={{color:O,cursor:"pointer"}} onClick={onBack}>Register</span></div>
        <div style={{marginTop:32,display:"flex",alignItems:"center",gap:12}}>
          <div style={{flex:1,height:1,background:D5}}/><span style={{fontSize:11,color:G}}>OR</span><div style={{flex:1,height:1,background:D5}}/>
        </div>
        <div style={{display:"flex",gap:10,marginTop:16}}>
          {[["G","Google"],["f","Facebook"]].map(([ic,lb])=>(
            <button key={lb} style={{flex:1,background:D3,border:`1px solid ${D5}`,borderRadius:12,padding:"12px",color:GL,fontSize:13,fontWeight:600,cursor:"pointer"}}>{ic} {lb}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER ────────────────────────────────────────────────────────
function RegisterScreen({onBack,onDone}){
  const [step,setStep]=useState(1);
  const [method,setMethod]=useState("email");
  const code=["3","K","8","X","9","P","2","M","1","R"];
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"14px 20px 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <button onClick={step===1?onBack:()=>setStep(s=>s-1)} style={{background:"none",border:"none",color:O,fontSize:14,fontWeight:600,cursor:"pointer",padding:0}}>← Back</button>
        <div style={{display:"flex",gap:5}}>
          {[1,2,3].map(i=><div key={i} style={{width:i<=step?24:7,height:7,borderRadius:4,background:i<=step?O:D4,transition:"all 0.3s"}}/>)}
        </div>
      </div>
      <div style={{flex:1,padding:"20px 26px 36px",overflowY:"auto",display:"flex",flexDirection:"column"}}>
        {step===1&&<>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:W,marginBottom:4}}>Join Whisper</div>
          <div style={{fontSize:13,color:G,marginBottom:20}}>Choose your registration method</div>
          {[{id:"email",label:"📧 Username + Email + Password"},{id:"phone",label:"📱 Phone + Email + Password"}].map(m=>(
            <button key={m.id} onClick={()=>setMethod(m.id)} style={{background:method===m.id?`${O}18`:D3,border:`1px solid ${method===m.id?O:D5}`,borderRadius:12,padding:"14px 16px",color:W,fontSize:13,fontWeight:600,cursor:"pointer",marginBottom:10,textAlign:"left"}}>
              {m.label}
            </button>
          ))}
          <div style={{marginTop:10}}>
            <Inp label="Full Name" placeholder="Your real name"/>
            <Inp label={method==="email"?"Username":"Phone Number"} placeholder={method==="email"?"@username":"+1 (555) 000-0000"}/>
            <Inp label="Email" type="email" placeholder="you@example.com"/>
            <Inp label="Password" type="password" placeholder="Min 8 characters"/>
            <Inp label="Confirm Password" type="password" placeholder="Repeat password"/>
          </div>
          <BigBtn label="Continue →" onClick={()=>setStep(2)}/>
          <div style={{textAlign:"center",marginTop:14,fontSize:11,color:G}}>By continuing you agree to our <span style={{color:O}}>Terms</span> and <span style={{color:O}}>Privacy Policy</span></div>
        </>}
        {step===2&&<>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:W,marginBottom:4}}>Verify Account</div>
          <div style={{fontSize:13,color:G,marginBottom:28}}>Enter the 6-digit code sent to your email/phone</div>
          <div style={{display:"flex",gap:9,justifyContent:"center",marginBottom:8}}>
            {[0,1,2,3,4,5].map(i=>(
              <input key={i} maxLength={1} style={{width:44,height:54,background:D3,border:`1px solid ${D5}`,borderRadius:10,color:W,fontSize:22,fontWeight:700,textAlign:"center",outline:"none"}}/>
            ))}
          </div>
          <div style={{textAlign:"center",fontSize:12,color:G,marginBottom:30}}>
            Didn't receive it? <span style={{color:O,cursor:"pointer"}}>Resend code</span> · <span style={{color:O,cursor:"pointer"}}>Voice call</span>
          </div>
          <BigBtn label="Verify →" onClick={()=>setStep(3)}/>
        </>}
        {step===3&&<>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
            <div style={{width:46,height:46,borderRadius:"50%",background:`${GRN}22`,border:`2px solid ${GRN}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>✅</div>
            <div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:W}}>Verified!</div>
              <div style={{fontSize:12,color:GRN}}>Account activated successfully</div>
            </div>
          </div>
          <div style={{fontSize:13,color:G,marginBottom:18,lineHeight:1.6}}>
            Your <strong style={{color:W}}>10-digit secret recovery code</strong> has been sent to your email. This is the <em>only</em> way to recover, delete, or reclaim a hacked account. Store it offline.
          </div>
          <div style={{background:`${O}15`,border:`1px solid ${O}44`,borderRadius:16,padding:"20px 18px",marginBottom:22}}>
            <div style={{fontSize:10,color:O,fontWeight:700,letterSpacing:"0.14em",marginBottom:12,fontFamily:"monospace"}}>SECRET RECOVERY CODE — SAVE THIS NOW</div>
            <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
              {code.map((c,i)=>(
                <div key={i} style={{width:32,height:38,background:D4,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:18,fontWeight:700,color:W,border:`1px solid ${D5}`}}>{c}</div>
              ))}
            </div>
            <div style={{fontSize:11,color:G,marginTop:12,textAlign:"center"}}>Cryptographically random · Stored hashed server-side · Never shared</div>
          </div>
          <div style={{background:`${YEL}12`,border:`1px solid ${YEL}33`,borderRadius:10,padding:"10px 14px",marginBottom:22}}>
            <div style={{fontSize:12,color:YEL}}>⚠️ Screenshot or write this down before continuing. You cannot view it again.</div>
          </div>
          <BigBtn label="I've saved my code — Set Up Profile →" onClick={onDone}/>
        </>}
      </div>
    </div>
  );
}

// ─── PROFILE SETUP ───────────────────────────────────────────────────
function ProfileSetupScreen({onDone}){
  const [step,setStep]=useState(0);
  const [vis,setVis]=useState("visible");
  const [gender,setGender]=useState("");
  const [tender,setTender]=useState("");
  const [interests,setInterests]=useState([]);
  const allInterests=["🎵 Music","🎮 Gaming","📚 Reading","✈️ Travel","🍕 Food","💪 Fitness","🎨 Art","📸 Photography","💻 Tech","🌿 Nature","🎬 Film","🧘 Wellness","💼 Business","🏀 Sports","🎭 Theatre","🔬 Science","🎸 Music","🌍 Geography"];
  const toggleInterest=i=>setInterests(p=>p.includes(i)?p.filter(x=>x!==i):[...p,i]);
  const steps=["Basic Info","Identity","Interests","Visibility"];
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"14px 20px 0",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        {step>0
          ?<button onClick={()=>setStep(s=>s-1)} style={{background:"none",border:"none",color:O,fontSize:14,fontWeight:600,cursor:"pointer",padding:0}}>← Back</button>
          :<div style={{width:50}}/>}
        <div style={{fontSize:11,color:G,fontWeight:600}}>{steps[step]} · {step+1} / 4</div>
        <div style={{display:"flex",gap:4}}>
          {[0,1,2,3].map(i=><div key={i} style={{width:i<=step?20:6,height:6,borderRadius:3,background:i<=step?O:D4,transition:"all 0.3s"}}/>)}
        </div>
      </div>
      <div style={{flex:1,padding:"18px 24px 28px",overflowY:"auto",display:"flex",flexDirection:"column"}}>
        {step===0&&<>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:4}}>Basic Info</div>
          <div style={{fontSize:13,color:G,marginBottom:20}}>Tell people who you are</div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:22}}>
            <div style={{width:88,height:88,borderRadius:26,background:D3,border:`2px dashed ${D5}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:"pointer",gap:6}}>
              <span style={{fontSize:30}}>📷</span>
              <span style={{fontSize:10,color:G}}>Add photo</span>
            </div>
          </div>
          <Inp label="Full Name" placeholder="Your real name"/>
          <Inp label="Date of Birth" placeholder="DD / MM / YYYY"/>
          <Inp label="Occupation" placeholder="What do you do?"/>
          <Inp label="Institution" placeholder="School or company"/>
        </>}
        {step===1&&<>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:4}}>Identity</div>
          <div style={{fontSize:13,color:G,marginBottom:20}}>Help others understand you</div>
          <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Gender</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:22}}>
            {["Male","Female","Non-binary","Prefer not to say"].map(g=>(
              <button key={g} onClick={()=>setGender(g)} style={{background:gender===g?`${O}22`:D3,border:`1px solid ${gender===g?O:D5}`,borderRadius:20,padding:"9px 18px",color:gender===g?O:GL,fontSize:13,cursor:"pointer",fontWeight:600}}>{g}</button>
            ))}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:10}}>Tender (Relationship Intent)</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:22}}>
            {["Friendship","Dating","Networking","Just exploring"].map(t=>(
              <button key={t} onClick={()=>setTender(t)} style={{background:tender===t?`${O}22`:D3,border:`1px solid ${tender===t?O:D5}`,borderRadius:20,padding:"9px 18px",color:tender===t?O:GL,fontSize:13,cursor:"pointer",fontWeight:600}}>{t}</button>
            ))}
          </div>
          <Inp label="Height (cm)" placeholder="e.g. 175"/>
          <Inp label="Body Size" placeholder="e.g. Slim, Average, Athletic, Plus"/>
          <Inp label="Disability (optional)" placeholder="Any accessibility needs?"/>
        </>}
        {step===2&&<>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:4}}>Interests</div>
          <div style={{fontSize:13,color:G,marginBottom:18}}>Select all that apply ({interests.length} selected)</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {allInterests.map(i=>{const sel=interests.includes(i);return(
              <button key={i} onClick={()=>toggleInterest(i)} style={{background:sel?`${O}22`:D3,border:`1px solid ${sel?O:D5}`,borderRadius:20,padding:"8px 14px",color:sel?O:GL,fontSize:13,cursor:"pointer",fontWeight:sel?700:400,transition:"all 0.15s"}}>{i}</button>
            );})}
          </div>
        </>}
        {step===3&&<>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:4}}>Visibility Mode</div>
          <div style={{fontSize:13,color:G,marginBottom:22}}>Control how nearby users see you on the proximity radar. You can change this anytime.</div>
          {[
            {id:"visible",label:"Visible",dot:GRN,desc:"You appear online. Exact distance shared with nearby users. You receive proximity whisper alerts."},
            {id:"partial",label:"Partial Visible",dot:YEL,desc:"You appear online but no location or distance is shared. Others know you're active, not where."},
            {id:"invisible",label:"Invisible",dot:G,desc:"Completely hidden from radar. No proximity notifications sent. You won't appear to anyone nearby."},
          ].map(m=>(
            <button key={m.id} onClick={()=>setVis(m.id)} style={{background:vis===m.id?`${O}12`:D3,border:`1px solid ${vis===m.id?O:D5}`,borderRadius:14,padding:"16px",marginBottom:12,cursor:"pointer",textAlign:"left",width:"100%",transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <div style={{width:11,height:11,borderRadius:"50%",background:m.dot,boxShadow:m.dot!==G?`0 0 10px ${m.dot}`:undefined}}/>
                <span style={{fontWeight:700,color:vis===m.id?O:W,fontSize:15}}>{m.label}</span>
              </div>
              <div style={{fontSize:12,color:G,paddingLeft:21,lineHeight:1.55}}>{m.desc}</div>
            </button>
          ))}
        </>}
        <div style={{marginTop:"auto",paddingTop:22}}>
          <BigBtn label={step<3?"Continue →":"Enter Whisper 🎉"} onClick={step<3?()=>setStep(s=>s+1):onDone}/>
        </div>
      </div>
    </div>
  );
}

// ─── HOME / RADAR ────────────────────────────────────────────────────
function HomeScreen({push,onNav}){
  const [angle,setAngle]=useState(0);
  const [alert,setAlert]=useState(false);
  const [alertUser,setAlertUser]=useState(null);
  const [vis,setVis]=useState("visible");
  const [pinging,setPinging]=useState(false);

  useEffect(()=>{const i=setInterval(()=>setAngle(a=>(a+1.6)%360),16);return()=>clearInterval(i);},[]);
  useEffect(()=>{
    const t=setTimeout(()=>{setAlertUser(NEARBY[0]);setAlert(true);setPinging(true);setTimeout(()=>setPinging(false),1000);},1800);
    return()=>clearTimeout(t);
  },[]);

  const radarDots=[
    {u:NEARBY[0],a:28,r:38},{u:NEARBY[1],a:82,r:60},{u:NEARBY[2],a:152,r:76},
    {u:NEARBY[3],a:208,r:50},{u:NEARBY[4],a:282,r:86},{u:NEARBY[5],a:328,r:66},
  ];

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"}}>
      {/* Whisper Alert */}
      {alert&&(
        <div style={{position:"absolute",top:60,left:14,right:14,zIndex:100,background:D3,borderRadius:18,padding:"13px 15px",border:`1px solid ${O}66`,boxShadow:`0 4px 40px ${O}44`,display:"flex",alignItems:"center",gap:11,animation:"slideDown 0.4s ease"}}>
          <div style={{width:44,height:44,borderRadius:14,background:`${O}22`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🔔</div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:14,color:W,marginBottom:2}}>Whisper nearby! 📡</div>
            <div style={{fontSize:12,color:G}}>{alertUser.name} is {alertUser.dist} from you</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>{push(S.USER_VIEW,alertUser);setAlert(false);}} style={{background:O,border:"none",borderRadius:8,padding:"7px 11px",color:W,fontSize:12,fontWeight:700,cursor:"pointer"}}>View</button>
            <button onClick={()=>setAlert(false)} style={{background:D4,border:"none",borderRadius:8,padding:"7px 10px",color:G,fontSize:18,cursor:"pointer",lineHeight:1}}>×</button>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{padding:"10px 18px 0",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <div>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:W,lineHeight:1}}>Whisper</div>
          <div style={{fontSize:11,fontWeight:600,display:"flex",alignItems:"center",gap:5,marginTop:3,color:vis==="visible"?GRN:vis==="partial"?YEL:G}}>
            <span style={{width:7,height:7,borderRadius:"50%",background:vis==="visible"?GRN:vis==="partial"?YEL:G,display:"inline-block",boxShadow:vis!=="invisible"?("0 0 9px "+(vis==="visible"?GRN:YEL)):undefined}}/>
            {vis==="visible"?"Visible":vis==="partial"?"Partial":"Invisible"}{" · "}{NEARBY.length} nearby
          </div>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button onClick={()=>push(S.NOTIFS)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:11,padding:"8px 11px",color:W,cursor:"pointer",fontSize:16,position:"relative"}}>
            🔔
            <div style={{position:"absolute",top:-4,right:-4,width:15,height:15,borderRadius:8,background:O,fontSize:8,fontWeight:700,color:W,display:"flex",alignItems:"center",justifyContent:"center"}}>3</div>
          </button>
          <button onClick={()=>push(S.DISCOVER)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:11,padding:"8px 11px",color:W,cursor:"pointer",fontSize:16}}>✦</button>
          <button onClick={()=>push(S.NEARBY_MAP)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:11,padding:"8px 11px",color:W,cursor:"pointer",fontSize:16}}>🗺️</button>
          <button onClick={()=>push(S.SEARCH)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:11,padding:"8px 11px",color:W,cursor:"pointer",fontSize:16}}>🔍</button>
        </div>
      </div>

      {/* Radar canvas */}
      <div style={{display:"flex",justifyContent:"center",padding:"12px 0 8px",flexShrink:0}}>
        <div style={{position:"relative",width:216,height:216}}>
          {[0,1,2,3].map(i=>(
            <div key={i} style={{position:"absolute",top:"50%",left:"50%",width:36+i*48,height:36+i*48,borderRadius:"50%",border:`1px solid ${O}${["40","2C","1C","10"][i]}`,transform:"translate(-50%,-50%)"}}/>
          ))}
          {/* Axis lines */}
          <div style={{position:"absolute",top:"50%",left:0,right:0,height:1,background:`${O}15`,transform:"translateY(-50%)"}}/>
          <div style={{position:"absolute",left:"50%",top:0,bottom:0,width:1,background:`${O}15`,transform:"translateX(-50%)"}}/>
          {/* Sweep */}
          <div style={{position:"absolute",top:"50%",left:"50%",width:108,height:108,borderRadius:"50%",background:`conic-gradient(from ${angle}deg,${O}66 0deg,${O}11 55deg,transparent 65deg)`,transform:"translate(-50%,-50%)"}}/>
          {/* Ping */}
          {pinging&&<div style={{position:"absolute",top:"50%",left:"50%",width:40,height:40,borderRadius:"50%",border:`2px solid ${O}`,transform:"translate(-50%,-50%)",animation:"ping 1s ease-out"}}/>}
          {/* Center */}
          <div style={{position:"absolute",top:"50%",left:"50%",width:16,height:16,borderRadius:"50%",background:O,transform:"translate(-50%,-50%)",boxShadow:`0 0 16px ${O}`}}/>
          {/* User dots */}
          {radarDots.map(({u,a,r})=>{
            const rad=a*Math.PI/180;
            return(
              <div key={u.id} onClick={()=>push(S.USER_VIEW,u)} style={{position:"absolute",left:`${50+Math.cos(rad)*(r/108)*50}%`,top:`${50+Math.sin(rad)*(r/108)*50}%`,transform:"translate(-50%,-50%)",cursor:"pointer",zIndex:10}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:`${tc(u.tier)}22`,border:`2.5px solid ${tc(u.tier)}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,fontWeight:700,color:W,boxShadow:`0 0 12px ${tc(u.tier)}88`}}>{u.av[0]}</div>
                {u.online&&<div style={{position:"absolute",bottom:0,right:0,width:9,height:9,borderRadius:"50%",background:GRN,border:`2px solid ${D}`}}/>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Visibility pills */}
      <div style={{display:"flex",gap:6,padding:"0 16px 10px",justifyContent:"center",flexShrink:0}}>
        {[{id:"visible",label:"🟢 Visible"},{id:"partial",label:"🟡 Partial"},{id:"invisible",label:"⚫ Invisible"}].map(v=>(
          <button key={v.id} onClick={()=>setVis(v.id)} style={{background:vis===v.id?`${O}22`:D3,border:`1px solid ${vis===v.id?O:D5}`,borderRadius:20,padding:"5px 13px",color:vis===v.id?O:G,fontSize:11,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>{v.label}</button>
        ))}
      </div>

      {/* Status row */}
      <div style={{padding:"0 16px 10px",flexShrink:0}}>
        <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:9}}>Status Updates</div>
        <div style={{display:"flex",gap:13,overflowX:"auto",paddingBottom:4}}>
          <div onClick={()=>push(S.STATUS)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
            <div style={{width:54,height:54,borderRadius:"50%",background:D3,border:`2px dashed ${D5}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>+</div>
            <div style={{fontSize:9,color:G}}>My Status</div>
          </div>
          {MOCK_STATUSES.map(st=>(
            <div key={st.id} onClick={()=>push(S.STATUS,st)} style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer"}}>
              <div style={{width:54,height:54,borderRadius:"50%",padding:2.5,background:st.seen?D4:`conic-gradient(${O},${OL},${O})`}}>
                <div style={{width:"100%",height:"100%",borderRadius:"50%",background:D3,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${D}`,fontWeight:700,fontSize:13,color:W}}>{st.av}</div>
              </div>
              <div style={{fontSize:9,color:G,maxWidth:54,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",textAlign:"center"}}>{st.user.split(" ")[0]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Nearby list */}
      <div style={{flex:1,overflowY:"auto",padding:"0 14px 10px"}}>
        <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:9}}>Nearby Users</div>
        {NEARBY.map(u=>(
          <div key={u.id} onClick={()=>push(S.USER_VIEW,u)} style={{display:"flex",alignItems:"center",gap:11,background:D3,borderRadius:14,padding:"11px 13px",marginBottom:8,cursor:"pointer",border:`1px solid ${D4}`,transition:"border-color 0.2s"}}>
            <Avatar av={u.av} tier={u.tier} size={44} online={u.online}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                <span style={{fontWeight:700,fontSize:14,color:W}}>{u.name}</span>
                <TBadge tier={u.tier}/>
              </div>
              <div style={{fontSize:12,color:G}}>{u.occ} · {u.mode==="visible"?u.dist+" away":"Online"}</div>
            </div>
            <div style={{textAlign:"right"}}>
              {u.mode==="visible"
                ?<div style={{fontSize:12,color:O,fontWeight:700}}>{u.dist}</div>
                :<div style={{fontSize:10,color:GD}}>Partial</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STATUS / STORIES ────────────────────────────────────────────────
function StatusScreen({onBack,initData}){
  const [view,setView]=useState(initData?"story":"list");
  const [storyUser,setStoryUser]=useState(initData||MOCK_STATUSES[0]);
  const [storyIdx,setStoryIdx]=useState(0);
  const [progress,setProgress]=useState(0);
  const [caption,setCaption]=useState("");
  const [creating,setCreating]=useState(false);

  const mySlides=[
    {emoji:"☕",bg:"#2A1200",text:"Morning grind 💪"},
    {emoji:"🌆",bg:"#001233",text:"City vibes tonight"},
    {emoji:"🎵",bg:"#1A003D",text:"Current playlist is 🔥"},
  ];

  useEffect(()=>{
    if(view!=="story")return;
    setProgress(0);
    const i=setInterval(()=>setProgress(p=>{
      if(p>=100){
        if(storyIdx<mySlides.length-1){setStoryIdx(s=>s+1);return 0;}
        else{setView("list");setStoryIdx(0);return 0;}
      }
      return p+1.6;
    }),80);
    return()=>clearInterval(i);
  },[view,storyIdx]);

  if(view==="story"){
    const sl=mySlides[storyIdx];
    return(
      <div style={{flex:1,background:sl.bg,display:"flex",flexDirection:"column",position:"relative"}}>
        <div style={{display:"flex",gap:4,padding:"52px 14px 8px"}}>
          {mySlides.map((_,idx)=>(
            <div key={idx} style={{flex:1,height:3,borderRadius:2,background:D4,overflow:"hidden",cursor:"pointer"}} onClick={()=>setStoryIdx(idx)}>
              <div style={{height:"100%",width:idx<storyIdx?"100%":idx===storyIdx?`${progress}%`:"0%",background:W,borderRadius:2,transition:idx===storyIdx?"none":"none"}}/>
            </div>
          ))}
        </div>
        <div style={{padding:"8px 16px",display:"flex",alignItems:"center",gap:11}}>
          <Avatar av="ME" tier="gold" size={36}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:13,color:W}}>Your Story</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.55)"}}>2h ago · {mySlides.length-storyIdx} remaining</div>
          </div>
          <button onClick={()=>{setView("list");setStoryIdx(0);}} style={{background:"rgba(0,0,0,0.4)",border:"none",borderRadius:10,padding:"6px 10px",color:W,fontSize:13,cursor:"pointer"}}>✕</button>
        </div>
        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:18,position:"relative"}}>
          <div style={{fontSize:110,lineHeight:1,filter:"drop-shadow(0 4px 24px rgba(0,0,0,0.5))"}}>{sl.emoji}</div>
          <div style={{fontSize:22,color:W,fontWeight:700,textAlign:"center",padding:"0 28px",textShadow:"0 2px 12px rgba(0,0,0,0.6)"}}>{sl.text}</div>
          {/* tap zones */}
          <div style={{position:"absolute",inset:0,display:"flex"}}>
            <div style={{flex:1,cursor:"pointer"}} onClick={()=>{if(storyIdx>0)setStoryIdx(i=>i-1);}}/>
            <div style={{flex:1,cursor:"pointer"}} onClick={()=>{if(storyIdx<mySlides.length-1)setStoryIdx(i=>i+1);else{setView("list");setStoryIdx(0);}}}/>
          </div>
        </div>
        <div style={{padding:"14px 16px 28px",display:"flex",gap:10}}>
          <input placeholder="Reply to story…" style={{flex:1,background:"rgba(255,255,255,0.15)",border:"1px solid rgba(255,255,255,0.25)",borderRadius:24,padding:"11px 16px",color:W,fontSize:13,outline:"none"}}/>
          <button style={{background:O,border:"none",borderRadius:22,width:44,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18,color:W}}>↑</button>
        </div>
      </div>
    );
  }

  if(creating){
    return(
      <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
        <Hdr title="New Status" onBack={()=>setCreating(false)}
          right={<button onClick={()=>setCreating(false)} style={{background:O,border:"none",borderRadius:8,padding:"7px 16px",color:W,fontSize:13,fontWeight:700,cursor:"pointer"}}>Share</button>}/>
        <div style={{flex:1,padding:"20px",overflowY:"auto"}}>
          <div style={{background:D3,border:`2px dashed ${D5}`,borderRadius:18,height:230,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,cursor:"pointer",marginBottom:18}}>
            <div style={{fontSize:50}}>📷</div>
            <div style={{fontSize:14,color:G}}>Tap to add photo or video</div>
            <div style={{fontSize:11,color:GD}}>Videos limited to 10 seconds · Max 5 statuses</div>
          </div>
          <Inp label="Caption" placeholder="What's on your mind?" value={caption} onChange={e=>setCaption(e.target.value)} multiline rows={3}/>
          <div style={{fontSize:11,color:G,marginBottom:14}}>Status expires automatically after 24 hours</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
            {["😊","🔥","❤️","💡","🎉","✨","🌍","🎵","💪","😎"].map(e=>(
              <button key={e} onClick={()=>setCaption(c=>c+e)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:8,padding:"9px 11px",fontSize:20,cursor:"pointer"}}>{e}</button>
            ))}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Audience</div>
          <div style={{display:"flex",gap:8}}>
            {["Everyone","Connections Only","Gold+ Only"].map(a=>(
              <button key={a} style={{flex:1,background:a==="Everyone"?`${O}22`:D3,border:`1px solid ${a==="Everyone"?O:D5}`,borderRadius:10,padding:"9px 0",color:a==="Everyone"?O:GL,fontSize:11,fontWeight:600,cursor:"pointer"}}>{a}</button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Status" onBack={onBack}
        right={<button onClick={()=>setCreating(true)} style={{background:O,border:"none",borderRadius:8,padding:"7px 14px",color:W,fontSize:13,fontWeight:700,cursor:"pointer"}}>+ New</button>}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
        {/* My status card */}
        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:10}}>My Status</div>
        <div onClick={()=>{setView("story");setStoryIdx(0);}} style={{display:"flex",alignItems:"center",gap:12,marginBottom:22,cursor:"pointer",background:D3,borderRadius:14,padding:"13px",border:`1px solid ${D4}`}}>
          <div style={{width:54,height:54,borderRadius:"50%",padding:2.5,background:`conic-gradient(${O},${OL},${O})`}}>
            <div style={{width:"100%",height:"100%",borderRadius:"50%",background:D3,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${D}`,fontSize:16,fontWeight:700,color:W}}>ME</div>
          </div>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,color:W,fontSize:14}}>My Story</div>
            <div style={{fontSize:12,color:G}}>3 statuses active · Tap to view</div>
          </div>
          <button onClick={e=>{e.stopPropagation();setCreating(true);}} style={{background:D4,border:`1px solid ${D5}`,borderRadius:8,padding:"6px 10px",color:GL,fontSize:12,cursor:"pointer"}}>+ Add</button>
        </div>

        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:10}}>Recent Updates</div>
        {MOCK_STATUSES.map(st=>(
          <div key={st.id} onClick={()=>{setStoryUser(st);setView("story");setStoryIdx(0);}} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:`1px solid ${D4}`,cursor:"pointer"}}>
            <div style={{width:56,height:56,borderRadius:"50%",padding:2.5,background:st.seen?D4:`conic-gradient(${O},${OL},${O})`}}>
              <div style={{width:"100%",height:"100%",borderRadius:"50%",background:D3,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${D}`,fontWeight:700,fontSize:14,color:W}}>{st.av}</div>
            </div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                <span style={{fontWeight:700,fontSize:14,color:W}}>{st.user}</span>
                <TBadge tier={st.tier}/>
              </div>
              <div style={{fontSize:12,color:G}}>{st.count} {st.count===1?"status":"statuses"} · {st.time} ago</div>
            </div>
            <div style={{fontSize:28}}>{st.emoji}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS ───────────────────────────────────────────────────
function NotifsScreen({onBack}){
  const [notifs,setNotifs]=useState(NOTIFS);
  const unread=notifs.filter(n=>!n.read).length;
  const markAll=()=>setNotifs(n=>n.map(x=>({...x,read:true})));
  const dismiss=id=>setNotifs(n=>n.filter(x=>x.id!==id));

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title={`Notifications${unread>0?` (${unread})`:""}`} onBack={onBack}
        right={<button onClick={markAll} style={{background:"none",border:"none",color:O,fontSize:12,fontWeight:700,cursor:"pointer"}}>Mark all read</button>}/>
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
        {notifs.length===0&&(
          <div style={{textAlign:"center",padding:"50px 0",color:G}}>
            <div style={{fontSize:44,marginBottom:12}}>🔔</div>
            <div style={{fontSize:14}}>No notifications</div>
          </div>
        )}
        {notifs.map(n=>(
          <div key={n.id} style={{display:"flex",gap:12,padding:"12px 13px",borderRadius:13,background:n.read?"transparent":`${O}09`,marginBottom:5,border:`1px solid ${n.read?"transparent":O+"28"}`,transition:"all 0.2s"}}>
            <div style={{width:42,height:42,borderRadius:13,background:D3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,flexShrink:0}}>{n.emoji}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,color:n.read?GL:W,fontWeight:n.read?400:600,lineHeight:1.45,marginBottom:3}}>{n.text}</div>
              <div style={{fontSize:11,color:G}}>{n.time}</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
              {!n.read&&<div style={{width:9,height:9,borderRadius:"50%",background:O}}/>}
              <button onClick={()=>dismiss(n.id)} style={{background:"none",border:"none",color:GD,cursor:"pointer",fontSize:16,lineHeight:1}}>×</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SEARCH ──────────────────────────────────────────────────────────
function SearchScreen({onBack,push}){
  const [q,setQ]=useState("");
  const [gender,setGender]=useState("all");
  const [filterTier,setFilterTier]=useState("all");
  const [filterMode,setFilterMode]=useState("all");

  const filtered=NEARBY.filter(u=>{
    const qMatch=q===""||u.name.toLowerCase().includes(q.toLowerCase())||u.occ.toLowerCase().includes(q.toLowerCase());
    const gMatch=gender==="all"||(gender==="male"&&u.av[1]==="O")||(gender==="female"&&["AK","ZM","LP"].includes(u.av));
    const tMatch=filterTier==="all"||u.tier===filterTier;
    const mMatch=filterMode==="all"||(filterMode==="online"&&u.online)||(filterMode==="nearby"&&u.mode==="visible");
    return qMatch&&gMatch&&tMatch&&mMatch;
  });

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Search & Discover" onBack={onBack}/>
      <div style={{padding:"10px 16px 6px",flexShrink:0}}>
        <div style={{background:D3,borderRadius:13,padding:"10px 14px",display:"flex",alignItems:"center",gap:9,marginBottom:12,border:`1px solid ${D5}`}}>
          <span style={{color:G,fontSize:16}}>🔍</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Name, occupation, institution…" style={{background:"none",border:"none",color:W,fontSize:14,outline:"none",flex:1}}/>
          {q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",color:G,fontSize:18,cursor:"pointer",lineHeight:1}}>×</button>}
        </div>
        <div style={{display:"flex",gap:7,marginBottom:8,overflowX:"auto",paddingBottom:2}}>
          {[{id:"all",label:"👥 All"},{id:"male",label:"👨 Male"},{id:"female",label:"👩 Female"}].map(g=>(
            <Pill key={g.id} label={g.label} active={gender===g.id} onClick={()=>setGender(g.id)}/>
          ))}
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4}}>
          {[{id:"all",label:"All"},{id:"online",label:"🟢 Online"},{id:"nearby",label:"📡 Nearby"},{id:"diamond",label:"💎 Diamond"},{id:"gold",label:"🥇 Gold"},{id:"silver",label:"🥈 Silver"}].map(f=>(
            <Pill key={f.id} label={f.label} active={filterMode===f.id||filterTier===f.id}
              onClick={()=>{
                if(["diamond","gold","silver"].includes(f.id)){setFilterTier(f.id==="all"?"all":f.id);setFilterMode("all");}
                else{setFilterMode(f.id);setFilterTier("all");}
              }}/>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"6px 14px"}}>
        <div style={{fontSize:11,color:G,marginBottom:10}}>{filtered.length} result{filtered.length!==1?"s":""} found</div>
        {filtered.length===0?(
          <div style={{textAlign:"center",padding:"40px 0",color:G}}>
            <div style={{fontSize:44,marginBottom:12}}>🔍</div>
            <div style={{fontSize:14}}>No users match your filters</div>
            <div style={{fontSize:12,marginTop:6,color:GD}}>Try adjusting your search</div>
          </div>
        ):filtered.map(u=>(
          <div key={u.id} onClick={()=>push(S.USER_VIEW,u)} style={{display:"flex",alignItems:"center",gap:12,background:D3,borderRadius:14,padding:"13px",marginBottom:8,cursor:"pointer",border:`1px solid ${D4}`}}>
            <Avatar av={u.av} tier={u.tier} size={50} online={u.online}/>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:14,color:W}}>{u.name}</span>
                <TBadge tier={u.tier}/>
              </div>
              <div style={{fontSize:12,color:G,marginBottom:5}}>{u.occ} · Age {u.age}</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                {u.interests.slice(0,3).map(i=>(
                  <span key={i} style={{fontSize:10,background:D4,borderRadius:10,padding:"2px 8px",color:GL}}>{i}</span>
                ))}
              </div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:12,color:u.mode==="visible"?O:G,fontWeight:u.mode==="visible"?700:400}}>{u.mode==="visible"?u.dist+" away":"Online"}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── USER PROFILE VIEW ───────────────────────────────────────────────
function UserViewScreen({user,onBack,push}){
  const u=user||NEARBY[0];
  const [tab,setTab]=useState("about");
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{background:`linear-gradient(180deg,${tc(u.tier)}25 0%,transparent 100%)`,padding:"14px 18px 0",flexShrink:0}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:O,fontSize:14,fontWeight:600,cursor:"pointer",marginBottom:14,padding:0}}>← Back</button>
        <div style={{display:"flex",gap:15,alignItems:"flex-start",marginBottom:16}}>
          <Avatar av={u.av} tier={u.tier} size={82} online={u.online}/>
          <div style={{flex:1}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:W,marginBottom:4}}>{u.name}</div>
            <TBadge tier={u.tier}/>
            <div style={{fontSize:13,color:G,marginTop:5}}>{u.occ} · Age {u.age}</div>
            <div style={{fontSize:12,marginTop:3,color:u.mode==="visible"?O:G,fontWeight:600}}>
              {u.mode==="visible"?`📡 ${u.dist} away`:`🟡 Online (Partial)`}
            </div>
          </div>
        </div>
        <div style={{display:"flex",gap:9,marginBottom:18,flexWrap:"wrap"}}>
          <button onClick={()=>push(S.CHAT,CONVOS.find(c=>c.name===u.name)||CONVOS[0])} style={{flex:1,background:O,border:"none",borderRadius:12,padding:"12px 0",color:W,fontWeight:700,fontSize:13,cursor:"pointer",boxShadow:`0 0 16px ${O}44`}}>💬 Message</button>
          <button onClick={()=>push(S.SEND_COINS,u)} style={{flex:1,background:D3,border:`1px solid ${D5}`,borderRadius:12,padding:"12px 0",color:W,fontWeight:700,fontSize:13,cursor:"pointer"}}>🪙 Send Coins</button>
          <button onClick={()=>push(S.REPORT,u)} style={{background:`${RED}15`,border:`1px solid ${RED}33`,borderRadius:12,padding:"12px 14px",color:RED,fontWeight:700,fontSize:13,cursor:"pointer"}}>⚠️</button>
        </div>
        <div style={{display:"flex",gap:0,marginBottom:0,borderBottom:`1px solid ${D4}`}}>
          {["about","interests","album"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,background:"none",border:"none",padding:"10px 0",color:tab===t?O:G,fontWeight:700,fontSize:13,cursor:"pointer",borderBottom:`2px solid ${tab===t?O:"transparent"}`,textTransform:"capitalize",transition:"all 0.2s"}}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{padding:"16px 18px 28px"}}>
        {tab==="about"&&(
          <div style={{background:D3,borderRadius:14,padding:"16px",border:`1px solid ${D4}`}}>
            {[["Tender",u.tender],["Occupation",u.occ],["Age",u.age],["Visibility",u.mode==="visible"?"Visible":"Partial"],["Status",u.online?"Online":"Offline"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${D4}`}}>
                <span style={{fontSize:13,color:G}}>{k}</span>
                <span style={{fontSize:13,color:W,fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        )}
        {tab==="interests"&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:9}}>
            {u.interests.map(i=>(
              <span key={i} style={{background:D3,border:`1px solid ${D5}`,borderRadius:20,padding:"8px 16px",fontSize:13,color:GL}}>{i}</span>
            ))}
          </div>
        )}
        {tab==="album"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>
            {["🌆","🎨","☕","🌊","🎵","📸","🌅","🎭","🍕"].map((e,i)=>(
              <div key={i} style={{aspectRatio:"1",background:D3,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,border:`1px solid ${D4}`}}>{e}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


function MessagesScreen({push}){
  const [q,setQ]=useState("");
  const filtered=CONVOS.filter(c=>q===""||c.name.toLowerCase().includes(q.toLowerCase()));
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 18px 14px",flexShrink:0}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:14}}>Messages</div>
        <div style={{background:D3,borderRadius:13,padding:"10px 14px",display:"flex",alignItems:"center",gap:9,border:`1px solid ${D5}`}}>
          <span style={{color:G,fontSize:16}}>🔍</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search conversations…" style={{background:"none",border:"none",color:W,fontSize:14,outline:"none",flex:1}}/>
          {q&&<button onClick={()=>setQ("")} style={{background:"none",border:"none",color:G,fontSize:18,cursor:"pointer"}}>×</button>}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 16px"}}>
        {filtered.map(c=>(
          <div key={c.id} onClick={()=>push(S.CHAT,c)} style={{display:"flex",alignItems:"center",gap:13,padding:"13px 0",borderBottom:`1px solid ${D4}`,cursor:"pointer"}}>
            <Avatar av={c.av} tier={c.tier} size={52} online={c.online}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:14,color:W}}>{c.name}</span>
                <span style={{fontSize:11,color:G}}>{c.time}</span>
              </div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:13,color:c.unread?GL:G,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:220}}>{c.last}</span>
                {c.unread>0&&<div style={{minWidth:18,height:18,borderRadius:9,background:O,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:W,padding:"0 4px",flexShrink:0}}>{c.unread}</div>}
              </div>
            </div>
          </div>
        ))}
        {filtered.length===0&&(
          <div style={{textAlign:"center",padding:"40px 0",color:G}}>
            <div style={{fontSize:44,marginBottom:10}}>💬</div>
            <div>No conversations found</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CHAT ─────────────────────────────────────────────────────────────
function ChatScreen({user,onBack,push}){
  const u=user||CONVOS[0];
  const [msgs,setMsgs]=useState(INIT_MSGS);
  const [msg,setMsg]=useState("");
  const [showAttach,setShowAttach]=useState(false);
  const [typing,setTyping]=useState(false);
  const bottomRef=useRef(null);
  useEffect(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);

  const send=()=>{
    if(!msg.trim())return;
    const txt=msg;
    setMsg("");
    setMsgs(m=>[...m,{id:Date.now(),from:"me",text:txt,time:nowT()}]);
    setTyping(true);
    setTimeout(()=>{
      setTyping(false);
      setMsgs(m=>[...m,{id:Date.now()+1,from:"them",text:"That's interesting! Tell me more 😊",time:nowT()}]);
    },1400);
  };

  const attachOptions=[["📷","Photo"],["🎥","Video"],["📎","File"],["🎵","Audio"],["📍","Location"],["💾","Document"]];

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"8px 14px 8px",display:"flex",alignItems:"center",gap:11,borderBottom:`1px solid ${D4}`,background:D2,flexShrink:0}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:O,fontSize:24,cursor:"pointer",lineHeight:1,padding:"0 2px 0 0"}}>‹</button>
        <div onClick={()=>push(S.USER_VIEW,NEARBY.find(x=>x.name===u.name)||NEARBY[0])} style={{cursor:"pointer"}}>
          <Avatar av={u.av} tier={u.tier} size={38} online={u.online}/>
        </div>
        <div style={{flex:1,cursor:"pointer"}} onClick={()=>push(S.USER_VIEW,NEARBY.find(x=>x.name===u.name)||NEARBY[0])}>
          <div style={{fontWeight:700,fontSize:15,color:W,lineHeight:1.2}}>{u.name}</div>
          <div style={{fontSize:11,color:u.online?GRN:G}}>{typing?"Typing…":u.online?"Online":"Offline"}</div>
        </div>
        <div style={{display:"flex",gap:14}}>
          <button onClick={()=>push(S.VOICE_CALL,u)} style={{background:"none",border:"none",color:GL,fontSize:18,cursor:"pointer",opacity:0.8}}>📞</button>
          <button onClick={()=>push(S.VIDEO_CALL,u)} style={{background:"none",border:"none",color:GL,fontSize:18,cursor:"pointer",opacity:0.8}}>📹</button>
          <button style={{background:"none",border:"none",color:GL,fontSize:18,cursor:"pointer",opacity:0.6}}>⋯</button>
        </div>
      </div>
      <div style={{textAlign:"center",padding:"5px 20px",fontSize:10,color:GD,background:D}}>🔐 Signal Protocol End-to-End Encryption · Nobody can read your messages</div>

      <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
        {msgs.map(m=>(
          <div key={m.id} style={{display:"flex",justifyContent:m.from==="me"?"flex-end":"flex-start",marginBottom:9}}>
            <div style={{maxWidth:"77%",background:m.from==="me"?`linear-gradient(135deg,${O},${OD})`:D3,borderRadius:m.from==="me"?"18px 18px 4px 18px":"18px 18px 18px 4px",padding:"10px 14px"}}>
              <div style={{fontSize:14,color:W,lineHeight:1.45}}>{m.text}</div>
              <div style={{fontSize:9,color:m.from==="me"?"rgba(255,255,255,0.5)":G,textAlign:"right",marginTop:4}}>{m.time}{m.from==="me"&&" ✓✓"}</div>
            </div>
          </div>
        ))}
        {typing&&(
          <div style={{display:"flex",justifyContent:"flex-start",marginBottom:9}}>
            <div style={{background:D3,borderRadius:"18px 18px 18px 4px",padding:"12px 16px",display:"flex",gap:5,alignItems:"center"}}>
              {[0,1,2].map(i=><div key={i} style={{width:7,height:7,borderRadius:"50%",background:G,animation:`bounce 1.2s ${i*0.2}s infinite`}}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {showAttach&&(
        <div style={{background:D2,borderTop:`1px solid ${D4}`,padding:"14px 16px",display:"flex",gap:12,justifyContent:"center",flexShrink:0}}>
          {attachOptions.map(([e,l])=>(
            <div key={l} onClick={()=>setShowAttach(false)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:5,cursor:"pointer"}}>
              <div style={{width:50,height:50,borderRadius:15,background:D3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,border:`1px solid ${D5}`}}>{e}</div>
              <div style={{fontSize:10,color:G}}>{l}</div>
            </div>
          ))}
        </div>
      )}

      <div style={{padding:"8px 12px 8px",display:"flex",alignItems:"center",gap:8,borderTop:`1px solid ${D4}`,background:D2,flexShrink:0}}>
        <button onClick={()=>setShowAttach(a=>!a)} style={{background:showAttach?`${O}22`:D3,border:`1px solid ${showAttach?O:D5}`,borderRadius:20,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",color:W,cursor:"pointer",fontSize:17,flexShrink:0}}>📎</button>
        <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Type a message…" style={{flex:1,background:D3,border:`1px solid ${D5}`,borderRadius:22,padding:"10px 15px",color:W,fontSize:14,outline:"none"}}/>
        <button onClick={send} style={{width:38,height:38,borderRadius:19,background:msg.trim()?O:D3,border:"none",cursor:"pointer",fontSize:18,color:W,transition:"background 0.2s",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>↑</button>
      </div>
    </div>
  );
}

// ─── ROOMS ────────────────────────────────────────────────────────────
function RoomsScreen({push}){
  const [tab,setTab]=useState("all");
  const [search,setSearch]=useState("");
  const filtered=ROOMS.filter(r=>{
    const qm=search===""||r.name.toLowerCase().includes(search.toLowerCase());
    const tm=tab==="all"||(tab==="active"&&r.active)||(tab==="exclusive"&&r.exclusive);
    return qm&&tm;
  });
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"12px 18px 8px",flexShrink:0}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:12}}>Apostle Rooms</div>
        <div style={{background:D3,borderRadius:13,padding:"9px 13px",display:"flex",alignItems:"center",gap:8,marginBottom:10,border:`1px solid ${D5}`}}>
          <span style={{color:G}}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search rooms…" style={{background:"none",border:"none",color:W,fontSize:13,outline:"none",flex:1}}/>
        </div>
        <div style={{display:"flex",gap:7,marginBottom:10}}>
          {["all","active","exclusive"].map(t=><Pill key={t} label={t==="all"?"All":t==="active"?"🟢 Active":"💎 Exclusive"} active={tab===t} onClick={()=>setTab(t)}/>)}
        </div>
        <div style={{background:`${O}12`,border:`1px solid ${O}33`,borderRadius:11,padding:"10px 13px",marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontSize:12,color:O,fontWeight:600}}>🥇 Gold Access</div>
            <div style={{fontSize:11,color:GD}}>Entry: 5 coins / 24h session</div>
          </div>
          <button onClick={()=>push(S.CREATE_ROOM)} style={{background:O,border:"none",borderRadius:9,padding:"7px 13px",color:W,fontSize:12,fontWeight:700,cursor:"pointer"}}>+ Create</button>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"0 14px 14px"}}>
        {filtered.map(r=>(
          <div key={r.id} onClick={()=>push(S.ROOM_CHAT,r)} style={{display:"flex",alignItems:"center",gap:12,background:r.exclusive?`${DIA}0A`:D3,border:`1px solid ${r.exclusive?DIA+"44":D4}`,borderRadius:14,padding:"14px",marginBottom:8,cursor:"pointer",transition:"border-color 0.2s"}}>
            <div style={{fontSize:28,width:48,height:48,background:D4,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{r.emoji}</div>
            <div style={{flex:1}}>
              <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:3}}>
                <span style={{fontWeight:700,fontSize:14,color:r.exclusive?DIA:W}}>{r.name}</span>
                {r.exclusive&&<span style={{fontSize:8,background:`${DIA}22`,color:DIA,border:`1px solid ${DIA}44`,borderRadius:4,padding:"1px 5px",fontWeight:700,fontFamily:"monospace"}}>DIAMOND ONLY</span>}
              </div>
              <div style={{fontSize:12,color:G}}>{r.members.toLocaleString()} members · {r.active?"🟢 Active":"⚫ Quiet"}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:12,color:O,fontWeight:700}}>5 🪙</div>
              <div style={{fontSize:9,color:GD}}>per session</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ROOM CHAT ───────────────────────────────────────────────────────
function RoomChatScreen({room,onBack}){
  const r=room||ROOMS[2];
  const [msgs,setMsgs]=useState(ROOM_MSGS_INIT);
  const [msg,setMsg]=useState("");
  const [showGifts,setShowGifts]=useState(false);
  const [showMembers,setShowMembers]=useState(false);
  const [giftAnim,setGiftAnim]=useState(null);
  const [reported,setReported]=useState(null);
  const bottomRef=useRef(null);
  useEffect(()=>bottomRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);

  const send=()=>{
    if(!msg.trim())return;
    setMsgs(m=>[...m,{id:Date.now(),user:"You",av:"ME",tier:"gold",text:msg,time:nowT()}]);
    setMsg("");
  };
  const sendGift=g=>{
    setShowGifts(false);
    setGiftAnim(g);
    setMsgs(m=>[...m,{id:Date.now(),user:"You",av:"ME",tier:"gold",text:`🎁 Sent ${g.emoji} ${g.name} (${g.cost.toLocaleString()} coins)`,time:nowT(),isGift:true}]);
    setTimeout(()=>setGiftAnim(null),2200);
  };

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",position:"relative"}}>
      {giftAnim&&(
        <div style={{position:"absolute",top:"25%",left:"50%",transform:"translate(-50%,-50%)",zIndex:200,textAlign:"center",pointerEvents:"none",animation:"giftPop 2.2s ease forwards"}}>
          <div style={{fontSize:90,filter:`drop-shadow(0 0 30px ${O})`}}>{giftAnim.emoji}</div>
          <div style={{fontWeight:800,color:W,fontSize:18,marginTop:8,textShadow:`0 0 20px ${O}`}}>{giftAnim.name}</div>
          <div style={{color:O,fontSize:14,fontWeight:700}}>{giftAnim.cost.toLocaleString()} coins</div>
        </div>
      )}

      <div style={{padding:"8px 14px 8px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid ${D4}`,background:D2,flexShrink:0}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:O,fontSize:24,cursor:"pointer",lineHeight:1}}>‹</button>
        <div style={{fontSize:24}}>{r.emoji}</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,color:r.exclusive?DIA:W,lineHeight:1.2}}>{r.name}</div>
          <div style={{fontSize:10,color:GRN}}>{r.members.toLocaleString()} members online</div>
        </div>
        <button onClick={()=>setShowMembers(m=>!m)} style={{background:showMembers?`${O}22`:D3,border:`1px solid ${showMembers?O:D5}`,borderRadius:9,padding:"6px 10px",color:GL,fontSize:11,cursor:"pointer",fontWeight:600}}>👥</button>
        <button style={{background:"none",border:"none",color:G,fontSize:18,cursor:"pointer"}}>⋯</button>
      </div>

      {showMembers?(
        <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
          <div style={{fontWeight:700,color:W,fontSize:15,marginBottom:13}}>Room Members ({NEARBY.length+1})</div>
          {[...NEARBY,{id:99,name:"You",av:"ME",tier:"gold",online:true,occ:"That's you"}].map(u=>(
            <div key={u.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderBottom:`1px solid ${D4}`}}>
              <Avatar av={u.av} tier={u.tier} size={38} online={u.online}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,fontSize:13,color:W}}>{u.name}</div>
                <div style={{fontSize:11,color:G}}>{u.occ}</div>
              </div>
              <TBadge tier={u.tier}/>
            </div>
          ))}
        </div>
      ):(
        <>
          <div style={{flex:1,overflowY:"auto",padding:"10px 14px"}}>
            {msgs.map(m=>(
              <div key={m.id} style={{marginBottom:13,display:"flex",gap:9}}>
                <div style={{width:34,height:34,borderRadius:9,flexShrink:0,background:`${tc(m.tier)}22`,border:`2px solid ${tc(m.tier)}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,color:W}}>{m.av[0]}</div>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <span style={{fontSize:12,fontWeight:700,color:tc(m.tier)}}>{m.user}</span>
                    <TBadge tier={m.tier}/>
                    <span style={{fontSize:9,color:G}}>{m.time}</span>
                    <button onClick={()=>setReported(m.user)} style={{marginLeft:"auto",background:"none",border:"none",color:GD,cursor:"pointer",fontSize:12,opacity:0.5}}>⚠️</button>
                  </div>
                  <div style={{background:m.isGift?`${O}18`:D3,border:m.isGift?`1px solid ${O}44`:undefined,borderRadius:"4px 13px 13px 13px",padding:"9px 12px",fontSize:13,color:m.isGift?O:W,lineHeight:1.45,fontWeight:m.isGift?700:400}}>{m.text}</div>
                </div>
              </div>
            ))}
            {reported&&(
              <div style={{background:`${YEL}12`,border:`1px solid ${YEL}33`,borderRadius:10,padding:"9px 12px",marginBottom:8,fontSize:12,color:YEL}}>
                ⚠️ Report submitted for {reported}. Our moderators will review.
                <button onClick={()=>setReported(null)} style={{background:"none",border:"none",color:YEL,cursor:"pointer",float:"right",fontSize:14}}>×</button>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {showGifts&&(
            <div style={{background:D2,borderTop:`1px solid ${D4}`,padding:"12px 12px",flexShrink:0}}>
              <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Gift Gallery — Tap to send</div>
              <div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4}}>
                {ALL_GIFTS.map(g=>(
                  <div key={g.name} onClick={()=>sendGift(g)} style={{flexShrink:0,background:D3,border:`1px solid ${D5}`,borderRadius:13,padding:"10px 10px",textAlign:"center",cursor:"pointer",minWidth:70,transition:"all 0.15s"}}>
                    <div style={{fontSize:28,marginBottom:3}}>{g.emoji}</div>
                    <div style={{fontSize:9,color:O,fontWeight:700,fontFamily:"monospace"}}>{g.cost>=1000?(g.cost/1000)+"k":g.cost}</div>
                    <div style={{fontSize:8,color:GD}}>coins</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{padding:"7px 11px 8px",display:"flex",alignItems:"center",gap:8,borderTop:`1px solid ${D4}`,background:D2,flexShrink:0}}>
            <button onClick={()=>setShowGifts(g=>!g)} style={{background:showGifts?`${O}22`:D3,border:`1px solid ${showGifts?O:D5}`,borderRadius:20,width:38,height:38,display:"flex",alignItems:"center",justifyContent:"center",color:W,cursor:"pointer",fontSize:16,flexShrink:0}}>🎁</button>
            <input value={msg} onChange={e=>setMsg(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
              placeholder="Say something to the room…" style={{flex:1,background:D3,border:`1px solid ${D5}`,borderRadius:22,padding:"10px 14px",color:W,fontSize:13,outline:"none"}}/>
            <button onClick={send} style={{width:38,height:38,borderRadius:19,background:msg.trim()?O:D3,border:"none",cursor:"pointer",fontSize:18,color:W,transition:"background 0.2s",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>↑</button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── CREATE ROOM ──────────────────────────────────────────────────────
function CreateRoomScreen({onBack}){
  const [name,setName]=useState("");
  const [desc,setDesc]=useState("");
  const [emoji,setEmoji]=useState("🏠");
  const [priv,setPriv]=useState(true);
  const [done,setDone]=useState(false);
  const emojis=["🏠","🎯","🔥","⚡","💫","🎪","🧩","🎭","🌙","🦋","🎵","🚀","🌊","🎨","💡"];
  const invCode=Math.random().toString(36).slice(2,8).toUpperCase();

  if(done)return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:16}}>
      <div style={{fontSize:80,filter:`drop-shadow(0 0 24px ${O})`}}>{emoji}</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:W,textAlign:"center"}}>Room Created! 🎉</div>
      <div style={{fontSize:14,color:G,textAlign:"center"}}>"{name}" is now live. 50 coins deducted from your wallet.</div>
      <div style={{background:`${O}15`,border:`1px solid ${O}44`,borderRadius:16,padding:"18px 20px",width:"100%",textAlign:"center"}}>
        <div style={{fontSize:10,color:O,fontWeight:700,letterSpacing:"0.14em",marginBottom:8,fontFamily:"monospace"}}>INVITE CODE — SHARE WITH DIAMOND MEMBERS</div>
        <div style={{fontFamily:"monospace",fontSize:26,color:W,fontWeight:800,letterSpacing:"0.22em"}}>WH-{invCode}</div>
      </div>
      <BigBtn label="Go to Room →" onClick={onBack}/>
    </div>
  );

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Create Private Room" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"18px 20px"}}>
        <div style={{background:`${DIA}12`,border:`1px solid ${DIA}33`,borderRadius:13,padding:"13px 15px",marginBottom:20}}>
          <div style={{fontSize:12,color:DIA,fontWeight:700,marginBottom:3}}>💎 Platinum Diamond Feature</div>
          <div style={{fontSize:11,color:GD,lineHeight:1.5}}>Creating a private room costs 50 coins. Only Platinum Diamond members can join private rooms. Your room stays active as long as you're subscribed.</div>
        </div>

        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Room Icon</div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
          {emojis.map(e=>(
            <button key={e} onClick={()=>setEmoji(e)} style={{width:46,height:46,borderRadius:13,background:emoji===e?`${O}22`:D3,border:`1px solid ${emoji===e?O:D5}`,fontSize:24,cursor:"pointer",transition:"all 0.15s"}}>{e}</button>
          ))}
        </div>

        <Inp label="Room Name" value={name} onChange={e=>setName(e.target.value)} placeholder="Give your room a name…"/>
        <Inp label="Description" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What's this room about?" multiline rows={3}/>

        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Access</div>
        <div style={{display:"flex",gap:9,marginBottom:20}}>
          {[{id:true,label:"🔒 Private (Diamond Only)"},{id:false,label:"🔓 Open to Gold+"}].map(a=>(
            <button key={String(a.id)} onClick={()=>setPriv(a.id)} style={{flex:1,background:priv===a.id?`${O}22`:D3,border:`1px solid ${priv===a.id?O:D5}`,borderRadius:11,padding:"11px 8px",color:priv===a.id?O:GL,fontSize:12,fontWeight:600,cursor:"pointer"}}>{a.label}</button>
          ))}
        </div>

        <div style={{background:D3,borderRadius:13,padding:"14px 16px",marginBottom:20}}>
          {[["Creation fee","50 coins"],["Your balance","4,250 coins"],["After creation","4,200 coins"]].map(([k,v],i)=>(
            <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<2?`1px solid ${D5}`:undefined}}>
              <span style={{fontSize:13,color:G}}>{k}</span>
              <span style={{fontSize:13,color:i===0?RED:i===2?GRN:W,fontWeight:600}}>{v}</span>
            </div>
          ))}
        </div>

        <BigBtn label="Create Room — 50 coins" onClick={()=>name.trim()&&setDone(true)} disabled={!name.trim()}/>
      </div>
    </div>
  );
}

// ─── WALLET ───────────────────────────────────────────────────────────
function WalletScreen({push}){
  const [coins]=useState(4250);
  const txs=[
    {id:1,type:"received",from:"Amara K.",amount:50,label:"Silver Whisper gift",time:"Today 10:22"},
    {id:2,type:"sent",to:"Business Zone",amount:5,label:"Room Entry Fee",time:"Today 09:15"},
    {id:3,type:"purchased",amount:1000,label:"Coin Purchase",time:"Yesterday"},
    {id:4,type:"sent",to:"Kwame B.",amount:100,label:"Ghost Whisper gift",time:"2 days ago"},
    {id:5,type:"received",from:"Lena P.",amount:200,label:"Love Whisper gift",time:"3 days ago"},
    {id:6,type:"sent",to:"Badge Application",amount:50,label:"Verified Badge Fee",time:"4 days ago"},
    {id:7,type:"purchased",amount:500,label:"Coin Purchase",time:"5 days ago"},
  ];
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"10px 18px 0",flexShrink:0}}>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:14}}>Wallet</div>
      </div>
      <div style={{margin:"0 14px 14px",flexShrink:0}}>
        <div style={{background:`linear-gradient(135deg,${O},${OD})`,borderRadius:22,padding:"24px",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-25,right:-25,width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,0.07)"}}/>
          <div style={{position:"absolute",bottom:-35,left:-15,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.05)"}}/>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.62)",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:6}}>Coin Balance</div>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:44,fontWeight:700,color:W,lineHeight:1,marginBottom:12}}>{coins.toLocaleString()} <span style={{fontSize:20,opacity:0.65}}>coins</span></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end"}}>
            <div><div style={{fontSize:9,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>Tier</div><div style={{fontSize:14,fontWeight:700,color:W}}>🥇 Premium Gold</div></div>
            <div style={{textAlign:"right"}}><div style={{fontSize:9,color:"rgba(255,255,255,0.5)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:2}}>USD Value</div><div style={{fontSize:14,fontWeight:700,color:W}}>${(coins/10).toFixed(2)}</div></div>
          </div>
        </div>
      </div>

      <div style={{display:"flex",gap:9,padding:"0 14px 14px",flexShrink:0}}>
        {[{icon:"💳",label:"Buy Coins",s:S.BUY_COINS},{icon:"📤",label:"Send Coins",s:S.SEND_COINS},{icon:"🎁",label:"Gift History",s:S.GIFT_HISTORY},{icon:"📋",label:"Coin History",s:S.COIN_HISTORY}].map(a=>(
          <button key={a.label} onClick={()=>push(a.s)} style={{flex:1,background:D3,border:`1px solid ${D5}`,borderRadius:13,padding:"11px 0",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:4,transition:"border-color 0.2s"}}>
            <span style={{fontSize:19}}>{a.icon}</span>
            <span style={{fontSize:9,color:GL,fontWeight:600,textAlign:"center",lineHeight:1.2}}>{a.label}</span>
          </button>
        ))}
      </div>

      <div style={{padding:"0 14px 12px",flexShrink:0}}>
        <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:9}}>Tier Fees</div>
        <div style={{display:"flex",gap:8}}>
          {[{tier:"silver",fee:"50%",active:false},{tier:"gold",fee:"30%",active:true},{tier:"diamond",fee:"20%",active:false}].map(t=>(
            <div key={t.tier} style={{flex:1,background:t.active?`${O}15`:D3,border:`1px solid ${t.active?O:D5}`,borderRadius:13,padding:"11px 7px",textAlign:"center"}}>
              <div style={{fontSize:15,marginBottom:2}}>{te(t.tier)}</div>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,fontWeight:700,color:tc(t.tier)}}>{t.fee}</div>
              <div style={{fontSize:9,color:G}}>fee</div>
              <div style={{fontSize:8,color:GD,marginTop:2}}>{t.tier==="silver"?"Max 10K":t.tier==="gold"?"Max 100K":"Unlimited"}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{flex:1,overflowY:"auto",padding:"0 14px 10px"}}>
        <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:9}}>Transaction History</div>
        {txs.map(tx=>(
          <div key={tx.id} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:`1px solid ${D4}`}}>
            <div style={{width:36,height:36,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,background:tx.type==="received"?`${GRN}22`:tx.type==="purchased"?`${O}22`:`${RED}22`,flexShrink:0}}>
              {tx.type==="received"?"⬇️":tx.type==="purchased"?"💳":"⬆️"}
            </div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:W,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tx.label}</div>
              <div style={{fontSize:11,color:G}}>{tx.from||tx.to} · {tx.time}</div>
            </div>
            <div style={{fontWeight:700,fontSize:14,color:tx.type==="received"?GRN:tx.type==="purchased"?O:RED,flexShrink:0}}>
              {tx.type==="sent"?"-":"+"}  {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── BUY COINS ────────────────────────────────────────────────────────
function BuyCoinsScreen({onBack}){
  const [sel,setSel]=useState(2);
  const [method,setMethod]=useState("card");
  const [loading,setLoading]=useState(false);
  const [done,setDone]=useState(false);

  if(done)return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:16}}>
      <div style={{fontSize:80}}>🎉</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:W,textAlign:"center"}}>Coins Added!</div>
      <div style={{fontSize:18,color:GRN,fontWeight:700}}>+{COIN_PACKS[sel].coins.toLocaleString()} coins</div>
      <div style={{fontSize:13,color:G,textAlign:"center"}}>New balance: {(4250+COIN_PACKS[sel].coins).toLocaleString()} coins</div>
      <BigBtn label="Done" onClick={onBack}/>
    </div>
  );

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Buy Coins" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
        <div style={{fontSize:12,color:G,marginBottom:16}}>10 coins = $1.00 USD · Minimum purchase: 10 coins</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:22}}>
          {COIN_PACKS.map((p,i)=>(
            <div key={i} onClick={()=>setSel(i)} style={{background:sel===i?`${O}22`:D3,border:`2px solid ${sel===i?O:D5}`,borderRadius:16,padding:"15px 13px",cursor:"pointer",position:"relative",transition:"all 0.2s"}}>
              {p.popular&&<div style={{position:"absolute",top:-9,left:"50%",transform:"translateX(-50%)",background:O,color:W,fontSize:8,fontWeight:700,padding:"2px 10px",borderRadius:10,fontFamily:"monospace",whiteSpace:"nowrap"}}>🔥 POPULAR</div>}
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,fontWeight:700,color:sel===i?O:W,marginBottom:2}}>{p.coins>=1000?(p.coins/1000)+"K":p.coins}</div>
              <div style={{fontSize:10,color:G,marginBottom:p.bonus?4:8}}>coins</div>
              {p.bonus&&<div style={{fontSize:10,color:GRN,fontWeight:700,marginBottom:6}}>{p.bonus}</div>}
              <div style={{fontSize:15,fontWeight:700,color:sel===i?O:W}}>{p.price}</div>
            </div>
          ))}
        </div>

        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Payment Method</div>
        <div style={{display:"flex",gap:8,marginBottom:18}}>
          {[{id:"card",label:"💳 Card"},{id:"bank",label:"🏦 Bank"},{id:"mobile",label:"📱 Mobile"}].map(m=>(
            <button key={m.id} onClick={()=>setMethod(m.id)} style={{flex:1,background:method===m.id?`${O}22`:D3,border:`1px solid ${method===m.id?O:D5}`,borderRadius:11,padding:"11px 0",color:method===m.id?O:GL,fontSize:12,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>{m.label}</button>
          ))}
        </div>

        {method==="card"&&<>
          <Inp label="Card Number" placeholder="4242 4242 4242 4242"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <Inp label="Expiry" placeholder="MM / YY"/>
            <Inp label="CVV" placeholder="123"/>
          </div>
          <Inp label="Cardholder Name" placeholder="Full name on card"/>
        </>}
        {method==="bank"&&<>
          <Inp label="Account Number" placeholder="Your bank account number"/>
          <Inp label="Routing Number" placeholder="Bank routing number"/>
        </>}
        {method==="mobile"&&<>
          <Inp label="Phone Number" placeholder="+1 (555) 000-0000"/>
          <div style={{background:`${O}12`,borderRadius:11,padding:"11px 14px",marginBottom:14,fontSize:12,color:GL}}>You'll receive an OTP to confirm the payment on your mobile number.</div>
        </>}

        <div style={{background:D3,borderRadius:13,padding:"14px 16px",marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:13,color:G}}>Coins</span>
            <span style={{fontSize:13,color:W,fontWeight:600}}>{COIN_PACKS[sel].coins.toLocaleString()}</span>
          </div>
          {COIN_PACKS[sel].bonus&&<div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
            <span style={{fontSize:13,color:G}}>Bonus</span>
            <span style={{fontSize:13,color:GRN,fontWeight:600}}>{COIN_PACKS[sel].bonus}</span>
          </div>}
          <div style={{height:1,background:D5,margin:"8px 0"}}/>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:14,color:W,fontWeight:700}}>Total</span>
            <span style={{fontSize:14,color:O,fontWeight:800}}>{COIN_PACKS[sel].price}</span>
          </div>
        </div>

        <BigBtn label={loading?`Processing…`:`Pay ${COIN_PACKS[sel].price}`} onClick={()=>{setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);},1500);}} disabled={loading}/>
      </div>
    </div>
  );
}

// ─── SEND COINS ───────────────────────────────────────────────────────
function SendCoinsScreen({user,onBack}){
  const u=user||NEARBY[0];
  const [amount,setAmount]=useState("");
  const [note,setNote]=useState("");
  const [done,setDone]=useState(false);
  const fee=Math.round(Number(amount)*0.3);
  const net=Number(amount)-fee;

  if(done)return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:16}}>
      <div style={{fontSize:80}}>🪙</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:W,textAlign:"center"}}>Sent!</div>
      <div style={{fontSize:18,color:GRN,fontWeight:700}}>{net} coins → {u.name}</div>
      <div style={{fontSize:13,color:G,textAlign:"center"}}>30% Gold tier fee: {fee} coins deducted from your wallet.</div>
      <BigBtn label="Done" onClick={onBack}/>
    </div>
  );

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Send Coins" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"18px 20px"}}>
        <div style={{display:"flex",alignItems:"center",gap:13,background:D3,borderRadius:16,padding:"15px",marginBottom:22,border:`1px solid ${D5}`}}>
          <Avatar av={u.av} tier={u.tier} size={50}/>
          <div>
            <div style={{fontWeight:700,fontSize:16,color:W,marginBottom:3}}>{u.name}</div>
            <TBadge tier={u.tier}/>
          </div>
        </div>

        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Amount (coins)</div>
        <div style={{background:D3,border:`2px solid ${amount?O:D5}`,borderRadius:16,padding:"18px 16px",display:"flex",alignItems:"center",gap:10,marginBottom:14,transition:"border-color 0.2s"}}>
          <span style={{fontSize:22}}>🪙</span>
          <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0"
            style={{background:"none",border:"none",color:W,fontSize:32,fontWeight:700,outline:"none",flex:1,width:"100%",fontFamily:"'DM Serif Display',serif"}}/>
        </div>

        <div style={{display:"flex",gap:8,marginBottom:18}}>
          {[50,100,250,500,1000].map(v=>(
            <button key={v} onClick={()=>setAmount(String(v))} style={{flex:1,background:Number(amount)===v?`${O}22`:D3,border:`1px solid ${Number(amount)===v?O:D5}`,borderRadius:9,padding:"8px 0",color:Number(amount)===v?O:GL,fontSize:11,fontWeight:700,cursor:"pointer",transition:"all 0.2s"}}>{v>=1000?"1K":v}</button>
          ))}
        </div>

        <Inp label="Note (optional)" value={note} onChange={e=>setNote(e.target.value)} placeholder="Add a message…"/>

        {amount&&Number(amount)>0&&(
          <div style={{background:D3,borderRadius:13,padding:"14px 16px",marginBottom:18}}>
            {[["Amount",""+amount+" coins"],["Service fee (30%)","-"+fee+" coins"],["Recipient gets",net+" coins"]].map(([k,v],i)=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<2?`1px solid ${D5}`:undefined}}>
                <span style={{fontSize:13,color:G}}>{k}</span>
                <span style={{fontSize:13,color:i===2?GRN:i===1?RED:W,fontWeight:i===2?700:600}}>{v}</span>
              </div>
            ))}
          </div>
        )}

        <BigBtn label="Send Coins" onClick={()=>amount&&Number(amount)>0&&setDone(true)} disabled={!amount||Number(amount)<=0}/>
      </div>
    </div>
  );
}

// ─── BADGE APPLICATION ───────────────────────────────────────────────
function BadgeApplyScreen({onBack}){
  const [step,setStep]=useState(0);
  const [reason,setReason]=useState("");
  const [links,setLinks]=useState("");
  const [freq,setFreq]=useState("3mo");

  if(step===2)return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:14}}>
      <div style={{fontSize:80}}>✅</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,textAlign:"center"}}>Application Submitted!</div>
      <div style={{fontSize:13,color:G,textAlign:"center",lineHeight:1.6}}>Your Verified Blue Badge application is under review. 50 coins deducted. You'll be notified within 48 hours.</div>
      <div style={{background:`${O}15`,border:`1px solid ${O}44`,borderRadius:14,padding:"16px 20px",width:"100%",textAlign:"center"}}>
        <div style={{fontSize:10,color:O,fontWeight:700,letterSpacing:"0.14em",marginBottom:6,fontFamily:"monospace"}}>APPLICATION REF</div>
        <div style={{fontFamily:"monospace",fontSize:20,color:W,fontWeight:700,letterSpacing:"0.1em"}}>VB-{Math.random().toString(36).slice(2,8).toUpperCase()}</div>
      </div>
      <BigBtn label="Done" onClick={onBack}/>
    </div>
  );

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Verified Blue Badge" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"18px 20px"}}>
        {step===0&&<>
          <div style={{textAlign:"center",marginBottom:22}}>
            <div style={{fontSize:64,marginBottom:10}}>✅</div>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:W,marginBottom:10}}>Get Verified</div>
            <div style={{fontSize:13,color:G,lineHeight:1.65}}>Available to Premium Gold and Platinum Diamond accounts. Build trust and credibility on Whisper.</div>
          </div>
          <div style={{background:D3,borderRadius:14,padding:"16px",marginBottom:16,border:`1px solid ${D4}`}}>
            {[["Application fee","50 coins (non-refundable)"],["Every 3 months","100 coins recurring"],["Every 6 months","180 coins recurring"],["Auto-removed","if fee not paid"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"9px 0",borderBottom:`1px solid ${D5}`}}>
                <span style={{fontSize:13,color:G}}>{k}</span>
                <span style={{fontSize:13,color:W,fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Recurring Fee Preference</div>
          <div style={{display:"flex",gap:9,marginBottom:22}}>
            {[{id:"3mo",label:"100 coins / 3 months"},{id:"6mo",label:"180 coins / 6 months"}].map(f=>(
              <button key={f.id} onClick={()=>setFreq(f.id)} style={{flex:1,background:freq===f.id?`${O}22`:D3,border:`1px solid ${freq===f.id?O:D5}`,borderRadius:11,padding:"12px 8px",color:freq===f.id?O:GL,fontSize:12,fontWeight:600,cursor:"pointer"}}>{f.label}</button>
            ))}
          </div>
          <div style={{background:`${GRN}12`,border:`1px solid ${GRN}33`,borderRadius:12,padding:"12px 15px",marginBottom:22}}>
            <div style={{fontSize:12,color:GRN,fontWeight:600}}>✓ You're eligible — Premium Gold account detected</div>
          </div>
          <BigBtn label="Apply Now — 50 coins" onClick={()=>setStep(1)}/>
        </>}
        {step===1&&<>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:W,marginBottom:18}}>Application Form</div>
          <Inp label="Why should you be verified?" value={reason} onChange={e=>setReason(e.target.value)} placeholder="Describe your public identity, business, or purpose…" multiline rows={4}/>
          <Inp label="Supporting Links" value={links} onChange={e=>setLinks(e.target.value)} placeholder="Social media, website, portfolio, news mentions…" multiline rows={3}/>
          <div style={{background:D3,borderRadius:12,padding:"12px 15px",marginBottom:18}}>
            <div style={{display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:13,color:G}}>Application fee</span>
              <span style={{fontSize:13,color:RED,fontWeight:700}}>-50 coins</span>
            </div>
          </div>
          <BigBtn label="Submit Application" onClick={()=>reason.trim()&&setStep(2)} disabled={!reason.trim()}/>
        </>}
      </div>
    </div>
  );
}

// ─── UPGRADE ──────────────────────────────────────────────────────────
function UpgradeScreen({onBack}){
  const [sel,setSel]=useState("diamond");
  const [done,setDone]=useState(false);

  if(done)return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:14}}>
      <div style={{fontSize:80,filter:`drop-shadow(0 0 24px ${DIA})`}}>💎</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,textAlign:"center"}}>Welcome, Diamond Member!</div>
      <div style={{fontSize:13,color:G,textAlign:"center",lineHeight:1.6}}>You now have full Platinum Diamond access. 1,000 coins deducted. Enjoy all rooms, private spaces, and the lowest fees.</div>
      <BigBtn label="Done" onClick={onBack} color={DIA}/>
    </div>
  );

  const tiers=[
    {id:"gold",name:"Premium Gold",emoji:"🥇",price:"200 coins",col:GOLD,perks:["All Silver features","Wallet: up to 100K coins","Send 1–10,000 coins per tx","30% service fee","All 9 default Apostle rooms","Verified Blue Badge eligible"]},
    {id:"diamond",name:"Platinum Diamond",emoji:"💎",price:"1,000 coins",col:DIA,perks:["All Gold features","Unlimited coin wallet","Send up to 1M coins per tx","Lowest 20% service fee","All 10 rooms incl. Diamond Zone","Create private rooms (50 coins)","Exclusive Diamond-only rooms","Priority moderation support"]},
  ];

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Upgrade Account" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <div style={{fontSize:13,color:G,marginBottom:16,textAlign:"center"}}>One-time fee. Keep your tier forever. No subscriptions.</div>
        {tiers.map(t=>(
          <div key={t.id} onClick={()=>setSel(t.id)} style={{background:sel===t.id?`${t.col}14`:D3,border:`2px solid ${sel===t.id?t.col:D5}`,borderRadius:18,padding:"20px",marginBottom:14,cursor:"pointer",transition:"all 0.2s"}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:14}}>
              <span style={{fontSize:32}}>{t.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,color:sel===t.id?t.col:W}}>{t.name}</div>
                <div style={{fontSize:14,color:O,fontWeight:700,marginTop:2}}>{t.price}</div>
              </div>
              <div style={{width:24,height:24,borderRadius:12,border:`2px solid ${sel===t.id?t.col:D5}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                {sel===t.id&&<div style={{width:13,height:13,borderRadius:7,background:t.col}}/>}
              </div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6}}>
              {t.perks.map(p=>(
                <div key={p} style={{display:"flex",alignItems:"flex-start",gap:8,fontSize:12,color:GL}}>
                  <span style={{color:GRN,marginTop:1,flexShrink:0}}>✓</span>{p}
                </div>
              ))}
            </div>
          </div>
        ))}
        <div style={{background:D3,borderRadius:13,padding:"13px 16px",marginBottom:18}}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:13,color:G}}>Cost</span>
            <span style={{fontSize:14,color:O,fontWeight:700}}>{tiers.find(t=>t.id===sel)?.price}</span>
          </div>
        </div>
        <BigBtn label={`Upgrade to ${tiers.find(t=>t.id===sel)?.name}`} onClick={()=>setDone(true)} color={tiers.find(t=>t.id===sel)?.col}/>
      </div>
    </div>
  );
}

// ─── REPORT ───────────────────────────────────────────────────────────
function ReportScreen({user,onBack}){
  const u=user||NEARBY[0];
  const [reason,setReason]=useState("");
  const [detail,setDetail]=useState("");
  const [done,setDone]=useState(false);
  const reasons=["Spam or scam","Harassment or bullying","Inappropriate content","Fake profile","Hate speech","Threats or violence","Underage user","Other"];

  if(done)return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 28px",gap:14}}>
      <div style={{fontSize:80}}>📋</div>
      <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,textAlign:"center"}}>Report Submitted</div>
      <div style={{fontSize:13,color:G,textAlign:"center",lineHeight:1.6}}>Our moderation team will review this report within 24 hours. Thank you for helping keep Whisper safe.</div>
      <BigBtn label="Done" onClick={onBack}/>
    </div>
  );

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Report User" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 18px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,background:D3,borderRadius:14,padding:"13px",marginBottom:20,border:`1px solid ${D4}`}}>
          <Avatar av={u.av} tier={u.tier} size={44}/>
          <div><div style={{fontWeight:700,fontSize:14,color:W,marginBottom:3}}>{u.name}</div><TBadge tier={u.tier}/></div>
        </div>
        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:11}}>Reason for Report</div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {reasons.map(r=>(
            <button key={r} onClick={()=>setReason(r)} style={{background:reason===r?`${RED}14`:D3,border:`1px solid ${reason===r?RED:D5}`,borderRadius:12,padding:"13px 15px",color:reason===r?RED:GL,fontSize:13,fontWeight:600,cursor:"pointer",textAlign:"left",transition:"all 0.2s"}}>{r}</button>
          ))}
        </div>
        <Inp label="Additional Details" value={detail} onChange={e=>setDetail(e.target.value)} placeholder="Describe what happened in detail…" multiline rows={4}/>
        <div style={{background:`${YEL}12`,border:`1px solid ${YEL}33`,borderRadius:11,padding:"11px 14px",marginBottom:18}}>
          <div style={{fontSize:12,color:YEL}}>⚠️ Verified reports result in automatic 24-hour bans. Repeated violations may lead to permanent removal.</div>
        </div>
        <BigBtn label="Submit Report" onClick={()=>reason&&setDone(true)} disabled={!reason} color={RED}/>
      </div>
    </div>
  );
}

// ─── PROFILE ──────────────────────────────────────────────────────────
function ProfileScreen({push}){
  const [vis,setVis]=useState("visible");
  const [tab,setTab]=useState("album");
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column",overflowY:"auto"}}>
      <div style={{background:`linear-gradient(180deg,${O}2A 0%,transparent 100%)`,padding:"20px 18px 0",flexShrink:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
          <Avatar av="ME" tier="gold" size={78} online={true}/>
          <div style={{display:"flex",gap:8}}>
            <button onClick={()=>push(S.EDIT_PROFILE)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:10,padding:"8px 12px",color:W,cursor:"pointer",fontSize:13,fontWeight:600}}>✏️ Edit</button>
            <button onClick={()=>push(S.SETTINGS)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:10,padding:"8px 12px",color:W,cursor:"pointer",fontSize:13}}>⚙️</button>
          </div>
        </div>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:26,color:W,marginBottom:5}}>Alex Reeves</div>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <TBadge tier="gold"/>
          <span style={{fontSize:12,color:G}}>Software Engineer · Lagos, NG</span>
        </div>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
          {["💻 Tech","🎵 Music","✈️ Travel","📚 Reading"].map(i=>(
            <span key={i} style={{background:D3,border:`1px solid ${D5}`,borderRadius:20,padding:"4px 11px",fontSize:11,color:GL}}>{i}</span>
          ))}
        </div>
      </div>

      <div style={{display:"flex",margin:"0 14px 14px",background:D3,borderRadius:16,padding:"14px 0",border:`1px solid ${D4}`,flexShrink:0}}>
        {[{val:"247",label:"Whispers",nav:null},{val:"89",label:"Connections",nav:S.CONNECTIONS},{val:"4.8k",label:"Coins 🪙",nav:S.WALLET}].map((s,i)=>(
          <div key={s.label} onClick={()=>s.nav&&push(s.nav)} style={{flex:1,textAlign:"center",borderRight:i<2?`1px solid ${D4}`:undefined,cursor:s.nav?"pointer":"default"}}>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:23,fontWeight:700,color:W}}>{s.val}</div>
            <div style={{fontSize:9,color:G,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{margin:"0 14px 14px",flexShrink:0}}>
        <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:8}}>Visibility Mode</div>
        <div style={{background:D3,borderRadius:13,padding:"4px",display:"flex",border:`1px solid ${D4}`}}>
          {[{id:"visible",label:"Visible",dot:GRN},{id:"partial",label:"Partial",dot:YEL},{id:"invisible",label:"Invisible",dot:G}].map((m,i)=>(
            <button key={m.id} onClick={()=>setVis(m.id)} style={{flex:1,background:vis===m.id?O:"none",border:"none",borderRadius:10,padding:"9px 4px",color:vis===m.id?W:G,fontSize:11,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:5,transition:"all 0.2s"}}>
              <span style={{width:7,height:7,borderRadius:"50%",background:m.dot,display:"inline-block"}}/>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"0 14px 14px"}}>
        <div style={{display:"flex",borderBottom:`1px solid ${D4}`,marginBottom:14}}>
          {["album","status","about"].map(t=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,background:"none",border:"none",padding:"10px 0",color:tab===t?O:G,fontWeight:700,fontSize:12,cursor:"pointer",borderBottom:`2px solid ${tab===t?O:"transparent"}`,textTransform:"capitalize",transition:"all 0.2s"}}>{t}</button>
          ))}
        </div>

        {tab==="album"&&(
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>
            {["🌆","🌊","🏙️","🎸","🍕","🌸","🎨","☕","🌅"].map((e,i)=>(
              <div key={i} style={{aspectRatio:"1",background:D3,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,border:`1px solid ${D4}`,cursor:"pointer"}}>{e}</div>
            ))}
            <div style={{aspectRatio:"1",background:D3,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",border:`1.5px dashed ${D5}`,cursor:"pointer"}}>
              <span style={{fontSize:24,color:G}}>+</span>
            </div>
          </div>
        )}
        {tab==="status"&&(
          <div>
            <div onClick={()=>push(S.STATUS)} style={{display:"flex",alignItems:"center",gap:12,background:D3,borderRadius:13,padding:"13px",cursor:"pointer",border:`1px solid ${D4}`,marginBottom:12}}>
              <div style={{width:50,height:50,borderRadius:"50%",padding:2.5,background:`conic-gradient(${O},${OL},${O})`}}>
                <div style={{width:"100%",height:"100%",borderRadius:"50%",background:D3,display:"flex",alignItems:"center",justifyContent:"center",border:`2px solid ${D}`,fontSize:14,fontWeight:700,color:W}}>ME</div>
              </div>
              <div style={{flex:1}}><div style={{fontWeight:600,color:W,fontSize:13}}>3 active statuses</div><div style={{fontSize:11,color:G}}>Tap to view or manage</div></div>
              <span style={{color:O,fontSize:18}}>›</span>
            </div>
            <button onClick={()=>push(S.STATUS)} style={{width:"100%",background:D3,border:`1px solid ${D5}`,borderRadius:12,padding:"12px",color:GL,fontSize:13,cursor:"pointer",fontWeight:600}}>+ Add New Status</button>
          </div>
        )}
        {tab==="about"&&(
          <div style={{background:D3,borderRadius:14,padding:"14px",border:`1px solid ${D4}`}}>
            {[["Full Name","Alex Reeves"],["Occupation","Software Engineer"],["Tender","Networking"],["Location","Lagos, Nigeria"],["Member since","January 2024"],["Account tier","Premium Gold"]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:`1px solid ${D5}`}}>
                <span style={{fontSize:13,color:G}}>{k}</span>
                <span style={{fontSize:13,color:W,fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{margin:"0 14px 28px"}}>
        <div onClick={()=>push(S.UPGRADE)} style={{background:`linear-gradient(135deg,${DIA}1C,${DIA}09)`,border:`1px solid ${DIA}44`,borderRadius:16,padding:"15px 18px",display:"flex",alignItems:"center",gap:13,cursor:"pointer"}}>
          <span style={{fontSize:30}}>💎</span>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,color:W,fontSize:14,marginBottom:2}}>Upgrade to Platinum Diamond</div>
            <div style={{fontSize:11,color:G}}>Unlimited wallet · All rooms · Private spaces · 20% fee · 1,000 coins</div>
          </div>
          <span style={{color:DIA,fontSize:20}}>›</span>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────
function SettingsScreen({onBack,push}){
  const [darkMode,setDarkMode]=useState(true);
  const [proxNotif,setProxNotif]=useState(true);
  const [msgNotif,setMsgNotif]=useState(true);
  const groups=[
    {s:"Account",items:[{l:"Edit Profile",nav:S.EDIT_PROFILE},{l:"Change Password",nav:S.CHANGE_PASSWORD},{l:"Linked Devices",nav:S.SECURITY},{l:"Two-Factor Authentication",nav:S.SECURITY},{l:"Secret Recovery Code",nav:S.SECURITY}]},
    {s:"Privacy",items:[{l:"Visibility Mode",nav:S.PRIVACY},{l:"Block List",nav:S.BLOCKED},{l:"Who Can Message Me",nav:S.PRIVACY},{l:"Location Sharing",nav:S.PRIVACY},{l:"Data & Privacy",nav:S.PRIVACY}]},
    {s:"Notifications",items:[
      {l:"Whisper Alerts",toggle:true,val:proxNotif,set:setProxNotif},
      {l:"Message Notifications",toggle:true,val:msgNotif,set:setMsgNotif},
      {l:"Room Notifications"},{l:"Proximity Sounds"},
    ]},
    {s:"Subscription",items:[{l:"Current Plan: Gold 🥇",nav:S.UPGRADE},{l:"Upgrade to Diamond 💎",nav:S.UPGRADE},{l:"Verified Blue Badge ✅",nav:S.BADGE_APPLY},{l:"Buy Coins 🪙",nav:S.BUY_COINS},{l:"Billing History"}]},
    {s:"Media & Storage",items:[{l:"File Download Quality"},{l:"Auto-Download Settings"},{l:"Clear Cache"}]},
    {s:"Admin",items:[{l:"🔐 Admin Dashboard",nav:S.ADMIN}]},
    {s:"Support",items:[{l:"Help Center",nav:S.HELP_CENTER},{l:"Gift History",nav:S.GIFT_HISTORY},{l:"Coin History",nav:S.COIN_HISTORY},{l:"Private Rooms",nav:S.PRIVATE_ROOMS},{l:"Connections",nav:S.CONNECTIONS},{l:"Report a Bug"},{l:"Contact Support"},{l:"About Whisper"}]},
  ];

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Settings" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
        {groups.map(g=>(
          <div key={g.s} style={{marginBottom:24}}>
            <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.16em",textTransform:"uppercase",marginBottom:8}}>{g.s}</div>
            <div style={{background:D3,borderRadius:14,overflow:"hidden",border:`1px solid ${D4}`}}>
              {g.items.map((item,i)=>(
                <div key={item.l} onClick={()=>item.nav&&push(item.nav)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px",borderBottom:i<g.items.length-1?`1px solid ${D4}`:undefined,cursor:item.nav?"pointer":"default"}}>
                  <span style={{fontSize:14,color:W}}>{item.l}</span>
                  {item.toggle
                    ?<div onClick={(e)=>{e.stopPropagation();item.set(!item.val);}} style={{width:44,height:26,borderRadius:13,background:item.val?O:D5,position:"relative",cursor:"pointer",transition:"background 0.2s"}}>
                       <div style={{position:"absolute",top:3,left:item.val?20:3,width:20,height:20,borderRadius:10,background:W,transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}}/>
                     </div>
                    :<span style={{color:G,fontSize:18}}>›</span>}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button style={{width:"100%",background:"rgba(248,113,113,0.1)",border:"1px solid rgba(248,113,113,0.3)",borderRadius:14,padding:"15px",color:RED,fontWeight:700,fontSize:15,cursor:"pointer",marginBottom:30}}>Sign Out</button>
      </div>
    </div>
  );
}

// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────
function AdminScreen({onBack,push}){
  const kpis=[{v:"14,823",l:"Total Users",c:GRN},{v:"2,341",l:"Online Now",c:O},{v:"94,200",l:"Coins Today",c:GOLD},{v:"23",l:"Active Bans",c:RED}];
  const violations=[
    {user:"Zara M.",reason:"Spam",time:"12m ago",action:"Banned 24h",c:RED},
    {user:"Emeka J.",reason:"Harassment",time:"1h ago",action:"Warning",c:YEL},
    {user:"Unknown",reason:"Fake profile",time:"3h ago",action:"Removed",c:RED},
    {user:"User #1042",reason:"Hate speech",time:"5h ago",action:"Banned 72h",c:RED},
  ];
  return(
    <div style={{flex:1,background:"#080808",display:"flex",flexDirection:"column"}}>
      <div style={{padding:"10px 16px 10px",display:"flex",alignItems:"center",gap:10,borderBottom:`1px solid #1A1A1A`,background:"#0E0E0E",flexShrink:0}}>
        <button onClick={onBack} style={{background:"none",border:"none",color:O,fontSize:24,cursor:"pointer",lineHeight:1}}>‹</button>
        <div style={{flex:1}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:19,color:W}}>Admin Panel</div>
          <div style={{fontSize:10,color:G}}>Whisper Control Dashboard</div>
        </div>
        <div style={{background:`${GRN}22`,border:`1px solid ${GRN}44`,borderRadius:9,padding:"4px 11px",fontSize:10,color:GRN,fontWeight:700}}>● LIVE</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:18}}>
          {kpis.map(s=>(
            <div key={s.l} style={{background:D3,border:`1px solid ${D5}`,borderRadius:14,padding:"15px 13px"}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,fontWeight:700,color:s.c}}>{s.v}</div>
              <div style={{fontSize:10,color:G,marginTop:2,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:9}}>Management</div>
        {[
          {icon:"👥",title:"User Management",desc:"Search, suspend, ban, delete accounts",s:S.ADMIN_USERS},
          {icon:"⬡",title:"Room Moderation",desc:"Monitor rooms, remove messages",s:S.ADMIN_ROOMS},
          {icon:"🪙",title:"Coin Transactions",desc:"Full audit trail of all coin activity",s:S.ADMIN_COINS},
          {icon:"✅",title:"Badge Applications",desc:"Review & approve Blue Badge requests",s:S.ADMIN_BADGES},
          {icon:"📊",title:"Analytics Dashboard",desc:"DAU/WAU/MAU, revenue, trends",s:S.ADMIN_ANALYTICS},
          {icon:"📣",title:"Reports & Violations",desc:"Review reports, manage bans",s:S.ADMIN_REPORTS},
        ].map(m=>(
          <div key={m.title} onClick={()=>push(m.s)} style={{display:"flex",alignItems:"center",gap:12,background:D3,border:`1px solid ${D5}`,borderRadius:13,padding:"13px",marginBottom:8,cursor:"pointer"}}>
            <div style={{width:44,height:44,borderRadius:13,background:D4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:21,flexShrink:0}}>{m.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:W,marginBottom:2}}>{m.title}</div>
              <div style={{fontSize:11,color:G}}>{m.desc}</div>
            </div>
            <span style={{color:G,fontSize:18}}>›</span>
          </div>
        ))}

        <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:9,marginTop:6}}>Recent Violations</div>
        {violations.map((v,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:D3,borderRadius:11,padding:"11px 13px",marginBottom:7}}>
            <div style={{width:9,height:9,borderRadius:"50%",background:v.c,flexShrink:0}}/>
            <div style={{flex:1}}>
              <div style={{fontSize:12,fontWeight:600,color:W}}>{v.user} — {v.reason}</div>
              <div style={{fontSize:10,color:G}}>{v.time}</div>
            </div>
            <div style={{fontSize:10,color:v.c,fontWeight:700,background:`${v.c}22`,borderRadius:7,padding:"3px 8px"}}>{v.action}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminUsersScreen({onBack}){
  const [q,setQ]=useState("");
  const [filter,setFilter]=useState("all");
  const filtered=ADMIN_USERS.filter(u=>{
    const qm=q===""||u.name.toLowerCase().includes(q.toLowerCase());
    const fm=filter==="all"||(filter==="banned"&&u.banned)||(filter==="suspended"&&u.status==="suspended")||(filter==="active"&&u.status==="active");
    return qm&&fm;
  });
  return(
    <div style={{flex:1,background:"#080808",display:"flex",flexDirection:"column"}}>
      <Hdr title="User Management" onBack={onBack} dark/>
      <div style={{padding:"10px 14px 6px",flexShrink:0}}>
        <div style={{background:D3,borderRadius:11,padding:"9px 13px",display:"flex",alignItems:"center",gap:8,marginBottom:10,border:`1px solid ${D5}`}}>
          <span style={{color:G}}>🔍</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search users…" style={{background:"none",border:"none",color:W,fontSize:13,outline:"none",flex:1}}/>
        </div>
        <div style={{display:"flex",gap:7,overflowX:"auto",paddingBottom:4}}>
          {["all","active","banned","suspended"].map(f=><Pill key={f} label={f} active={filter===f} onClick={()=>setFilter(f)}/>)}
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"6px 14px"}}>
        <div style={{fontSize:11,color:G,marginBottom:8}}>{filtered.length} users</div>
        {filtered.map(u=>(
          <div key={u.id} style={{background:D3,border:`1px solid ${u.banned?RED+"33":u.status==="suspended"?YEL+"22":D5}`,borderRadius:14,padding:"13px",marginBottom:9}}>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:11}}>
              <Avatar av={u.av} tier={u.tier} size={42}/>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:2}}>
                  <span style={{fontWeight:700,fontSize:14,color:W}}>{u.name}</span>
                  <TBadge tier={u.tier}/>
                </div>
                <div style={{fontSize:11,color:G}}>Joined {u.joined} · {u.coins.toLocaleString()} coins · {u.reports} reports</div>
              </div>
              <div style={{fontSize:10,padding:"3px 9px",borderRadius:9,fontWeight:700,background:u.banned?`${RED}22`:u.status==="suspended"?`${YEL}22`:`${GRN}22`,color:u.banned?RED:u.status==="suspended"?YEL:GRN}}>{u.status}</div>
            </div>
            <div style={{display:"flex",gap:7}}>
              <button style={{flex:1,background:D4,border:`1px solid ${D5}`,borderRadius:9,padding:"8px 0",color:GL,fontSize:11,fontWeight:600,cursor:"pointer"}}>View</button>
              {!u.banned&&<button style={{flex:1,background:`${YEL}15`,border:`1px solid ${YEL}33`,borderRadius:9,padding:"8px 0",color:YEL,fontSize:11,fontWeight:600,cursor:"pointer"}}>Suspend</button>}
              {u.banned
                ?<button style={{flex:1,background:`${GRN}15`,border:`1px solid ${GRN}33`,borderRadius:9,padding:"8px 0",color:GRN,fontSize:11,fontWeight:600,cursor:"pointer"}}>Unban</button>
                :<button style={{flex:1,background:`${RED}15`,border:`1px solid ${RED}33`,borderRadius:9,padding:"8px 0",color:RED,fontSize:11,fontWeight:600,cursor:"pointer"}}>Ban</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminRoomsScreen({onBack}){
  return(
    <div style={{flex:1,background:"#080808",display:"flex",flexDirection:"column"}}>
      <Hdr title="Room Moderation" onBack={onBack} dark/>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
        {ROOMS.map(r=>(
          <div key={r.id} style={{background:D3,border:`1px solid ${r.exclusive?DIA+"33":D5}`,borderRadius:14,padding:"13px",marginBottom:9}}>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:11}}>
              <div style={{fontSize:24,width:44,height:44,background:D4,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{r.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:13,color:r.exclusive?DIA:W,marginBottom:2}}>{r.name}</div>
                <div style={{fontSize:11,color:G}}>{r.members.toLocaleString()} members · {r.active?"Active":"Quiet"}</div>
              </div>
              <div style={{width:10,height:10,borderRadius:"50%",background:r.active?GRN:G,boxShadow:r.active?`0 0 8px ${GRN}`:undefined}}/>
            </div>
            <div style={{display:"flex",gap:7}}>
              <button style={{flex:1,background:D4,border:`1px solid ${D5}`,borderRadius:9,padding:"8px 0",color:GL,fontSize:11,fontWeight:600,cursor:"pointer"}}>Monitor</button>
              <button style={{flex:1,background:`${YEL}15`,border:`1px solid ${YEL}33`,borderRadius:9,padding:"8px 0",color:YEL,fontSize:11,fontWeight:600,cursor:"pointer"}}>Clear Msgs</button>
              <button style={{flex:1,background:`${RED}15`,border:`1px solid ${RED}33`,borderRadius:9,padding:"8px 0",color:RED,fontSize:11,fontWeight:600,cursor:"pointer"}}>Close Room</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCoinsScreen({onBack}){
  const txs=[
    {user:"Kwame B.",type:"purchase",amount:5000,sub:"Card payment",time:"10:22",status:"completed"},
    {user:"Amara K.",type:"send",amount:200,sub:"Fee: 60 coins",time:"10:18",status:"completed"},
    {user:"Lena P.",type:"purchase",amount:1000,sub:"Bank transfer",time:"09:55",status:"pending"},
    {user:"Tariq O.",type:"send",amount:50,sub:"Fee: 15 coins",time:"09:30",status:"completed"},
    {user:"Zara M.",type:"purchase",amount:100,sub:"Mobile wallet",time:"08:44",status:"failed"},
    {user:"Emeka J.",type:"purchase",amount:550,sub:"Card payment",time:"Yesterday",status:"completed"},
  ];
  return(
    <div style={{flex:1,background:"#080808",display:"flex",flexDirection:"column"}}>
      <Hdr title="Coin Transactions" onBack={onBack} dark/>
      <div style={{padding:"10px 14px 8px",display:"flex",gap:8,flexShrink:0}}>
        {[{v:"94,200",l:"Coins Today",c:O},{v:"$9,420",l:"Revenue",c:GRN},{v:"3,102",l:"Transactions",c:DIA}].map(s=>(
          <div key={s.l} style={{flex:1,background:D3,borderRadius:11,padding:"11px 9px",textAlign:"center",border:`1px solid ${D5}`}}>
            <div style={{fontWeight:700,fontSize:17,color:s.c}}>{s.v}</div>
            <div style={{fontSize:9,color:G,marginTop:2}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"6px 14px"}}>
        {txs.map((tx,i)=>(
          <div key={i} style={{background:D3,borderRadius:13,padding:"13px",marginBottom:8,border:`1px solid ${D5}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:5}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:2}}>{tx.user}</div>
                <div style={{fontSize:11,color:G}}>{tx.type==="purchase"?"💳 Purchase":"📤 Send"} · {tx.sub}</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:14,fontWeight:800,color:tx.type==="purchase"?GRN:O,marginBottom:2}}>{tx.type==="purchase"?"+":"-"}{tx.amount}</div>
                <div style={{fontSize:10,padding:"2px 8px",borderRadius:7,background:tx.status==="completed"?`${GRN}22`:tx.status==="pending"?`${YEL}22`:`${RED}22`,color:tx.status==="completed"?GRN:tx.status==="pending"?YEL:RED,fontWeight:700}}>{tx.status}</div>
              </div>
            </div>
            <div style={{fontSize:10,color:GD}}>{tx.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminBadgesScreen({onBack}){
  const [apps,setApps]=useState([
    {id:1,user:"Amara K.",av:"AK",tier:"diamond",status:"pending",reason:"Fashion content creator with 50k followers across platforms",time:"2h ago"},
    {id:2,user:"Tariq O.",av:"TO",tier:"gold",status:"pending",reason:"Verified engineer at top-tier tech firm, public speaker",time:"5h ago"},
    {id:3,user:"Kwame B.",av:"KB",tier:"diamond",status:"approved",reason:"Business consultant and public figure",time:"1d ago"},
    {id:4,user:"Lena P.",av:"LP",tier:"gold",status:"rejected",reason:"Insufficient documentation provided",time:"2d ago"},
  ]);
  const act=(id,status)=>setApps(a=>a.map(x=>x.id===id?{...x,status}:x));
  return(
    <div style={{flex:1,background:"#080808",display:"flex",flexDirection:"column"}}>
      <Hdr title="Badge Applications" onBack={onBack} dark/>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
        {apps.map(a=>(
          <div key={a.id} style={{background:D3,border:`1px solid ${a.status==="approved"?GRN+"33":a.status==="rejected"?RED+"33":D5}`,borderRadius:14,padding:"15px",marginBottom:11}}>
            <div style={{display:"flex",alignItems:"center",gap:11,marginBottom:11}}>
              <Avatar av={a.av} tier={a.tier} size={42}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:14,color:W,marginBottom:2}}>{a.user}</div>
                <div style={{fontSize:11,color:G}}>Applied {a.time}</div>
              </div>
              <div style={{fontSize:10,padding:"3px 9px",borderRadius:9,fontWeight:700,background:a.status==="approved"?`${GRN}22`:a.status==="rejected"?`${RED}22`:`${YEL}22`,color:a.status==="approved"?GRN:a.status==="rejected"?RED:YEL}}>{a.status}</div>
            </div>
            <div style={{background:D4,borderRadius:9,padding:"10px 12px",fontSize:12,color:GL,marginBottom:11,lineHeight:1.5}}>{a.reason}</div>
            {a.status==="pending"&&(
              <div style={{display:"flex",gap:9}}>
                <button onClick={()=>act(a.id,"approved")} style={{flex:1,background:`${GRN}15`,border:`1px solid ${GRN}44`,borderRadius:9,padding:"10px 0",color:GRN,fontWeight:700,fontSize:12,cursor:"pointer"}}>✓ Approve</button>
                <button onClick={()=>act(a.id,"rejected")} style={{flex:1,background:`${RED}15`,border:`1px solid ${RED}44`,borderRadius:9,padding:"10px 0",color:RED,fontWeight:700,fontSize:12,cursor:"pointer"}}>✗ Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminAnalyticsScreen({onBack}){
  const days=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const dau=[3200,4100,3800,5200,4900,6100,5800];
  const maxD=Math.max(...dau);
  const revenue=[{l:"Coin Purchases",v:"$9,420",pct:72,c:O},{l:"Gold Subscriptions",v:"$1,200",pct:14,c:GOLD},{l:"Diamond Subscriptions",v:"$800",pct:9,c:DIA},{l:"Badge Fees",v:"$430",pct:5,c:GRN}];
  const tiers=[{l:"Silver",v:"9,840",pct:66,c:SILVER},{l:"Gold",v:"3,920",pct:26,c:GOLD},{l:"Diamond",v:"1,063",pct:8,c:DIA}];
  return(
    <div style={{flex:1,background:"#080808",display:"flex",flexDirection:"column"}}>
      <Hdr title="Analytics" onBack={onBack} dark/>
      <div style={{flex:1,overflowY:"auto",padding:"12px 14px"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:16}}>
          {[{v:"5,821",l:"DAU",c:O},{v:"28.4k",l:"WAU",c:DIA},{v:"94.2k",l:"MAU",c:GRN}].map(s=>(
            <div key={s.l} style={{background:D3,borderRadius:13,padding:"13px 9px",textAlign:"center",border:`1px solid ${D5}`}}>
              <div style={{fontFamily:"'DM Serif Display',serif",fontSize:20,fontWeight:700,color:s.c}}>{s.v}</div>
              <div style={{fontSize:9,color:G,marginTop:2,textTransform:"uppercase",letterSpacing:"0.08em"}}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{background:D3,borderRadius:15,padding:"15px",marginBottom:14,border:`1px solid ${D5}`}}>
          <div style={{fontSize:11,fontWeight:700,color:G,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>Daily Active Users — Last 7 Days</div>
          <div style={{display:"flex",alignItems:"flex-end",gap:7,height:80}}>
            {dau.map((v,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                <div style={{width:"100%",background:`linear-gradient(180deg,${O},${OD})`,borderRadius:"4px 4px 0 0",height:`${(v/maxD)*72}px`,position:"relative"}}>
                  <div style={{position:"absolute",top:-16,left:"50%",transform:"translateX(-50%)",fontSize:8,color:O,fontWeight:700,whiteSpace:"nowrap"}}>{(v/1000).toFixed(1)}k</div>
                </div>
                <div style={{fontSize:8,color:G}}>{days[i]}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{background:D3,borderRadius:15,padding:"15px",marginBottom:14,border:`1px solid ${D5}`}}>
          <div style={{fontSize:11,fontWeight:700,color:G,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>Revenue Breakdown</div>
          {revenue.map(r=>(
            <div key={r.l} style={{marginBottom:12}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:12,color:W}}>{r.l}</span>
                <span style={{fontSize:12,color:r.c,fontWeight:700}}>{r.v}</span>
              </div>
              <div style={{height:6,background:D5,borderRadius:3}}>
                <div style={{height:"100%",width:`${r.pct}%`,background:r.c,borderRadius:3,transition:"width 0.5s"}}/>
              </div>
            </div>
          ))}
        </div>

        <div style={{background:D3,borderRadius:15,padding:"15px",border:`1px solid ${D5}`}}>
          <div style={{fontSize:11,fontWeight:700,color:G,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:14}}>Tier Distribution</div>
          {tiers.map(t=>(
            <div key={t.l} style={{display:"flex",alignItems:"center",gap:11,marginBottom:10}}>
              <div style={{fontSize:12,color:t.c,width:52,fontWeight:700}}>{t.l}</div>
              <div style={{flex:1,height:9,background:D5,borderRadius:5}}>
                <div style={{height:"100%",width:`${t.pct}%`,background:t.c,borderRadius:5}}/>
              </div>
              <div style={{fontSize:12,color:W,width:40,textAlign:"right",fontWeight:600}}>{t.v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


function VoiceCallScreen({user,onBack}){
  const u=user||NEARBY[0];
  const [state,setState]=useState("ringing"); // ringing|active|ended
  const [muted,setMuted]=useState(false);
  const [speaker,setSpeaker]=useState(false);
  const [secs,setSecs]=useState(0);
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  useEffect(()=>{
    const t=setTimeout(()=>setState("active"),2200);
    return()=>clearTimeout(t);
  },[]);
  useEffect(()=>{
    if(state!=="active")return;
    const i=setInterval(()=>setSecs(s=>s+1),1000);
    return()=>clearInterval(i);
  },[state]);

  const end=()=>{setState("ended");setTimeout(onBack,1200);};

  return(
    <div style={{flex:1,background:`linear-gradient(180deg,#1A0A00 0%,${D} 100%)`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",padding:"60px 0 44px"}}>
      {/* Avatar + name */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{position:"relative"}}>
          <Avatar av={u.av} tier={u.tier} size={110}/>
          {state==="active"&&(
            <div style={{position:"absolute",inset:-8,borderRadius:"50%",border:`2px solid ${O}`,animation:"callPulse 2s ease infinite",opacity:0.6}}/>
          )}
        </div>
        <div style={{fontFamily:"'DM Serif Display',serif",fontSize:28,color:W,fontWeight:700}}>{u.name}</div>
        <TBadge tier={u.tier}/>
        <div style={{fontSize:15,color:state==="ringing"?YEL:state==="active"?GRN:RED,fontWeight:600,marginTop:4}}>
          {state==="ringing"?"Ringing…":state==="active"?fmt(secs):"Call ended"}
        </div>
      </div>

      {/* Waveform (active) */}
      {state==="active"&&(
        <div style={{display:"flex",alignItems:"center",gap:4,height:40}}>
          {Array.from({length:24}).map((_,i)=>(
            <div key={i} style={{width:3,borderRadius:2,background:O,height:`${10+Math.random()*26}px`,animation:`wave ${0.6+Math.random()*0.8}s ${i*0.05}s ease-in-out infinite alternate`,opacity:0.7}}/>
          ))}
        </div>
      )}

      {/* Controls */}
      <div style={{display:"flex",flexDirection:"column",gap:28,alignItems:"center",width:"100%",padding:"0 32px"}}>
        <div style={{display:"flex",gap:20,justifyContent:"center"}}>
          {[
            {icon:muted?"🔇":"🎙️",label:muted?"Unmute":"Mute",act:()=>setMuted(m=>!m),active:muted},
            {icon:"⌨️",label:"Keypad",act:()=>{}},
            {icon:speaker?"🔊":"🔈",label:speaker?"Speaker":"Earpiece",act:()=>setSpeaker(s=>!s),active:speaker},
            {icon:"➕",label:"Add",act:()=>{}},
          ].map(b=>(
            <div key={b.label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,cursor:"pointer"}} onClick={b.act}>
              <div style={{width:58,height:58,borderRadius:29,background:b.active?`${O}33`:D3,border:`1px solid ${b.active?O:D5}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>
                {b.icon}
              </div>
              <div style={{fontSize:11,color:G}}>{b.label}</div>
            </div>
          ))}
        </div>
        <button onClick={end} style={{width:68,height:68,borderRadius:34,background:`linear-gradient(135deg,${RED},#CC0000)`,border:"none",cursor:"pointer",fontSize:26,boxShadow:`0 0 28px ${RED}66`,display:"flex",alignItems:"center",justifyContent:"center"}}>📵</button>
      </div>
    </div>
  );
}

// ─── VIDEO CALL ───────────────────────────────────────────────────────
function VideoCallScreen({user,onBack}){
  const u=user||NEARBY[0];
  const [state,setState]=useState("connecting");
  const [muted,setMuted]=useState(false);
  const [camOff,setCamOff]=useState(false);
  const [secs,setSecs]=useState(0);
  const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

  useEffect(()=>{const t=setTimeout(()=>setState("active"),1800);return()=>clearTimeout(t);},[]);
  useEffect(()=>{
    if(state!=="active")return;
    const i=setInterval(()=>setSecs(s=>s+1),1000);
    return()=>clearInterval(i);
  },[state]);

  return(
    <div style={{flex:1,background:"#000",display:"flex",flexDirection:"column",position:"relative",overflow:"hidden"}}>
      {/* Remote video (full bg) */}
      <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,#1A0A00,#000A1A)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {state==="connecting"?(
          <div style={{textAlign:"center"}}>
            <Avatar av={u.av} tier={u.tier} size={100}/>
            <div style={{color:W,fontSize:16,fontWeight:600,marginTop:16}}>Connecting…</div>
          </div>
        ):(
          <div style={{fontSize:120,opacity:0.15}}>{u.av}</div>
        )}
      </div>

      {/* Self view (pip) */}
      <div style={{position:"absolute",top:60,right:14,width:90,height:130,borderRadius:14,background:camOff?"#1A1A1A":`linear-gradient(135deg,#2A1A0A,#0A1A2A)`,border:`2px solid ${D4}`,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",boxShadow:"0 4px 20px rgba(0,0,0,0.7)"}}>
        {camOff?<div style={{fontSize:28}}>🚫</div>:<div style={{fontSize:36,opacity:0.4}}>ME</div>}
      </div>

      {/* Top bar */}
      <div style={{position:"relative",zIndex:10,padding:"54px 16px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <button onClick={onBack} style={{background:"rgba(0,0,0,0.5)",border:"none",borderRadius:10,padding:"8px 12px",color:W,cursor:"pointer",fontSize:14}}>← Back</button>
        <div style={{textAlign:"center"}}>
          <div style={{fontWeight:700,fontSize:15,color:W}}>{u.name}</div>
          <div style={{fontSize:12,color:state==="active"?GRN:YEL}}>{state==="connecting"?"Connecting…":fmt(secs)}</div>
        </div>
        <div style={{width:60}}/>
      </div>

      {/* Controls */}
      <div style={{position:"absolute",bottom:40,left:0,right:0,zIndex:10}}>
        <div style={{display:"flex",gap:16,justifyContent:"center",alignItems:"center"}}>
          {[
            {icon:muted?"🔇":"🎙️",act:()=>setMuted(m=>!m),active:muted},
            {icon:camOff?"📵":"📹",act:()=>setCamOff(c=>!c),active:camOff},
            {icon:"🔄",act:()=>{}},
            {icon:"🔈",act:()=>{}},
          ].map((b,i)=>(
            <div key={i} onClick={b.act} style={{width:52,height:52,borderRadius:26,background:b.active?"rgba(248,113,113,0.3)":"rgba(255,255,255,0.15)",border:`1px solid ${b.active?RED:"rgba(255,255,255,0.2)"}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,cursor:"pointer",backdropFilter:"blur(8px)"}}>
              {b.icon}
            </div>
          ))}
          <div onClick={()=>{setState("ended");setTimeout(onBack,800);}} style={{width:60,height:60,borderRadius:30,background:`linear-gradient(135deg,${RED},#CC0000)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,cursor:"pointer",boxShadow:`0 0 24px ${RED}66`}}>📵</div>
        </div>
      </div>
    </div>
  );
}

// ─── NEARBY MAP ───────────────────────────────────────────────────────
function NearbyMapScreen({onBack,push}){
  const [sel,setSel]=useState(null);
  const [filter,setFilter]=useState("all");
  // Fake map positions
  const mapUsers=[
    {...NEARBY[0],mx:48,my:38},{...NEARBY[1],mx:62,my:55},
    {...NEARBY[2],mx:35,my:60},{...NEARBY[3],mx:70,my:30},
    {...NEARBY[4],mx:25,my:45},{...NEARBY[5],mx:55,my:72},
  ];
  const filtered=mapUsers.filter(u=>filter==="all"||(filter==="visible"&&u.mode==="visible")||(filter===u.tier));

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Nearby Map" onBack={onBack}
        right={<button onClick={()=>push(S.HOME)} style={{background:D3,border:`1px solid ${D5}`,borderRadius:8,padding:"6px 10px",color:GL,fontSize:12,cursor:"pointer"}}>Radar</button>}/>
      {/* Filter row */}
      <div style={{display:"flex",gap:6,padding:"8px 14px",overflowX:"auto",flexShrink:0}}>
        {[{id:"all",l:"All"},{id:"visible",l:"🟢 Visible"},{id:"diamond",l:"💎"},{id:"gold",l:"🥇"},{id:"silver",l:"🥈"}].map(f=>(
          <Pill key={f.id} label={f.l} active={filter===f.id} onClick={()=>setSel(null)||setFilter(f.id)}/>
        ))}
      </div>
      {/* Map area */}
      <div style={{flex:1,position:"relative",margin:"0 14px 14px",borderRadius:18,overflow:"hidden",border:`1px solid ${D4}`,background:"#0D1A0D",minHeight:300}}>
        {/* Grid lines */}
        {[20,40,60,80].map(v=>(
          <div key={v} style={{position:"absolute",left:0,right:0,top:`${v}%`,height:1,background:"rgba(255,255,255,0.04)"}}/>
        ))}
        {[20,40,60,80].map(v=>(
          <div key={v} style={{position:"absolute",top:0,bottom:0,left:`${v}%`,width:1,background:"rgba(255,255,255,0.04)"}}/>
        ))}
        {/* Distance rings */}
        {[15,30,45].map(r=>(
          <div key={r} style={{position:"absolute",top:"50%",left:"50%",width:`${r*2}%`,height:`${r*2}%`,borderRadius:"50%",border:`1px dashed rgba(255,92,26,0.18)`,transform:"translate(-50%,-50%)"}}/>
        ))}
        {/* Me */}
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",zIndex:20}}>
          <div style={{width:20,height:20,borderRadius:10,background:O,boxShadow:`0 0 16px ${O}`,border:`3px solid ${W}`}}/>
        </div>
        {/* Users */}
        {filtered.map(u=>(
          <div key={u.id} onClick={()=>setSel(sel?.id===u.id?null:u)}
            style={{position:"absolute",left:`${u.mx}%`,top:`${u.my}%`,transform:"translate(-50%,-50%)",cursor:"pointer",zIndex:10}}>
            <div style={{width:36,height:36,borderRadius:18,background:`${tc(u.tier)}22`,border:`2.5px solid ${sel?.id===u.id?W:tc(u.tier)}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,color:W,boxShadow:sel?.id===u.id?`0 0 16px ${tc(u.tier)}`:`0 0 8px ${tc(u.tier)}66`,transition:"all 0.2s"}}>
              {u.av[0]}
            </div>
            {u.online&&<div style={{position:"absolute",bottom:0,right:0,width:10,height:10,borderRadius:5,background:GRN,border:`2px solid ${D}`}}/>}
          </div>
        ))}
        {/* Legend */}
        <div style={{position:"absolute",bottom:10,left:10,fontSize:10,color:G}}>
          {filtered.length} users visible
        </div>
      </div>
      {/* Selected user card */}
      {sel&&(
        <div style={{margin:"0 14px 14px",background:D3,borderRadius:16,padding:"14px",border:`1px solid ${tc(sel.tier)}44`,display:"flex",alignItems:"center",gap:12}}>
          <Avatar av={sel.av} tier={sel.tier} size={50} online={sel.online}/>
          <div style={{flex:1}}>
            <div style={{fontWeight:700,fontSize:15,color:W,marginBottom:2}}>{sel.name}</div>
            <div style={{fontSize:12,color:G}}>{sel.occ} · {sel.mode==="visible"?sel.dist+" away":"Online"}</div>
          </div>
          <button onClick={()=>push(S.USER_VIEW,sel)} style={{background:O,border:"none",borderRadius:10,padding:"9px 14px",color:W,fontWeight:700,fontSize:13,cursor:"pointer"}}>View</button>
        </div>
      )}
    </div>
  );
}

// ─── DISCOVER FEED ────────────────────────────────────────────────────
function DiscoverScreen({onBack,push}){
  const [tab,setTab]=useState("trending");
  const posts=[
    {id:1,user:NEARBY[0],time:"2h",emoji:"🌆",caption:"City vibes tonight — the energy is different 🔥",likes:142,comments:23,liked:false},
    {id:2,user:NEARBY[1],time:"4h",emoji:"💻",caption:"Just shipped a new feature after 3 days straight. Sleep is for the weak 😂",likes:89,comments:11,liked:true},
    {id:3,user:NEARBY[2],time:"6h",emoji:"🎵",caption:"When the playlist hits just right on the way home 🎧✨",likes:204,comments:41,liked:false},
    {id:4,user:NEARBY[4],time:"8h",emoji:"🏥",caption:"Reminder: drink water, sleep 8 hours, touch grass. That's the whole health advice.",likes:512,comments:78,liked:false},
    {id:5,user:NEARBY[3],time:"12h",emoji:"📈",caption:"Markets are wild today. Stayed calm, stayed in. Long game wins.",likes:176,comments:33,liked:true},
  ];
  const [liked,setLiked]=useState({1:false,2:true,3:false,4:false,5:true});

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Discover" onBack={onBack}/>
      <div style={{display:"flex",gap:7,padding:"8px 14px",flexShrink:0}}>
        {["trending","nearby","following"].map(t=><Pill key={t} label={t==="trending"?"🔥 Trending":t==="nearby"?"📡 Nearby":"👥 Following"} active={tab===t} onClick={()=>setTab(t)}/>)}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
        {posts.map(p=>(
          <div key={p.id} style={{background:D3,border:`1px solid ${D4}`,borderRadius:18,marginBottom:14,overflow:"hidden"}}>
            {/* Post header */}
            <div style={{display:"flex",alignItems:"center",gap:11,padding:"13px 14px 10px"}}>
              <div onClick={()=>push(S.USER_VIEW,p.user)} style={{cursor:"pointer"}}>
                <Avatar av={p.user.av} tier={p.user.tier} size={40} online={p.user.online}/>
              </div>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <span style={{fontWeight:700,fontSize:14,color:W,cursor:"pointer"}} onClick={()=>push(S.USER_VIEW,p.user)}>{p.user.name}</span>
                  <TBadge tier={p.user.tier}/>
                </div>
                <div style={{fontSize:11,color:G}}>{p.user.occ} · {p.time} ago</div>
              </div>
              <button style={{background:"none",border:"none",color:G,cursor:"pointer",fontSize:18}}>⋯</button>
            </div>
            {/* Post content */}
            <div style={{background:`linear-gradient(135deg,${D4},${D2})`,padding:"28px 0",display:"flex",alignItems:"center",justifyContent:"center",fontSize:72}}>
              {p.emoji}
            </div>
            <div style={{padding:"12px 14px"}}>
              <div style={{fontSize:14,color:W,lineHeight:1.55,marginBottom:12}}>{p.caption}</div>
              <div style={{display:"flex",alignItems:"center",gap:20}}>
                <button onClick={()=>setLiked(l=>({...l,[p.id]:!l[p.id]}))} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:liked[p.id]?RED:G,fontWeight:600,fontSize:13}}>
                  {liked[p.id]?"❤️":"🤍"} {p.likes+(liked[p.id]&&!p.liked?1:0)}
                </button>
                <button style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:G,fontWeight:600,fontSize:13}}>
                  💬 {p.comments}
                </button>
                <button onClick={()=>push(S.SEND_COINS,p.user)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,color:G,fontWeight:600,fontSize:13}}>
                  🪙 Send
                </button>
                <button style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:G,fontSize:18}}>↗️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── EDIT PROFILE ─────────────────────────────────────────────────────
function EditProfileScreen({onBack}){
  const [name,setName]=useState("Alex Reeves");
  const [occ,setOcc]=useState("Software Engineer");
  const [inst,setInst]=useState("Tech Corp");
  const [bio,setBio]=useState("Building things that matter. Based in Lagos.");
  const [tender,setTender]=useState("Networking");
  const [saved,setSaved]=useState(false);

  const save=()=>{setSaved(true);setTimeout(()=>{setSaved(false);onBack();},1000);};

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Edit Profile" onBack={onBack}
        right={<button onClick={save} style={{background:saved?GRN:O,border:"none",borderRadius:9,padding:"7px 16px",color:W,fontSize:13,fontWeight:700,cursor:"pointer",transition:"background 0.2s"}}>{saved?"Saved ✓":"Save"}</button>}/>
      <div style={{flex:1,overflowY:"auto",padding:"18px 20px"}}>
        {/* Photo */}
        <div style={{display:"flex",justifyContent:"center",marginBottom:24}}>
          <div style={{position:"relative"}}>
            <div style={{width:90,height:90,borderRadius:26,background:`linear-gradient(135deg,${GOLD}33,${GOLD}88)`,border:`3px solid ${GOLD}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:30,fontWeight:700,color:W}}>ME</div>
            <button style={{position:"absolute",bottom:-4,right:-4,width:28,height:28,borderRadius:14,background:O,border:`3px solid ${D}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,cursor:"pointer",border:"none"}}>✏️</button>
          </div>
        </div>
        <Inp label="Full Name" value={name} onChange={e=>setName(e.target.value)}/>
        <Inp label="Bio" value={bio} onChange={e=>setBio(e.target.value)} multiline rows={3} placeholder="Tell people about yourself…"/>
        <Inp label="Occupation" value={occ} onChange={e=>setOcc(e.target.value)}/>
        <Inp label="Institution / Company" value={inst} onChange={e=>setInst(e.target.value)}/>
        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Tender (Relationship Intent)</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:18}}>
          {["Friendship","Dating","Networking","Just exploring"].map(t=>(
            <button key={t} onClick={()=>setTender(t)} style={{background:tender===t?`${O}22`:D3,border:`1px solid ${tender===t?O:D5}`,borderRadius:20,padding:"8px 16px",color:tender===t?O:GL,fontSize:13,cursor:"pointer",fontWeight:600}}>{t}</button>
          ))}
        </div>
        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>Interests</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:7,marginBottom:18}}>
          {["💻 Tech","🎵 Music","✈️ Travel","📚 Reading","🎮 Gaming","🎨 Art"].map(i=>(
            <button key={i} style={{background:["💻 Tech","🎵 Music","✈️ Travel","📚 Reading"].includes(i)?`${O}22`:D3,border:`1px solid ${["💻 Tech","🎵 Music","✈️ Travel","📚 Reading"].includes(i)?O:D5}`,borderRadius:20,padding:"7px 14px",color:GL,fontSize:12,cursor:"pointer"}}>{i}</button>
          ))}
          <button style={{background:D3,border:`1px dashed ${D5}`,borderRadius:20,padding:"7px 14px",color:G,fontSize:12,cursor:"pointer"}}>+ Add more</button>
        </div>
        <BigBtn label={saved?"Saved! ✓":"Save Changes"} onClick={save} color={saved?GRN:O}/>
      </div>
    </div>
  );
}

// ─── CHANGE PASSWORD ──────────────────────────────────────────────────
function ChangePasswordScreen({onBack}){
  const [cur,setCur]=useState("");const [nw,setNw]=useState("");const [conf,setConf]=useState("");
  const [done,setDone]=useState(false);const [err,setErr]=useState("");
  const submit=()=>{
    if(nw.length<8){setErr("Password must be at least 8 characters");return;}
    if(nw!==conf){setErr("Passwords do not match");return;}
    setErr("");setDone(true);setTimeout(onBack,1200);
  };
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Change Password" onBack={onBack}/>
      <div style={{flex:1,padding:"22px 22px",overflowY:"auto"}}>
        {done?(
          <div style={{textAlign:"center",marginTop:60}}>
            <div style={{fontSize:64,marginBottom:16}}>🔐</div>
            <div style={{fontFamily:"'DM Serif Display',serif",fontSize:24,color:W}}>Password Updated!</div>
          </div>
        ):<>
          <Inp label="Current Password" type="password" value={cur} onChange={e=>setCur(e.target.value)}/>
          <Inp label="New Password" type="password" value={nw} onChange={e=>setNw(e.target.value)}/>
          <Inp label="Confirm New Password" type="password" value={conf} onChange={e=>setConf(e.target.value)}/>
          {err&&<div style={{background:`${RED}15`,border:`1px solid ${RED}33`,borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13,color:RED}}>{err}</div>}
          <div style={{background:D3,borderRadius:12,padding:"12px 14px",marginBottom:18}}>
            <div style={{fontSize:11,fontWeight:700,color:G,marginBottom:8}}>Password Requirements</div>
            {["At least 8 characters","One uppercase letter","One number or symbol"].map(r=>(
              <div key={r} style={{fontSize:12,color:G,display:"flex",gap:7,marginBottom:5}}>
                <span style={{color:nw.length>=8?GRN:GD}}>✓</span>{r}
              </div>
            ))}
          </div>
          <BigBtn label="Update Password" onClick={submit} disabled={!cur||!nw||!conf}/>
        </>}
      </div>
    </div>
  );
}

// ─── SECURITY CENTER ──────────────────────────────────────────────────
function SecurityScreen({onBack}){
  const [show2fa,setShow2fa]=useState(false);
  const [twofa,setTwofa]=useState(false);
  const [showCode,setShowCode]=useState(false);
  const code=["3","K","8","X","9","P","2","M","1","R"];

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Security" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"16px 18px"}}>
        {/* 2FA */}
        <div style={{background:D3,borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${D4}`}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:twofa?14:0}}>
            <div>
              <div style={{fontWeight:700,fontSize:15,color:W,marginBottom:3}}>Two-Factor Authentication</div>
              <div style={{fontSize:12,color:G}}>Add an extra layer of security to your account</div>
            </div>
            <div onClick={()=>{setTwofa(t=>!t);setShow2fa(false);}} style={{width:48,height:28,borderRadius:14,background:twofa?O:D5,position:"relative",cursor:"pointer",transition:"background 0.2s"}}>
              <div style={{position:"absolute",top:3,left:twofa?23:3,width:22,height:22,borderRadius:11,background:W,transition:"left 0.2s",boxShadow:"0 1px 4px rgba(0,0,0,0.4)"}}/>
            </div>
          </div>
          {twofa&&(
            <div style={{background:`${GRN}12`,borderRadius:10,padding:"10px 13px",fontSize:12,color:GRN}}>
              ✓ 2FA is active. You'll be asked for a code on new device logins.
            </div>
          )}
        </div>

        {/* Recovery code */}
        <div style={{background:D3,borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${D4}`}}>
          <div style={{fontWeight:700,fontSize:15,color:W,marginBottom:4}}>Secret Recovery Code</div>
          <div style={{fontSize:12,color:G,marginBottom:12,lineHeight:1.55}}>Your 10-digit code is the only way to recover or reclaim your account if hacked. Store it offline.</div>
          {showCode?(
            <div style={{background:D4,borderRadius:12,padding:"16px",marginBottom:12}}>
              <div style={{display:"flex",gap:5,justifyContent:"center",flexWrap:"wrap"}}>
                {code.map((c,i)=>(
                  <div key={i} style={{width:30,height:36,background:D5,borderRadius:7,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"monospace",fontSize:17,fontWeight:700,color:W}}>{c}</div>
                ))}
              </div>
            </div>
          ):<div style={{background:`${YEL}12`,borderRadius:10,padding:"10px 14px",marginBottom:12,fontSize:12,color:YEL}}>⚠️ Never share this code. Whisper staff will never ask for it.</div>}
          <button onClick={()=>setShowCode(s=>!s)} style={{background:showCode?`${RED}15`:D4,border:`1px solid ${showCode?RED:D5}`,borderRadius:10,padding:"10px 14px",color:showCode?RED:GL,fontSize:13,fontWeight:600,cursor:"pointer",width:"100%"}}>
            {showCode?"🙈 Hide Code":"👁 Reveal Recovery Code"}
          </button>
        </div>

        {/* Linked devices */}
        <div style={{background:D3,borderRadius:16,padding:"16px",marginBottom:14,border:`1px solid ${D4}`}}>
          <div style={{fontWeight:700,fontSize:15,color:W,marginBottom:14}}>Linked Devices</div>
          {[
            {name:"iPhone 15 Pro",loc:"Lagos, NG",time:"Active now",current:true},
            {name:"MacBook Air",loc:"Lagos, NG",time:"2h ago",current:false},
            {name:"Chrome / Windows",loc:"Abuja, NG",time:"3d ago",current:false},
          ].map((d,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:i<2?`1px solid ${D5}`:undefined}}>
              <div style={{fontSize:22}}>{d.name.includes("iPhone")?"📱":d.name.includes("Mac")?"💻":"🖥️"}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:13,fontWeight:600,color:W}}>{d.name}{d.current&&<span style={{fontSize:10,color:GRN,marginLeft:6}}>● This device</span>}</div>
                <div style={{fontSize:11,color:G}}>{d.loc} · {d.time}</div>
              </div>
              {!d.current&&<button style={{background:`${RED}15`,border:`1px solid ${RED}33`,borderRadius:8,padding:"5px 10px",color:RED,fontSize:11,fontWeight:600,cursor:"pointer"}}>Remove</button>}
            </div>
          ))}
        </div>

        {/* Login history */}
        <div style={{background:D3,borderRadius:16,padding:"16px",border:`1px solid ${D4}`}}>
          <div style={{fontWeight:700,fontSize:15,color:W,marginBottom:14}}>Recent Login History</div>
          {[
            {loc:"Lagos, NG",time:"Today 09:12",ok:true},
            {loc:"Lagos, NG",time:"Yesterday 21:44",ok:true},
            {loc:"Abuja, NG",time:"3 days ago",ok:false},
          ].map((l,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:11,padding:"8px 0",borderBottom:i<2?`1px solid ${D5}`:undefined}}>
              <div style={{width:8,height:8,borderRadius:4,background:l.ok?GRN:RED,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontSize:12,color:W}}>{l.loc}</div>
                <div style={{fontSize:11,color:G}}>{l.time}</div>
              </div>
              {!l.ok&&<span style={{fontSize:10,color:RED,fontWeight:700}}>Suspicious</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PRIVACY SETTINGS ─────────────────────────────────────────────────
function PrivacyScreen({onBack}){
  const [settings,setSettings]=useState({
    showOnline:true,showDist:true,allowMsg:"everyone",showAlbum:"connections",
    locationShare:true,readReceipts:true,showActivity:false,
  });
  const toggle=k=>setSettings(s=>({...s,[k]:!s[k]}));
  const set=(k,v)=>setSettings(s=>({...s,[k]:v}));

  const Toggle=({k})=>(
    <div onClick={()=>toggle(k)} style={{width:48,height:28,borderRadius:14,background:settings[k]?O:D5,position:"relative",cursor:"pointer",transition:"background 0.2s",flexShrink:0}}>
      <div style={{position:"absolute",top:3,left:settings[k]?23:3,width:22,height:22,borderRadius:11,background:W,transition:"left 0.2s"}}/>
    </div>
  );

  const Row=({label,sub,children})=>(
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 0",borderBottom:`1px solid ${D5}`}}>
      <div style={{flex:1,paddingRight:12}}>
        <div style={{fontSize:14,color:W,fontWeight:500}}>{label}</div>
        {sub&&<div style={{fontSize:11,color:G,marginTop:2}}>{sub}</div>}
      </div>
      {children}
    </div>
  );

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Privacy" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 18px"}}>
        {[
          {title:"Proximity & Location",items:[
            {k:"showOnline",label:"Show Online Status",sub:"Let others see when you're active"},
            {k:"showDist",label:"Show Exact Distance",sub:"Share distance in Visible mode"},
            {k:"locationShare",label:"Background Location",sub:"Required for proximity detection"},
          ]},
          {title:"Messaging",items:[
            {k:"readReceipts",label:"Read Receipts",sub:"Show when you've read messages"},
            {k:"showActivity",label:"Typing Indicators",sub:"Show when you're typing"},
          ]},
          {title:"Profile Visibility",items:[
            {k:"showAlbum",label:"Album Visibility",type:"select",opts:["everyone","connections","nobody"],sub:"Who can view your album"},
            {k:"allowMsg",label:"Who Can Message Me",type:"select",opts:["everyone","connections","nobody"],sub:"Control incoming messages"},
          ]},
        ].map(group=>(
          <div key={group.title} style={{marginBottom:22}}>
            <div style={{fontSize:10,fontWeight:700,color:G,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:10}}>{group.title}</div>
            <div style={{background:D3,borderRadius:14,padding:"0 14px",border:`1px solid ${D4}`}}>
              {group.items.map(item=>(
                <Row key={item.k} label={item.label} sub={item.sub}>
                  {item.type==="select"?(
                    <div style={{display:"flex",gap:5}}>
                      {item.opts.map(o=>(
                        <button key={o} onClick={()=>set(item.k,o)} style={{background:settings[item.k]===o?`${O}22`:D4,border:`1px solid ${settings[item.k]===o?O:D5}`,borderRadius:8,padding:"5px 8px",color:settings[item.k]===o?O:G,fontSize:10,fontWeight:600,cursor:"pointer",textTransform:"capitalize"}}>{o}</button>
                      ))}
                    </div>
                  ):<Toggle k={item.k}/>}
                </Row>
              ))}
            </div>
          </div>
        ))}
        <BigBtn label="Save Privacy Settings" onClick={onBack}/>
      </div>
    </div>
  );
}

// ─── BLOCKED USERS ────────────────────────────────────────────────────
function BlockedUsersScreen({onBack}){
  const [blocked,setBlocked]=useState([
    {id:1,name:"Unknown User",av:"UU",tier:"silver"},
    {id:2,name:"Spam Account",av:"SA",tier:"silver"},
  ]);
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Blocked Users" onBack={onBack}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px 16px"}}>
        {blocked.length===0?(
          <div style={{textAlign:"center",padding:"50px 0",color:G}}>
            <div style={{fontSize:44,marginBottom:12}}>🚫</div>
            <div>No blocked users</div>
          </div>
        ):blocked.map(u=>(
          <div key={u.id} style={{display:"flex",alignItems:"center",gap:12,background:D3,borderRadius:13,padding:"13px",marginBottom:9,border:`1px solid ${D4}`}}>
            <Avatar av={u.av} tier={u.tier} size={44}/>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:14,color:W}}>{u.name}</div>
              <div style={{fontSize:11,color:G}}>Blocked</div>
            </div>
            <button onClick={()=>setBlocked(b=>b.filter(x=>x.id!==u.id))} style={{background:`${GRN}15`,border:`1px solid ${GRN}33`,borderRadius:9,padding:"8px 14px",color:GRN,fontSize:12,fontWeight:700,cursor:"pointer"}}>Unblock</button>
          </div>
        ))}
        <div style={{background:`${YEL}12`,border:`1px solid ${YEL}33`,borderRadius:12,padding:"12px 14px",marginTop:8}}>
          <div style={{fontSize:12,color:YEL}}>Blocked users cannot message you, see your profile, or receive proximity alerts from you.</div>
        </div>
      </div>
    </div>
  );
}

// ─── CONNECTIONS ──────────────────────────────────────────────────────
function ConnectionsScreen({onBack,push}){
  const [tab,setTab]=useState("all");
  const conns=[...NEARBY];
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Connections" onBack={onBack}/>
      <div style={{display:"flex",gap:7,padding:"8px 14px",flexShrink:0}}>
        {["all","online","diamond","gold"].map(t=><Pill key={t} label={t==="all"?"All (89)":t==="online"?"🟢 Online":t==="diamond"?"💎":t==="gold"?"🥇":t} active={tab===t} onClick={()=>setTab(t)}/>)}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"6px 14px"}}>
        {conns.map(u=>(
          <div key={u.id} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderBottom:`1px solid ${D4}`}}>
            <div onClick={()=>push(S.USER_VIEW,u)} style={{cursor:"pointer"}}><Avatar av={u.av} tier={u.tier} size={48} online={u.online}/></div>
            <div style={{flex:1,cursor:"pointer"}} onClick={()=>push(S.USER_VIEW,u)}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:2}}>
                <span style={{fontWeight:700,fontSize:14,color:W}}>{u.name}</span>
                <TBadge tier={u.tier}/>
              </div>
              <div style={{fontSize:12,color:G}}>{u.occ}</div>
            </div>
            <button onClick={()=>push(S.CHAT,CONVOS.find(c=>c.name===u.name)||CONVOS[0])} style={{background:D3,border:`1px solid ${D5}`,borderRadius:9,padding:"8px 12px",color:GL,fontSize:12,fontWeight:600,cursor:"pointer"}}>Message</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ALBUM VIEW ───────────────────────────────────────────────────────
function AlbumViewScreen({onBack}){
  const [sel,setSel]=useState(null);
  const [tab,setTab]=useState("photos");
  const photos=["🌆","🌊","🏙️","🎸","🍕","🌸","🎨","☕","🌅","🎭","🌍","🎵","💻","📸","🌺","🦋"];
  const videos=["🎬","🎥","📹","🎞️"];

  if(sel!==null)return(
    <div style={{flex:1,background:"#000",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative"}}>
      <button onClick={()=>setSel(null)} style={{position:"absolute",top:50,left:16,background:"rgba(0,0,0,0.6)",border:"none",borderRadius:10,padding:"8px 14px",color:W,cursor:"pointer",fontSize:13,fontWeight:600}}>✕ Close</button>
      <div style={{fontSize:140,filter:"drop-shadow(0 0 40px rgba(255,255,255,0.1))"}}>
        {tab==="photos"?photos[sel]:videos[sel]}
      </div>
      <div style={{position:"absolute",bottom:40,display:"flex",gap:16}}>
        {sel>0&&<button onClick={()=>setSel(s=>s-1)} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"10px 18px",color:W,cursor:"pointer",fontSize:14}}>‹ Prev</button>}
        {sel<(tab==="photos"?photos:videos).length-1&&<button onClick={()=>setSel(s=>s+1)} style={{background:"rgba(255,255,255,0.15)",border:"none",borderRadius:10,padding:"10px 18px",color:W,cursor:"pointer",fontSize:14}}>Next ›</button>}
      </div>
    </div>
  );

  const items=tab==="photos"?photos:videos;
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="My Album" onBack={onBack}
        right={<button style={{background:O,border:"none",borderRadius:8,padding:"7px 14px",color:W,fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Upload</button>}/>
      <div style={{display:"flex",gap:7,padding:"8px 14px",flexShrink:0}}>
        {["photos","videos"].map(t=><Pill key={t} label={t==="photos"?`📷 Photos (${photos.length})`:`🎥 Videos (${videos.length})`} active={tab===t} onClick={()=>setTab(t)}/>)}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"6px 14px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:4}}>
          {items.map((e,i)=>(
            <div key={i} onClick={()=>setSel(i)} style={{aspectRatio:"1",background:D3,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,border:`1px solid ${D4}`,cursor:"pointer",transition:"transform 0.15s"}}>
              {e}
            </div>
          ))}
          <div style={{aspectRatio:"1",background:D3,borderRadius:10,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:`1.5px dashed ${D5}`,cursor:"pointer",gap:6}}>
            <span style={{fontSize:26,color:G}}>+</span>
            <span style={{fontSize:9,color:G}}>Add</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── GIFT HISTORY ─────────────────────────────────────────────────────
function GiftHistoryScreen({onBack,push}){
  const [tab,setTab]=useState("received");
  const received=[
    {id:1,from:NEARBY[4],gift:ALL_GIFTS[7],time:"Today 10:22",room:"Business Zone"},
    {id:2,from:NEARBY[0],gift:ALL_GIFTS[9],time:"Yesterday",room:"Trend Zone"},
    {id:3,from:NEARBY[1],gift:ALL_GIFTS[4],time:"2 days ago",room:"Technology Zone"},
    {id:4,from:NEARBY[3],gift:ALL_GIFTS[2],time:"5 days ago",room:"Business Zone"},
  ];
  const sent=[
    {id:1,to:NEARBY[3],gift:ALL_GIFTS[8],time:"2 days ago",room:"Technology Zone"},
    {id:2,to:NEARBY[0],gift:ALL_GIFTS[9],time:"3 days ago",room:"Business Zone"},
  ];
  const items=tab==="received"?received:sent;

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Gift History" onBack={onBack}/>
      <div style={{display:"flex",gap:7,padding:"8px 14px",flexShrink:0}}>
        <Pill label={`⬇️ Received (${received.length})`} active={tab==="received"} onClick={()=>setTab("received")}/>
        <Pill label={`⬆️ Sent (${sent.length})`} active={tab==="sent"} onClick={()=>setTab("sent")}/>
      </div>
      {/* Total */}
      <div style={{margin:"0 14px 10px",background:D3,borderRadius:13,padding:"12px 16px",border:`1px solid ${D4}`,display:"flex",justifyContent:"space-between"}}>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:GRN}}>1,300</div>
          <div style={{fontSize:10,color:G}}>Coins received</div>
        </div>
        <div style={{width:1,background:D4}}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:O}}>150</div>
          <div style={{fontSize:10,color:G}}>Coins sent</div>
        </div>
        <div style={{width:1,background:D4}}/>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'DM Serif Display',serif",fontSize:22,color:DIA}}>6</div>
          <div style={{fontSize:10,color:G}}>Total gifts</div>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"6px 14px"}}>
        {items.map(item=>{
          const other=tab==="received"?item.from:item.to;
          return(
            <div key={item.id} style={{background:D3,borderRadius:14,padding:"14px",marginBottom:9,border:`1px solid ${D4}`}}>
              <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
                <div style={{fontSize:36}}>{item.gift.emoji}</div>
                <div style={{flex:1}}>
                  <div style={{fontWeight:700,fontSize:14,color:W,marginBottom:2}}>{item.gift.name}</div>
                  <div style={{fontSize:12,color:O,fontWeight:700}}>{item.gift.cost.toLocaleString()} coins</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:G}}>{item.time}</div>
                  <div style={{fontSize:10,color:GD}}>in {item.room}</div>
                </div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:10,borderTop:`1px solid ${D4}`,paddingTop:10}}>
                <Avatar av={other.av} tier={other.tier} size={30}/>
                <div style={{fontSize:12,color:G}}>{tab==="received"?"From":"To"}: <span style={{color:W,fontWeight:600}}>{other.name}</span></div>
                <button onClick={()=>push(S.USER_VIEW,other)} style={{marginLeft:"auto",background:"none",border:"none",color:O,fontSize:12,cursor:"pointer",fontWeight:600}}>View →</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── COIN HISTORY (detailed) ──────────────────────────────────────────
function CoinHistoryScreen({onBack}){
  const [filter,setFilter]=useState("all");
  const allTxs=[
    {id:1,type:"received",label:"Silver Whisper gift",sub:"From Amara K.",amount:50,time:"Today 10:22",icon:"🎁"},
    {id:2,type:"sent",label:"Room Entry Fee",sub:"Business Zone",amount:5,time:"Today 09:15",icon:"⬡"},
    {id:3,type:"purchased",label:"Coin Purchase",sub:"Credit card",amount:1000,time:"Yesterday",icon:"💳"},
    {id:4,type:"sent",label:"Ghost Whisper gift",sub:"To Kwame B.",amount:100,time:"2 days ago",icon:"🎁"},
    {id:5,type:"received",label:"Love Whisper gift",sub:"From Lena P.",amount:200,time:"3 days ago",icon:"🎁"},
    {id:6,type:"sent",label:"Verified Badge Fee",sub:"Application",amount:50,time:"4 days ago",icon:"✅"},
    {id:7,type:"purchased",label:"Coin Purchase",sub:"Bank transfer",amount:500,time:"5 days ago",icon:"💳"},
    {id:8,type:"sent",label:"Room Entry Fee",sub:"Trend Zone",amount:5,time:"6 days ago",icon:"⬡"},
    {id:9,type:"received",label:"Dinosaur Whisper",sub:"From Tariq O.",amount:1000,time:"7 days ago",icon:"🎁"},
  ];
  const filtered=allTxs.filter(t=>filter==="all"||t.type===filter);
  const totalIn=allTxs.filter(t=>t.type==="received"||t.type==="purchased").reduce((a,t)=>a+t.amount,0);
  const totalOut=allTxs.filter(t=>t.type==="sent").reduce((a,t)=>a+t.amount,0);

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Coin History" onBack={onBack}/>
      {/* Summary */}
      <div style={{display:"flex",gap:9,padding:"10px 14px",flexShrink:0}}>
        {[{v:"+"+totalIn,l:"Total In",c:GRN},{v:"-"+totalOut,l:"Total Out",c:RED},{v:String(totalIn-totalOut),l:"Net",c:O}].map(s=>(
          <div key={s.l} style={{flex:1,background:D3,borderRadius:12,padding:"11px 9px",textAlign:"center",border:`1px solid ${D5}`}}>
            <div style={{fontWeight:800,fontSize:17,color:s.c}}>{s.v}</div>
            <div style={{fontSize:9,color:G,marginTop:2}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:6,padding:"0 14px 8px",flexShrink:0}}>
        {["all","received","sent","purchased"].map(f=>(
          <Pill key={f} label={f==="all"?"All":f==="received"?"⬇️ In":f==="sent"?"⬆️ Out":"💳 Bought"} active={filter===f} onClick={()=>setFilter(f)}/>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"4px 14px"}}>
        {filtered.map(tx=>(
          <div key={tx.id} style={{display:"flex",alignItems:"center",gap:11,padding:"11px 0",borderBottom:`1px solid ${D4}`}}>
            <div style={{width:40,height:40,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,background:tx.type==="received"?`${GRN}22`:tx.type==="purchased"?`${O}22`:`${RED}22`,flexShrink:0}}>{tx.icon}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:600,color:W,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{tx.label}</div>
              <div style={{fontSize:11,color:G}}>{tx.sub} · {tx.time}</div>
            </div>
            <div style={{fontWeight:700,fontSize:14,color:tx.type==="received"?GRN:tx.type==="purchased"?O:RED,flexShrink:0}}>
              {tx.type==="sent"?"-":"+"}  {tx.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PRIVATE ROOMS ────────────────────────────────────────────────────
function PrivateRoomsScreen({onBack,push}){
  const myRooms=[
    {id:1,name:"Dev Talks",emoji:"💡",members:8,active:true,created:"2 weeks ago",invCode:"WH-A8X2PQ"},
    {id:2,name:"The Inner Circle",emoji:"🌙",members:4,active:false,created:"1 month ago",invCode:"WH-Z9B3KR"},
  ];
  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Private Rooms" onBack={onBack}
        right={<button onClick={()=>push(S.CREATE_ROOM)} style={{background:O,border:"none",borderRadius:8,padding:"7px 14px",color:W,fontSize:13,fontWeight:700,cursor:"pointer"}}>+ Create</button>}/>
      <div style={{flex:1,overflowY:"auto",padding:"14px"}}>
        <div style={{background:`${DIA}12`,border:`1px solid ${DIA}33`,borderRadius:13,padding:"12px 14px",marginBottom:18}}>
          <div style={{fontSize:12,color:DIA,fontWeight:600,marginBottom:3}}>💎 Platinum Diamond Feature</div>
          <div style={{fontSize:11,color:GD}}>Private rooms cost 50 coins to create. Only Diamond members can join. You can have unlimited active rooms.</div>
        </div>
        {myRooms.length===0?(
          <div style={{textAlign:"center",padding:"40px 0",color:G}}>
            <div style={{fontSize:44,marginBottom:12}}>🏠</div>
            <div>No private rooms yet</div>
            <div style={{fontSize:12,marginTop:6,color:GD}}>Create your first private space</div>
          </div>
        ):myRooms.map(r=>(
          <div key={r.id} style={{background:D3,border:`1px solid ${DIA}33`,borderRadius:16,padding:"15px",marginBottom:12}}>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
              <div style={{fontSize:28,width:48,height:48,background:D4,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center"}}>{r.emoji}</div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:15,color:W,marginBottom:2}}>{r.name}</div>
                <div style={{fontSize:12,color:G}}>{r.members} members · {r.active?"🟢 Active":"⚫ Quiet"} · Created {r.created}</div>
              </div>
            </div>
            <div style={{background:D4,borderRadius:9,padding:"9px 12px",marginBottom:12}}>
              <div style={{fontSize:9,color:G,marginBottom:4,fontFamily:"monospace",letterSpacing:"0.1em"}}>INVITE CODE</div>
              <div style={{fontFamily:"monospace",fontSize:16,color:W,fontWeight:700,letterSpacing:"0.12em"}}>{r.invCode}</div>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={()=>push(S.ROOM_CHAT,{...r,exclusive:true})} style={{flex:1,background:O,border:"none",borderRadius:9,padding:"10px 0",color:W,fontWeight:700,fontSize:13,cursor:"pointer"}}>Enter Room</button>
              <button style={{background:D4,border:`1px solid ${D5}`,borderRadius:9,padding:"10px 14px",color:GL,fontSize:13,cursor:"pointer"}}>⚙️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── HELP CENTER ──────────────────────────────────────────────────────
function HelpCenterScreen({onBack}){
  const [open,setOpen]=useState(null);
  const [q,setQ]=useState("");
  const faqs=[
    {q:"How does the proximity feature work?",a:"Whisper uses your device GPS to detect other Whisper users within range. When someone is nearby, you receive a soft audio alert. The exact distance is only shown if the other user is in Visible mode. Proximity detection runs in the background."},
    {q:"What is the 10-digit recovery code?",a:"Your recovery code is a cryptographically random 10-character code sent to your email 24 hours after registration. It's stored as a hash on our servers. It's the only way to recover, delete, or reclaim your account if hacked — not even Whisper support can bypass it."},
    {q:"How are messages encrypted?",a:"All direct messages use Signal Protocol end-to-end encryption. This means only you and the recipient can read your messages. Whisper's servers only store encrypted ciphertext and cannot decrypt your messages."},
    {q:"What are the account tiers?",a:"Basic Silver is free. Premium Gold costs 200 coins one-time and unlocks chat rooms, lower fees (30%), and badge eligibility. Platinum Diamond costs 1,000 coins one-time and unlocks everything including private rooms, the Diamond Zone, unlimited wallet, and 20% fees."},
    {q:"How do I use coins?",a:"Coins are the in-app currency (10 coins = $1 USD). Use them to enter chat rooms (5 coins/session), send gifts (2–20,000 coins), create private rooms (50 coins), apply for badges (50 coins), and transfer to other users. Fees apply per tier."},
    {q:"How do I report someone?",a:"Tap the ⚠️ button on any user's profile or in a chat room. Select a reason and add details. Verified reports result in a 24-hour ban. Repeated violations lead to permanent removal. Reports are reviewed by our moderation team within 24 hours."},
    {q:"Can I delete my account?",a:"Yes. Go to Settings → Account → Delete Account, or use your 10-digit recovery code to permanently delete your account and all data. This action is irreversible and removes all your messages, coins, and profile data."},
  ];
  const filtered=faqs.filter(f=>q===""||f.q.toLowerCase().includes(q.toLowerCase()));

  return(
    <div style={{flex:1,background:D,display:"flex",flexDirection:"column"}}>
      <Hdr title="Help Center" onBack={onBack}/>
      <div style={{padding:"10px 14px 6px",flexShrink:0}}>
        <div style={{background:D3,borderRadius:12,padding:"9px 13px",display:"flex",alignItems:"center",gap:8,border:`1px solid ${D5}`}}>
          <span style={{color:G}}>🔍</span>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search help articles…" style={{background:"none",border:"none",color:W,fontSize:13,outline:"none",flex:1}}/>
        </div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
        {/* Quick actions */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:18}}>
          {[{icon:"💬",label:"Live Chat",sub:"Avg 5 min reply"},{icon:"📧",label:"Email Support",sub:"24h response"},{icon:"🐛",label:"Report Bug",sub:"Help us improve"},{icon:"📖",label:"User Guide",sub:"Full documentation"}].map(a=>(
            <div key={a.label} style={{background:D3,border:`1px solid ${D4}`,borderRadius:13,padding:"13px 11px",cursor:"pointer",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:6}}>{a.icon}</div>
              <div style={{fontSize:12,fontWeight:700,color:W,marginBottom:2}}>{a.label}</div>
              <div style={{fontSize:10,color:G}}>{a.sub}</div>
            </div>
          ))}
        </div>
        <div style={{fontSize:11,fontWeight:700,color:G,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:10}}>Frequently Asked Questions</div>
        {filtered.map((f,i)=>(
          <div key={i} style={{background:D3,borderRadius:13,marginBottom:8,overflow:"hidden",border:`1px solid ${open===i?O+"44":D4}`}}>
            <div onClick={()=>setOpen(open===i?null:i)} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 15px",cursor:"pointer"}}>
              <div style={{fontSize:13,fontWeight:600,color:W,flex:1,paddingRight:12,lineHeight:1.4}}>{f.q}</div>
              <div style={{fontSize:18,color:open===i?O:G,transition:"transform 0.2s",transform:open===i?"rotate(180deg)":"none",flexShrink:0}}>⌄</div>
            </div>
            {open===i&&(
              <div style={{padding:"0 15px 14px",fontSize:13,color:GL,lineHeight:1.65,borderTop:`1px solid ${D4}`}}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN: REPORTS ───────────────────────────────────────────────────
function AdminReportsScreen({onBack}){
  const [reports,setReports]=useState([
    {id:1,reporter:"Amara K.",reported:"Zara M.",reason:"Spam",detail:"Repeatedly sending scam links in Business Zone",time:"12m ago",status:"pending",severity:"high"},
    {id:2,reporter:"Tariq O.",reported:"Emeka J.",reason:"Harassment",detail:"Sending threatening messages via DM",time:"1h ago",status:"pending",severity:"high"},
    {id:3,reporter:"Kwame B.",reported:"Unknown",reason:"Fake profile",detail:"Profile has stolen photos and fake credentials",time:"3h ago",status:"reviewing",severity:"medium"},
    {id:4,reporter:"Lena P.",reported:"User #1042",reason:"Inappropriate content",detail:"Sending explicit images without consent",time:"5h ago",status:"resolved",severity:"high"},
    {id:5,reporter:"Zara M.",reported:"Tariq O.",reason:"Other",detail:"General complaint, no specific detail",time:"8h ago",status:"dismissed",severity:"low"},
  ]);

  const act=(id,status)=>setReports(r=>r.map(x=>x.id===id?{...x,status}:x));
  const sevColor={high:RED,medium:YEL,low:G};

  return(
    <div style={{flex:1,background:"#080808",display:"flex",flexDirection:"column"}}>
      <Hdr title="Reports & Violations" onBack={onBack} dark/>
      <div style={{padding:"8px 14px 6px",display:"flex",gap:7,flexShrink:0}}>
        {[{v:reports.filter(r=>r.status==="pending").length,l:"Pending",c:YEL},
          {v:reports.filter(r=>r.status==="reviewing").length,l:"Reviewing",c:O},
          {v:reports.filter(r=>r.status==="resolved").length,l:"Resolved",c:GRN}].map(s=>(
          <div key={s.l} style={{flex:1,background:D3,borderRadius:10,padding:"10px 8px",textAlign:"center",border:`1px solid ${D5}`}}>
            <div style={{fontWeight:800,fontSize:18,color:s.c}}>{s.v}</div>
            <div style={{fontSize:9,color:G}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
        {reports.map(r=>(
          <div key={r.id} style={{background:D3,border:`1px solid ${r.status==="pending"?YEL+"33":r.status==="resolved"?GRN+"22":D5}`,borderRadius:14,padding:"14px",marginBottom:10}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div>
                <div style={{fontWeight:700,fontSize:13,color:W,marginBottom:2}}>{r.reason}</div>
                <div style={{fontSize:11,color:G}}>By {r.reporter} against {r.reported}</div>
                <div style={{fontSize:10,color:GD}}>{r.time}</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5}}>
                <div style={{fontSize:9,padding:"2px 8px",borderRadius:7,background:`${sevColor[r.severity]}22`,color:sevColor[r.severity],fontWeight:700,fontFamily:"monospace"}}>{r.severity.toUpperCase()}</div>
                <div style={{fontSize:9,padding:"2px 8px",borderRadius:7,background:r.status==="pending"?`${YEL}22`:r.status==="resolved"?`${GRN}22`:r.status==="reviewing"?`${O}22`:`${G}22`,color:r.status==="pending"?YEL:r.status==="resolved"?GRN:r.status==="reviewing"?O:G,fontWeight:700}}>{r.status}</div>
              </div>
            </div>
            <div style={{background:D4,borderRadius:9,padding:"9px 11px",fontSize:12,color:GL,marginBottom:r.status==="pending"||r.status==="reviewing"?10:0,lineHeight:1.45}}>{r.detail}</div>
            {(r.status==="pending"||r.status==="reviewing")&&(
              <div style={{display:"flex",gap:7}}>
                <button onClick={()=>act(r.id,"resolved")} style={{flex:1,background:`${RED}15`,border:`1px solid ${RED}44`,borderRadius:9,padding:"9px 0",color:RED,fontWeight:700,fontSize:12,cursor:"pointer"}}>Ban 24h</button>
                <button onClick={()=>act(r.id,"reviewing")} style={{flex:1,background:`${YEL}15`,border:`1px solid ${YEL}33`,borderRadius:9,padding:"9px 0",color:YEL,fontWeight:700,fontSize:12,cursor:"pointer"}}>Review</button>
                <button onClick={()=>act(r.id,"dismissed")} style={{flex:1,background:D4,border:`1px solid ${D5}`,borderRadius:9,padding:"9px 0",color:G,fontWeight:700,fontSize:12,cursor:"pointer"}}>Dismiss</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════════════════════════════
// MAIN APP SHELL
// ═══════════════════════════════════════════════════════════════════
const MAIN_SCREENS=[S.HOME,S.DISCOVER,S.MESSAGES,S.ROOMS,S.WALLET,S.PROFILE];
const ADMIN_SCREENS=[S.ADMIN,S.ADMIN_USERS,S.ADMIN_ROOMS,S.ADMIN_COINS,S.ADMIN_BADGES,S.ADMIN_ANALYTICS,S.ADMIN_REPORTS];
const NAV_MAP={home:S.HOME,discover:S.DISCOVER,messages:S.MESSAGES,rooms:S.ROOMS,profile:S.PROFILE};

const ALL_NAV=[
  {section:"Auth"},
  {label:"🌊 Splash",s:S.SPLASH},
  {label:"📖 Onboard",s:S.ONBOARD},
  {label:"🔐 Login",s:S.LOGIN},
  {label:"📝 Register",s:S.REGISTER},
  {label:"👤 Profile Setup",s:S.PROFILE_SETUP},
  {section:"Core"},
  {label:"📡 Home / Radar",s:S.HOME,nav:"home"},
  {label:"📸 Status / Stories",s:S.STATUS,nav:"home"},
  {label:"🔔 Notifications",s:S.NOTIFS,nav:"home"},
  {label:"🔍 Search",s:S.SEARCH,nav:"home"},
  {label:"👥 User Profile View",s:S.USER_VIEW,nav:"home",data:()=>NEARBY[0]},
  {section:"Messages"},
  {label:"💬 Messages",s:S.MESSAGES,nav:"messages"},
  {label:"✉️  Chat",s:S.CHAT,nav:"messages",data:()=>CONVOS[0]},
  {section:"Rooms"},
  {label:"⬡ Chat Rooms",s:S.ROOMS,nav:"rooms"},
  {label:"🏠 Room Chat",s:S.ROOM_CHAT,nav:"rooms",data:()=>ROOMS[2]},
  {label:"🔒 Create Room",s:S.CREATE_ROOM,nav:"rooms"},
  {section:"Wallet"},
  {label:"🪙 Wallet",s:S.WALLET,nav:"wallet"},
  {label:"🎁 Gift History",s:S.GIFT_HISTORY,nav:"wallet"},
  {label:"📋 Coin History",s:S.COIN_HISTORY,nav:"wallet"},
  {label:"💳 Buy Coins",s:S.BUY_COINS,nav:"wallet"},
  {label:"📤 Send Coins",s:S.SEND_COINS,nav:"wallet",data:()=>NEARBY[0]},
  {label:"✅ Badge Apply",s:S.BADGE_APPLY,nav:"wallet"},
  {label:"💎 Upgrade",s:S.UPGRADE,nav:"wallet"},
  {section:"Profile"},
  {label:"◉ Profile",s:S.PROFILE,nav:"profile"},
  {label:"⚙️  Settings",s:S.SETTINGS,nav:"profile"},
  {label:"⚠️  Report User",s:S.REPORT,nav:"profile",data:()=>NEARBY[0]},
  {section:"Discover & Map"},
  {label:"✦ Discover Feed",s:S.DISCOVER,nav:"discover"},
  {label:"🗺️ Nearby Map",s:S.NEARBY_MAP,nav:"home"},
  {section:"Extra Screens"},
  {label:"✏️ Edit Profile",s:S.EDIT_PROFILE,nav:"profile"},
  {label:"🔐 Security",s:S.SECURITY,nav:"profile"},
  {label:"🔒 Privacy",s:S.PRIVACY,nav:"profile"},
  {label:"🚫 Blocked Users",s:S.BLOCKED,nav:"profile"},
  {label:"👥 Connections",s:S.CONNECTIONS,nav:"profile"},
  {label:"🖼️ Album View",s:S.ALBUM_VIEW,nav:"profile"},
  {label:"📞 Voice Call",s:S.VOICE_CALL,nav:"messages",data:()=>NEARBY[0]},
  {label:"📹 Video Call",s:S.VIDEO_CALL,nav:"messages",data:()=>NEARBY[0]},
  {label:"🔑 Change Password",s:S.CHANGE_PASSWORD,nav:"profile"},
  {label:"🏠 Private Rooms",s:S.PRIVATE_ROOMS,nav:"rooms"},
  {label:"❓ Help Center",s:S.HELP_CENTER,nav:"profile"},
  {section:"Admin"},
  {label:"🔐 Admin Dashboard",s:S.ADMIN},
  {label:"👥 Admin: Users",s:S.ADMIN_USERS},
  {label:"⬡ Admin: Rooms",s:S.ADMIN_ROOMS},
  {label:"🪙 Admin: Coins",s:S.ADMIN_COINS},
  {label:"✅ Admin: Badges",s:S.ADMIN_BADGES},
  {label:"📊 Admin: Analytics",s:S.ADMIN_ANALYTICS},
  {label:"📣 Admin: Reports",s:S.ADMIN_REPORTS},
];

export default function WhisperApp(){
  const [screen,setScreen]=useState(S.SPLASH);
  const [navActive,setNavActive]=useState("home");
  const [stack,setStack]=useState([]);
  const [data,setData]=useState({});

  const push=useCallback((s,d={})=>{
    setStack(h=>[...h,{screen,data}]);
    setScreen(s);setData(d||{});
  },[screen,data]);

  const pop=useCallback(()=>{
    if(stack.length>0){
      const prev=stack[stack.length-1];
      setScreen(prev.screen);setData(prev.data||{});
      setStack(h=>h.slice(0,-1));
    }
  },[stack]);

  const navTo=useCallback((id)=>{
    setNavActive(id);setStack([]);setData({});
    setScreen(NAV_MAP[id]||S.HOME);
  },[]);

  const jumpTo=(item)=>{
    setStack([]);
    const d=item.data?item.data():{};
    setData(d);setScreen(item.s);
    if(item.nav)setNavActive(item.nav);
  };

  const showNav=MAIN_SCREENS.includes(screen);
  const unread=CONVOS.reduce((a,c)=>a+c.unread,0);

  return(
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",background:"radial-gradient(ellipse at 25% 15%,#1C0800 0%,#000 65%)",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;}
        input::placeholder,textarea::placeholder{color:#555;}
        input,button,textarea{font-family:'DM Sans',sans-serif;}
        ::-webkit-scrollbar{width:0;height:0;}
        @keyframes slideDown{from{opacity:0;transform:translateY(-14px);}to{opacity:1;transform:translateY(0);}}
        @keyframes giftPop{0%{opacity:0;transform:translate(-50%,-50%) scale(0.2);}18%{opacity:1;transform:translate(-50%,-50%) scale(1.15);}35%{transform:translate(-50%,-50%) scale(1);}82%{opacity:1;}100%{opacity:0;transform:translate(-50%,-50%) scale(1.1);}}
        @keyframes bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-6px);}}
        @keyframes ping{0%{transform:translate(-50%,-50%) scale(1);opacity:1;}100%{transform:translate(-50%,-50%) scale(3);opacity:0;}}
        @keyframes callPulse{0%{transform:scale(1);opacity:0.6;}50%{transform:scale(1.12);opacity:0.3;}100%{transform:scale(1);opacity:0.6;}}
        @keyframes wave{0%{transform:scaleY(0.4);}100%{transform:scaleY(1);}}
      `}</style>

      {/* ── Phone Frame ── */}
      <div style={{width:390,height:844,background:ADMIN_SCREENS.includes(screen)?"#080808":D,borderRadius:52,overflow:"hidden",boxShadow:"0 48px 128px rgba(0,0,0,0.96),0 0 0 1.5px #2A2A2A,inset 0 0 0 1px #333",display:"flex",flexDirection:"column",position:"relative",flexShrink:0}}>
        {/* Notch */}
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:126,height:36,background:"#000",borderRadius:"0 0 22px 22px",zIndex:300}}/>
        <StatusBar/>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {screen===S.SPLASH          &&<SplashScreen onDone={()=>setScreen(S.ONBOARD)}/>}
          {screen===S.ONBOARD         &&<OnboardScreen onLogin={()=>push(S.LOGIN)} onReg={()=>push(S.REGISTER)}/>}
          {screen===S.LOGIN           &&<LoginScreen onBack={pop} onDone={()=>{setScreen(S.HOME);setNavActive("home");}}/>}
          {screen===S.REGISTER        &&<RegisterScreen onBack={pop} onDone={()=>push(S.PROFILE_SETUP)}/>}
          {screen===S.PROFILE_SETUP   &&<ProfileSetupScreen onDone={()=>{setScreen(S.HOME);setNavActive("home");}}/>}
          {screen===S.HOME            &&<HomeScreen push={push} onNav={navTo}/>}
          {screen===S.STATUS          &&<StatusScreen onBack={pop} initData={data?.id?data:null}/>}
          {screen===S.NOTIFS          &&<NotifsScreen onBack={pop}/>}
          {screen===S.SEARCH          &&<SearchScreen onBack={pop} push={push}/>}
          {screen===S.USER_VIEW       &&<UserViewScreen user={data} onBack={pop} push={push}/>}
          {screen===S.MESSAGES        &&<MessagesScreen push={push}/>}
          {screen===S.CHAT            &&<ChatScreen user={data} onBack={pop} push={push}/>}
          {screen===S.ROOMS           &&<RoomsScreen push={push}/>}
          {screen===S.ROOM_CHAT       &&<RoomChatScreen room={data} onBack={pop}/>}
          {screen===S.CREATE_ROOM     &&<CreateRoomScreen onBack={pop}/>}
          {screen===S.WALLET          &&<WalletScreen push={push}/>}
          {screen===S.BUY_COINS       &&<BuyCoinsScreen onBack={pop}/>}
          {screen===S.SEND_COINS      &&<SendCoinsScreen user={data} onBack={pop}/>}
          {screen===S.BADGE_APPLY     &&<BadgeApplyScreen onBack={pop}/>}
          {screen===S.UPGRADE         &&<UpgradeScreen onBack={pop}/>}
          {screen===S.REPORT          &&<ReportScreen user={data} onBack={pop}/>}
          {screen===S.PROFILE         &&<ProfileScreen push={push}/>}
          {screen===S.SETTINGS        &&<SettingsScreen onBack={pop} push={push}/>}
          {screen===S.ADMIN           &&<AdminScreen onBack={pop} push={push}/>}
          {screen===S.ADMIN_USERS     &&<AdminUsersScreen onBack={pop}/>}
          {screen===S.ADMIN_ROOMS     &&<AdminRoomsScreen onBack={pop}/>}
          {screen===S.ADMIN_COINS     &&<AdminCoinsScreen onBack={pop}/>}
          {screen===S.ADMIN_BADGES    &&<AdminBadgesScreen onBack={pop}/>}
          {screen===S.ADMIN_ANALYTICS &&<AdminAnalyticsScreen onBack={pop}/>}
          {screen===S.ADMIN_REPORTS    &&<AdminReportsScreen onBack={pop}/>}
          {screen===S.VOICE_CALL       &&<VoiceCallScreen user={data} onBack={pop}/>}
          {screen===S.VIDEO_CALL       &&<VideoCallScreen user={data} onBack={pop}/>}
          {screen===S.NEARBY_MAP       &&<NearbyMapScreen onBack={pop} push={push}/>}
          {screen===S.DISCOVER         &&<DiscoverScreen onBack={pop} push={push}/>}
          {screen===S.EDIT_PROFILE     &&<EditProfileScreen onBack={pop}/>}
          {screen===S.CHANGE_PASSWORD  &&<ChangePasswordScreen onBack={pop}/>}
          {screen===S.SECURITY         &&<SecurityScreen onBack={pop}/>}
          {screen===S.PRIVACY          &&<PrivacyScreen onBack={pop}/>}
          {screen===S.BLOCKED          &&<BlockedUsersScreen onBack={pop}/>}
          {screen===S.CONNECTIONS      &&<ConnectionsScreen onBack={pop} push={push}/>}
          {screen===S.ALBUM_VIEW       &&<AlbumViewScreen onBack={pop}/>}
          {screen===S.GIFT_HISTORY     &&<GiftHistoryScreen onBack={pop} push={push}/>}
          {screen===S.COIN_HISTORY     &&<CoinHistoryScreen onBack={pop}/>}
          {screen===S.PRIVATE_ROOMS    &&<PrivateRoomsScreen onBack={pop} push={push}/>}
          {screen===S.HELP_CENTER      &&<HelpCenterScreen onBack={pop}/>}
        </div>
        {showNav&&<BottomNav active={navActive} onNav={navTo} badge={unread}/>}
        <div style={{height:6,display:"flex",justifyContent:"center",padding:"0 0 6px",flexShrink:0}}>
          <div style={{width:104,height:4,background:"#2A2A2A",borderRadius:2}}/>
        </div>
      </div>

      {/* ── Side Nav ── */}
      <div style={{marginLeft:26,display:"flex",flexDirection:"column",gap:2,maxHeight:"92vh",overflowY:"auto",paddingRight:6,paddingBottom:16}}>
        <div style={{color:"rgba(255,255,255,0.2)",fontSize:9,fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",marginBottom:7,paddingLeft:4}}>All Screens</div>
        {ALL_NAV.map((item,i)=>{
          if(item.section)return(
            <div key={i} style={{fontSize:9,fontWeight:700,color:"rgba(255,255,255,0.18)",letterSpacing:"0.14em",textTransform:"uppercase",marginTop:8,marginBottom:2,paddingLeft:4}}>{item.section}</div>
          );
          const active=screen===item.s;
          return(
            <button key={item.s+i} onClick={()=>jumpTo(item)} style={{background:active?`${O}22`:"rgba(255,255,255,0.03)",border:`1px solid ${active?O:"rgba(255,255,255,0.07)"}`,borderRadius:8,padding:"6px 13px",color:active?O:"rgba(255,255,255,0.42)",fontSize:11,fontWeight:600,cursor:"pointer",textAlign:"left",transition:"all 0.15s",whiteSpace:"nowrap"}}>{item.label}</button>
          );
        })}
      </div>
    </div>
  );
}
