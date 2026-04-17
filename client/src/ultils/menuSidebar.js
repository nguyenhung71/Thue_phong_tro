import icons from './icons'

const { ImPencil2, MdOutlineLibraryBooks, BiUserPin } = icons

const menuSidebar = [
    {
        id: 1,
        text: '\u0110\u0103ng tin cho thu\u00ea',
        path: '/he-thong/tao-moi-bai-dang',
        icon: <ImPencil2 />
    },
    {
        id: 2,
        text: 'Qu\u1ea3n l\u00fd b\u00e0i \u0111\u0103ng',
        path: '/he-thong/quan-ly-bai-dang',
        icon: <MdOutlineLibraryBooks />
    },
    {
        id: 4,
        text: 'S\u1eeda th\u00f4ng tin c\u00e1 nh\u00e2n',
        path: '/he-thong/sua-thong-tin-ca-nhan',
        icon: <BiUserPin />
    },
    {
        id: 5,
        text: 'Li\u00ean h\u1ec7',
        path: '/he-thong/lien-he',
        icon: <BiUserPin />
    }
]

export default menuSidebar
