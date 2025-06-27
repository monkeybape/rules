// 策略组通用配置
const groupBaseOption = {
  "interval": 300,
  "url": "http://www.gstatic.com/generate_204",
  "tolerance": 50
};

// 程序入口
function main(config) {
  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviderCount =
    typeof config?.["proxy-providers"] === "object" ? Object.keys(config["proxy-providers"]).length : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖通用配置
  config["mixed-port"] = "7890";
  config["tcp-concurrent"] = true;
  config["allow-lan"] = true;
  config["ipv6"] = false;
  config["log-level"] = "info";
  config["unified-delay"] = "true";
  config["find-process-mode"] = "strict";
  config["global-client-fingerprint"] = "chrome";
  config["external-controller"] = "127.0.0.1:9090";
  config["external-ui"] = "ui";
  config["external-ui-url"] = "https://github.com/MetaCubeX/metacubexd/archive/refs/heads/gh-pages.zip";

  // 覆盖 dns 配置
  config["dns"] = {
    "enable": true,
    "listen": "0.0.0.0:1053",
    "ipv6": false,
    "enhanced-mode": "fake-ip",
    "fake-ip-range": "198.18.0.1/16",
    "fake-ip-filter": [
      "*.lan", "*.local", "time.windows.com", "time.nist.gov", "time.apple.com", "time.asia.apple.com",
      "*.ntp.org.cn", "*.openwrt.pool.ntp.org", "time1.cloud.tencent.com", "time.ustc.edu.cn",
      "pool.ntp.org", "ntp.ubuntu.com", "ntp.aliyun.com", "ntp1.aliyun.com", "ntp2.aliyun.com",
      "ntp3.aliyun.com", "ntp4.aliyun.com", "ntp5.aliyun.com", "ntp6.aliyun.com", "ntp7.aliyun.com",
      "time1.aliyun.com", "time2.aliyun.com", "time3.aliyun.com", "time4.aliyun.com", "time5.aliyun.com",
      "time6.aliyun.com", "time7.aliyun.com", "*.time.edu.cn", "time1.apple.com", "time2.apple.com",
      "time3.apple.com", "time4.apple.com", "time5.apple.com", "time6.apple.com", "time7.apple.com",
      "time1.google.com", "time2.google.com", "time3.google.com", "time4.google.com", "music.163.com",
      "*.music.163.com", "*.126.net", "musicapi.taihe.com", "music.taihe.com", "songsearch.kugou.com",
      "trackercdn.kugou.com", "*.kuwo.cn", "api-jooxtt.sanook.com", "api.joox.com", "joox.com",
      "y.qq.com", "*.y.qq.com", "streamoc.music.tc.qq.com", "mobileoc.music.tc.qq.com",
      "isure.stream.qqmusic.qq.com", "dl.stream.qqmusic.qq.com", "aqqmusic.tc.qq.com",
      "amobile.music.tc.qq.com", "*.xiami.com", "*.music.migu.cn", "music.migu.cn",
      "*.msftconnecttest.com", "*.msftncsi.com", "localhost.ptlogin2.qq.com", "*.*.*.srv.nintendo.net",
      "*.*.stun.playstation.net", "xbox.*.*.microsoft.com", "*.*.xboxlive.com", "proxy.golang.org",
      "*.sgcc.com.cn", "*.alicdn.com", "*.aliyuncs.com", "*.ntp.org.cn", "*.pool.ntp.org", "ntp.*.com"
    ],
    "default-nameserver": ["223.5.5.5", "tls://1.12.12.12:853", "tls://223.5.5.5:853"],
    "nameserver": ["https://doh.pub/dns-query", "https://dns.alidns.com/dns-query"],
    "nameserver-policy": {
      "geosite:cn": ["223.5.5.5", "tls://1.12.12.12:853", "tls://223.5.5.5:853"],
      "geosite:gfw,geolocation-!cn": ["quic://223.5.5.5", "quic://223.6.6.6", "https://1.12.12.12/dns-query", "https://120.53.53.53/dns-query"]   
    }
  };

  // 覆盖 tun 配置
  config["tun"] = {
    "enable": true,
    "stack": "mixed",
    "dns-hijack": ["any:53"]
  };

  // 覆盖 sniffer 配置
  config["sniffer"] = {
    "enable": true,
    "parse-pure-ip": true,
    "sniff": {
      "TLS": {
        "ports": ["443", "8443"]
      },
      "HTTP": {
        "ports": ["80", "8080-8880"],
        "override-destination": true
      },
      "QUIC": {
        "ports": ["443", "8443"]
      }
    }
  };

  // 覆盖 geodata 配置
  config["geodata-mode"] = true;
  config["geox-url"] = {
    "geoip": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    "geosite": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    "mmdb": "https://mirror.ghproxy.com/https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
    "asn": "https://mirror.ghproxy.com/https://github.com/xishang0128/geoip/releases/download/latest/GeoLite2-ASN.mmdb"
  };


  // 覆盖策略组
  config["proxy-groups"] = [
    {
      ...groupBaseOption,
      "name": "🚀 节点选择",
      "type": "select",
      "proxies": ["♻️ 自动选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点", "🚀 手动切换", "DIRECT"],
      "icon": "https://github.com/shindgewongxj/WHATSINStash/raw/main/icon/%24tash.png"
    },
    {
      ...groupBaseOption,
      "name": "♻️ 自动选择",
      "type": "url-test",
      "include-all": true,
      "proxies": ["🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"],
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Auto_Speed.png",
      "filter": "^((?!套餐|到期|余额|剩余|流量|官网).)*$"
    },
    {
      ...groupBaseOption,
      "name": "🚀 手动切换",
      "type": "select",
      "include-all": true,
      "filter": "^((?!套餐|到期|余额|剩余|流量|官网).)*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Universal/Available.png"
    },
    {
      ...groupBaseOption,
      "name": "🇭🇰 香港节点",
      "type": "url-test",
      "include-all": true,
      "filter": "港|🇭🇰|香港|HK|Hong",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Hong_Kong.png"

    },
    {
      ...groupBaseOption,
      "name": "🇨🇳 台湾节点",
      "type": "url-test",
      "include-all": true,
      "filter": "台|🇨🇳|台湾|TW|Tai",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Taiwan.png"
    },
    {
      ...groupBaseOption,
      "name": "🇸🇬 狮城节点",
      "type": "url-test",
      "include-all": true,
      "filter": "坡|🇸🇬|新加坡|狮城|SG|Singapore",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Singapore.png"
    },
    {
      ...groupBaseOption,
      "name": "🇯🇵 日本节点",
      "type": "url-test",
      "include-all": true,
      "filter": "🇯🇵|日本|JP|Japan",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/Japan.png"
    },
    {
      ...groupBaseOption,
      "name": "🇺🇸 美国节点",
      "type": "url-test",
      "include-all": true,
      "filter": "美|🇺🇸|美国|US|States|American",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_States.png"
    },
    {
      ...groupBaseOption,
      "name": "🇬🇧 英国节点",
      "type": "url-test",
      "include-all": true,
      "filter": "🇬🇧|英国|英|英格兰|UK|United Kingdom",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_Kingdom.png"
    },
    {
      ...groupBaseOption,
      "name": "🌐 其他节点",
      "type": "url-test",
      "include-all": true,
      "filter": "^((?!套餐|到期|余额|剩余|流量|官网|🇭🇰|港|HK|Hong|🇹🇼|台|TW|Tai|🇯🇵|日|JP|Japan|🇸🇬|坡|狮城|SG|Singapore|🇰🇷|韩|KR|KOR|Korea|🇺🇸|美|US|States|American|🇬🇧|英国|英|英格兰|UK|United Kingdom).)*$",
      "icon": "https://raw.githubusercontent.com/Semporia/Hand-Painted-icon/master/Rounded_Rectangle/United_Nations.png"
    },
    {
      ...groupBaseOption,
      "name": "📢 谷歌FCM",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点", "DIRECT"]
    },
    {
      ...groupBaseOption,
      "name": "📹 油管视频",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "📼 巴哈姆特",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点", "DIRECT"]
    },
    {
      ...groupBaseOption,
      "name": "🎮 Steam",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "₿ Crypto",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点", "🚀 手动切换"]
    },
    {
      ...groupBaseOption,
      "name": "Ⓜ️ 微软服务",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点"]
    },
    {
      ...groupBaseOption,
      "name": "Ⓜ️ 微软Bing",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "Ⓜ️ 微软云盘",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "💬 OpenAi",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "🔍 Claude",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "🌈 Google",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点", "DIRECT"]
    },
    {
      ...groupBaseOption,
      "name": "🍎 苹果服务",
      "type": "select",
      "proxies": ["DIRECT", "🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "📲 电报消息",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "🐦 Twitter",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "🎥 奈飞视频",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "📺 哔哩哔哩",
      "type": "select",
      "proxies": ["🇨🇳 台湾节点", "🇭🇰 香港节点", "DIRECT"]
    },
    {
      ...groupBaseOption,
      "name": "🤡 Pixiv",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "🎮 游戏平台",
      "type": "select",
      "proxies": ["DIRECT", "🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "🧐 学术站点",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    },
    {
      ...groupBaseOption,
      "name": "👀 BT_tracker",
      "type": "select",
      "proxies": ["DIRECT", "🚀 节点选择"]
    },
    {
      ...groupBaseOption,
      "name": "👻 非礼勿视",
      "type": "select",
      "proxies": ["🚀 节点选择", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点"]
    },
    {
      ...groupBaseOption,
      "name": "🏁 出国流量",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT"]
    },
    {
      ...groupBaseOption,
      "name": "➿ 全球直连",
      "type": "select",
      "proxies": ["DIRECT", "🚀 节点选择"]
    },
    {
      ...groupBaseOption,
      "name": "⛔ 全球拦截",
      "type": "select",
      "proxies": ["REJECT", "DIRECT"]
    },
    {
      ...groupBaseOption,
      "name": "🐟 漏网之鱼",
      "type": "select",
      "proxies": ["🚀 节点选择", "DIRECT", "🇭🇰 香港节点", "🇨🇳 台湾节点", "🇸🇬 狮城节点", "🇯🇵 日本节点", "🇺🇸 美国节点", "🇬🇧 英国节点", "🌐 其他节点"]
    }
  ];

// 覆盖规则集
  config["rule-providers"] = {
    "NTP": {
      type: "http",
      path: "./providers/NTP.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ntp.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Crypto": {
      type: "http",
      path: "./providers/Crypto.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-cryptocurrency.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Private_domain": {
      type: "http",
      path: "./providers/Private_domain.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/private.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Private_ipcidr": {
      type: "http",
      path: "./providers/Private_ipcidr.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/private.mrs",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400
    },
    "Ad_blocking": {
      type: "http",
      path: "./providers/Ad_blocking.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-ads-all.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Google_CN": {
      type: "http",
      path: "./providers/Google_CN.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google@cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "GoogleFCM": {
      type: "http",
      path: "./providers/GoogleFCM.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/googlefcm.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "YouTube": {
      type: "http",
      path: "./providers/YouTube.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/youtube.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Google_domain": {
      type: "http",
      path: "./providers/Google_domain.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/google.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Google_ipcidr": {
      type: "http",
      path: "./providers/Google_ipcidr.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/google.mrs",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400
    },
    "Steam_CN": {
      type: "http",
      path: "./providers/Steam_CN.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/steam@cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Steam": {
      type: "http",
      path: "./providers/Steam.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/steam.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Microsoft_CN": {
      type: "http",
      path: "./providers/Microsoft_CN.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft@cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Microsoft": {
      type: "http",
      path: "./providers/Microsoft.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/microsoft.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Claude": {
      url: "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml",
      path: "./providers/claude.yaml",
      behavior: "classical",
      interval: 86400,
      format: "yaml",
      type: "http"
    },
    "Bing_CN": {
      type: "http",
      path: "./providers/Bing_CN.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/bing@cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Bing": {
      type: "http",
      path: "./providers/Bing.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/bing.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "OneDrive": {
      type: "http",
      path: "./providers/OneDrive.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/onedrive.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "OpenAi": {
      type: "http",
      path: "./providers/OpenAi.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/openai.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Github": {
      type: "http",
      path: "./providers/Github.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/github.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Apple_CN": {
      type: "http",
      path: "./providers/Apple_CN.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/apple@cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Apple": {
      type: "http",
      path: "./providers/Apple.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/apple.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Telegram_domain": {
      type: "http",
      path: "./providers/Telegram_domain.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/telegram.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Telegram_ipcidr": {
      type: "http",
      path: "./providers/Telegram_ipcidr.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/telegram.mrs",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400
    },
    "Twitter_domain": {
      type: "http",
      path: "./providers/Twitter_domain.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/twitter.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Twitter_ipcidr": {
      type: "http",
      path: "./providers/Twitter_ipcidr.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/twitter.mrs",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400
    },
    "Netflix_domain": {
      type: "http",
      path: "./providers/Netflix_domain.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/netflix.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Netflix_ipcidr": {
      type: "http",
      path: "./providers/Netflix_ipcidr.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/netflix.mrs",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400
    },
    "Bahamut": {
      type: "http",
      path: "./providers/Bahamut.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/bahamut.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Bilibili_Intl": {
      type: "http",
      path: "./providers/Bilibili_Intl.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/biliintl.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Pixiv": {
      type: "http",
      path: "./providers/Pixiv.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/pixiv.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Game_Direct": {
      type: "http",
      path: "./providers/Game_Direct.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-games@cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Epic": {
      type: "http",
      path: "./providers/Epic.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/epicgames.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Origin": {
      type: "http",
      path: "./providers/Origin.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/origin.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Sony": {
      type: "http",
      path: "./providers/Sony.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/sony.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Nintendo_CN": {
      type: "http",
      path: "./providers/Nintendo_CN.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/nintendo@cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Nintendo": {
      type: "http",
      path: "./providers/Nintendo.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/nintendo.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Scholar": {
      type: "http",
      path: "./providers/Scholar.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-scholar-!cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "BT_tracker": {
      type: "http",
      path: "./providers/BT_tracker.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/tracker.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "GFW_list": {
      type: "http",
      path: "./providers/GFW_list.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/gfw.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "Geolocation-!cn": {
      type: "http",
      path: "./providers/Geolocation-!cn.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/geolocation-!cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "China_Domain": {
      type: "http",
      path: "./providers/China_Domain.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/cn.mrs",
      behavior: "domain",
      format: "mrs",
      interval: 86400
    },
    "China_ipcidr": {
      type: "http",
      path: "./providers/China_ipcidr.mrs",
      url: "https://testingcf.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geoip/cn.mrs",
      behavior: "ipcidr",
      format: "mrs",
      interval: 86400
    }
  };
  
  // 覆盖规则
  config["rules"] = [
//    "SRC-IP-CIDR,198.18.0.0/16,REJECT",
//    "AND,(AND,(DST-PORT,443),(NETWORK,UDP)),(GEOSITE,Geolocation-!cn),REJECT",
    "RULE-SET,Private_domain,➿ 全球直连",
    "RULE-SET,Private_ipcidr,➿ 全球直连,no-resolve",
    "RULE-SET,NTP,➿ 全球直连",
    "RULE-SET,Ad_blocking,⛔ 全球拦截",
    "RULE-SET,Google_CN,➿ 全球直连",
    "RULE-SET,GoogleFCM,📢 谷歌FCM",
    "RULE-SET,YouTube,📹 油管视频",
    "RULE-SET,Google_domain,🌈 Google",
    "RULE-SET,Google_ipcidr,🌈 Google",
    "RULE-SET,Steam_CN,➿ 全球直连",
    "RULE-SET,Steam,🎮 Steam",
    "RULE-SET,Microsoft_CN,➿ 全球直连",
    "RULE-SET,Microsoft,Ⓜ️ 微软服务",
    "RULE-SET,Bing_CN,➿ 全球直连",
    "RULE-SET,Bing,Ⓜ️ 微软Bing",
    "RULE-SET,OneDrive,Ⓜ️ 微软云盘",
    "RULE-SET,OpenAi,💬 OpenAi",
    "RULE-SET,Claude,🔍 Claude",
    "RULE-SET,Github,🏁 出国流量",
    "RULE-SET,Crypto,₿ Crypto",
    "RULE-SET,Apple_CN,➿ 全球直连",
    "RULE-SET,Apple,🍎 苹果服务",
    "RULE-SET,Telegram_domain,📲 电报消息",
    "RULE-SET,Telegram_ipcidr,📲 电报消息",
    "RULE-SET,Twitter_domain,🐦 Twitter",
    "RULE-SET,Twitter_ipcidr,🐦 Twitter",
    "RULE-SET,Netflix_domain,🎥 奈飞视频",
    "RULE-SET,Netflix_ipcidr,🎥 奈飞视频",
    "RULE-SET,Bahamut,📼 巴哈姆特",
    "RULE-SET,Bilibili_Intl,📺 哔哩哔哩",
    "RULE-SET,Pixiv,🤡 Pixiv",
    "RULE-SET,Game_Direct,➿ 全球直连",
    "RULE-SET,Epic,🎮 游戏平台",
    "RULE-SET,Origin,🎮 游戏平台",
    "RULE-SET,Sony,🎮 游戏平台",
    "RULE-SET,Nintendo_CN,➿ 全球直连",
    "RULE-SET,Nintendo,🎮 游戏平台",
    "RULE-SET,Scholar,🧐 学术站点",
    "RULE-SET,BT_tracker,👀 BT_tracker",
    "RULE-SET,GFW_list,👻 非礼勿视",
    "RULE-SET,Geolocation-!cn,🏁 出国流量",
    "RULE-SET,China_Domain,➿ 全球直连",
    "RULE-SET,China_ipcidr,➿ 全球直连",
    "DOMAIN-KEYWORD,tracker,➿ 全球直连",
    "DST-PORT,20902,➿ 全球直连",
    "IP-CIDR,38.101.215.15/32,♻️ 自动选择",
    "MATCH,🐟 漏网之鱼"
  ];

  // 返回修改后的配置
  return config;
}
