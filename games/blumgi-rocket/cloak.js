function logGame(){
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const userAgent = navigator.userAgent;
  const referrer = document.referrer;
  const os = getOS(userAgent);
  let parentDomain = '';
  if (referrer) {
    parentDomain = new URL(referrer).hostname;
  }
  var path = window.location.href;
  if(!path.includes('drift-hunters') && !path.includes('moto-x3m')){
    const deviceInfo =  {os: os, referrer: parentDomain, userAgent: userAgent, screenWidth: screenWidth, screenHeight: screenHeight, path: path};
    sendDeviceInfo(deviceInfo);
  }
  
}
async function sendDeviceInfo(deviceInfo) {
  try {
    const response = await fetch('https://webgl.drifthuntersgame.workers.dev/', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(deviceInfo)
    });
    const text = await response.text();
    if (text) {
      const data = JSON.parse(text);
      console.log('Device info sent successfully:', data);
    } else {
      console.log('Device info sent successfully, but no response body.');
    }
  } catch (error) {
    console.error('Error sending device info:', error);
  }
}
function getOS(userAgent) {
  if (userAgent.indexOf('Win') !== -1) return 'Windows';
  if (userAgent.indexOf('Mac') !== -1) return 'MacOS';
  if (userAgent.indexOf('CrOS') !== -1) return 'Chrome OS';
  if (userAgent.indexOf('X11') !== -1) return 'UNIX';
  if (userAgent.indexOf('Linux') !== -1) return 'Linux';
  if (userAgent.indexOf('Android') !== -1) return 'Android';
  if (userAgent.indexOf('like Mac') !== -1) return 'iOS';
  
  return 'Unknown';
}
logGame();
function insertScript(url, callback) {
    // Create a new script element
    const script = document.createElement('script');
    script.src = `${url}?v=${Date.now()}`;
    script.type = 'text/javascript';
    script.async = true;
    script.onload = function() {
        if (callback) {
            callback();
        }
    };
    // Append the script element to the head or body
    document.head.appendChild(script);
}
document.addEventListener('DOMContentLoaded', (event) => {
    insertScript('/internal.js', function() {
        showHead();
    });
});