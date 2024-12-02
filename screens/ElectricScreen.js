import React, { useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from './CartContext';
import { useNavigation, useRoute } from '@react-navigation/native';



const ElectricScreen = () => {

  
  const [showFilterModal, setShowFilterModal] = useState(false);
const [priceFilter, setPriceFilter] = useState(null); // Bộ lọc giá: highest, lowest, midrange
const clearFilters = () => {
  setPriceFilter(null); // Xóa bộ lọc giá
  setShowFilterModal(false);
};



  
  const navigation = useNavigation();
const route = useRoute();
  const [selectedFooter, setSelectedFooter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Smartphone');
  const [selectedOption, setSelectedOption] = useState('best_sales');
  const [showAll, setShowAll] = useState(false);

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
   const { cart, setCart, removedItems, setRemovedItems } = useCart();
   



  useEffect(() => {
    if (route.params?.cart) {
      setCart(route.params.cart);
    }
    if (route.params?.removedItems) {
      setRemovedItems(route.params.removedItems);
    }
     if (route.params?.selectedCategory) {
    setSelectedCategory(route.params.selectedCategory); // Cập nhật danh mục được chọn
  }
  }, [route.params]);


const getDisplayedCategories = () => {
  return showAllCategories ? categories : categories.slice(0, 3); };

  

  const banners = [
  require('../DataElec/banneriphone.jpg'),
  require('../DataElec/banneripad.webp'),
  require('../Data/banner.png'),
  require('../DataElec/bannermac.jpg'),
];


  const [activeIndex, setActiveIndex] = useState(0);

const flatListRef = React.useRef(null); // Tạo tham chiếu tới FlatList

// Hàm xử lý nút bấm để chuyển banner
const handleNextBanner = () => {
  setActiveIndex((prevIndex) => {
    const nextIndex = (prevIndex + 1) % banners.length;
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true }); // Chuyển FlatList đến banner tiếp theo
    return nextIndex;
  });
};





  const categories = [
  {id: 'smartphone', name: 'Smartphone', image: require('../Data/smart.png'), bgColor: '#E6E6FA', borderColor: '#B0C4DE' },
  {id: 'tablet' ,name: 'Tablet', image: require('../Data/ipad.png'), bgColor: '#B0E0E6', borderColor: '#4682B4' },
  {id:'laptop' ,name: 'Laptop', image: require('../Data/macbook.png'), bgColor: '#FFE4B5', borderColor: '#FFD700' },
  {id:'headphone' ,name: 'Headphone', image: require('../DataElec/headphone.png'), bgColor: '#9999FF', borderColor: '#6699CC' }
  ,

];

  const sortingOptions = [
    { id: 'best_sales', label: 'Best Sales' },
    { id: 'best_matched', label: 'Best Matched' },
    { id: 'popular', label: 'Popular' },
  ];


  const products = [
 {
  id: '1',
  name: 'Iphone11 64GB',
  category: 'Smartphone',
  price: 899,
  image: require('../DataSmart/ip11.png'),
  color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
  describe: 'Iphone 11 với màn hình Retina 6.1 inch, camera kép 12MP, và chip A13 Bionic cho hiệu năng mạnh mẽ, phù hợp cho cả giải trí và công việc.'
},

  {
    id: '2',
    name: 'Iphone11 Plus',
    category: 'Smartphone',
    price: 799,
    image: require('../DataSmart/ip11plus.png'),
    color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
    describe: 'Iphone 11 Plus sở hữu thiết kế hiện đại, khả năng chống nước IP68 và camera kép, lý tưởng cho các tín đồ công nghệ.'
  },
  {
    id: '3',
    name: 'Iphone11 Prm',
    category: 'Smartphone',
    price: 599,
    image: require('../DataSmart/ip11prx.png'),
    color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
    describe: 'Iphone 11 Pro Max mang lại hiệu năng vượt trội với chip A13, màn hình Super Retina XDR và thời lượng pin ấn tượng.'
  },
  {
    id: '4',
    name: 'Iphone14 Plus',
    category: 'Smartphone',
    price: 627,
    image: require('../DataSmart/14-plus.png'),
    color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
    describe: 'Iphone 14 Plus với màn hình lớn, hiệu năng cải tiến và hệ thống camera chất lượng cao, đáp ứng mọi nhu cầu sử dụng hiện đại.'
  },
  {
    id: '11',
    name: 'Ipad Air 5',
    category: 'Tablet',
    price: 1500,
    image: require('../DataSmart/Ipadair5.png'),
    color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad Air 5 mang đến hiệu năng mạnh mẽ với chip M1, màn hình Liquid Retina 10.9 inch và thiết kế siêu nhẹ, lý tưởng cho học tập và làm việc.'
  },
  {
    id: '12',
    name: 'Ipad10 64Gb',
    category: 'Tablet',
    price: 1420,
    image: require('../DataSmart/ipad10.png'),
     color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad Gen 10 sở hữu màn hình Retina 10.2 inch, chip A13 Bionic, và hỗ trợ Apple Pencil thế hệ đầu tiên, phù hợp cho sáng tạo và giải trí.'
  },
  {
    id: '13',
    name: 'IpadPro 1TB',
    category: 'Tablet',
    price: 1700,
    image: require('../DataSmart/ipadpro1tb.png'),
     color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad Pro 1TB với màn hình Liquid Retina XDR 12.9 inch, chip M1 và bộ nhớ lớn, là công cụ tối ưu cho công việc chuyên nghiệp.'
  },
  {
    id: '14',
    name: 'IpadPro M4',
    category: 'Tablet',
    price: 1299,
    image: require('../DataSmart/ipad-pro-m4.png'),
     color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad Pro M4 cung cấp hiệu năng vượt trội với chip M1, màn hình ProMotion 120Hz, và khả năng hỗ trợ đa nhiệm mạnh mẽ.'
  },
  {
    id: '15',
    name: 'Ipad Air 6',
    category: 'Tablet',
    price: 1100,
    image: require('../DataSmart/ipad-air-6.png'),
     color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad Air 6 là sự kết hợp hoàn hảo giữa hiệu năng mạnh mẽ và thiết kế tinh tế, phù hợp cho mọi nhu cầu sử dụng hàng ngày.'
  },
  {
    id: '16',
    name: 'Ipad Mini6',
    category: 'Tablet',
    price: 1300,
    image: require('../DataSmart/ipadmini6.png'),
     color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad Mini 6 nhỏ gọn nhưng mạnh mẽ với chip A15 Bionic, màn hình Liquid Retina 8.3 inch, và hỗ trợ Apple Pencil thế hệ 2.'
  },
  {
    id: '24',
    name: 'Ipad Gen10',
    category: 'Tablet',
    price: 1550,
    image: require('../DataSmart/Ipadgen10.png'),
     color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad Gen 10 mang lại trải nghiệm mượt mà với chip A14 Bionic, màn hình Retina lớn và hỗ trợ bàn phím thông minh.'
  },
  {
    id: '25',
    name: 'Ipad 10.2 256GB',
    category: 'Tablet',
    price: 1600,
    image: require('../DataSmart/ipad-10-2.png'),
     color: [
    require('../mauElec/mauipad1.png'),
    require('../mauElec/mauipad2.png'),
    require('../mauElec/mauipad3.png'),
    require('../mauElec/mauipad4.png'),
    require('../mauElec/mauipad5.png')
  ],
    describe: 'Ipad 10.2 256GB với không gian lưu trữ rộng rãi, màn hình Retina sắc nét và pin lâu, đáp ứng mọi nhu cầu sử dụng.'
  },
  {
    id: '17',
    name: 'MacM2 256GB',
    category: 'Laptop',
    originalPrice: 2333,
    price: Math.round(2333 * 0.7),
    image: require('../DataSmart/MacBookAirM28Gb.png'),
     color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Air M2 256GB với thiết kế mỏng nhẹ, hiệu năng vượt trội và thời lượng pin lên đến 18 giờ, phù hợp cho công việc di động.'
  },
  {
    id: '18',
    name: 'MacM2 128GB',
    category: 'Laptop',
    originalPrice: 2300,
    price: Math.round(2300 * 0.7),
    image: require('../DataSmart/MacAirM2_128.png'),
    color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Air M2 128GB sở hữu chip M2 mạnh mẽ, hiệu năng tối ưu và màn hình Retina sắc nét.'
  },
  {
    id: '19',
    name: 'MacAirM2',
    category: 'Laptop',
    originalPrice: 2200,
    price: Math.round(2200 * 0.7),
    image: require('../DataSmart/MacAirM2.png'),
    color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Air M2 với hiệu năng vượt trội và thời lượng pin lâu dài, đáp ứng mọi nhu cầu làm việc và giải trí.'
  },
  {
    id: '20',
    name: 'MacM3 256GB',
    category: 'Laptop',
    originalPrice: 1880,
    price: Math.round(1880 * 0.7),
    image: require('../DataSmart/MacAirM3.png'),
    color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Air M3 256GB cung cấp hiệu năng mạnh mẽ, thiết kế mỏng nhẹ và màn hình chất lượng cao.'
  },
  {
    id: '21',
    name: 'MacPro 14',
    category: 'Laptop',
    originalPrice: 1900,
    price: Math.round(1900 * 0.7),
    image: require('../DataSmart/MacPro14.png'),
    color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Pro 14 inch với chip M1 Pro, màn hình XDR Retina và khả năng xử lý đồ họa vượt trội.'
  },
  {
    id: '22',
    name: 'MacM2 512GB',
    category: 'Laptop',
    originalPrice: 2100,
    price: Math.round(2100 * 0.7),
    image: require('../DataSmart/MacM2-512.png'),
    color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Air M2 512GB kết hợp không gian lưu trữ lớn, hiệu năng mạnh mẽ và thiết kế thanh lịch.'
  },
  {
    id: '23',
    name: 'MacM3 512GB',
    category: 'Laptop',
    originalPrice: 2000,
    price: Math.round(2000 * 0.7),
    image: require('../DataSmart/MacAirM3_564.webp'),
    color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Air M3 512GB với cấu hình cao cấp, phù hợp cho công việc đa nhiệm và thiết kế đồ họa.'
  },
  {
    id: '40',
    name: 'MacM1',
    category: 'Laptop',
    originalPrice: 1100,
    price: Math.round(1100 * 0.7),
    image: require('../DataSmart/MacAirM1.png'),
    color: [
    require('../mauElec/maumac1.png'),
    require('../mauElec/maumac2.png'),
    require('../mauElec/maumac3.png'),
    require('../mauElec/maumac4.png'),
  ],
    describe: 'MacBook Air M1 với hiệu năng tối ưu, thời lượng pin dài và khả năng xử lý vượt trội.'
  },
  {
    id: '7',
    name: 'Iphone16 Prm',
    category: 'Smartphone',
    price: 450,
    image: require('../DataSmart/iphone-16prm.png'),
    color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
    describe: 'Iphone 16 Pro Max với thiết kế hiện đại, hệ điều hành tối ưu và camera chụp đêm vượt trội.'
  },
  {
    id: '8',
    name: 'Iphone14 Prm',
    category: 'Smartphone',
    price: 411,
    image: require('../DataSmart/ip14prm.png'),
    color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
    describe: 'Iphone 14 Pro Max cung cấp trải nghiệm chụp ảnh tuyệt vời với cảm biến chính 48MP và hiệu năng ổn định.'
  },
  {
    id: '9',
    name: 'Iphone15 Prm',
    category: 'Smartphone',
    price: 359,
    image: require('../DataSmart/iphone15prm.png'),
    color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
    describe: 'Iphone 15 Pro Max mang lại trải nghiệm mượt mà với chip A17 Bionic và thiết kế khung titanium bền bỉ.'
  },
  {
    id: '10',
    name: 'Iphone15 Plus',
    category: 'Smartphone',
    price: 300,
    image: require('../DataSmart/iphone15plus.png'),
    color: [
    require('../mauElec/mauip1.png'),
    require('../mauElec/mauip2.png'),
    require('../mauElec/mauip3.png'),
    require('../mauElec/mauip4.png'),
    require('../mauElec/mauip5.png')
  ],
    describe: 'Iphone 15 Plus với màn hình Super Retina XDR 6.7 inch, pin lâu và camera nâng cấp.'
  },
  {
    id: '24',
    name: 'AirPod Pro',
    category: 'Headphone',
    price: 100,
    image: require('../DataSmart/airpotpro.png'),
    describe: 'AirPods Pro với tính năng chống ồn chủ động, âm thanh chất lượng cao và thiết kế vừa vặn thoải mái.'
  },
  {
    id: '25',
    name: 'AirPod 4',
    category: 'Headphone',
    price: 120,
    image: require('../DataSmart/airpods-4.png'),
    describe: 'AirPods 4 cung cấp âm thanh sống động, thời lượng pin dài và kết nối không dây ổn định.'
  },
  {
    id: '26',
    name: 'AirPod 2',
    category: 'Headphone',
    price: 140,
    image: require('../DataSmart/airpods-2.png'),
    describe: 'AirPods 2 mang đến trải nghiệm âm thanh tuyệt vời với kết nối nhanh và thiết kế nhẹ nhàng.'
  },
  {
    id: '27',
    name: 'AirPod Pro2',
    category: 'Headphone',
    price: 160,
    image: require('../DataSmart/airpods-pro-2.png'),
    describe: 'AirPods Pro 2 cải tiến âm thanh, chống ồn chủ động và tính năng nhận diện âm thanh tiên tiến.'
  },
  {
    id: '28',
    name: 'AirPod 3',
    category: 'Headphone',
    price: 180,
    image: require('../DataSmart/airpods-3.png'),
    describe: 'AirPods 3 cung cấp âm bass mạnh mẽ, âm thanh vòm và thiết kế phù hợp cho mọi tai.'
  },
  {
    id: '29',
    name: 'AirPod Max',
    category: 'Headphone',
    price: 200,
    image: require('../DataSmart/Apple_airpos_max.png'),
    describe: 'AirPods Max với âm thanh Hi-Fi, thiết kế cao cấp và công nghệ chống ồn tiên tiến.'
  },
  {
    id: '30',
    name: 'AirPodMax2',
    category: 'Headphone',
    price: 220,
    image: require('../DataSmart/airpods-max-2024.png'),
    describe: 'AirPods Max 2024 mang lại âm thanh vượt trội với công nghệ Spatial Audio và thời lượng pin dài.'
  }
];

  // Method to filter products based on selected option and showAll state
  const getDisplayedProducts = () => {
  // Lọc sản phẩm theo tên dựa trên `searchQuery`
  let filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Lọc sản phẩm theo danh mục đã chọn
  filteredProducts = filteredProducts.filter(
    (product) => product.category === selectedCategory
  );

  // Nếu có `priceFilter`, áp dụng bộ lọc giá
  if (priceFilter === 'highest') {
    // Lọc 4 sản phẩm giá cao nhất
    filteredProducts = filteredProducts
      .sort((a, b) => b.price - a.price)
      .slice(0, 4);
  } else if (priceFilter === 'lowest') {
    // Lọc 4 sản phẩm giá thấp nhất
    filteredProducts = filteredProducts
      .sort((a, b) => a.price - b.price)
      .slice(0, 4);
  } else if (priceFilter === 'midrange') {
    // Lọc 4 sản phẩm ở tầm trung
    const sortedByPrice = filteredProducts.sort((a, b) => a.price - b.price);
    const midStart = Math.floor((sortedByPrice.length - 4) / 2);
    filteredProducts = sortedByPrice.slice(midStart, midStart + 4);
  }

  // Áp dụng logic "Popular"
  if (selectedOption === 'popular') {
    return showAll ? filteredProducts : filteredProducts.slice(0, 4);
  }

  // Logic mặc định cho các tùy chọn khác
  if (selectedOption === 'best_sales') {
    return showAll
      ? filteredProducts.slice(0, 5)
      : filteredProducts.slice(0, 4);
  } else if (selectedOption === 'best_matched') {
    return showAll
      ? filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 5)
      : filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
  }

  return showAll ? filteredProducts : filteredProducts.slice(0, 4);
};

const addToCart = (product) => {
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);

    if (existingItem) {
      // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
      return prevCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
      return [...prevCart, { ...product, quantity: 1 }];
    }
  });
};



const navigateToCart = () => {
  navigation.navigate('ShoppingCart', { cart, setCart, removedItems, setRemovedItems });
};

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
      <TouchableOpacity
  style={styles.backButton}
  onPress={() => navigation.navigate('HomeScreen')}
>
  <Text style={styles.backButtonText}>Back</Text>
</TouchableOpacity>

        <Text style={styles.headerText}>Electronics</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={navigateToCart}>
  <Image
    source={require('../DataElec/giohangvip.png')}
    style={styles.giohang}
  />
</TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../Data/codicon_account.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../Data/search.png')}
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <TouchableOpacity onPress={() => setShowFilterModal(true)}>
  <Image
    source={require('../DataElec/3gach.png')}
    style={styles.filterIcon}
  />
</TouchableOpacity>


      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingBottom: 10 }}
         showsVerticalScrollIndicator={false} >
        {/* Categories Section */}
        <View style={styles.categoriesHeader}>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <TouchableOpacity
    onPress={() => setShowAllCategories(!showAllCategories)}>
    <Text style={styles.seeAllText}>
      {showAllCategories ? 'See Less' : 'See All'}
    </Text>
  </TouchableOpacity>
        </View>

        {/* Categories List */}
         <FlatList
    horizontal
    data={getDisplayedCategories()}
    renderItem={({ item }) => (
      <View
        style={[
          styles.categoryItem,
          {
            backgroundColor: item.bgColor,
            borderColor:
              selectedCategory === item.name ? '#A9A9A9' : item.borderColor,
            borderWidth: selectedCategory === item.name ? 2 : 1,
          },
        ]}>
        <TouchableOpacity onPress={() => setSelectedCategory(item.name)}>
          <Image source={item.image} style={styles.categoryImage} />
        </TouchableOpacity>
      </View>
    )}
    keyExtractor={(item) => item.name}
    showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
  />
        {/* Sorting Options */}
        <View style={styles.sortingOptionsContainer}>
          {sortingOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              onPress={() => setSelectedOption(option.id)}
              style={[
                styles.sortingOption,
                selectedOption === option.id && styles.selectedSortingOption,
              ]}>
              <Text
                style={[
                  styles.sortingOptionText,
                  selectedOption === option.id &&
                    styles.selectedSortingOptionText,
                ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Products List */}
       <FlatList
  data={getDisplayedProducts()}
  renderItem={({ item }) => {
    const relatedProducts = products.filter(
      (product) => product.category === item.category && product.id !== item.id
    );

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetailScreen', {
            product: item,
            relatedProducts: relatedProducts,
          })
        }
      >
        <View style={styles.productItem}>
          {/* Hiển thị biểu tượng giảm giá */}
          {item.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-30%</Text>
            </View>
          )}
          <Image source={item.image} style={styles.productImage} />
          <View style={styles.productDetails}>
            <View style={styles.productNameContainer}>
              <Text style={styles.productName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.productRatingContainer}>
              <Image
                source={require('../Data/Rating5.png')}
                style={styles.ratingImage}
              />
              <View>
                {/* Hiển thị giá */}
                <Text style={styles.productPrice}>${item.price}</Text>
                {/* Hiển thị giá gốc nếu có */}
                {item.originalPrice && (
                  <Text style={styles.originalPrice}>
                    ${item.originalPrice}
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={{ paddingBottom: 20 }}
/>




        {/* See All / See Less Button */}
        <TouchableOpacity
          onPress={() => setShowAll(!showAll)}
          style={styles.seeAllButton}>
          <Text style={styles.seeAllButtonText}>
            {showAll ? 'See Less' : 'See All'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <FlatList
      ref={flatListRef} // Gán ref
      data={banners}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({ item }) => (
        <Image source={item} style={styles.banner} />
      )}
      extraData={activeIndex} // Lắng nghe thay đổi
      onScrollToIndexFailed={() => {}} // Xử lý lỗi (nếu có)
    />

<View style={styles.dotsContainer}>
      {banners.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.dot,
            activeIndex === index ? styles.activeDot : null,
          ]}
        />
      ))}
      {/* Nút chuyển banner */}
      <TouchableOpacity
        onPress={handleNextBanner}
        style={[styles.dot, styles.activeDot]}
      >
        <Text style={{ color: '#fff', fontSize: 10 }}></Text>
      </TouchableOpacity>
    </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        {['Home', 'Search', 'Favorites', 'Inbox', 'Account'].map(
          (item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedFooter(item)}>
              <View style={styles.footerItem}>
                <Icon
                  name={
                    item === 'Home'
                      ? 'home-outline'
                      : item === 'Search'
                      ? 'search-outline'
                      : item === 'Favorites'
                      ? 'heart-outline'
                      : item === 'Inbox'
                      ? 'chatbubble-outline'
                      : 'person-outline'
                  }
                  size={24}
                  color={selectedFooter === item ? '#1E90FF' : '#808080'}
                />
                <Text
                  style={[
                    styles.footerText,
                    selectedFooter === item && styles.footerTextActive,
                  ]}>
                  {item}
                </Text>
              </View>
            </TouchableOpacity>
          )
        )}
      </View>
      <Modal visible={showFilterModal} transparent={true} animationType="slide">
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Filter Products</Text>

      <TouchableOpacity
        style={[
          styles.filterButton,
          priceFilter === 'highest' && styles.selectedFilterButton,
        ]}
        onPress={() => setPriceFilter('highest')}
      >
        <Text
          style={[
            styles.filterButtonText,
            priceFilter === 'highest' && styles.selectedFilterText,
          ]}
        >
          Highest Price
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.filterButton,
          priceFilter === 'lowest' && styles.selectedFilterButton,
        ]}
        onPress={() => setPriceFilter('lowest')}
      >
        <Text
          style={[
            styles.filterButtonText,
            priceFilter === 'lowest' && styles.selectedFilterText,
          ]}
        >
          Lowest Price
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.filterButton,
          priceFilter === 'midrange' && styles.selectedFilterButton,
        ]}
        onPress={() => setPriceFilter('midrange')}
      >
        <Text
          style={[
            styles.filterButtonText,
            priceFilter === 'midrange' && styles.selectedFilterText,
          ]}
        >
          Mid-range Price
        </Text>
      </TouchableOpacity>

      <View style={styles.modalActions}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={clearFilters} // Clear filters and reset
        >
          <Text style={styles.cancelButtonText}>Clear Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => setShowFilterModal(false)} // Close modal
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>


    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fffcfc' },
  backButtonText: { fontSize: 16, color: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerText: { fontSize: 24, fontWeight: 'bold', marginRight: 60, },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 24, height: 24, marginHorizontal: 5 },
  giohang: { width: 25, height: 25, marginBottom: 5 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 8, padding: 10, marginBottom: 10 },
  searchIcon: { width: 20, height: 20, marginRight: 5 },
  searchInput: { flex: 1, height: 20 },
  filterIcon: { width: 25, height: 25, marginLeft: 5 },
  categoriesHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  categoriesTitle: { fontSize: 18, fontWeight: 'bold' },
  seeAllText: { fontSize: 16, color: '#1e90ff' },
  categoryItem: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginHorizontal: 10 },
  categoryImage: { width: 50, height: 50 },
  sortingOptionsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 },
  sortingOption: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 15, backgroundColor: '#f0f0f0', marginHorizontal: 5 },
  selectedSortingOption: { backgroundColor: '#E0FFFF' },
  sortingOptionText: { fontSize: 14, color: '#808080' },
  selectedSortingOptionText: { fontWeight: 'bold', color: '#1E90FF' },
  productItem: { flexDirection: 'row', marginBottom: 10, backgroundColor: '#f9f9f9', padding: 10, borderRadius: 10, alignItems: 'center', height: 80 },
  productImage: { width: 80, height: 80, marginRight: 10 },
  productDetails: { flex: 1, justifyContent: 'center' },
  productNameContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  productName: { fontSize: 18, fontWeight: 'bold' },
  addButton: { width: 20, height: 20, borderRadius: 12, backgroundColor: '#898989', justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#000000', fontSize: 18, fontWeight: 'bold', marginBottom: 3.4, marginLeft:1 },
  productRatingContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingImage: { width: 80, height: 15 },
  productPrice: { fontSize: 17, color: '#000', fontWeight: 'bold' },
  seeAllButton: { backgroundColor: '#f0f0f0', paddingVertical: 10, alignItems: 'center', borderRadius: 10, marginTop: -20 },
  seeAllButtonText: { fontSize: 16, color: '#1E90FF' },
  banner: {
    width: 290, height: 155,
    marginTop: 10,
    marginLeft: 5,
    alignSelf: 'center'

  },
  dotsContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignSelf: 'center'
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00C1D4', // Màu xanh cho dot đang hoạt động
  },
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#d3d3d3', height: 45, },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, color: '#808080' },
  footerTextActive: { color: '#1E90FF' },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ tối bên ngoài modal
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Hiệu ứng nổi trên Android
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20, // Khoảng cách với các tùy chọn
  },
  filterButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10, // Khoảng cách giữa các nút
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#1E90FF', // Nền khi được chọn
    borderColor: '#1E90FF',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  selectedFilterText: {
    color: '#fff', // Màu chữ khi được chọn
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginRight: 10, // Khoảng cách giữa nút Cancel và Apply
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#333',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#1E90FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },

  originalPrice: {
    fontSize: 15,
    color: '#808080',
    textDecorationLine: 'line-through', // Gạch ngang
    textDecorationStyle: 'solid',
  },
  discountBadge: {
  position: 'absolute',
  top: 2,
  left: 2,
  backgroundColor: 'red',
  paddingVertical: 3,
  paddingHorizontal: 2,
  borderRadius: 5,
  zIndex: 1, // Đảm bảo hiển thị trên hình ảnh
},
discountText: {
  color: 'white',
  fontSize: 8,
  fontWeight: 'bold',
},

});

export default ElectricScreen;
