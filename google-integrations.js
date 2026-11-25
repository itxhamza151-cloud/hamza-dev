/* Optional Google integrations for Hamza Dev.
   Add your real IDs below. Keep blank until configured in Google services. */
window.HAMZA_SITE_CONFIG = {
  googleAnalyticsId: "", // Example format: G-XXXXXXXXXX
  googleSiteVerification: "" // Paste the verification token from Search Console
};
(function(){
  var c=window.HAMZA_SITE_CONFIG||{};
  if(c.googleAnalyticsId){
    var s=document.createElement('script');s.async=true;
    s.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(c.googleAnalyticsId);
    document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
    window.gtag=gtag;gtag('js',new Date());gtag('config',c.googleAnalyticsId);
  }
})();
