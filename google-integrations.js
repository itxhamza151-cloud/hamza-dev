/* Hamza Dev integrations.
   Add real IDs/URLs after creating the relevant Google services.
   Analytics ID format: G-XXXXXXXXXX
   Search Console: paste the HTML tag verification token (content only).
   Google Reviews: paste your Google Maps / review URL.
*/
window.HAMZA_SITE_CONFIG = {
  googleAnalyticsId: "",
  googleSiteVerification: "",
  googleReviewsUrl: ""
};
(function(){
  var c=window.HAMZA_SITE_CONFIG||{};
  if(c.googleSiteVerification){
    var meta=document.createElement('meta');
    meta.name='google-site-verification';
    meta.content=c.googleSiteVerification;
    document.head.appendChild(meta);
  }
  if(c.googleAnalyticsId){
    var s=document.createElement('script');s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(c.googleAnalyticsId);
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];
    function gtag(){dataLayer.push(arguments);}
    window.gtag=gtag;gtag('js',new Date());gtag('config',c.googleAnalyticsId);
  }
  function addSiteTools(){
    var footer=document.querySelector('.footer .container');
    if(!footer)return;
    var tools=document.createElement('div');
    tools.className='site-tools';
    tools.innerHTML='<div class="site-share"><span>SHARE THIS PAGE</span><button type="button" data-share="native">Share</button><button type="button" data-share="copy">Copy Link</button></div>';
    if(c.googleReviewsUrl){
      var review=document.createElement('a');
      review.className='site-review-link';
      review.href=c.googleReviewsUrl;review.target='_blank';review.rel='noopener noreferrer';
      review.textContent='View Google Reviews ↗';tools.appendChild(review);
    }
    footer.appendChild(tools);
    tools.addEventListener('click',function(e){
      var b=e.target.closest('button[data-share]');if(!b)return;
      var url=window.location.href,title=document.title;
      if(b.dataset.share==='native'&&navigator.share){
        navigator.share({title:title,url:url}).catch(function(){});
      }else if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(url).then(function(){b.textContent='Copied!';setTimeout(function(){b.textContent='Copy Link';},1800);});
      }else{
        var t=document.createElement('textarea');t.value=url;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();b.textContent='Copied!';
      }
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addSiteTools);else addSiteTools();
  document.addEventListener('submit',function(e){
    if(!e.target.matches('[data-newsletter-form]'))return;
    e.preventDefault();
    var email=e.target.querySelector('input[type="email"]');
    if(!email||!email.value.trim())return;
    var subject=encodeURIComponent('Newsletter Subscription - Hamza Dev');
    var body=encodeURIComponent('Please add this email to the Hamza Dev newsletter: '+email.value.trim());
    window.location.href='mailto:tmhamza204@gmail.com?subject='+subject+'&body='+body;
    var note=e.target.querySelector('.newsletter-note');if(note)note.textContent='Your email app will open with a subscription request. Press Send to complete it.';
  });
})();
