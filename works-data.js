/* 作品数据唯一来源：cover 为固定封面文件，images 为作品图集的响应式图片源。 */
window.PORTFOLIO_CATEGORIES = [
    { id: 'photography', label: '摄影' },
    { id: 'polaroid', label: '宝丽来' },
    { id: 'film', label: '胶片' },
    { id: 'stills', label: '剧照' },
    { id: 'colorgrading', label: '调色' }
];

window.PORTFOLIO_WORKS = [
    {
        id: 'popular-stills',
        title: '热门作品',
        category: 'stills',
        categoryLabel: '剧照',
        date: '',
        location: '',
        description: '电影感剧照作品合集。',
        cover: 'assets/images/covers/stills/popular-stills.jpg',
        coverAlt: '电影剧照中的人物与环境画面',
        images: ['剧照/热门作品/_DSC3851.jpg', '剧照/热门作品/000006.jpg', '剧照/热门作品/_DSC0335.jpg', '剧照/热门作品/_DSC1761.jpg', '剧照/热门作品/_DSC1782.jpg', '剧照/热门作品/_DSC3115.jpg', '剧照/热门作品/_DSC3734.jpg', '剧照/热门作品/_DSC3748.jpg', '剧照/热门作品/_DSC3797.jpg'],
        selected: true
    },
    {
        id: 'toward-the-sunrise',
        title: '去太阳升起的方向看看',
        category: 'photography',
        categoryLabel: '摄影 / 风光',
        date: '',
        location: '',
        description: '一路向东，没有目的地，将路过的风景用镜头记录下。',
        cover: 'assets/images/covers/photography/toward-the-sunrise.jpg',
        coverAlt: '日出方向的公路与远方风光',
        images: ['摄影/风光/去太阳升起的方向看看/P1034564 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/P1056354 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/P1056410 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/P1056420 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/P1056429 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/P1056458 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/P1056500 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1000338 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1000368 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1000402 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1000748 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1022824 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1034557 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1034605 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1045732 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056272 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056290 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056447 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056506 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056554 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056581 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056597 拷贝.jpg', '摄影/风光/去太阳升起的方向看看/_1056969 拷贝.jpg'],
        selected: true
    },
    {
        id: 'sparkler', title: '仙女棒', category: 'photography', categoryLabel: '摄影 / 人像', date: '', location: '', description: '夜色中以仙女棒点亮的人像摄影。', cover: 'assets/images/covers/photography/sparkler.jpg', coverAlt: '夜晚手持仙女棒的人像摄影', images: ['摄影/人像/仙女棒/微信图片_2026-02-26_142209_635.jpg', '摄影/人像/仙女棒/微信图片_2026-02-26_142214_323.jpg', '摄影/人像/仙女棒/微信图片_2026-02-26_142217_849.jpg', '摄影/人像/仙女棒/微信图片_2026-02-26_142221_393.jpg', '摄影/人像/仙女棒/微信图片_2026-02-26_142226_149.jpg', '摄影/人像/仙女棒/微信图片_2026-02-26_142229_998.jpg', '摄影/人像/仙女棒/微信图片_2026-02-26_142232_594.jpg', '摄影/人像/仙女棒/微信图片_2026-02-26_142236_456.jpg'], selected: true
    },
    {
        id: 'new-chinese-style', title: '新中式', category: 'photography', categoryLabel: '摄影 / 人像', date: '', location: '', description: '新中式造型的人像摄影。', cover: 'assets/images/covers/photography/new-chinese-style.jpg', coverAlt: '新中式服装造型的人像摄影', images: ['摄影/人像/新中式/_DSA8668.jpg', '摄影/人像/新中式/_DSA8742.jpg', '摄影/人像/新中式/_DSA8904.jpg'], selected: true
    },
    {
        id: 'new-year', title: '新年', category: 'photography', categoryLabel: '摄影 / 人像', date: '', location: '', description: '新年氛围人像摄影。', cover: 'assets/images/covers/photography/new-year.jpg', coverAlt: '新年氛围中的人物肖像', images: ['摄影/人像/新年/微信图片_2026-02-26_142311_535.jpg', '摄影/人像/新年/微信图片_2026-02-26_142315_156.jpg', '摄影/人像/新年/微信图片_2026-02-26_142318_129.jpg', '摄影/人像/新年/微信图片_2026-02-26_142321_019.jpg', '摄影/人像/新年/微信图片_2026-02-26_142324_670.jpg', '摄影/人像/新年/微信图片_2026-02-26_142331_303.jpg']
    },
    {
        id: 'comic-con', title: '漫展', category: 'photography', categoryLabel: '摄影 / 人像', date: '', location: '', description: '漫展现场人物肖像。', cover: 'assets/images/covers/photography/comic-con.jpg', coverAlt: '漫展活动中的角色人物肖像', images: ['摄影/人像/漫展/_DSA7017.jpg', '摄影/人像/漫展/_DSA7036.jpg']
    },
    {
        id: 'rain', title: '雨', category: 'photography', categoryLabel: '摄影 / 人像', date: '', location: '', description: '雨天环境中的人物肖像。', cover: 'assets/images/covers/photography/rain.jpg', coverAlt: '雨天场景中的人物肖像摄影', images: ['摄影/人像/雨/DSC05134_副本.jpg', '摄影/人像/雨/DSC05174_副本.jpg', '摄影/人像/雨/DSC05182_副本.jpg', '摄影/人像/雨/DSC05218_副本.jpg', '摄影/人像/雨/DSC05234_副本.jpg']
    },
    {
        id: 'panda', title: '熊猫', category: 'photography', categoryLabel: '摄影 / 动物', date: '', location: '', description: '熊猫自然状态摄影。', cover: 'assets/images/covers/photography/panda.jpg', coverAlt: '自然环境中的熊猫摄影', images: ['摄影/动物/熊猫/_DSA2165.jpg', '摄影/动物/熊猫/_DSA2349.jpg', '摄影/动物/熊猫/_DSA2399.jpg', '摄影/动物/熊猫/_DSA2424.jpg', '摄影/动物/熊猫/_DSA2455.jpg', '摄影/动物/熊猫/_DSA2537.jpg', '摄影/动物/熊猫/_DSA2538.jpg', '摄影/动物/熊猫/_DSA2547.jpg', '摄影/动物/熊猫/_DSA2554.jpg', '摄影/动物/熊猫/_DSA3029.jpg', '摄影/动物/熊猫/_DSA3175.jpg', '摄影/动物/熊猫/_DSA3274.jpg', '摄影/动物/熊猫/_DSA3296.jpg', '摄影/动物/熊猫/_DSA3526.jpg', '摄影/动物/熊猫/_DSA3562.jpg'], selected: true
    },
    {
        id: 'macro', title: '微距', category: 'photography', categoryLabel: '摄影 / 微距', date: '', location: '', description: '微观细节摄影。', cover: 'assets/images/covers/photography/macro.jpg', coverAlt: '微距镜头下的自然细节', images: ['摄影/微距/0 (11).jpg', '摄影/微距/0 (181).jpg', '摄影/微距/0 (3).jpg', '摄影/微距/0 (4).jpg', '摄影/微距/0 (8).jpg']
    },
    {
        id: 'street', title: '扫街', category: 'photography', categoryLabel: '摄影 / 扫街', date: '', location: '', description: '城市街头瞬间记录。', cover: 'assets/images/covers/photography/street.jpg', coverAlt: '城市街头光影瞬间', images: ['摄影/扫街/0 (41).jpg', '摄影/扫街/0 (43).jpg', '摄影/扫街/0 (77).jpg', '摄影/扫街/0 (78).jpg']
    },
    {
        id: 'hometown', title: '长大的地方', category: 'photography', categoryLabel: '摄影 / 扫街', date: '', location: '', description: '关于成长地点的街头记录。', cover: 'assets/images/covers/photography/hometown.jpg', coverAlt: '成长地点的街头生活画面', images: ['摄影/扫街/长大的地方/0 (84).jpg', '摄影/扫街/长大的地方/0 (87).jpg', '摄影/扫街/长大的地方/0 (89).jpg']
    },
    {
        id: 'landscape', title: '风光', category: 'photography', categoryLabel: '摄影 / 风光', date: '', location: '', description: '自然风光摄影合集。', cover: 'assets/images/covers/photography/landscape.jpg', coverAlt: '自然风光与山野景色', images: ['摄影/风光/0 (105).jpg', '摄影/风光/0 (106).jpg', '摄影/风光/0 (207).jpg', '摄影/风光/2.jpg', '摄影/风光/3.jpg', '摄影/风光/3333.jpg', '摄影/风光/可_DSCF5905 - 副本.jpg']
    },
    {
        id: 'portrait-other', title: '其他', category: 'photography', categoryLabel: '摄影 / 人像', date: '', location: '', description: '人像摄影作品合集。', cover: 'assets/images/covers/photography/portrait-other.jpg', coverAlt: '人像摄影中的人物肖像画面', images: ['摄影/人像/其他/微信图片_2026-02-26_142114_305.jpg', '摄影/人像/其他/微信图片_2026-02-26_142122_629.jpg', '摄影/人像/其他/微信图片_2026-02-26_142127_864.jpg', '摄影/人像/其他/微信图片_2026-02-26_142137_318.jpg', '摄影/人像/其他/微信图片_2026-02-26_142143_348.jpg']
    },
    {
        id: 'hydrangea', title: '绣球花', category: 'photography', categoryLabel: '摄影 / 人像', date: '', location: '', description: '绣球花主题人像摄影。', cover: 'assets/images/covers/photography/hydrangea.jpg', coverAlt: '绣球花场景中的人像摄影', images: ['摄影/人像/绣球花/微信图片_20260806234214_7048_2446.jpg', '摄影/人像/绣球花/微信图片_20260806234220_7049_2446.jpg', '摄影/人像/绣球花/微信图片_20260806234248_7054_2446.jpg']
    },
    {
        id: 'polaroid-rebirth-green', title: '重生绿', category: 'polaroid', categoryLabel: '宝丽来', date: '', location: '', description: '宝丽来摄影作品合集。', cover: 'assets/images/covers/polaroid/polaroid-rebirth-green.jpg', coverAlt: '宝丽来摄影中的绿色主题画面', images: ['摄影/宝丽来/重生绿/5789ab46aa7891309bedffe8a98b8048.JPG', '摄影/宝丽来/重生绿/6c8cf6099f648c5067137a4370dad2cd.JPG', '摄影/宝丽来/重生绿/IMG_3870.HEIC', '摄影/宝丽来/重生绿/IMG_3871.HEIC', '摄影/宝丽来/重生绿/IMG_3872.HEIC', '摄影/宝丽来/重生绿/IMG_3873.HEIC', '摄影/宝丽来/重生绿/IMG_3874.HEIC', '摄影/宝丽来/重生绿/IMG_3876.HEIC', '摄影/宝丽来/重生绿/cbfbc2561c99e0793e5522a6f0fdfbf1.JPG', '摄影/宝丽来/重生绿/d56f1c973dafc435932b22fb08a42f37.JPG']
    },
    {
        id: 'film', title: '胶片', category: 'film', categoryLabel: '胶片', date: '', location: '', description: '胶片摄影作品合集。', cover: 'assets/images/covers/film/film.jpg', coverAlt: '胶片摄影中的人物与生活画面', images: ['摄影/胶片/000040.jpg', '摄影/胶片/000045.jpg', '摄影/胶片/000048.jpg', '摄影/胶片/000054.jpg', '摄影/胶片/000066.jpg', '摄影/胶片/000140170018 拷贝.jpg', '摄影/胶片/微信图片_20260806234214_7048_2446.jpg', '摄影/胶片/微信图片_20260806234220_7049_2446.jpg', '摄影/胶片/微信图片_20260806234248_7054_2446.jpg']
    },
    {
        id: 'stills-hehe', title: '呵呵', category: 'stills', categoryLabel: '剧照', date: '', location: '', description: '剧照作品合集。', cover: 'assets/images/covers/stills/stills-hehe.jpg', coverAlt: '剧照中的人物与场景画面', images: ['剧照/呵呵/0a92adaeei91adadb8ed35ccc2ec1660.JPG', '剧照/呵呵/9103aaa34n0756ac68ed427db76bca38.JPG', '剧照/呵呵/微信图片_2026-02-26_142934_477.jpg', '剧照/呵呵/微信图片_2026-02-26_142937_376.jpg', '剧照/呵呵/微信图片_2026-02-26_142940_549.jpg', '剧照/呵呵/微信图片_2026-02-26_142946_988.jpg']
    },
    {
        id: 'chuntianping', title: '春天坪', category: 'stills', categoryLabel: '剧照', date: '', location: '', description: '剧照作品合集。', cover: 'assets/images/covers/stills/chuntianping.jpg', coverAlt: '春天坪剧照中的人物与环境画面', images: ['剧照/春天坪/_JX_0657.JPG', '剧照/春天坪/_JX_0980.JPG', '剧照/春天坪/_JX_0991.JPG', '剧照/春天坪/_JX_1205.JPG', '剧照/春天坪/_JX_1477.JPG', '剧照/春天坪/_JX_1503 拷贝.jpg', '剧照/春天坪/_JX_1511.JPG', '剧照/春天坪/_JX_1548.JPG', '剧照/春天坪/_JX_1629.JPG']
    },
    {
        id: 'untitled-story', title: '未署名的故事', category: 'stills', categoryLabel: '剧照', date: '', location: '', description: '剧照作品合集。', cover: 'assets/images/covers/stills/untitled-story.jpg', coverAlt: '未署名的故事剧照中的人物与场景画面', images: ['剧照/未署名的故事/_JIN5630.jpg', '剧照/未署名的故事/_JIN5658.jpg', '剧照/未署名的故事/_JIN5721.jpg', '剧照/未署名的故事/_JIN5769.jpg', '剧照/未署名的故事/_JIN5774.jpg', '剧照/未署名的故事/_JIN5903.jpg', '剧照/未署名的故事/_JIN5915.jpg', '剧照/未署名的故事/_JIN5923.jpg', '剧照/未署名的故事/_M9A5942.jpg', '剧照/未署名的故事/_M9A5947.jpg', '剧照/未署名的故事/_M9A5963 拷贝.jpg']
    },
    {
        id: 'color-grading', title: '调色作品集', category: 'colorgrading', categoryLabel: '调色', type: 'video', date: '', location: '', description: '调色作品合集，包含多部影片的色彩处理与画面调色案例。', cover: 'assets/images/covers/color-grading/color-grading.avif', coverAlt: '调色作品集的影视画面封面', images: [], video: 'https://www.bilibili.com/video/BV1nbuw6eEb7/?share_source=copy_web&vd_source=52bc552ae289d1e2616ee45cd26fb305', selected: true
    }
];
