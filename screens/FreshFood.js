import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput, FlatList, ScrollView, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from './CartContext';

const FreshFood = () => {
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
    id: '91',
    name: 'Apple',
    price: 18,
    image: require('../DataFruit/tao.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Táo đỏ tươi ngon, giàu vitamin và rất tốt cho sức khỏe.',
  },
  {
    id: '92',
    name: 'Avoca',
    price: 25,
    image: require('../DataFruit/bo.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Quả bơ sáp béo ngậy, thích hợp cho chế biến món ăn và làm đẹp.',
  },
  {
    id: '93',
    name: 'Pears',
    price: 20,
    image: require('../DataFruit/le.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Lê ngọt mát, giòn ngon, rất tốt cho tiêu hóa và làm dịu cơn khát.',
  },
  {
    id: '94',
    name: 'Grape',
    price: 28,
    image: require('../DataFruit/nho.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Nho vàng không hạt, giàu chất chống oxy hóa và rất thơm ngon.',
  },
  {
    id: '95',
    name: 'Jerry',
    price: 30,
    image: require('../DataFruit/jerry.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Cherry nhập khẩu, vị ngọt thanh, giàu dinh dưỡng.',
  },
  {
    id: '96',
    name: 'Orange',
    price: 22,
    image: require('../DataFruit/cam.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Cam sành mọng nước, giàu vitamin C, hỗ trợ tăng cường sức đề kháng.',
  },
  {
    id: '97',
    name: 'Peach',
    price: 26,
    image: require('../DataFruit/dao.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Đào hồng thơm ngon, bổ dưỡng, thích hợp để làm mứt hoặc ăn tươi.',
  },
  {
    id: '98',
    name: 'Lemon',
    price: 15,
    image: require('../DataFruit/chanh.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Chanh vàng mọng nước, lý tưởng để làm nước ép và gia vị.',
  },
  {
    id: '99',
    name: 'Lychee',
    price: 35,
    image: require('../DataFruit/vai.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Vải thiều ngọt thơm, lớp vỏ mỏng, hương vị khó quên.',
  },
  {
    id: '100',
    name: 'Tremon',
    price: 32,
    image: require('../DataFruit/buoi.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Bưởi da xanh, múi mọng nước, vị ngọt thanh, tốt cho sức khỏe.',
  },
  {
    id: '101',
    name: 'Dragon Fruit',
    price: 30,
    image: require('../DataFruit/thanhlong.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Thanh long ruột đỏ, chứa nhiều chất xơ và vitamin.',
  },
  {
    id: '102',
    name: 'Banana',
    price: 18,
    image: require('../DataFruit/chuoi.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Chuối già lùn, thơm ngon, cung cấp năng lượng cho cả ngày dài.',
  },
  {
    id: '103',
    name: 'WaterMelon',
    price: 20,
    image: require('../DataFruit/duahau.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Dưa hấu ruột đỏ ngọt mát, giải nhiệt hiệu quả trong mùa hè.',
  },
  {
    id: '104',
    name: 'Kiwi',
    price: 40,
    image: require('../DataFruit/kiwi.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Kiwi xanh, giàu vitamin C, hương vị chua ngọt đặc trưng.',
  },
  {
    id: '105',
    name: 'Coconut',
    price: 12,
    image: require('../DataFruit/coco.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Dừa xiêm tươi, nước ngọt mát, giúp giải khát và bổ sung năng lượng.',
  },
  {
    id: '106',
    name: 'Longan',
    price: 25,
    image: require('../DataFruit/nhan.png'),
    rating: require('../Data/Rating5.png'),
    describe: 'Nhãn lồng ngọt thanh, thơm lừng, rất bổ dưỡng cho cơ thể.',
  },
];


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
        <Text style={styles.headerText}>Fresh Fruits</Text>
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

<Image source={require('../DataElec/bannerfresh.jpg')} style={styles.anh3} />
 <View style={styles.dotsContainer}>
    {/* Các chấm dot làm mẫu */}
    {[1, 2, 3].map((_, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.dot,
          index === 0 ? styles.activeDot : null, // Ví dụ chấm đầu tiên là "active"
        ]}
      />
    ))}

    {/* Nút bấm "Next" */}
    <TouchableOpacity
      onPress={handleNextAction} // Hành động khi nhấn nút
      style={[styles.dot, styles.activeDot, { paddingHorizontal: 10 }]} // Cộng thêm padding để nút to hơn
    >
      <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
      </Text>
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
          navigation.navigate('ProductDetail3', {
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
          navigation.navigate('ProductDetail3', {
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
            <Image source={item.rating} style={styles.ratingIcon2
            } />
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
  container: { flex: 1, padding: 20, backgroundColor: '#f8fcec',  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  backButtonText: { fontSize: 16, color: '#000' },
  headerText: { fontSize: 24, fontWeight: 'bold', marginRight: 55 },
  headerIcons: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 24, height: 24, marginHorizontal: 5 },
  giohang: { width: 25, height: 25, marginBottom: 5 },
  anh3: { width: 290, height: 90, marginVertical: 10, alignSelf: 'center', borderRadius: 5 },
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
    backgroundColor: '#5BBD2B',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    marginLeft: 37
  },
  addToCartButton2: {
    width: 20,
    height: 20,
    backgroundColor: '#5BBD2B',
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
    marginBottom: 4,
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
  
});

export default FreshFood;