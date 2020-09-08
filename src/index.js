import Fingerprint2 from 'fingerprintjs2';

class OramiAnalytic {
  static push(eventType, data) {
    const caller = (fn) => {
      if (window.requestIdleCallback) {
          requestIdleCallback(fn);
      } else {
          setTimeout(fn, 500);
      }
    };

    caller(() => {
      const t0 = performance.now();
      Fingerprint2.get({}, (components) => {
        const deviceId = window['op-app-deviceId'] || Fingerprint2.x64hash128(components.map((component) => component.value).join(''), 31);
        const t1 = performance.now();
        console.log(`Took ${t1 - t0} ms to`);
        const info = {
          deviceId,
          platformId: window['op-app-platform'] || 'web',
          appName: `Orami Parenting ${window['op-app-platform'] || 'Web'}`,
          appVersion: window['op-app-version'] ? Math.floor(window['op-app-version'].split('.').map(x => x.padStart(3, '0')).join('')) : '000000000',
          userAgent: (components.find(component => component.key === 'userAgent') || {}).value,
          webdriver: (components.find(component => component.key === 'webdriver') || {}).value,
          language: (components.find(component => component.key === 'language') || {}).value,
          colorDepth: (components.find(component => component.key === 'colorDepth') || {}).value,
          deviceMemory: (components.find(component => component.key === 'deviceMemory') || {}).value,
          pixelRatio: (components.find(component => component.key === 'pixelRatio') || {}).value,
        };
        const allData = {
          info,
          data: {
            eventType,
            data
          }
        };

        console.log(allData);
      });
    });
  }
}
 export default OramiAnalytic;