import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
    state: () => ({
        products: [
            {
                id: '1',
                name: '有机红富士苹果',
                price: 29.9,
                originalPrice: 39.9,
                unit: '箱 / 5kg',
                image: '/images/fuji_apples.png',
                description: '来自高原的有机红富士苹果，皮薄爽脆，甘甜多汁。坚持不打蜡、不催熟，自然老树结果。',
                sales: 1250,
                tags: ['有机认证', '产地直发']
            },
            {
                id: '2',
                name: '新鲜现摘水蜜桃',
                price: 45.0,
                originalPrice: 58.0,
                unit: '箱 / 3kg',
                image: '/images/fresh_peaches.png',
                description: '清晨带露水采摘，果肉细腻无渣，入口即化，汁水丰盈。每一口都是夏天的味道。',
                sales: 840,
                tags: ['顺丰冷链', '甜度15+']
            },
            {
                id: '3',
                name: '农家散养土鸡蛋',
                price: 68.0,
                originalPrice: 88.0,
                unit: '盒 / 30枚',
                image: '/images/organic_eggs.png',
                description: '林下生态散养，食五谷杂粮与百草青虫，蛋黄橙红饱满，营养价值高，最适合孕妇与儿童。',
                sales: 2100,
                tags: ['无抗生素', '新鲜直达']
            },
            {
                id: '4',
                name: '特级沁州黄小米',
                price: 35.5,
                unit: '袋 / 2.5kg',
                image: '/images/premium_millet.png',
                description: '国家地理标志产品，米粒金黄圆润，熬粥黄明黏稠，表面一层厚厚的米油，养胃佳品。',
                sales: 560,
                tags: ['当季新米', '养胃轻食']
            },
            {
                id: '5',
                name: '现摘冰糖橙',
                price: 39.9,
                originalPrice: 49.9,
                unit: '箱 / 4kg',
                image: '/images/sweet_oranges.png',
                description: '果皮轻薄，果肉细腻多汁，入口化渣。纯天然果园直供，清甜如冰糖。',
                sales: 1840,
                tags: ['果园直发', '纯甜多汁']
            },
            {
                id: '6',
                name: '特级阳光玫瑰葡萄',
                price: 88.0,
                originalPrice: 108.0,
                unit: '盒 / 1.5kg',
                image: '/images/muscat_grapes.png',
                description: '果粒饱满如玉，带有浓郁玫瑰甜香，皮薄无籽，脆爽可口，是送礼自用的佳品。',
                sales: 320,
                tags: ['精选特级', '冷链配送']
            },
            {
                id: '7',
                name: '有机贝贝南瓜',
                price: 25.0,
                originalPrice: 35.0,
                unit: '箱 / 3kg',
                image: '/images/beibei_pumpkin.png',
                description: '粉糯香甜，带有淡淡栗子香气，营养丰富，是儿童辅食与轻食代餐的首选。',
                sales: 2450,
                tags: ['有机种植', '粉糯香甜']
            },
            {
                id: '8',
                name: '农家散养土鸡',
                price: 128.0,
                originalPrice: 158.0,
                unit: '只 / 约1.2kg',
                image: '/images/free_range_chicken.png',
                description: '山林散养300天以上，肉质紧实富有弹性，炖汤金黄清香，营养滋补。',
                sales: 680,
                tags: ['深山散养', '现杀现发']
            },
            {
                id: '9',
                name: '生态优选黑猪肉',
                price: 58.0,
                originalPrice: 68.0,
                unit: '份 / 500g',
                image: '/images/black_pork.png',
                description: '纯粮慢养的生态黑猪，肥瘦相间，大理石纹理清晰，肉香浓郁，久煮不柴。',
                sales: 920,
                tags: ['生态慢养', '醇香不腻']
            },
            {
                id: '10',
                name: '东北五常有机大米',
                price: 99.0,
                originalPrice: 129.0,
                unit: '袋 / 5kg',
                image: '/images/organic_rice.png',
                description: '核心产区直供，晶莹剔透，饭粒油亮，入口绵软略甜，醇厚米香回味悠长。',
                sales: 4100,
                tags: ['核心产区', '当季新米']
            }
        ]
    }),
    getters: {
        getProductById: (state) => (id) => {
            return state.products.find(p => p.id === id)
        }
    }
})
