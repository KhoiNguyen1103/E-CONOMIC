import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from './CartContext';

const BeautyScreen = () => {
   const navigation = useNavigation();
  const [selectedFooter, setSelectedFooter] = useState('');
  const [showAll, setShowAll] = useState(false); // Trạng thái hiển thị tất cả sản phẩm
  const [showAllRelevant, setShowAllRelevant] = useState(false);
    const { cart, setCart, removedItems, setRemovedItems } = useCart();
    const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
    const [showFilterModal, setShowFilterModal] = useState(false);
const [priceFilter, setPriceFilter] = useState(null); // Giá trị lọc: "asc" hoặc "desc"

// Hàm áp dụng lọc
const applyFilter = () => {
  setShowFilterModal(false); // Đóng modal
};

// Hàm xóa bộ lọc
const clearFilters = () => {
  setPriceFilter(null); // Xóa giá trị lọc
  setShowFilterModal(false);
};

const handleNextAction = () => {
  console.log("Next button pressed!");
};


    const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (removedItems.includes(product.id)) {
        setRemovedItems((prev) => prev.filter((id) => id !== product.id));
        return [...prevCart, { ...product, quantity: 1 }];
      }

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
   const navigateToCart = () => {
    navigation.navigate('ShoppingCart', { cart }); // Pass cart items to the ShoppingCart screen
  };



  const products = [
  { 
    id: '75', 
    name: 'Lipstick1', 
    price: 18, 
    image: require('../DataBeaut/son1.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son môi màu đỏ cổ điển, lên màu chuẩn và giữ ẩm lâu dài cho môi.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '76', 
    name: 'Lipstick2', 
    price: 20, 
    image: require('../DataBeaut/son4.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son môi màu cam cháy, thích hợp cho các cô nàng cá tính và hiện đại.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '77', 
    name: 'Lipstick3', 
    price: 22, 
    image: require('../DataBeaut/son5.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son môi dưỡng ẩm màu hồng nhẹ nhàng, phù hợp cho phong cách tự nhiên.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '78', 
    name: 'Lipstick4', 
    price: 25, 
    image: require('../DataBeaut/son6.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son lì lâu trôi với tông màu mận chín, sang trọng và cuốn hút.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '79', 
    name: 'Lipstick5', 
    price: 28, 
    image: require('../DataBeaut/son8.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son môi bóng với thành phần tự nhiên, giúp đôi môi luôn căng mọng.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '80', 
    name: 'Lipstick6', 
    price: 26, 
    image: require('../DataBeaut/son9.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son kem lì màu nude nhẹ nhàng, hoàn hảo cho trang điểm hàng ngày.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '81', 
    name: 'Lipstick7', 
    price: 30, 
    image: require('../DataBeaut/son10.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son dưỡng môi với màu hồng phấn, bổ sung vitamin E giúp môi mềm mịn.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '82', 
    name: 'Lipstick8', 
    price: 32, 
    image: require('../DataBeaut/son11.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son lì màu đỏ rượu vang, mang lại vẻ đẹp quyến rũ và nổi bật.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '83', 
    name: 'Lipstick9', 
    price: 35, 
    image: require('../DataBeaut/son13.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son môi màu cam đất thời thượng, kết cấu nhẹ môi và bền màu cả ngày.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '84', 
    name: 'Lipstick10', 
    price: 34, 
    image: require('../DataBeaut/son14.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Son lì cao cấp màu hồng đào, tạo vẻ trẻ trung và năng động.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '85', 
    name: 'Makeup Powder1', 
    price: 38, 
    image: require('../DataBeaut/phan1.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Phấn phủ dạng bột kiềm dầu, giúp da mịn màng và lâu trôi.',
  },
  { 
    id: '86', 
    name: 'Makeup Powder2', 
    price: 42, 
    image: require('../DataBeaut/phan2.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Phấn nén với kết cấu mịn màng, che phủ tốt và bền màu.',
  },
  { 
    id: '87', 
    name: 'Makeup Brush1', 
    price: 20, 
    image: require('../DataBeaut/co1.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Cọ trang điểm đa năng, lông mềm mại và dễ sử dụng cho mọi loại phấn.',
    color: ['#f45c34', '#a42c24', '#e3548c', '#e41c24', '#f17c72', '#c45d3e'], // Màu sắc
  },
  { 
    id: '88', 
    name: 'Makeup Brush2', 
    price: 18, 
    image: require('../DataBeaut/co2.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Cọ phấn mắt với đầu lông nhỏ gọn, giúp tán màu đều và chính xác.',
  },
  { 
    id: '89', 
    name: 'Makeup Brush3', 
    price: 25, 
    image: require('../DataBeaut/co3.webp'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Cọ má hồng chuyên nghiệp, thiết kế đầu chéo dễ dàng thao tác.',
  },
  { 
    id: '90', 
    name: 'Makeup Brush4', 
    price: 28, 
    image: require('../DataBeaut/co4.png'), 
    rating: require('../Data/Rating5.png'), 
    describe: 'Cọ phấn phủ lớn, lông mềm và dày giúp tạo lớp nền hoàn hảo.',
  },
];




  const banners = [
  require('../DataElec/bannerbeau1.jpg'),
  require('../DataElec/bannerbeau2.jpg'),
  require('../DataElec/bannerbeau3.png'),
  require('../DataElec/bannerbeau4.webp'),
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

// Sản phẩm được hiển thị dựa trên trạng thái showAll
// const displayedProducts = showAll ? products.slice(0, 10) : products.slice(0, 4);

// Hàm toggle giữa See all và See less
const toggleShowAll = () => {
  setShowAll(!showAll);
};
// const displayedRelevantProducts = showAllRelevant ? products.slice(10, 16) : products.slice(10, 13);

  // Hàm toggle giữa See all và See less cho Relevant Products
  const toggleShowAllRelevant = () => {
    setShowAllRelevant(!showAllRelevant);
  };
  

const filteredProducts = products
  .filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    if (priceFilter === 'asc') return a.price - b.price; // Giá tăng dần
    if (priceFilter === 'desc') return b.price - a.price; // Giá giảm dần
    return 0;
  });

const displayedProducts = showAll
  ? filteredProducts.slice(0, 10)
  : filteredProducts.slice(0, 4);

  const displayedRelevantProducts = showAllRelevant
  ? filteredProducts.slice(10, 16)
  : filteredProducts.slice(10, 13);



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
        <Text style={styles.headerText}>Beautify</Text>
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

      <View style={styles.searchContainer}>
  <Image
    source={require('../Data/search.png')}
    style={styles.searchIcon}
  />
  <TextInput
  placeholder="Search"
  style={styles.searchInput}
  value={searchQuery} // Bind the search query state
  onChangeText={(text) => setSearchQuery(text)} // Update state on text change
/>

  <TouchableOpacity onPress={() => setShowFilterModal(true)}>
  <Image
    source={require('../DataElec/3gach.png')}
    style={styles.filterIcon}
  />
</TouchableOpacity>

</View>

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
<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 15}}
 showsVerticalScrollIndicator={false} >
<FlatList
  data={displayedProducts}
  keyExtractor={(item) => item.id} // Dùng id làm key
  numColumns={2} // Hiển thị 2 cột
  renderItem={({ item }) => {
    const relatedProducts = products.filter(
      (product) => product.category === item.category && product.id !== item.id
    );

    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          navigation.navigate('ProductDetail4', {
            product: item,
            relatedProducts: relatedProducts,
          })
        }
      >
        <Image source={item.image} style={styles.productImage} />
        <View style={styles.tenvacong}>
          <Text style={styles.productName}>{item.name}</Text>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => addToCart(item)}
          >
            <Text style={styles.addToCartText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.giavasao}>
          <Image source={item.rating} style={styles.ratingIcon} />
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }}
  showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
  columnWrapperStyle={styles.row} // Căn chỉnh cột
/>


<TouchableOpacity style={styles.seeAllButton} onPress={toggleShowAll}>
  <Text style={styles.seeAllButtonText}>{showAll ? 'See less' : 'See all'}</Text>
</TouchableOpacity>

{/* Relevant Products Section */}
<View style={styles.relevantProductsContainer}>
  <View style={styles.relevantHeader}>
          <Text style={styles.relevantTitle}>Relevant products</Text>
          <TouchableOpacity onPress={toggleShowAllRelevant}>
            <Text style={styles.relevantSeeAll}>
              {showAllRelevant ? 'See less' : 'See all'}
            </Text>
          </TouchableOpacity>
        </View>

  {/* FlatList for Relevant Products */}
  <FlatList
  data={displayedRelevantProducts}
  keyExtractor={(item) => item.id} // Dùng id làm key
  renderItem={({ item }) => {
    const relatedProducts = products.filter(
      (product) => product.category === item.category && product.id !== item.id
    );

    return (
      <TouchableOpacity
        style={styles.relevantItemContainer}
        onPress={() =>
          navigation.navigate('ProductDetail4', {
            product: item,
            relatedProducts: relatedProducts,
          })
        }
      >
        <Image source={item.image} style={styles.relevantImage} />
        <View style={styles.relevantDetails}>
          <View style={styles.tenvacong}>
            <Text style={styles.productName}>{item.name}</Text>
            <TouchableOpacity
              style={styles.addToCartButton2}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.addToCartText2}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.giavasao}>
            <Image source={item.rating} style={styles.ratingIcon2} />
            <Text style={styles.productPrice2}>${item.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }}
  showsVerticalScrollIndicator={false}
/>

</View>

</ScrollView>

<Modal
  visible={showFilterModal}
  transparent={true}
  animationType="slide"
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>Filter Products</Text>

      {/* Tùy chọn lọc */}
      <TouchableOpacity
        style={[
          styles.filterButton,
          priceFilter === 'desc' && styles.selectedFilterButton,
        ]}
        onPress={() => setPriceFilter('desc')}
      >
        <Text
          style={[
            styles.filterButtonText,
            priceFilter === 'desc' && styles.selectedFilterText,
          ]}
        >
          Highest Price
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.filterButton,
          priceFilter === 'asc' && styles.selectedFilterButton,
        ]}
        onPress={() => setPriceFilter('asc')}
      >
        <Text
          style={[
            styles.filterButtonText,
            priceFilter === 'asc' && styles.selectedFilterText,
          ]}
        >
          Lowest Price
        </Text>
      </TouchableOpacity>

      {/* Nút Clear Filter và Apply */}
      <View style={styles.modalActions}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearFilters} // Clear filters
        >
          <Text style={styles.clearButtonText}>Clear Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={applyFilter} // Close modal
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>



      {/* Footer Navigation */}
      <View style={styles.footer}>
        {['Home', 'Search', 'Favorites', 'Inbox', 'Account'].map((item, index) => (
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
        ))}
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fcecf8',  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  backButtonText: { fontSize: 16, color: '#000' },
  headerText: { fontSize: 24, fontWeight: 'bold', marginRight: 90 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 24, height: 24, marginHorizontal: 5 },
  giohang: { width: 25, height: 25, marginBottom: 5 },
  banner: {
    width: 310, height: 200,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Màu nền/-strong/-heart:>:o:-((:-h borderRadius: 8, // Bo góc
    padding: 10, // Khoảng cách padding
    marginBottom: 10, // Khoảng cách dưới
    borderRadius: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 5, // Khoảng cách bên phải giữa icon và TextInput
  },
  searchInput: {
    flex: 1, 
    height: 20, 
    fontSize: 16, // Kích thước chữ
    color: '#000', // Màu chữ
  },
  filterIcon: {
    width: 25,
    height: 25,
    marginLeft: 5, // Khoảng cách bên trái giữa TextInput và filter icon
  },
  productContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    margin: 8,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Bóng mờ Android
  },
  productImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
    marginLeft: 13,
  },
  tenvacong: {
justifyContent: 'space-between',
flexDirection: 'row',
  },
  giavasao: {
    marginTop: 10,
justifyContent: 'space-between',
flexDirection: 'row',
  },
  
  ratingIcon: {
    width: 78,
    height: 15,
    marginTop: 2,
    marginRight:10,

  },
  ratingIcon2: {
    width: 78,
    height: 15,
    marginTop: 2,
    marginRight:10,
    marginLeft: 12,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
  },
  productPrice2: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    marginRight: 15,
  },
 addToCartButton: {
    width: 20,
    height: 20,
    backgroundColor: '#C57CAC',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginLeft: 25
  },
  addToCartButton2: {
    width: 20,
    height: 20,
    backgroundColor: '#C57CAC',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginRight: 15,
  },
  
  addToCartText: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 3,
    marginRight: 0,
  },
  addToCartText2: {
    fontSize: 15,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 3,
    marginRight: -0.8,
  },
  row: {
    justifyContent: 'space-between', // Căn cách đều giữa các cột
  },
  seeAllButton: {
  alignSelf: 'center',
  alignItems: 'center',
  paddingVertical: 10,
  paddingHorizontal: 20,
  backgroundColor: '#F5F5F5', // Màu nền giống mẫu
  borderRadius: 8,
  marginTop: 10,
  marginBottom: 20,
  borderColor: '#E0E0E0',
  borderWidth: 1,
  width: 260,
  },
seeAllButtonText: {
  fontSize: 14,
  color: '#808080', // Màu chữ giống mẫu
  fontWeight: '600',
},
relevantProductsContainer: {
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: 10,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 2,
},
relevantHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
relevantTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#333',
},
relevantSeeAll: {
  fontSize: 14,
  color: '#1E90FF',
},
relevantItemContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 15,
  backgroundColor: '#F9F9F9',
  borderRadius: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#C0C0C0',
  height: 75,  // backgroundColor: ,
},
relevantImage: {
  width: 60,
  height: 60,
  resizeMode: 'contain',
  marginRight: 10,
},
relevantDetails: {
  flex: 1,
  justifyContent: 'center',
},
 modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedFilterButton: {
    backgroundColor: '#007BFF',
  },
  filterButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedFilterText: {
    color: 'white',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  clearButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
  },
  clearButtonText: {
    color: '#333',
  },
  applyButtonText: {
    color: 'white',
  },
   
  footer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#d3d3d3', height: 45, },
  footerItem: { alignItems: 'center' },
  footerText: { fontSize: 12, color: '#808080' },
  footerTextActive: { color: '#1E90FF' },
  
});

export default BeautyScreen;