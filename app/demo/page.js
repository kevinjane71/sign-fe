   // signfe/app/meet/page.js
   'use client';
   import { useEffect } from 'react';

   export default function MeetSynkWidget() {
     useEffect(() => {
       const script = document.createElement('script');
       script.src = 'https://meetsynk.com/meetsynk-embed.js';
       script.dataset.mode = 'inline';
       script.dataset.slug = 'lmLOtZs40k0rOLpKktrB';
      //  script.dataset.text = 'Book a Call';
       script.dataset.color = '#3B82F6';
       script.dataset.radius = '9999px';
       script.dataset.fontSize = '16px';
       script.dataset.container = 'meetsynk-widget'; // <--- IMPORTANT

       document.getElementById('meetsynk-widget').appendChild(script);

       return () => {
        const idDiv= document.getElementById('meetsynk-widget');
        idDiv && (idDiv.innerHTML = '');
       };
     }, []);

     return (
       <div className="flex justify-center py-8">
         <div id="meetsynk-widget" style={{ width: '100%', minHeight: 600 }} />
       </div>
     );
   }