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



const Fashion = () => {

  
  const [showFilterModal, setShowFilterModal] = useState(false);
const [priceFilter, setPriceFilter] = useState(null); // Bộ lọc giá: highest, lowest, midrange
const clearFilters = () => {
  setPriceFilter(null); // Xóa bộ lọc giá
  setShowFilterModal(false);
};



  
  const navigation = useNavigation();
const route = useRoute();
  const [selectedFooter, setSelectedFooter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Shirt');
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

  const categories = [
  { id: 'shirt', name: 'Shirt', image: require('../DataFace/ao.png'), bgColor: '#CCFFCC', borderColor: '#66FF99' },
  {  id: 'shoe',name: 'Shoe', image: require('../DataFace/giayvip.png'), bgColor: '#FFCCFF', borderColor: '#FF99CC' },
  { id: 'hagbag', name: 'Handbag', image: require('../DataFace/tui.png'), bgColor: '#FFFFCC', borderColor: '#FFD700' },
  { id: 'trousers', name: 'Trousers', image: require('../DataFace2/quanmau.png'), bgColor: '#CCFFFF', borderColor: '#99FFFF' },
 

];

  const sortingOptions = [
    { id: 'best_sales', label: 'Best Sales' },
    { id: 'best_matched', label: 'Best Matched' },
    { id: 'popular', label: 'Popular' },
  ];


  const products = [
  { id: '50', name: 'T-shirt', category: 'Shirt', price: 50, image: require('../DataFace2/T-shirt.png'), describe: 'Áo thun cotton cao cấp, thoáng mát và phù hợp cho các hoạt động thường ngày.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '51', name: 'T-shirt2', category: 'Shirt', price: 45, image: require('../DataFace2/T-shirt2.png'), describe: 'Áo thun với thiết kế trẻ trung, dễ dàng phối đồ cho mọi phong cách.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '52', name: 'T-shirt3', category: 'Shirt', price: 55, image: require('../DataFace2/T-shirt3.png'), describe: 'Áo thun hiện đại, phù hợp cho cả đi làm lẫn đi chơi.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '53', name: 'Jacket', category: 'Shirt', price: 60, image: require('../DataFace2/jacket.png'), describe: 'Áo khoác phong cách lịch lãm, giữ ấm tốt và dễ kết hợp với nhiều trang phục.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '200', name: 'Jacket2', category: 'Shirt', price: 66, image: require('../DataFace2/jacket2.png'), describe: 'Áo khoác jacket kiểu dáng hiện đại, phù hợp cho thời tiết lạnh và dễ phối đồ cho các hoạt động ngoài trời.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '201', name: 'Hoodie', category: 'Shirt', price: 65, image: require('../DataFace2/hoodi.png'), describe: 'Áo hoodie thoải mái, thiết kế trẻ trung với khả năng giữ ấm tốt, phù hợp cho cả nam và nữ.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '202', name: 'WarmCoat2', category: 'Shirt', price: 68, image: require('../DataFace/aocam.png'), describe: 'Áo khoác giữ ấm cao cấp, mang đến sự tiện dụng và phong cách lịch sự trong mùa đông.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '203', name: 'WarmCoat', category: 'Shirt', price: 42, image: require('../DataFace2/warmcoat.png'), describe: 'Áo khoác dáng dài, thiết kế tối giản, giúp giữ ấm hiệu quả và phù hợp cho thời tiết lạnh.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '54', name: 'Tennis Shoes', category: 'Shoe', originalPrice: 100, price: Math.round(100 * 0.5), image: require('../DataFace2/giaytenis.png'), describe: 'Giày thể thao bền bỉ, phù hợp cho cả luyện tập và hoạt động hàng ngày.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '55', name: 'Sport Shoes', category: 'Shoe', originalPrice: 120, price: Math.round(120 * 0.5), image: require('../DataFace/giayden.png'), describe: 'Giày thể thao với lớp lót êm ái, mang lại sự thoải mái tối đa.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '56', name: 'Soccer Shoes', category: 'Shoe', originalPrice: 150, price: Math.round(150 * 0.5), image: require('../DataFace2/giaybongda.png'), describe: 'Giày đá bóng cao cấp, bám sân tốt và thiết kế bền bỉ.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '57', name: 'Jordan', category: 'Shoe', originalPrice: 140, price: Math.round(140 * 0.5), image: require('../DataFace2/jodan.png'), describe: 'Giày Jordan với thiết kế sang trọng, phù hợp cho các dịp đặc biệt.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '58', name: 'Jordan2', category: 'Shoe', originalPrice: 80, price: Math.round(80 * 0.5), image: require('../DataFace2/jodan2.png'), describe: 'Giày Jordan thời trang, bền bỉ và phù hợp cho mọi hoàn cảnh.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '59', name: 'Adidas Shoes', category: 'Shoe', originalPrice: 95, price: Math.round(95 * 0.5), image: require('../DataFace2/adidas.png'), describe: 'Giày Adidas nhẹ nhàng, thoải mái cho cả ngày dài năng động.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '60', name: 'Nike Shoes', category: 'Shoe', originalPrice: 110, price: Math.round(110 * 0.5), image: require('../DataFace2/nike.png'), describe: 'Giày Nike đa năng, hoàn hảo cho cả công việc lẫn tập luyện.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '61', name: 'Puma Shoes', category: 'Shoe', originalPrice: 130, price: Math.round(130 * 0.5), image: require('../DataFace2/puma.png'), describe: 'Giày Puma cao cấp, mang lại sự bền bỉ và phong cách năng động.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '62', name: 'Ruby Bag', category: 'Handbag', originalPrice: 200, price: Math.round(200 * 0.7), image: require('../DataFace/tuihong.png'), describe: 'Túi Ruby tinh tế, mang đến sự sang trọng và tiện dụng.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '63', name: 'PuLeather Bag', category: 'Handbag', originalPrice: 180, price: Math.round(180 * 0.7), image: require('../DataFace2/tui2.png'), describe: 'Túi da Pu thời trang, phù hợp với nhiều phong cách khác nhau.', color: ['#b24644', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '64', name: 'Luggage Bag', category: 'Handbag', originalPrice: 220, price: Math.round(220 * 0.7), image: require('../DataFace2/tui3.png'), describe: 'Túi xách lớn với thiết kế hiện đại, tiện lợi cho công việc và du lịch.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '65', name: 'Luxury Bags', category: 'Handbag', originalPrice: 240, price: Math.round(240 * 0.7), image: require('../DataFace2/tui4.png'), describe: 'Túi xách sang trọng, là điểm nhấn cho mọi bộ trang phục.', color: ['#b24644', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '66', name: 'BrownLeather Bag', category: 'Handbag', originalPrice: 190, price: Math.round(190 * 0.7), image: require('../DataFace2/tui5.png'), describe: 'Túi da nâu thời trang, phù hợp cho mọi dịp.', color: ['#692c2c', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '67', name: 'RedLeather Bag', category: 'Handbag', originalPrice: 210, price: Math.round(210 * 0.7), image: require('../DataFace2/tui6.png'), describe: 'Túi da đỏ sang trọng, giúp bạn tự tin mỗi khi xuất hiện.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '68', name: 'Leather Bag', category: 'Handbag', originalPrice: 230, price: Math.round(230 * 0.7), image: require('../DataFace2/tui7.png'), describe: 'Túi da cao cấp, kết hợp hoàn hảo giữa tiện dụng và phong cách.', color: ['#EEEE00', 'red', '#FFC0CB', 'black', '#FFFAF0'] },
  { id: '69', name: 'Jean1', category: 'Trousers', price: 30, image: require('../DataFace2/jean1.png'), describe: 'Quần jeans đơn giản, dễ phối đồ cho mọi dịp.', color: ['#2c343c', '#88aec9', '#4c728c', '#8c9cb4', '#9ab0c4'] },
  { id: '70', name: 'Jean2', category: 'Trousers', price: 35, image: require('../DataFace2/jean2.png'), describe: 'Quần jeans hiện đại, phù hợp cho các buổi gặp gỡ bạn bè.', color: ['#2c343c', '#88aec9', '#4c728c', '#8c9cb4', '#9ab0c4'] },
  { id: '71', name: 'Jean3', category: 'Trousers', price: 40, image: require('../DataFace2/jean3.png'), describe: 'Quần jeans mềm mại, mang đến cảm giác thoải mái cả ngày dài.',color: ['#2c343c', '#88aec9', '#4c728c', '#8c9cb4', '#9ab0c4'] },
  { id: '72', name: 'Jean4', category: 'Trousers', price: 45, image: require('../DataFace2/jean4.png'), describe: 'Quần jeans trẻ trung, hoàn hảo cho phong cách năng động.', color: ['#2c343c', '#88aec9', '#4c728c', '#8c9cb4', '#9ab0c4'] },
  { id: '73', name: 'Jean5', category: 'Trousers', price: 50, image: require('../DataFace2/jean5.png'), describe: 'Quần jeans bền bỉ, lý tưởng cho những chuyến đi chơi cùng gia đình.',color: ['#2c343c', '#88aec9', '#4c728c', '#8c9cb4', '#9ab0c4'] },
  { id: '74', name: 'Jean6', category: 'Trousers', price: 55, image: require('../DataFace2/jean2.png'), describe: 'Quần jeans cao cấp, giúp bạn tự tin hơn trong mọi hoàn cảnh.', color: ['#2c343c', '#88aec9', '#4c728c', '#8c9cb4', '#9ab0c4'] },
];





 const banners = [
  require('../DataFace/bannerfashion1.png'),
  require('../DataFace/bannerfashion.png'),
  require('../DataFace/fasshionnew.png'),
  require('../DataFace/bannerfasion3.png'),
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
  onPress={() => navigation.navigate('HomeScreen')
  }
>
  <Text style={styles.backButtonText}>Back</Text>
</TouchableOpacity>

        <Text style={styles.headerText}>Fashions</Text>
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
          navigation.navigate('ProductDetailScreen2', {
            product: item,
            relatedProducts: relatedProducts,
            colors: item.color,
          })
        }
      >
        <View style={styles.productItem}>
          {/* Hiển thị badge giảm giá */}
          {item.originalPrice && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>
                {item.category === 'Shoe' ? '-50%' : '-30%'}
              </Text>
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
                {/* Hiển thị giá giảm màu đỏ nếu sản phẩm có giảm giá */}
                <Text
                  style={[
                    styles.productPrice,
                    item.originalPrice && styles.discountedPrice,
                  ]}
                >
                  ${item.price}
                </Text>
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
  container: { flex: 1, padding: 20, backgroundColor: '#f4fcfc' },
  backButtonText: { fontSize: 16, color: '#000' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  headerText: { fontSize: 24, fontWeight: 'bold', marginRight: 90, },
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
  categoryImage: { width: 70, height: 70 },
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
  seeAllButton: { backgroundColor: '#f0f0f0', paddingVertical: 10, alignItems: 'center', borderRadius: 10, marginTop:-20  },
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

discountedPrice: {
  color: 'red', // Đổi màu giá giảm thành đỏ
  fontWeight: 'bold',
},


});

export default Fashion;
