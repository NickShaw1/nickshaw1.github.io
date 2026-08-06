import{o as e}from"./rolldown-runtime-Bhmf7a9N.js";import{a as t,o as n}from"./markdown-hfXSdh9Q.js";var r=e(n(),1),i=t();function a(){let[e,t]=(0,r.useState)(0);return(0,i.jsxs)(`div`,{className:`mb-5`,children:[(0,i.jsx)(`p`,{className:`font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3`,children:`Live demo`}),(0,i.jsxs)(`div`,{className:`
        flex flex-col items-center gap-5
        bg-bg-surface border border-bg-border rounded-card
        py-8 px-6
      `,children:[(0,i.jsx)(`span`,{className:`font-display font-bold text-6xl leading-none tabular-nums transition-colors duration-150 ${e>0?`text-accent`:e<0?`text-red-400`:`text-text-primary`}`,children:e}),(0,i.jsxs)(`div`,{className:`flex gap-3`,children:[(0,i.jsx)(`button`,{onClick:()=>t(e=>e-1),"aria-label":`Decrement`,className:`
              w-10 h-10 rounded-full
              border border-bg-border text-text-secondary
              hover:border-accent/40 hover:text-accent
              font-mono text-lg leading-none
              transition-colors duration-150
            `,children:`−`}),(0,i.jsx)(`button`,{onClick:()=>t(0),"aria-label":`Reset`,className:`
              px-4 h-10 rounded-pill
              border border-bg-border text-text-muted
              hover:border-text-muted/40 hover:text-text-secondary
              font-mono text-[11px] tracking-widest uppercase
              transition-colors duration-150
            `,children:`Reset`}),(0,i.jsx)(`button`,{onClick:()=>t(e=>e+1),"aria-label":`Increment`,className:`
              w-10 h-10 rounded-full
              border border-bg-border text-text-secondary
              hover:border-accent/40 hover:text-accent
              font-mono text-lg leading-none
              transition-colors duration-150
            `,children:`+`})]})]})]})}export{a as default};