import http from "k6/http";
import { check, sleep } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/avito-tech/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 2, // virtual users
  duration: "1m", // duration of the test
};

export default function () {
  const url = "https://lwt.languagewire.com/f/api/v1/translations/text";

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Origin: "https://lwt.languagewire.com",
    "x-lwt-application-id": "LWT_WEB",
    // "x-lwt-build-id": "LWT_WEB",
    Cookie:
      "_mkto_trk=id:085-LVP-716&token:_mch-languagewire.com-a1d924f44f3249e3f3d3387bf9cc07e7; token=10adb23e-a281-408a-850b-e137fa73ddf0; _clck=5r0qhf%7C2%7Cfx4%7C0%7C2004; _clsk=g88lf5%7C1751046976124%7C3%7C1%7Cb.clarity.ms%2Fcollect; _mkto_trk_http=id:085-LVP-716&token:_mch-languagewire.com-a1d924f44f3249e3f3d3387bf9cc07e7; recaptcha-ca-t=Abp_cGZ3BqkEVaMtdWGARcpKX-9SiWiIR1Iuw3kDyDOI9E1anYYtIE3-w5lxhM5jdXrSL4rHBU9o9VTD5q4f3upw9NP0HDDmktCCWSpGeeh_b4HcFnxF1KKCbdS21ODfpQZ1UTgA3tzoO1BXvxF6-c7gerAZS3R_9AxcZX3lD-wgOMXO:U=b89f5c67be000000",
  };

  const payload = JSON.stringify({
    sourceText: "hello",
    reference: { source: "USER" },
    targetLanguage: "da",
  });

  const res = http.post(url, payload, { headers });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "response time < 500ms": (r) => r.timings.duration < 500,
  });

  sleep(1); // wait 1 second between requests to reduce load

  console.log(res.status, res.body);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };


// k6 run testscript.js --out json=test.json
