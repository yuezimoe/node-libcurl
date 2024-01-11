import { LibCurl, LibCurlBodyInfo, LibCurlCookiesAttr, LibCurlCookiesInfo, LibCurlHeadersAttr, LibCurlHeadersInfo, LibCurlProxyInfo, LibCurlHttpVersionInfo, LibCurlURLInfo, LibCurlJA3FingerPrintInfo } from "./libcurl";
type requestsHttpVersionInfo = LibCurlHttpVersionInfo;
type requestsHeadersInfo = LibCurlHeadersInfo;
type requestsBodyInfo = LibCurlBodyInfo;
type requestsCookiesInfo = LibCurlCookiesInfo;
type requestsCookiesInfoWithUri = {
    value: requestsCookiesInfo;
    uri: string;
};
type requestsProxyInfo = LibCurlProxyInfo;
type requestsURLInfo = LibCurlURLInfo;
interface requestsResponseImp {
    readonly text: string;
    readonly json: object;
    readonly buffer: Uint8Array;
    readonly headers: string;
    readonly headersMap: LibCurlHeadersAttr;
    readonly status: number;
    readonly contentLength: number;
}
declare class requestsResponse implements requestsResponseImp {
    private curl;
    constructor(curl: LibCurl);
    get text(): string;
    get json(): object;
    get buffer(): Uint8Array;
    get headers(): string;
    get headersMap(): LibCurlHeadersAttr;
    get status(): number;
    get contentLength(): number;
}
interface requestsInitOption {
    redirect?: boolean;
    cookies?: requestsCookiesInfo | requestsCookiesInfoWithUri;
    proxy?: requestsProxyInfo;
    body?: requestsBodyInfo;
    httpVersion?: requestsHttpVersionInfo;
    verbose?: boolean;
    timeout?: number;
    interface?: string;
    instance?: LibCurl;
    ja3?: LibCurlJA3FingerPrintInfo;
}
type requestsParamsInfo = URLSearchParams | string | {
    [key: string]: string;
};
interface requestsOption {
    headers?: requestsHeadersInfo;
    params?: requestsParamsInfo;
    json?: object;
    data?: requestsBodyInfo;
    timeout?: number;
    redirect?: boolean;
    proxy?: requestsProxyInfo;
    interface?: string;
    httpVersion?: requestsHttpVersionInfo;
}
interface requestsStaticOption extends Omit<requestsInitOption, 'body' | 'instance'>, requestsOption {
}
type requestsRetryConditionCallback = (resp: requestsResponse) => boolean;
interface requestsRetryOption {
    retryNum: number;
    conditionCallback: requestsRetryConditionCallback;
}
export declare class requests {
    private option;
    private needSetCookies;
    private lastJa3;
    private randomJa3;
    protected retryOption: requestsRetryOption;
    constructor(option?: requestsInitOption);
    static session(option?: requestsInitOption): requests;
    private sendRequest;
    private static sendRequestStaic;
    private sendRequestRetry;
    static get(url: requestsURLInfo, requestOpt?: requestsStaticOption): Promise<requestsResponse>;
    static post(url: requestsURLInfo, requestOpt?: requestsStaticOption): Promise<requestsResponse>;
    static put(url: requestsURLInfo, requestOpt?: requestsStaticOption): Promise<requestsResponse>;
    static patch(url: requestsURLInfo, requestOpt?: requestsStaticOption): Promise<requestsResponse>;
    static trace(url: requestsURLInfo, requestOpt?: requestsStaticOption): Promise<requestsResponse>;
    static head(url: requestsURLInfo, requestOpt?: requestsStaticOption): Promise<requestsResponse>;
    static delete(url: requestsURLInfo, requestOpt?: requestsStaticOption): Promise<requestsResponse>;
    get(url: requestsURLInfo, requestOpt?: requestsOption): Promise<requestsResponse>;
    post(url: requestsURLInfo, requestOpt?: requestsOption): Promise<requestsResponse>;
    put(url: requestsURLInfo, requestOpt?: requestsOption): Promise<requestsResponse>;
    patch(url: requestsURLInfo, requestOpt?: requestsOption): Promise<requestsResponse>;
    trace(url: requestsURLInfo, requestOpt?: requestsOption): Promise<requestsResponse>;
    head(url: requestsURLInfo, requestOpt?: requestsOption): Promise<requestsResponse>;
    delete(url: requestsURLInfo, requestOpt?: requestsOption): Promise<requestsResponse>;
    setCookie(key: string, value: string, domain: string, path?: string): void;
    getCookie(key: string, domain?: string, path?: string): string;
    getCookies(domain?: string, path?: string): string;
    getCookiesMap(domain?: string, path?: string): LibCurlCookiesAttr;
    deleteCookie(key: string, domain: string, path?: string): void;
    getJA3Fingerprint(): {
        ja3: string;
        ja3_hash: string;
    };
    retry(retryNum: number, conditionCallback?: requestsRetryConditionCallback): requests;
}
export {};
