import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView,  FlatList, Switch } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ProgressBar } from 'react-native-paper'; 
import { useCart } from './CartContext';





const Review4 = () => {
  const { cart, setCart } = useCart(); // Sử dụng CartContext để đồng bộ giỏ hàng
  const route = useRoute();
  const navigation = useNavigation();
  const { product, relatedProducts = [] } = route.params; 
   const [showAll, setShowAll] = useState(false);
   const productsToShow = showAll ? relatedProducts.filter(item => item.category === product.category && item.id !== product.id) : relatedProducts.filter(item => item.category === product.category && item.id !== product.id).slice(0, 3);
   const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleSwitch = () => setIsNotificationEnabled(previousState => !previousState);
  const handleBuyNow = (product) => {
  navigation.navigate('ProductDetail4', { product });
};





  return (
    <ScrollView style={styles.container}
     showsVerticalScrollIndicator={false} >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
               <Text style={styles.productName}>{product.name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ShoppingCart', { cart })}>
  <Image
    source={require('../DataElec/giohangvip.png')}
    style={styles.cartIcon}
  />
</TouchableOpacity>

      </View>

      {/* Main Image */}
      <Image source={product.image} style={styles.mainImage} />

      {/* Product Details */}

        <View style={styles.priceAndRatingContainer}>
          <Text style={styles.productPrice}>${product.price}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={18} color="#FFD700" />
            <Text style={styles.ratingText}>4.5 (99 reviews)</Text>
          </View>
        </View>



{/* Dấu gạch ngang ngăn cách */}
<View style={styles.separator} />

{/* Phần mô tả */}
<Text style={styles.descriptionTitle}>Description</Text>
<Text style={styles.descriptionText}>{product.describe}</Text>

<View style={styles.iconsContainer}>
  <View style={styles.iconRow}>
    <View style={styles.iconItem}>
      <FontAwesome name="truck" size={24} color="#00bfff" />
      <Text style={styles.iconText}>Express</Text>
    </View>
    <View style={styles.iconItem}>
      <FontAwesome name="exchange" size={24} color="#00bfff" />
      <Text style={styles.iconText}>30-day free return</Text>
    </View>
  </View>
  <View style={styles.iconRow}>
    <View style={styles.iconItem}>
      <FontAwesome name="thumbs-up" size={24} color="#00bfff" />
      <Text style={styles.iconText}>Good review</Text>
    </View>
    <View style={styles.iconItem}>
      <MaterialIcons name="verified-user" size={24} color="#00bfff" />
      <Text style={styles.iconText}>Authorized shop</Text>
    </View>
  </View>
</View>

<View style={styles.separator} />

<View style={styles.header}>
  <Text style={styles.title}>Reviews</Text>
  <TouchableOpacity>
  <Text style={styles.seeAll1}>See all  </Text>
  </TouchableOpacity>
</View>

<View style={styles.reviewBox}>
<View style={styles.reviewdanhgia} >
  <View style={styles.ratingSummary}>
    <Text style={styles.ratingText}>4.5/5</Text>
    <Text style={styles.reviewCount}>(99 reviews)</Text>
    <View style={styles.stars}>
      {[...Array(4)].map((_, index) => (
        <FontAwesome key={index} name="star" size={18} color="#FFD700" />
      ))}
      <FontAwesome name="star-half-full" size={18} color="#FFD700" />
    </View>
  </View>
  <Image source={require('../DataElec/5danhgia.png')} style={styles.namdg} />
  </View>
  

</View>

<View style={styles.separator} />

<View style={styles.relevantHeader}>
        <Text style={styles.title}>Relevant products</Text>
        <TouchableOpacity onPress={() => setShowAll(!showAll)}>
          <Text style={styles.seeAll}>{showAll ? 'See less <' : 'See all >'}</Text>
        </TouchableOpacity>
      </View>


 <FlatList
  horizontal
  data={productsToShow}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetail4', { product: item })}
    >
      <View style={styles.productCard}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <View style={styles.producngang}>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText2}>4.5</Text>
          </View>
          <Text style={styles.productPrice}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )}
  keyExtractor={(item) => item.id}
  showsHorizontalScrollIndicator={false}
  style={styles.relevantProducts}
/>

<View style={styles.notificationContainer}>
        <View style={styles.iconTextContainer}>
          <FontAwesome name="bell" size={24} color="#00bfff" style={styles.bellIcon} />
          <Text style={styles.notificationText}>Notify me of promotions</Text>
        </View>
        <Switch
          trackColor={{ false: "#ccc", true: "#00bfff" }}
          thumbColor={isNotificationEnabled ? "#fff" : "#f4f3f4"}
          onValueChange={toggleSwitch}
          value={isNotificationEnabled}
        />
      </View>
      

<View style={styles.separator} />
<View style={styles.buyNowContainer}>
  <TouchableOpacity
    style={styles.buyNowButton}
    onPress={() => handleBuyNow(product)} // Chuyển sang màn hình chi tiết sản phẩm
  >
    <Text style={styles.buyNowText}>Buy Now</Text>
  </TouchableOpacity>
</View>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#fff', paddingHorizontal: 12, },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  backButton: { fontSize: 16, color: '#000' },
  cartIcon: { width: 25, height: 25, marginRight: 10 },
  mainImage: {
    width: 300,
    height: 145,
    marginBottom: 15,
    resizeMode: 'contain',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ecd4e4',
    alignSelf: "center"},
    
  productName: { fontSize: 20, fontWeight: 'bold', marginBottom: 6 },
  priceAndRatingContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  productPrice: { fontSize: 20, color: '#000', marginRight: 15, fontWeight: "bold" },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 16, marginLeft: 5, color: '#000' },

  
  separator: { 
    borderBottomColor: '#ddd', 
    borderBottomWidth: 1, 
    marginVertical: 10 
  },
  descriptionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 10 
  },
  descriptionText: { 
    fontSize: 16, 
    color: '#555' 
  },

  iconsContainer: {
  flexDirection: 'column',
  marginTop: 15,
  marginBottom: 15,
},
iconRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
iconItem: {
  alignItems: 'center',
  width: '45%',
},
iconText: {
  fontSize: 12,
  color: '#333',
  textAlign: 'center',
},



  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    fontSize: 16,
    color: '#1E90FF',
    marginRight: 10,
  },
  seeAll1: {
fontSize: 16,
    color: '#1E90FF',
  },
  reviewBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
  },
  ratingSummary: {
    marginBottom: 15,
  },

  reviewCount: {
    fontSize: 16,
    color: '#777',
  },
  stars: {
    flexDirection: 'row',
    marginTop: 5,
  },
  reviewdanhgia: {
flexDirection: 'row',
justifyContent: 'space-between',
  },
 namdg: {
   marginTop: -5,
   height: 80,
   width: 100,
 },
 relevantHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 5,
  marginBottom: 10,
},
relevantProducts: {
  marginBottom: 20,
},
productCard: {
  width: 120,
  marginRight: 10,
  backgroundColor: '#f9f9f9',
  borderRadius: 8,
  padding: 10,
},
productImage: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
  marginBottom: 8,
},
productName: {
  fontWeight: 'bold',
  fontSize: 14,
  color: '#333',
  marginBottom: 5,
  textAlign: 'center',
},
ratingContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
ratingText: {
  fontSize: 12,
  color: '#777',
  marginLeft: 4,
},
productPrice: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#000',
  
},
producngang: {
   flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',  
  width: '100%',

},
ratingText2: { fontSize: 13, marginLeft: 5, color: '#000', fontWeight: 'bold' },
 notificationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    marginTop: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bellIcon: {
    marginRight: 10,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
 buyNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  buyNowButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#00bfff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buyNowText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Review4;
