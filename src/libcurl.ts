import { BaoLibCurl } from '../scripts/bindings';
import { httpCookiesToArray, cookieOptFilter } from './utils';

BaoLibCurl.globalInit();

export enum LibCurlHttpVersionInfo {
    http1_1,
    http2,
}

//Domain         Secure  Path    CORS    TimeStamp       Name    Value
export type LibCurlSetCookieOption = {
    domain: string;
    // secure?: boolean;
    path?: string;
    // cors?: boolean;
    name: string;
    value: string;
}

export type LibCurlCookiesInfo = string | { [key: string]: string };


export type LibCurlGetCookiesOption = {
    domain?: string;
    path?: string;
}

export type LibCurlGetCookieOption = {
    name: string;
    domain: string;
    path?: string;
}

export type LibCurlCookieAttrArray = [
    domain: string, subDomain: boolean, path: string, secure: boolean, timestamp: number, name: string, value: string
]

export type LibCurlCookieAttrObject = {
    domain: string, subDomain: boolean, path: string, secure: boolean, timestamp: number, value: string
}

export type LibCurlCookiesAttr = Map<string, LibCurlCookieAttrObject>

export type LibCurlHeadersAttr = Map<string, string>

export type LibCurlInterfaceInfo = string;

export type LibCurlJA3FingerPrintInfo = string;

export enum LibCurlJA3TlsVersion {
    TLSv1_2 = 771,
    TLSv1_3 = 772,
}

export enum LibCurlJA3Cipher {
    'NULL-SHA' = 0x0002,
    'DES-CBC3-SHA' = 0x000A,
    'AES128-SHA' = 0x002F,
    'AES256-SHA' = 0x0035,
    'DHE-RSA-AES128-SHA' = 0x0033,
    'DHE-RSA-AES256-SHA' = 0x0039,
    'AES128-SHA256' = 0x003C,
    'AES256-SHA256' = 0x003D,
    'DHE-RSA-AES128-SHA256' = 0x0067,
    'DHE-RSA-AES256-SHA256' = 0x006B,
    'PSK-AES128-CBC-SHA' = 0x008C,
    'PSK-AES256-CBC-SHA' = 0x008D,
    'AES128-GCM-SHA256' = 0x009C,
    'AES256-GCM-SHA384' = 0x009D,
    'DHE-RSA-AES128-GCM-SHA256' = 0x009E,
    'DHE-RSA-AES256-GCM-SHA384' = 0x009F,

    'TLS_AES_128_GCM_SHA256' = 0x1301,
    'TLS_AES_256_GCM_SHA384' = 0x1302,
    'TLS_CHACHA20_POLY1305_SHA256' = 0x1303,
    'ECDHE-ECDSA-DES-CBC3-SHA' = 0xC008,
    'ECDHE-ECDSA-AES128-SHA' = 0xC009,
    'ECDHE-ECDSA-AES256-SHA' = 0xC00A,
    'ECDHE-RSA-DES-CBC3-SHA' = 0xC012,
    'ECDHE-RSA-AES128-SHA' = 0xC013,
    'ECDHE-RSA-AES256-SHA' = 0xC014,
    'TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256' = 0xC023,
    'TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA384' = 0xC024,
    'TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256' = 0xC027,
    'TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384' = 0xC028,
    'ECDHE-ECDSA-AES128-GCM-SHA256' = 0xC02B,
    'ECDHE-ECDSA-AES256-GCM-SHA384' = 0xC02C,
    'ECDHE-RSA-AES128-GCM-SHA256' = 0xC02F,
    'ECDHE-RSA-AES256-GCM-SHA384' = 0xC030,
    'ECDHE-PSK-AES128-CBC-SHA' = 0xC035,
    'ECDHE-PSK-AES256-CBC-SHA' = 0xC036,
    'ECDHE-RSA-CHACHA20-POLY1305' = 0xCCA8,
    'ECDHE-ECDSA-CHACHA20-POLY1305' = 0xCCA9,
    'ECDHE-PSK-CHACHA20-POLY1305' = 0xCCAC
}

export enum LibCurlJA3Extension {
    TLSEXT_TYPE_server_name = 0,
    TLSEXT_TYPE_status_request = 5,
    TLSEXT_TYPE_ec_point_formats = 11,
    TLSEXT_TYPE_signature_algorithms = 13,
    TLSEXT_TYPE_srtp = 14,
    TLSEXT_TYPE_application_layer_protocol_negotiation = 16,
    TLSEXT_TYPE_padding = 21,
    TLSEXT_TYPE_extended_master_secret = 23,
    TLSEXT_TYPE_quic_transport_parameters_legacy = 0xffa5,
    TLSEXT_TYPE_quic_transport_parameters = 57,
    TLSEXT_TYPE_cert_compression = 27,
    TLSEXT_TYPE_session_ticket = 35,
    TLSEXT_TYPE_supported_groups = 10,
    TLSEXT_TYPE_pre_shared_key = 41,
    TLSEXT_TYPE_early_data = 42,
    TLSEXT_TYPE_supported_versions = 43,
    TLSEXT_TYPE_cookie = 44,
    TLSEXT_TYPE_psk_key_exchange_modes = 45,
    TLSEXT_TYPE_certificate_authorities = 47,
    TLSEXT_TYPE_signature_algorithms_cert = 50,
    TLSEXT_TYPE_key_share = 51,
    TLSEXT_TYPE_renegotiate = 0xff01,
    TLSEXT_TYPE_delegated_credential = 0x22,
    TLSEXT_TYPE_application_settings = 17513,
    TLSEXT_TYPE_encrypted_client_hello = 0xfe0d,
    TLSEXT_TYPE_ech_outer_extensions = 0xfd00,
    TLSEXT_TYPE_certificate_timestamp = 18,
    TLSEXT_TYPE_next_proto_neg = 13172,
    TLSEXT_TYPE_channel_id = 30032,
    TLSEXT_TYPE_record_size_limit = 28,
    TLSEXT_TYPE_delegated_credentials = 34,
}

export enum LibCurlJA3SupportGroup {
    "P-256" = 23,
    "P-384" = 24,
    "P-521" = 25,
    X25519 = 29,
    ffdhe2048 = 256,
    ffdhe3072 = 257,
}

export enum LibCurlJA3EcPointFormat {
    uncompressed = 0,
    compressed_fixed = 1,
    compressed_variable = 2,
}

const LibCurlBoringSSLExtensionPermutation: LibCurlJA3Extension[] = [
    LibCurlJA3Extension.TLSEXT_TYPE_server_name,
    LibCurlJA3Extension.TLSEXT_TYPE_encrypted_client_hello,
    LibCurlJA3Extension.TLSEXT_TYPE_extended_master_secret,
    LibCurlJA3Extension.TLSEXT_TYPE_renegotiate,
    LibCurlJA3Extension.TLSEXT_TYPE_supported_groups,
    LibCurlJA3Extension.TLSEXT_TYPE_ec_point_formats,
    LibCurlJA3Extension.TLSEXT_TYPE_session_ticket,
    LibCurlJA3Extension.TLSEXT_TYPE_application_layer_protocol_negotiation,
    LibCurlJA3Extension.TLSEXT_TYPE_status_request,
    LibCurlJA3Extension.TLSEXT_TYPE_signature_algorithms,
    LibCurlJA3Extension.TLSEXT_TYPE_next_proto_neg,
    LibCurlJA3Extension.TLSEXT_TYPE_certificate_timestamp,
    LibCurlJA3Extension.TLSEXT_TYPE_channel_id,
    LibCurlJA3Extension.TLSEXT_TYPE_srtp,
    LibCurlJA3Extension.TLSEXT_TYPE_key_share,
    LibCurlJA3Extension.TLSEXT_TYPE_psk_key_exchange_modes,
    LibCurlJA3Extension.TLSEXT_TYPE_early_data,
    LibCurlJA3Extension.TLSEXT_TYPE_supported_versions,
    LibCurlJA3Extension.TLSEXT_TYPE_cookie,
    LibCurlJA3Extension.TLSEXT_TYPE_quic_transport_parameters,
    LibCurlJA3Extension.TLSEXT_TYPE_quic_transport_parameters_legacy,
    LibCurlJA3Extension.TLSEXT_TYPE_cert_compression,
    LibCurlJA3Extension.TLSEXT_TYPE_delegated_credential,
    LibCurlJA3Extension.TLSEXT_TYPE_application_settings,
    LibCurlJA3Extension.TLSEXT_TYPE_record_size_limit,//firefox兼容
    LibCurlJA3Extension.TLSEXT_TYPE_pre_shared_key,

]


interface LibCurlCommonHeaders {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36'
    | 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/110.0',
    'Content-Type': 'application/x-www-form-urlencoded' |
    'application/json' |
    'application/octet-stream' |
    'application/protobuf' |
    'text/plain',
    'Host': string,
    'Referer': string,
}

export type LibCurlHeadersInfo = string | { [key: string]: [value: string] } | LibCurlHeadersAttr | LibCurlCommonHeaders;

export type LibCurlBodyInfo = string | Uint8Array | URLSearchParams | object;

export type LibCurlMethodInfo = 'GET' | 'POST' | 'HEAD' | 'PUT' | 'DELETE' | 'CONNECT' | 'OPTIONS' | 'TRACE' | 'PATCH'

export type LibCurlProxyWithAccountInfo = {
    proxy: string;
    username: string;
    password: string;
};

export type LibCurlProxyInfo = string | LibCurlProxyWithAccountInfo;

export type LibCurlURLInfo = string | URL;

export class LibCurlError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class LibCurl {
    private m_libCurl_impl_: any;
    private m_isSending_: boolean;
    constructor() {
        this.m_libCurl_impl_ = new BaoLibCurl();
        /* this.setJA3Fingerprint(
            '771,4866-4865-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53,27-51-17513-35-45-16-13-0-10-23-18-43-11-5-65281-21-41,29-23-24,0'
        ) */
    }
    private checkSending(): void {
        if (this.m_isSending_) {
            throw new Error('the last request is sending, don\'t send one more request on one instance!')
        }
    }

    private checkError(): void {
        const code: number = this.m_libCurl_impl_.getLastCode();
        if (code == 0) {
            return;
        }
        const error: string = this.m_libCurl_impl_.getLastCodeError();
        throw new Error(error);
    }

    public open(method: LibCurlMethodInfo, url: LibCurlURLInfo): void {
        this.checkSending();
        this.m_libCurl_impl_.open(method, url + '');
    }

    public setRequestHeader(key: string, value: string): void {
        this.checkSending();
        this.m_libCurl_impl_.setRequestHeader(key, value);
    }

    /**
     * 
     * @param headers
     */
    public setRequestHeaders(headers: LibCurlHeadersInfo): void {
        this.checkSending();
        if (!headers) {
            return;
        }
        if (headers instanceof Map) {
            headers.forEach((value, key) => this.m_libCurl_impl_.setRequestHeader(key, value))
        } else if (typeof headers == 'string') {
            this.m_libCurl_impl_.setRequestHeaders(headers);
        } else if (typeof headers == 'object') {
            Object.keys(headers).forEach((key) => {
                const value = headers[key];
                this.m_libCurl_impl_.setRequestHeader(key, value);
            })
        } else {
            throw new TypeError('unkown type')
        }
    }

    /**
     * 
     * @param proxy host:port sample:127.0.0.1:8888
     * @param username 
     * @param password 
     */
    public setProxy(proxyOpt: LibCurlProxyInfo): void {
        this.checkSending();
        if (typeof proxyOpt == 'string') {
            this.m_libCurl_impl_.setProxy(proxyOpt);
        } else {
            this.m_libCurl_impl_.setProxy(proxyOpt.proxy, proxyOpt.username, proxyOpt.password);
        }
        this.checkError();
    }

    /**
     * 
     * @param connectTime 连接上远程服务器的最长等待时间
     * @param sendTime 发送最长等待时间
     * sendTime时长包含connectTime 所以sendTime要大于connectTime
     */
    public setTimeout(connectTime: number, sendTime: number): void {
        this.checkSending();
        if (connectTime > sendTime) {
            throw new Error('连接时间大于发送等待时间.');
        }
        this.m_libCurl_impl_.setTimeout(connectTime, sendTime);
    }

    /**
     * 
     * @param key 
     * @param value 
     * @param domain cookie作用域 sample: .baidu.com  baike.baidu.com
     */
    public setCookie(cookieOpt: LibCurlSetCookieOption): void {
        this.checkSending();
        this.m_libCurl_impl_.setCookie(cookieOpt.name, cookieOpt.value, cookieOpt.domain, cookieOpt.path);
    }

    /**
     * 
     * @param cookieOpt 
     * @param domain cookie作用域 sample: .baidu.com  baike.baidu.com
     */
    public deleteCookie(cookieOpt: LibCurlGetCookieOption): void {
        this.checkSending();
        this.m_libCurl_impl_.deleteCookie(cookieOpt.name, cookieOpt.domain, cookieOpt.path || "/");
    }

    /**
     * @param {LibCurlGetCookiesOption}cookieOpt
     * @returns 返回所有Cookies sample:'a=b;c=d;'
     */
    public getCookies(cookieOpt?: LibCurlGetCookiesOption): string {
        this.checkSending();
        const cookies_ = this.m_libCurl_impl_.getCookies();
        return httpCookiesToArray(cookies_).filter(cookieOptFilter(cookieOpt)).map(e => `${e[5]}=${encodeURIComponent(e[6])};`).join(' ');
    }

    /**
     * @param {LibCurlGetCookiesOption}cookieOpt
     * @returns 返回所有Cookie的Map 如果有相同的键 则后键覆盖前键
     */
    public getCookiesMap(cookieOpt?: LibCurlGetCookiesOption): LibCurlCookiesAttr {
        this.checkSending();
        const cookies_ = this.m_libCurl_impl_.getCookies();
        return httpCookiesToArray(cookies_).filter(cookieOptFilter(cookieOpt)).reduce((e: LibCurlCookiesAttr, t: LibCurlCookieAttrArray) => {
            e.set(t[5], {
                domain: t[0],
                subDomain: t[1],
                path: t[2],
                secure: t[3],
                timestamp: t[4],
                value: t[6],
            } as LibCurlCookieAttrObject)
            return e;
        }, new Map<string, LibCurlCookieAttrObject>());
    }

    /**
     * 
     * @param cookieOpt
     * @returns 返回该cookieOpt对应的cookieValue
     * sample: 
     */
    public getCookie(cookieOpt: LibCurlGetCookieOption): string {
        this.checkSending();
        return this.m_libCurl_impl_.getCookie(cookieOpt.name, cookieOpt.domain || ".", cookieOpt.path || "/");
    }

    /**
     * 
     * @returns 返回响应头
     */
    public getResponseHeaders(): string {
        this.checkSending();
        return this.m_libCurl_impl_.getResponseHeaders();
    }

    /**
     * @returns 返回响应头 Map
     */
    public getResponseHeadersMap(): LibCurlHeadersAttr {
        this.checkSending();
        const headers_ = this.m_libCurl_impl_.getResponseHeaders();
        return headers_.split('\r\n')
            .slice(1)//HTTP/1.1 200 OK
            .reduce((e: LibCurlHeadersAttr, t: string) => {
                if (!t) {
                    return e;
                }
                const [key, value] = t.split(': ');
                e.set(key, value);
                return e;
            }, new Map<string, string>());
    }

    /**
     * 
     * @returns 返回状态码
     * sample: 200 403 404
     */
    public getResponseStatus(): number {
        this.checkSending();
        return this.m_libCurl_impl_.getResponseStatus();
    }

    /**
     * 
     * @returns 返回正文长度
     */
    public getResponseContentLength(): number {
        this.checkSending();
        return this.m_libCurl_impl_.getResponseContentLength();
    }


    /**
     * 重置curl 包括之前的所有设定
     */
    public reset(): void {
        this.checkSending();
        this.m_libCurl_impl_.reset();
    }

    /**
     * 
     * @param isAllow 是否允许重定向
     */
    public setRedirect(isAllow: boolean): void {
        this.checkSending();
        this.m_libCurl_impl_.setRedirect(isAllow);
    }

    /**
     * 打印libcurl内部的 解析信息、连接信息、tls信息等等
     */
    public printInnerLogger(): void {
        this.checkSending();
        this.m_libCurl_impl_.printInnerLogger();
    }

    /**
     * 
     * @param version 
     * 设置http版本号
     */
    public setHttpVersion(version: LibCurlHttpVersionInfo): void {
        this.checkSending();
        this.m_libCurl_impl_.setHttpVersion(version);
    }

    /**
     * 指定网卡访问
     * @param network 
     */
    public setInterface(network: LibCurlInterfaceInfo): void {
        this.checkSending();
        this.m_libCurl_impl_.setInterface(network);
    }

    /**
     * 设置JA3指纹
     * @param ja3 
     */
    public setJA3Fingerprint(ja3: LibCurlJA3FingerPrintInfo): void {
        this.checkSending();
        const ja3Arr = ja3.replaceAll('\s', '').split(',');
        if (ja3Arr.length != 5) {
            throw new LibCurlError('ja3 fingerprint error')
        }
        const tlsVersion = ja3Arr.at(0);
        if (!LibCurlJA3TlsVersion[ja3Arr.at(0)]) {
            throw new LibCurlError('ja3 fingerprint tlsVersion no support')
        }
        let tls13_ciphers = [];
        const cipherArr = ja3Arr.at(1).split('-').map((key) => {
            const cipher = LibCurlJA3Cipher[key];
            if (!cipher) {
                throw new LibCurlError(`ja3 fingerprint cipher ${key} no support`)
            }
            if (cipher.startsWith('TLS_')) {
                const pos = ['4865', '4866', '4867', '49187', '49188', '49191', '49192'].indexOf(key);
                if (pos == -1) {
                    throw new LibCurlError(`ja3 fingerprint TLSv1.3 cipher ${key} no support`)
                }
                tls13_ciphers.push(pos + 1);
                return
            }
            return cipher;
        }).filter(Boolean);

        const extensions = ja3Arr.at(2).split('-').filter((extension) => {
            return extension != '21'
        }).map(e => parseInt(e));
        const extension_permutation = extensions.map((extension) => {
            const pos = LibCurlBoringSSLExtensionPermutation.indexOf(extension);
            if (pos == -1) {
                throw new LibCurlError(`ja3 fingerprint extension ${extension} no support`)
            }
            return pos + 1
        }
        );
        const supportGroups = ja3Arr.at(3).split('-').map((key) => {
            if (!LibCurlJA3SupportGroup[key]) {
                throw new LibCurlError(`ja3 fingerprint supportGroup ${key} no support`)
            }
            return LibCurlJA3SupportGroup[key];
        });

        /*  const ecPointFormat = LibCurlJA3EcPointFormat[ja3Arr.at(4)];
         if (!ecPointFormat) {
             throw new LibCurlError('ja3 fingerprint ecPointFormat no support')
         } */
        this.m_libCurl_impl_.setJA3Fingerprint(
            parseInt(tlsVersion),
            cipherArr.join(':'),
            String.fromCharCode(...tls13_ciphers, 0),
            String.fromCharCode(...extension_permutation, 0),
            supportGroups.join(':'),
            0,
        );
    }

    /**
     * 
     * @param body POST PUT PATCH时 发送的body
     * 当body不为string或uint8array时 此函数将用JSON.stringify转换对象
     */
    public send(body?: LibCurlBodyInfo): Promise<undefined> | undefined {
        this.checkSending();
        this.m_isSending_ = true;
        let promise;
        if (body) {
            let sendData;
            if (body instanceof URLSearchParams) {
                sendData = body + '';
            } else {
                sendData = body;
            }
            promise = this.m_libCurl_impl_.sendAsync(sendData)
        } else {
            promise = this.m_libCurl_impl_.sendAsync();
        }
        return promise.catch((error: string) => {
            throw new LibCurlError(error);
        }).finally(() => {
            this.m_isSending_ = false;
        })
    }

    public getResponseBody(): Uint8Array {
        this.checkSending();
        return this.m_libCurl_impl_.getResponseBody();
    }

    public getResponseString(): string {
        this.checkSending();
        return this.m_libCurl_impl_.getResponseString();
    }

    public getResponseJson(): Object {
        this.checkSending();
        return JSON.parse(this.getResponseString());
    }


}