import I1 from "../img/i1.png";
import F1 from '../img/f1.png';
import F2 from '../img/f2.png';
import F3 from '../img/f3.png';

export const heroData = [
    {
        id: 1,
        name: '밭빙수',
        decp: '디저트',
        price: '7,500',
        imageSrc: I1
    }, 
    {
        id: 2,
        name: '유부우동',
        decp: '일식',
        price: '22,000',
        imageSrc: F1
    }, 
    {
        id: 3,
        name: '양지쌀국수',
        decp: '국수',
        price: '베트남식',
        imageSrc: F2
    }, 
    {
        id: 4,
        name: '김치찌게',
        decp: '한식',
        price: '9,000',
        imageSrc: F3
    }
];

export const categories = [
    {
        id: 1,
        name: "한식",
        urlParamName: "korean"
    },
    {
        id: 2,
        name: "중식",
        urlParamName: "chinese"
    },
    {
        id: 3,
        name: "양식",
        urlParamName: "western"
    },
    {
        id: 4,
        name: "일식",
        urlParamName: "japanese"
    },
    {
        id: 5,
        name: "동남아식",
        urlParamName: "southeastasian"
    },
    {
        id: 6,
        name: "디저트",
        urlParamName: "dersert"
    },
]