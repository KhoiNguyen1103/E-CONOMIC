import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useCart } from './CartContext';

const PaymentSuccess = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Nhận dữ liệu từ route.paramsD
  const { card, subtotal } = route.params;

  // Tính thuế và tổng giá trị
  const tax = subtotal * 0.1; // Thuế 10% của subtotal
  const total = subtotal + tax; // Tổng tiền bao gồm thuế

  const [rating, setRating] = useState(4); // Mặc định 4 sao
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal

  const handleRating = (value) => {
    setRating(value);
    setIsModalVisible(true); // Hiển thị modal khi chọn số sao
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const { setCart } = useCart();
  const handleBackToHome = () => {
    setCart([]); // Xóa giỏ hàng
    navigation.navigate('HomeScreen'); // Điều hướng về màn hình chính
  };

  return (
    <ScrollView style={styles.container}
     showsVerticalScrollIndicator={false} >
      <Image source={require('../DataElec/checksucces.png')} style={styles.checksucces} />
      <Text style={styles.successTitle}>Order placed successfully!</Text>
      <Text style={styles.successSubtitle}>
        Thank you for your purchase. A confirmation email has been sent to you.
      </Text>

      {/* Box hiển thị chi tiết đơn hàng */}
      <View style={styles.summaryBox}>
        {/* Subtotal */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>
        {/* Tax */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (10%)</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>
        {/* Fees */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Fees</Text>
          <Text style={styles.summaryValue}>$0.00</Text>
        </View>
        {/* Payment Method */}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Card</Text>
          <View style={styles.cardInfo}>
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardDetail}>{card.detail}</Text>
          </View>
        </View>
        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <View style={styles.successRow}>
            <Text style={styles.successLabel}>Success</Text>
            <Text style={styles.successValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.question}>How was your experience?</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <Icon
              name="star"
              size={30}
              color={star <= rating ? '#FFD700' : '#ccc'}
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal hiển thị feedback */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeIcon} onPress={closeModal}>
              <Icon name="close" size={20} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalHeader}>Customer Survey</Text>
            <View style={styles.modalSeparator} />
            <Text style={styles.modalBody}>
              Thank you for your feedback. Your opinion helps us improve our payment services.
            </Text>
          </View>
        </View>
      </Modal>

      {/* Nút quay về trang chủ */}
      <TouchableOpacity style={styles.backToHomeButton} onPress={handleBackToHome}>
        <Icon name="home" size={20} color="#fff" style={styles.homeIcon} />
        <Text style={styles.backToHomeText}>Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  checksucces: {
height: 90,
width: 90,
alignSelf: 'center',
marginVertical: 10,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00C1D4',
    marginBottom: 10,
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  summaryBox: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  cardDetail: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 15,
  },
  
   modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalBody: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
 closeIcon: {
  position: 'absolute',
  top: 10,
  right: 10,
  zIndex: 1,
},

  // Stars styles
  question: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 5,
  },
  // Nút "Back to Home"
backToHomeButton: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#00C1D4',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 5,
  marginTop: 20,
},
homeIcon: {
  marginRight: 10,
},
backToHomeText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  marginLeft: 40,
},

// Chữ "Success" màu xanh
successRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 10,
},
successLabel: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#33AA6F',
  backgroundColor: '#ecfcf4',
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 5,
},
successValue: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#33AA6F',
},
modalSeparator: {
  width: '100%',
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
  marginVertical: 10,
},


});


export default PaymentSuccess;