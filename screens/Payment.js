// Existing imports and code
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ScrollView, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useCart } from './CartContext'; // Sử dụng context giỏ hàng
import { useAuth } from './AuthContext';

const Payment = () => {
  const { userId } = useAuth(); 
  
  const route = useRoute();
  const navigation = useNavigation();
  const { cart } = useCart();


  // Lấy `finalTotal` từ route params
  const subtotal = route.params?.finalTotal || 0; // Giá trị tổng từ ShoppingCart
   const shippingMethod = route.params?.shippingMethod || '';
    const address = route.params?.address || {};
      const products = route.params?.products || [];
      const [successVisible, setSuccessVisible] = useState(false); // State for success notification


  // Tính thuế và tổng
  const tax = subtotal * 0.1; // Thuế 10%
  const calculateTotalPriceWithTax = () => {
    return (subtotal + tax).toFixed(2); // Tổng giá trị sau thuế
  };


  // New states for payment options
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentMethods = [
    { id: 1, label: 'Visa', image: require('../DataElec/visa.png'), detail: '***** 2334' },
    { id: 2, label: 'MasterCard', image: require('../DataElec/mtcartv.png'), detail: '***** 3774' },
    { id: 3, label: 'PayPal', image: require('../DataElec/paypalvip.png'), detail: 'lttan4@gmail.com' },
    { id: 4, label: 'MoMo', image: require('../DataElec/momo.png'), detail: '****** 7676' },
  ];

  const handlePaymentSelect = (id) => {
    setSelectedPayment(id);
  };

  // State quản lý modal lỗi
const [isPaymentErrorVisible, setIsPaymentErrorVisible] = useState(false);

// Xử lý xác nhận thanh toán
   const handleConfirmPayment = async () => {
  if (!selectedPayment) {
    setIsPaymentErrorVisible(true);
    return;
  }

  if (!userId) {
    Alert.alert('Error', 'User ID not found. Please log in again.');
    navigation.navigate('Screen_03');
    return;
  }

  const orderData = {
    userId, // Lấy từ AuthContext
    products: route.params?.products || [], // Đã chuẩn hóa từ các màn hình trước
    shippingMethod,
    address: route.params?.address || {}, // Thông tin địa chỉ từ OrderInformation
    subtotal: parseFloat(subtotal.toFixed(2)), // Giá trị subtotal đã truyền từ ShoppingCart
    tax: parseFloat(tax.toFixed(2)), // Thuế đã được tính
    total: parseFloat(calculateTotalPriceWithTax()),
    createdAt: new Date().toISOString(), // Thời gian tạo đơn hàng
  };

  try {
    const response = await fetch('http://localhost:8692/createOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (response.ok) {
      const createdOrder = await response.json();
      console.log('Order created:', createdOrder);

      // Show success notification
      setSuccessVisible(true);

      // Navigate to PaymentSuccess screen after a short delay
      setTimeout(() => {
        setSuccessVisible(false); // Hide success notification
        navigation.navigate('PaymentSuccess', {
          orderId: createdOrder._id,
          subtotal: parseFloat(subtotal.toFixed(2)), // Truyền subtotal
          tax: parseFloat(tax.toFixed(2)), // Truyền tax đã được tính ở trên
          card: paymentMethods.find((method) => method.id === selectedPayment),
        });
      }, 1000); // Show success message for 2 seconds
    } else {
      Alert.alert('Error', 'Failed to create order.');
    }
  } catch (error) {
    console.error('Error:', error);
    Alert.alert('Error', 'Something went wrong.');
  }
};





// Đóng modal lỗi
const closePaymentErrorModal = () => {
  setIsPaymentErrorVisible(false);
};



  return (
    <ScrollView style={styles.container}
     showsVerticalScrollIndicator={false} >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>
      

      {/* Total Amount */}
      <View style={styles.content}>
  <Text style={styles.totalLabel}>TOTAL</Text>
  <Text style={styles.totalValue}>${calculateTotalPriceWithTax()}</Text>
</View>


      {/* Payment Options */}
      <View style={styles.paymentOptionsContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentOption,
              selectedPayment === method.id && styles.selectedOption,
            ]}
            onPress={() => handlePaymentSelect(method.id)}
          >
            <Image source={method.image} style={styles.paymentImage} />
            <View style={styles.paymentDetails}>
              <Text style={styles.paymentLabel}>{method.label}</Text>
              <Text style={styles.paymentDetail}>{method.detail}</Text>
            </View>
            {selectedPayment === method.id && (
              <View style={styles.radioButtonSelected} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* Confirm Payment Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmPayment}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>

      <Modal visible={isPaymentErrorVisible} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.errorModal}>
      <TouchableOpacity
        style={styles.modalCloseButton}
        onPress={closePaymentErrorModal}
      >
        <Text style={styles.modalCloseButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.modalMessage}>Please select a payment method!</Text>
    </View>
  </View>
</Modal>
<Modal visible={successVisible} transparent animationType="fade">
  <View style={styles.modalOverlay2}>
    <View style={styles.successModal}>
      <Text style={styles.successMessage}>Payment Successful!</Text>
    </View>
  </View>
</Modal>


    </ScrollView>
  );
};

// Existing and new styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: '#000',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 30,
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  totalValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentOptionsContainer: {
    marginTop: 30,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedOption: {
    borderColor: '#00C1D4',
  },
  paymentImage: {
    width: 40,
    height: 40,
    marginRight: 15,
    borderRadius: 5,
  },
  paymentDetails: {
    flex: 1,
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentDetail: {
    fontSize: 14,
    color: '#666',
  },
  radioButtonSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00C1D4',
    backgroundColor: '#0193aa',
  },
  confirmButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: '#00C1D4',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối mờ
},
errorModal: {
  width: '80%',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  alignItems: 'center',
  elevation: 5,
},
modalMessage: {
  fontSize: 16,
  color: '#333',
  textAlign: 'center',
  marginVertical: 20,
  fontWeight: 'bold',
},
modalCloseButton: {
  position: 'absolute',
  top: 10,
  right: 10,
},
modalCloseButtonText: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#000', // Màu đen
},
successModal: {
  width: '80%',
  backgroundColor: '#4CAF50',
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
  elevation: 5,
},
successMessage: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
},
modalOverlay2: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},


});

export default Payment;
