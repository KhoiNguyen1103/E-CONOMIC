import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
   Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from './CartContext';

const ProductDetailScreen = () => {

  const { setCart } = useCart(); 
  const route = useRoute();
  const navigation = useNavigation();
   const { product, relatedProducts = [] } = route.params;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const handleAddToCart = () => {
  // Kiểm tra nếu sản phẩm có màu nhưng chưa chọn màu
  if (product.color && product.color.length > 0 && selectedColor === null) {
    setIsModalVisible(true); // Hiển thị modal thông báo lỗi
    return; // Thoát không cho phép thêm vào giỏ hàng
  }

  // Thêm sản phẩm vào giỏ hàng nếu đã chọn màu hoặc không có màu
  setCart((prevCart) => {
    const existingItem = prevCart.find((item) => item.id === product.id);

    if (existingItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      return prevCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Nếu sản phẩm chưa có, thêm mới vào giỏ hàng
      return [
        ...prevCart,
        {
          ...product,
          quantity,
          selectedColor: product.color ? product.color[selectedColor] : null, // Lưu thông tin màu nếu có
        },
      ];
    }
  });

  setIsModalVisible(true); // Hiển thị modal thành công
};


  // Đóng modal
  const closeModal = () => {
    setIsModalVisible(false);
  };


  // Tính tổng tiền
  const totalPrice = (product.price * quantity).toFixed(2);

  // Lấy ảnh chính của sản phẩm và 3 sản phẩm có giá cao nhất
  const mainImage = product.image;
  const topPriceImages = relatedProducts
    .filter((item) => item.category === product.category && item.id !== product.id)
    .sort((a, b) => b.price - a.price)
    .slice(0, 3)
    .map((item) => item.image);

  const images = [mainImage, ...topPriceImages];

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
   
    <View style={styles.container}>
  <View style={styles.header}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}>
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
    <Text style={styles.productCategory}>{product.category}</Text>
  </View>

  {/* Main Image Section */}
  <View style={styles.imageContainer}>
    <Image source={selectedImage} style={styles.mainImage} />
    <View style={styles.thumbnailContainer}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedImage(image)}
          style={[
            styles.thumbnail,
            selectedImage === image && styles.selectedThumbnail,
          ]}>
          <Image source={image} style={styles.thumbnailImage} />
        </TouchableOpacity>
      ))}
    </View>
  </View>

  {/* Scrollable Content */}
  <ScrollView style={styles.scrollContent}
   showsVerticalScrollIndicator={false} >
    <Text
  style={[
    styles.productPrice,
    product.originalPrice && { color: 'red' }, // Đổi màu nếu có giảm giá
  ]}
>
  ${product.price}
  {product.originalPrice && (
    <Text style={styles.originalPrice}> ${product.originalPrice}</Text>
  )}
</Text>
    <View style={styles.tensp}>
      <Text style={styles.productName}>{product.name}</Text>
      <View style={styles.saovaso}>
        <Image
          source={require('../DataElec/Rating3.png')}
          style={styles.saoIcon}
        />
        <Text style={styles.so}>4.5</Text>
      </View>
    </View>

    <Text style={styles.sectionTitle}>Color</Text>
{product.color && product.color.length > 0 ? (
  <View style={styles.colorImageContainer}>
    {product.color.map((colorImage, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.colorImageWrapper,
          selectedColor === index && styles.selectedColorImage,
        ]}
        onPress={() => setSelectedColor(index)} // Chỉ cập nhật trạng thái màu
      >
        <Image source={colorImage} style={styles.colorImage} />
      </TouchableOpacity>
    ))}
  </View>
) : (
  <Text style={styles.noColorText}>No color options available</Text>
)}


    <Text style={styles.sectionTitle}>Quantity</Text>
    <View style={styles.quantityContainer}>
      <TouchableOpacity
        onPress={decreaseQuantity}
        style={[styles.quantityButton, styles.decreaseButton]}>
        <FontAwesome name="minus" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.quantityText}>{quantity}</Text>
      <TouchableOpacity
        onPress={increaseQuantity}
        style={[styles.quantityButton, styles.increaseButton]}>
        <FontAwesome name="plus" size={20} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.totalText}>Total ${totalPrice}</Text>
    </View>

    <View style={styles.infoContainer}>
      <TouchableOpacity style={styles.infoItem}>
        <Text style={styles.infoText}>Size guide</Text>
        <FontAwesome name="angle-right" size={20} color="#888" />
      </TouchableOpacity>
      <TouchableOpacity 
  style={styles.infoItem}
  onPress={() => navigation.navigate('ReviewScreen', { product, relatedProducts })}
>
  <Text style={styles.infoText}>Reviews (99)</Text>
  <FontAwesome name="angle-right" size={20} color="#888" />
</TouchableOpacity>


    </View>

    <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
      <Text style={styles.addToCartButtonText}>Add to Cart</Text>
    </TouchableOpacity>

  </ScrollView>
    <Modal
  visible={isModalVisible}
  transparent={true}
  animationType="fade"
  onRequestClose={closeModal}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <TouchableOpacity
        style={styles.modalCloseButton}
        onPress={closeModal}>
        <FontAwesome name="close" size={24} color="#888" />
      </TouchableOpacity>
      <Text style={styles.modalText}>
        {product.color && product.color.length > 0 && selectedColor === null
          ? 'Please select color before adding to cart.'
          : 'Product has been successfully added to cart!'}
      </Text>
    </View>
  </View>
</Modal>


      
</View>

  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#fffcfc' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  backButton: { padding: 10 },
  backButtonText: { fontSize: 16, color: '#000' },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  mainImage: {
    width: 270,
    height: 145,
    marginBottom: 15,
    resizeMode: 'contain',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  thumbnailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  thumbnail: {
    width: 53,
    height: 53,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  selectedThumbnail: {
    borderColor: '#1E90FF',
    borderWidth: 2,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#00bed3',
    marginVertical: 1,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  originalPrice: {
  textDecorationLine: 'line-through',
  color: '#888',
  fontSize: 14,
  marginLeft: 8,
},
  productCategory: { fontSize: 16, color: '#555', textAlign: 'center', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginLeft: 10 },
  
  
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 20,
    marginRight:-20,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decreaseButton: { backgroundColor: '#ccc' },
  increaseButton: { backgroundColor: '#1E90FF' },
  quantityText: { fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 },
  totalText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  addToCartButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  addToCartButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  infoContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  colorImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  colorImageWrapper: {
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 3,
  },
  selectedColorImage: {
    borderColor: '#1E90FF',
    borderWidth: 2,
    backgroundColor: '#f0f8ff',
  },
  colorImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  noColorText: {
  fontSize: 16,
  fontStyle: 'italic',
  color: '#888',
  textAlign: 'center',
  marginVertical: 10,
},
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  infoText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
   tensp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saovaso: {
    marginRight: 14,
    marginTop: 15,
    flexDirection: 'row',
  },
  so: {
    marginTop: 3,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  scrollContent: {
  flexGrow: 1,
  paddingHorizontal: 12,
},
modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10, // Vị trí nút X ở góc trái trên
  },
});

export default ProductDetailScreen;
