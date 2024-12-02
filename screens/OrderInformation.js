import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  CheckBox,
  TextInput,
  ScrollView,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderInformation = ({ navigation, route  }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const { finalTotal } = route.params || {};

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [provinceAddress, setProvinceAddress] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');

  // Trạng thái để lưu trữ thông báo lỗi
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [provinceAddressError, setProvinceAddressError] = useState('');
  const [detailedAddressError, setDetailedAddressError] = useState('');

  const shippingOptions = [
    { id: 1, label: 'Instant (2 hours delivery)' },
    { id: 2, label: 'Express (2 days delivery)' },
    { id: 3, label: 'Standard (7-10 days delivery)' },
  ];

  const handleOptionSelect = (id) => {
    setSelectedOption(id);
  };


  const validateInput = () => {
  const nameRegex = /^[a-zA-Z aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s]+$/;
  const phoneRegex = /^[0-9]+$/;
  const addressRegex = /^[a-zA-ZaAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ\s0-9\s,.-]+$/;

  let valid = true;

  if (!name.trim()) {
    setNameError('Name is required.');
    valid = false;
  } else if (!nameRegex.test(name.trim())) {
    setNameError('Name can only contain letters, spaces, and valid accents.');
    valid = false;
  } else {
    setNameError('');
  }

  if (!phone.trim()) {
    setPhoneError('Phone number is required.');
    valid = false;
  } else if (!phoneRegex.test(phone.trim())) {
    setPhoneError('Phone number can only contain digits.');
    valid = false;
  } else {
    setPhoneError('');
  }

  if (!provinceAddress.trim()) {
    setProvinceAddressError('Province/District/Ward is required.');
    valid = false;
  } else if (!addressRegex.test(provinceAddress.trim())) {
    setProvinceAddressError('Address cannot contain special characters.');
    valid = false;
  } else {
    setProvinceAddressError('');
  }

  if (!detailedAddress.trim()) {
    setDetailedAddressError('Street/Building/House Number is required.');
    valid = false;
  } else if (!addressRegex.test(detailedAddress.trim())) {
    setDetailedAddressError('Address cannot contain special characters.');
    valid = false;
  } else {
    setDetailedAddressError('');
  }

  return valid;
};

const [isShippingErrorVisible, setIsShippingErrorVisible] = useState(false); // Trạng thái modal lỗi

const handleNext = () => {
  if (!selectedOption) {
    setIsShippingErrorVisible(true);
    return;
  }

  if (validateInput()) {
    // Chuẩn hóa dữ liệu sản phẩm trước khi truyền sang màn hình tiếp theo
    const formattedProducts = (route.params?.products || []).map((product) => ({
      name: product.name, 
      quantity: product.quantity,
      price: product.price,
    }));

    navigation.navigate('Payment', {
      finalTotal,
      shippingMethod: shippingOptions.find((option) => option.id === selectedOption)?.label,
      address: {
        fullName: name,
        phone,
        province: provinceAddress,
        street: detailedAddress,
      },
      products: formattedProducts, // Truyền danh sách sản phẩm chuẩn hóa
    });
  }
};





// Đóng modal lỗi
const closeShippingErrorModal = () => {
  setIsShippingErrorVisible(false);
};


  return (
    <ScrollView style={styles.container}
     showsVerticalScrollIndicator={false} >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Information</Text>
      </View>

      <View style={styles.separator} />

      {/* Shipping Options */}
      <Text style={styles.sectionTitle}>Shipping options</Text>
      <View style={styles.optionsContainer}>
        {shippingOptions.map((option) => (
          <View key={option.id} style={styles.option}>
            <CheckBox
              value={selectedOption === option.id}
              onValueChange={() => handleOptionSelect(option.id)}
            />
            <Text style={styles.optionLabel}>{option.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.separator} />

      {/* Full Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
      </View>

      {/* Phone Number Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          keyboardType="numeric"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
      </View>

      {/* Address Inputs */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Province/District/Ward</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter province, district, ward"
          value={provinceAddress}
          onChangeText={(text) => setProvinceAddress(text)}
        />
        {provinceAddressError ? (
          <Text style={styles.errorText}>{provinceAddressError}</Text>
        ) : null}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Street/Building/House Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street, building, house number"
          value={detailedAddress}
          onChangeText={(text) => setDetailedAddress(text)}
        />
        {detailedAddressError ? (
          <Text style={styles.errorText}>{detailedAddressError}</Text>
        ) : null}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>

      <Modal visible={isShippingErrorVisible} transparent animationType="fade">
  <View style={styles.modalOverlay}>
    <View style={styles.errorModal}>
      <TouchableOpacity style={styles.modalCloseButton} onPress={closeShippingErrorModal}>
        <Text style={styles.modalCloseButtonText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.modalMessage}>Please select shipping method!</Text>
    </View>
  </View>
</Modal>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: { fontSize: 16, color: '#000' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#000' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  optionsContainer: { marginVertical: 20 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionLabel: { fontSize: 14, marginLeft: 10 },
  separator: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  nextButton: {
    backgroundColor: '#00C1D4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
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
  marginBottom: 20,
  fontWeight: 'bold',
  marginTop: 20,
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

});

export default OrderInformation;
