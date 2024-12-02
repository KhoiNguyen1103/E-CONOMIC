import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCart } from './CartContext'


const ShoppingCart = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cart, setCart, removedItems, setRemovedItems } = useCart();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(0); // Lưu trữ số lượng tạm thời
   const [discount, setDiscount] = useState(0); 
const handleBack = () => {
  navigation.navigate('HomeScreen', { cart, removedItems });
};
const [voucherCode, setVoucherCode] = useState(''); // State for voucher input
const [isVoucherApplied, setIsVoucherApplied] = useState(false); 

  // Hàm tăng số lượng
  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Hàm giảm số lượng
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  };

  // Hàm xác nhận và cập nhật số lượng
  const confirmQuantity = () => {
  if (quantity === 0) {
    setCart((prevCart) => prevCart.filter((item) => item.id !== selectedItem.id));
    setRemovedItems((prev) => [...prev, selectedItem.id]);
  } else {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === selectedItem.id ? { ...item, quantity: quantity } : item
      )
    );
  }
  closeModal();
};


  // Mở Modal và đặt số lượng ban đầu
  const openModal = (item) => {
    setSelectedItem(item);
    setQuantity(item.quantity); // Đặt số lượng hiện tại của sản phẩm
    setIsModalVisible(true);
  };

  // Đóng Modal
  const closeModal = () => {
    setSelectedItem(null);
    setIsModalVisible(false);
  };

  // Danh sách mã giảm giá
const vouchers = {
  'chaobanmoi2': 20,
  'chaobanmoi3': 30,
  'chaobanmoi4': 40,
  'chaobanmoi5': 50,
  'chaobanmoi8': 80,
};

// State quản lý modal lỗi giỏ hàng trống
const [isEmptyCartModalVisible, setIsEmptyCartModalVisible] = useState(false);

// Hàm đóng modal lỗi giỏ hàng trống
const closeEmptyCartModal = () => {
  setIsEmptyCartModalVisible(false);
};

// Hàm xử lý áp dụng mã giảm giá
const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false); // Hiển thị Modal feedback
const [feedbackMessage, setFeedbackMessage] = useState(''); // Nội dung hiển thị trong Modal

// Hàm xử lý áp dụng mã giảm giá
const handleApplyVoucher = () => {
  if (cart.length === 0) {
    setIsEmptyCartModalVisible(true); // Hiển thị modal nếu giỏ hàng trống
    return;
  }

  const trimmedCode = voucherCode.trim();
  if (vouchers[trimmedCode]) {
    const discountValue = vouchers[trimmedCode];
    setDiscount(discountValue); // Lưu giá trị giảm giá
    setIsVoucherApplied(true);
    setFeedbackMessage(`Valid coupon code for ${discountValue}% off!`);
  } else {
    setFeedbackMessage('Invalid voucher code!');
    setDiscount(0); // Reset discount nếu mã không hợp lệ
    setIsVoucherApplied(false);
  }
  setIsFeedbackModalVisible(true); // Hiển thị Modal phản hồi
};

const handleNext = () => {
  if (cart.length === 0) {
    setIsEmptyCartModalVisible(true); // Hiển thị modal nếu giỏ hàng trống
    return;
  }

  // Chuyển đổi dữ liệu giỏ hàng sang đúng định dạng
  const formattedCart = cart.map((item) => ({
  id: item.id, // Sử dụng id làm khóa duy nhất
  name: item.name,  // Ưu tiên productName
  quantity: item.quantity,
  price: item.price,
}));


  navigation.navigate('OrderInformation', {
    finalTotal: calculateTotalPrice(), // Tổng giá trị
    products: formattedCart, // Sử dụng cart đã được format
  });
};



// Hàm đóng Modal
const closeFeedbackModal = () => {
  setIsFeedbackModalVisible(false);
};


// Hàm tính tổng giá trị sau giảm giá
const calculateTotalPrice = () => {
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  return isVoucherApplied ? total * (1 - discount / 100) : total;
};
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
  <Text style={styles.backButton}>Back</Text>
</TouchableOpacity>
        <Text style={styles.headerText}>Shopping Cart</Text>
      </View>

      <FlatList
        data={cart}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.details}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDescription}>Consequat ex eu</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
            <View style={styles.butvagia}>
              <TouchableOpacity
                style={styles.editIcon}
                onPress={() => openModal(item)}
              >
                <Icon name="edit" size={16} color="#888" />
              </TouchableOpacity>
              <Text style={styles.quantity}>x{item.quantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
         showsVerticalScrollIndicator={false} 
      />

      {/* Modal tăng giảm số lượng */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cập nhật số lượng</Text>
            <View style={styles.modalControls}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={decreaseQuantity}
              >
                <Text style={styles.modalButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.modalQuantity}>{quantity}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={increaseQuantity}
              >
                <Text style={styles.modalButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={confirmQuantity}
            >
              <Text style={styles.closeModalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.voucherContainer}>
  <Text style={styles.voucherLabel}>Voucher</Text>
  <View style={styles.voucherInputContainer}>
    <TextInput
      style={styles.voucherInput}
      placeholder="Enter voucher code"
      value={voucherCode}
      onChangeText={(text) => {
        setVoucherCode(text);
        setIsVoucherApplied(false); // Reset applied state
      }}
    />
    <TouchableOpacity
      style={[
        styles.applyButton,
        { backgroundColor: voucherCode.trim() ? '#1E90FF' : '#ddd' },
      ]}
      onPress={handleApplyVoucher}
      disabled={!voucherCode.trim()}
    >
      <Text style={styles.applyButtonText}>Apply</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.totalContainer}>
  <Text style={styles.totalLabel}>TOTAL</Text>
  <Text style={styles.totalValue}>${calculateTotalPrice().toFixed(2)}</Text>
</View>
<View style={styles.nextButtonContainer}>
  <TouchableOpacity
  style={styles.nextButton}
  onPress={handleNext} // Gọi hàm handleNext thay vì trực tiếp điều hướng
>
  <Text style={styles.nextButtonText}>Next →</Text>
</TouchableOpacity>



</View>


</View>

<Modal visible={isFeedbackModalVisible} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.feedbackModal}>
      <TouchableOpacity style={styles.closeButton} onPress={closeFeedbackModal}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.feedbackMessage}>{feedbackMessage}</Text>
    </View>
  </View>
</Modal>

<Modal visible={isEmptyCartModalVisible} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.emptyCartModal}>
      <TouchableOpacity
        style={styles.modalCloseButton}
        onPress={closeEmptyCartModal}
      >
        <Text style={styles.modalCloseButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.modalMessage}>Your cart is empty. Please add items to your cart!</Text>
    </View>
  </View>
</Modal>



    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 10 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: { fontSize: 16, color: '#000' },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 55,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  productImage: { width: 60, height: 60, marginRight: 10 },
  details: { flex: 1 },
  productName: { fontSize: 18, fontWeight: 'bold' },
  productDescription: { fontSize: 14, color: '#777' },
  productPrice: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginLeft: 20,
  },
  editIcon: {
    marginLeft: 20,
    marginTop: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  modalControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E90FF',
    borderRadius: 5,
  },
  modalButtonText: { fontSize: 20, color: '#fff', fontWeight: 'bold' },
  modalQuantity: { fontSize: 18, marginHorizontal: 20 },
  closeModalButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: { color: '#fff', fontWeight: 'bold' },
  // Add these styles in the StyleSheet section

voucherContainer: {
  marginVertical: 20,
},
voucherLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 10,
  marginLeft: 4,
},
voucherInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},
voucherInput: {
  flex: 1,
  height: 40,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 5,
  paddingHorizontal: 10,
  marginRight: 10,
},
applyButton: {
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 5,
},
applyButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
totalContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 20,
  paddingHorizontal: 10,
  borderTopWidth: 1,
  borderColor: '#ddd',
  paddingTop: 10,
},
totalLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#555',
},
totalValue: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
},
nextButtonContainer: {
  marginTop: 20,
},
nextButton: {
  backgroundColor: '#00C1D4', // Set the background color
  borderRadius: 10,
  paddingVertical: 12,
  alignItems: 'center',
},
nextButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},
modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},
feedbackModal: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  elevation: 5,
  position: 'relative', // Để định vị nút "X"
},
feedbackMessage: {
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
  marginVertical: 20,
},
closeButton: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 10,
},
closeButtonText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000', // Màu đen cho nút "X"
},
emptyCartModal: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
    position: 'relative', // Để định vị nút "X"
  },
  modalMessage: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  modalCloseButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
  },
  modalCloseButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000'
  },


});

export default ShoppingCart;
