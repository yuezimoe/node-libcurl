"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = void 0;
const libcurl_1 = require("./libcurl");
const utils_1 = require("./utils");
class requestsResponse {
    curl;
    constructor(curl) {
        this.curl = curl;
    }
    get text() {
        return this.curl.getResponseString();
    }
    get json() {
        return this.curl.getResponseJson();
    }
    get buffer() {
        return this.curl.getResponseBody();
    }
    get headers() {
        return this.curl.getResponseHeaders();
    }
    get headersMap() {
        return this.curl.getResponseHeadersMap();
    }
    get status() {
        return this.curl.getResponseStatus();
    }
    get contentLength() {
        return this.curl.getResponseContentLength();
    }
}
const assignURLSearchParam = (target, source) => {
    source.forEach((value, key) => {
        target.append(key, value);
    });
};
const ja3Md5Map = new Map();
class requests {
    option;
    needSetCookies;
    lastJa3;
    randomJa3;
    retryOption = {
        retryNum: 0,
        conditionCallback(resp) {
            return true;
        }
    };
    constructor(option = {}) {
        this.option = { ...option };
        const { cookies, timeout, verbose, redirect = false, proxy, httpVersion, interface: interface_, ja3 } = option;
        const curl = this.option.instance ||= new libcurl_1.LibCurl();
        switch (typeof cookies) {
            case 'string':
                this.needSetCookies = !!cookies;
                break;
            case 'object':
                if (cookies !== null) {
                    if (cookies.value) {
                        if (cookies.uri) {
                            (0, utils_1.libcurlSetCookies)(curl, cookies.value, (0, utils_1.getUriTopLevelHost)(cookies.uri));
                        }
                        else {
                            this.needSetCookies = !!cookies;
                        }
                    }
                }
                break;
            default:
                break;
        }
        if (timeout) {
            curl.setTimeout(timeout, timeout);
        }
        if (verbose) {
            curl.printInnerLogger();
        }
        if (interface_) {
            curl.setInterface(interface_);
        }
        if (typeof httpVersion != 'undefined') {
            curl.setHttpVersion(httpVersion);
        }
        if (redirect) {
            curl.setRedirect(true);
        }
        if (proxy) {
            curl.setProxy(proxy);
        }
        this.randomJa3 = !ja3;
        if (ja3) {
            this.lastJa3 = ja3;
        }
    }
    static session(option = {}) {
        return new requests(option);
    }
    async sendRequest(method, url, requestOpt) {
        const { instance: curl, cookies, timeout: timeoutOpt, ja3 } = this.option;
        const { headers, data, json, params, timeout, interface: interface_, redirect, proxy, httpVersion } = requestOpt || {};
        if (data && json) {
            throw new libcurl_1.LibCurlError('both data and json exist');
        }
        const url_ = new URL(url);
        if (this.needSetCookies) {
            this.needSetCookies = false;
            (0, utils_1.libcurlSetCookies)(curl, cookies, (0, utils_1.getUriTopLevelHost)(url_));
        }
        if (params) {
            assignURLSearchParam(url_.searchParams, new URLSearchParams(params));
        }
        curl.open(method, url_);
        if (headers) {
            curl.setRequestHeaders(headers);
        }
        if (typeof timeout == 'number') {
            curl.setTimeout(timeout, timeout);
        }
        else if (timeoutOpt) {
            curl.setTimeout(timeoutOpt, timeoutOpt);
        }
        if (typeof interface_ == 'string') {
            curl.setInterface(interface_);
        }
        else {
            if (this.option.interface) {
                curl.setInterface(this.option.interface);
            }
        }
        if (typeof redirect == 'boolean') {
            curl.setRedirect(redirect);
        }
        else {
            if (this.option.redirect) {
                curl.setRedirect(this.option.redirect);
            }
        }
        if (proxy) {
            curl.setProxy(proxy);
        }
        else {
            if (this.option.proxy) {
                curl.setProxy(this.option.proxy);
            }
        }
        if (typeof httpVersion == 'number') {
            curl.setHttpVersion(httpVersion);
        }
        else {
            if (this.option.httpVersion) {
                curl.setHttpVersion(this.option.httpVersion);
            }
        }
        if (ja3) {
            curl.setJA3Fingerprint(ja3);
        }
        else {
            if (this.randomJa3) {
                this.lastJa3 = (0, utils_1.libcurlRandomJA3Fingerprint)();
                curl.setJA3Fingerprint(this.lastJa3);
            }
        }
        let hasContentType = false;
        if (headers && (data || json)) {
            const contentTypeFilter = (e) => e.some(e => e.toLocaleLowerCase() == 'content-type');
            if (typeof headers == 'string') {
                hasContentType = /content-type/i.test(headers);
            }
            else if (headers instanceof Map) {
                hasContentType = contentTypeFilter([...headers.keys()]);
            }
            else {
                hasContentType = contentTypeFilter(Object.keys(headers));
            }
        }
        if (json) {
            if (!hasContentType) {
                curl.setRequestHeader('Content-Type', 'application/json');
            }
            await curl.send(json);
        }
        else if (data) {
            let sendData = data;
            if (!hasContentType) {
                if (typeof data == 'string') {
                    curl.setRequestHeader('Content-Type', 'text/plain');
                }
                else if (data instanceof URLSearchParams) {
                    curl.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                }
                else if (data instanceof Uint8Array) {
                    curl.setRequestHeader('Content-Type', 'application/octet-stream');
                }
                else {
                    curl.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                }
            }
            if (data instanceof Uint8Array) {
            }
            else if (!(data instanceof URLSearchParams) &&
                typeof data == 'object' && data != null) {
                sendData = Object.keys(data).map((e) => {
                    const value = data[e];
                    const type = typeof value;
                    if (['object', 'boolean'].includes(type)) {
                        return [e, JSON.stringify(value)];
                    }
                    else if (type == 'undefined') {
                        return [e, ''];
                    }
                    else if (['string', 'number'].includes(type)) {
                        return [e, value + ''];
                    }
                    else {
                        throw new libcurl_1.LibCurlError(`data unkown type ${type}`);
                    }
                })
                    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
                    .join('&');
            }
            await curl.send(sendData);
        }
        else {
            await curl.send();
        }
        return new requestsResponse(curl);
    }
    static async sendRequestStaic(method, url, requestStaticOpt) {
        return requests.session(requestStaticOpt).sendRequestRetry(method, url, requestStaticOpt);
    }
    async sendRequestRetry(method, url, requestOpt) {
        let isSuccess = false, resp;
        const { retryNum, conditionCallback } = this.retryOption;
        if (retryNum == 0) {
            return this.sendRequest(method, url, requestOpt);
        }
        for (let i = 0; i <= retryNum; i++) {
            try {
                resp = await this.sendRequest(method, url, requestOpt);
                isSuccess = conditionCallback(resp);
                if (isSuccess) {
                    break;
                }
            }
            catch (error) {
            }
        }
        if (!isSuccess) {
            throw new libcurl_1.LibCurlError(`failed after ${retryNum} retries`);
        }
        return resp;
    }
    static async get(url, requestOpt) {
        return requests.sendRequestStaic('GET', url, requestOpt);
    }
    static async post(url, requestOpt) {
        return requests.sendRequestStaic('POST', url, requestOpt);
    }
    static async put(url, requestOpt) {
        return requests.sendRequestStaic('PUT', url, requestOpt);
    }
    static async patch(url, requestOpt) {
        return requests.sendRequestStaic('PATCH', url, requestOpt);
    }
    static async trace(url, requestOpt) {
        return requests.sendRequestStaic('TRACE', url, requestOpt);
    }
    static async head(url, requestOpt) {
        return requests.sendRequestStaic('HEAD', url, requestOpt);
    }
    static async delete(url, requestOpt) {
        return requests.sendRequestStaic('DELETE', url, requestOpt);
    }
    async get(url, requestOpt) {
        return this.sendRequestRetry('GET', url, requestOpt);
    }
    async post(url, requestOpt) {
        return this.sendRequestRetry('POST', url, requestOpt);
    }
    async put(url, requestOpt) {
        return this.sendRequestRetry('PUT', url, requestOpt);
    }
    async patch(url, requestOpt) {
        return this.sendRequestRetry('PATCH', url, requestOpt);
    }
    async trace(url, requestOpt) {
        return this.sendRequestRetry('TRACE', url, requestOpt);
    }
    async head(url, requestOpt) {
        return this.sendRequestRetry('HEAD', url, requestOpt);
    }
    async delete(url, requestOpt) {
        return this.sendRequestRetry('DELETE', url, requestOpt);
    }
    setCookie(key, value, domain, path = '') {
        this.option.instance.setCookie({
            name: key,
            value,
            domain,
            path,
        });
    }
    getCookie(key, domain, path) {
        return this.option.instance.getCookie({
            name: key,
            domain: domain || "",
            path: path || "",
        });
    }
    getCookies(domain, path) {
        if (arguments.length == 0) {
            return this.option.instance.getCookies();
        }
        return this.option.instance.getCookies({
            domain: domain || "",
            path: path || "",
        });
    }
    getCookiesMap(domain, path) {
        if (arguments.length == 0) {
            return this.option.instance.getCookiesMap();
        }
        return this.option.instance.getCookiesMap({
            domain: domain || "",
            path: path || "",
        });
    }
    deleteCookie(key, domain, path) {
        this.option.instance.deleteCookie({
            name: key,
            domain: domain,
            path: path || "/",
        });
    }
    getJA3Fingerprint() {
        if (!this.lastJa3) {
            return {
                ja3: '',
                ja3_hash: '',
            };
        }
        if (!ja3Md5Map.has(this.lastJa3)) {
            const ja3_hash = (0, utils_1.md5)(this.lastJa3);
            ja3Md5Map.set(this.lastJa3, ja3_hash);
            return {
                ja3: this.lastJa3,
                ja3_hash,
            };
        }
        const ja3_hash = ja3Md5Map.get(this.lastJa3);
        return {
            ja3: this.lastJa3,
            ja3_hash,
        };
    }
    retry(retryNum, conditionCallback) {
        if (retryNum < 0) {
            throw new libcurl_1.LibCurlError('retryNum must be great than 0');
        }
        const rq = requests.session({
            ...this.option,
        });
        rq.retryOption.retryNum = retryNum;
        if (typeof conditionCallback == 'function') {
            rq.retryOption.conditionCallback = conditionCallback;
        }
        return rq;
    }
}
exports.requests = requests;
//# sourceMappingURL=requests.js.map