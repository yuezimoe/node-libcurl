const { LibCurl, fetch, requests } = require('../dist/index');

async function main() {
    const session = requests.session({
        httpVersion: 1,
        redirect: true,
        verbose: true
    });
    console.log((await session.get('https://tls.peet.ws/api/clean', {
        headers: {
            'user-Agent': '1'
        }
    })).text);
    return
    console.log((await session.post('https://www.baidu.com?a=2', {
        headers: {
            'user-Agent': 'chrome'
        },
        params: {
            a: 1
        },
        body: new URLSearchParams({
            a: 2
        })
    })).status);
    console.log(session.getCookies('.codecademy.com'));
    debugger
    /*  const curl = new LibCurl();
     curl.setHttpVersion(1);
     curl.open('GET', 'https://tls.peet.ws/api/clean')
     curl.setRequestHeader('user-Agent', 'chrome')
     await curl.send();
     console.log(curl.getResponseString());
 
     curl.open('GET', 'https://tls.peet.ws/api/clean')
     curl.setRequestHeader('user-Agent', 'chrome')
     await curl.send();
     console.log(curl.getResponseString());
     return */
    // curl.open('GET', 'http://127.0.0.1:51053/unittest/getRawHeaders')
    // curl.setRequestHeader('user-Agent', 'chrome')
    // curl.removeCookie("a", "127.0.0.1")
    // await curl.send();
    // console.log(curl.getCookies());
    // console.log(curl.getResponseString());
    // return

    // fetch('https://tls.peet.ws/api/clean', {
    //     cookies: 'a=b;c=d;e=f',
    //     headers: {
    //         "user-Agent":"1"
    //     }
    // }).then(e => e.json()).then(e => {
    //     console.log(e);
    // }).catch((e) => {
    //     console.log(e);
    // })
}
main()