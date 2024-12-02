import React, { createContext, useState, useContext, useEffect  } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  ImageBackground,
  Modal
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from './CartContext';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from 'react-native-paper'; 
import { useAuth } from './AuthContext';
import { Alert } from 'react-native';



const HomeScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
   const { userId } = useAuth();
   const [deleteOrderModalVisible, setDeleteOrderModalVisible] = useState(false);
const [orderIdToDelete, setOrderIdToDelete] = useState(null);
const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
const [orderIdForFeedback, setOrderIdForFeedback] = useState(null);
const [rating, setRating] = useState(0);
const [feedbackText, setFeedbackText] = useState("");
const [inboxAlertVisible, setInboxAlertVisible] = useState(false);


const [thankYouModalVisible, setThankYouModalVisible] = useState(false);
const [selectedEmotion, setSelectedEmotion] = useState(null);
const [selectedServices, setSelectedServices] = useState([]);
const [searchDate, setSearchDate] = useState('');
const filterOrders = () => {
if (!searchDate) return orders; // Nếu không nhập, trả về toàn bộ đơn hàng

return orders.filter((order) => {
  const fullDate = new Date(order.createdAt).toLocaleString('en-GB'); // Format: DD/MM/YYYY HH:mm
  const dateOnly = new Date(order.createdAt).toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
  return fullDate.includes(searchDate) || dateOnly === searchDate; // So sánh cả ngày và ngày-giờ
});
};



const toggleService = (service) => {
if (selectedServices.includes(service)) {
  setSelectedServices(selectedServices.filter((item) => item !== service));
} else {
  setSelectedServices([...selectedServices, service]);
}
};


const handleFeedbackSubmit = () => {
setFeedbackModalVisible(false);
setRating(0);
setFeedbackText("");
setThankYouModalVisible(true); // Open the thank-you modal
};

const closeThankYouModal = () => {
setThankYouModalVisible(false); // Close the thank-you modal
};


const openFeedbackModal = (orderId) => {
setOrderIdForFeedback(orderId);
setFeedbackModalVisible(true);
};

const closeFeedbackModal = () => {
setOrderIdForFeedback(null);
setFeedbackModalVisible(false);
};

const handleRatingPress = (value) => {
setRating(value);
};

// Hàm mở Modal xác nhận xóa
const openDeleteOrderModal = (orderId) => {
setOrderIdToDelete(orderId);
setDeleteOrderModalVisible(true);
};

// Hàm đóng Modal
const closeDeleteOrderModal = () => {
setOrderIdToDelete(null);
setDeleteOrderModalVisible(false);
};

   const fetchOrders = async () => {
  try {
    const response = await axios.get(`http://localhost:8692/orders/${userId}`);
    setOrders(response.data);
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

useEffect(() => {
  if (isOrderModalVisible) {
    fetchOrders();
  }
}, [isOrderModalVisible]);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

const { cart, setCart } = useCart(); // Sử dụng CartContext để đồng bộ giỏ hàng
  const [selectedFooter, setSelectedFooter] = useState('');
  const [userName, setUserName] = useState("");
    // State để quản lý thông tin tài khoản
  const [userPassword, setUserPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
    // State cho modal

  const [editModalVisible, setEditModalVisible] = useState(false);
   const [passwordVisible, setPasswordVisible] = useState(false);
   // State để quản lý trạng thái modal và dữ liệu khi chỉnh sửa
   const [snackbarVisible, setSnackbarVisible] = useState(false); // Trạng thái hiển thị của Snackbar
const [snackbarMessage, setSnackbarMessage] = useState("");

       const [editAccountModalVisible, setEditAccountModalVisible] = useState(false);
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');

  const [emailError, setEmailError] = useState('');
const [passwordError, setPasswordError] = useState('');
const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


const openEditAccountModal = () => {
setUpdatedEmail(userEmail); // Đồng bộ giá trị email hiện tại
setUpdatedPassword(userPassword); // Đồng bộ giá trị password hiện tại
setEditAccountModalVisible(true); // Mở modal
};


useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail'); // Get email from AsyncStorage
      if (email) {
        const response = await axios.get(`http://localhost:8692/user/${email}`);
        if (response.data) {
          setUserName(response.data.name); // Set the user's name
          setUserEmail(email); // Set the email
          setUserPassword(response.data.password); // Set the password (for display)
        }
      } else {
        console.error('No email found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error fetching user information:', error);
    }
  };
  fetchUserInfo();
}, []);


  const [modalVisible, setModalVisible] = useState(false); // State cho modal Account
  // Hàm xử lý lưu thay đổi tài khoản
const handleSaveEditAccount = async () => {
let isValid = true;

// Validate email
if (!updatedEmail.trim()) {
  setEmailError('Email cannot be empty.');
  isValid = false;
} else if (!email_pattern.test(updatedEmail)) {
  setEmailError('Invalid email format.');
  isValid = false;
} else {
  setEmailError(''); // Clear error if valid
}

// Validate password
if (!updatedPassword.trim()) {
  setPasswordError('Password cannot be empty.');
  isValid = false;
} else if (!password_pattern.test(updatedPassword)) {
  setPasswordError(
    'Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.'
  );
  isValid = false;
} else {
  setPasswordError(''); // Clear error if valid
}

// Proceed to update if all validations pass
if (isValid) {
  try {
    const updatedData = {
      email: updatedEmail,
      password: updatedPassword,
    };
    const response = await axios.put(`http://localhost:8692/user/${userEmail}`, updatedData);

    if (response.data) {
      setSnackbarMessage("Account updated successfully!"); // Đặt thông báo thành công
      setSnackbarVisible(true); // Hiển thị snackbar
      setUserEmail(updatedEmail);
      setUserPassword(updatedPassword);
      setEditAccountModalVisible(false);
    }
  } catch (error) {
    console.error("Error updating account:", error);
    alert("Failed to update account. Please try again.");
  }
}
};

const handleConfirmDeleteOrder = async () => {
if (!orderIdToDelete) return;

try {
  const response = await axios.delete(`http://localhost:8692/deleteOrder/${orderIdToDelete}`);
  if (response.status === 200) {
    // Cập nhật danh sách đơn hàng sau khi xóa
    fetchOrders();
  } else {
    console.error('Failed to cancel the order.');
  }
} catch (error) {
  console.error('Error deleting order:', error);
} finally {
  closeDeleteOrderModal(); // Đóng modal sau khi xử lý
}
};




useEffect(() => {
if (editAccountModalVisible) {
  setUpdatedEmail(userEmail);
  setUpdatedPassword(userPassword);
}
}, [editAccountModalVisible]);


const handleLogout = async () => {
  try {
    // Xóa thông tin người dùng khỏi AsyncStorage
    await AsyncStorage.removeItem("userEmail");
    
    // Đóng modal trước khi chuyển hướng
    setModalVisible(false);

    // Điều hướng đến màn hình đăng nhập
    navigation.replace("Screen_03");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};


  const categori = [
    {
      id: 'electronics',
      name: 'Electronics',
      image: require('../DataElec/phone.png'),
      bgColor: '#8A2BE2',
    },
    {
      id: 'fashion',
      name: 'Fashion',
      image: require('../DataElec/giay.png'),
      bgColor: '#3f68e4',
    },
    {
      id: 'beauty',
      name: 'Beauty',
      image: require('../DataElec/sonmoi.png'),
      bgColor: '#FF7F50',
    },
    {
      id: 'fresh-food', 
      name: 'Fresh Fruits',
      image: require('../DataElec/traibo.png'),
      bgColor: '#df5857',
    },
  ];

  const displayproduct = [
{ id: '1', name: 'Iphone16 Prm', price: 899, image: require('../DataSmart/iphone-16prm.png')},
{ id: '2', name: 'Iphone15 Prm', price: 899, image: require('../DataSmart/iphone15prm.png')},
{ id: '3', name: 'IpadPro 1TB', price: 899, image: require('../DataSmart/ipadpro1tb.png')},
{ id: '4', name: 'IpadPro M4', price: 899, image: require('../DataSmart/ipad-pro-m4.png')},
{ id: '5', name: 'MacAirM2', price: 899, image: require('../DataSmart/MacAirM2.png')},
{ id: '6', name: 'MacM3 512GB', price: 899, image: require('../DataSmart/MacAirM3_564.webp')},
{ id: '7', name: 'AirPod Max', price: 899, image: require('../DataSmart/Apple_airpos_max.png')},
{ id: '8', name: 'AirPod 4', price: 899, image: require('../DataSmart/airpods-4.png')},
  ];

  const [showAllProducts, setShowAllProducts] = useState(false); // Trạng thái hiển thị tất cả sản phẩm
  const productsToDisplay = showAllProducts ? displayproduct : displayproduct.slice(0, 4); // Hiển thị tất cả hoặc 4 sản phẩm


  return (
    <View style={styles.container1}>
    <ImageBackground
        source={require('../Data/nenheader.jpg')} // Đường dẫn tới hình ảnh nền
        style={styles.headerBackground} // Định nghĩa kiểu cho ảnh nền
        resizeMode="cover" // Đảm bảo ảnh nền vừa khít với header
      >
      {/* Header Section */}
      <View style={styles.header}>
      <View>
        <Text style={styles.headerText}>E-Commercial</Text>
        <Text style={styles.headerText2}>Market</Text>
        <View style={styles.ten}>
        <Text style={styles.headerText3}>Hi:</Text>
        <Text style={styles.headerText4}> {userName}</Text>
        <Text style={styles.headerText4}> !</Text>
        </View>
        </View>
        <View style={styles.headerIcons}>
{/* Biểu tượng Giỏ hàng */}
<TouchableOpacity
  onPress={() => navigation.navigate('ShoppingCart', { cart })}
  style={styles.iconWrapper1} // Đảm bảo chỉ định vùng click đúng
>
  <Image
    source={require('../DataElec/giohangvip.png')}
    style={styles.giohang}
  />
</TouchableOpacity>

{/* Biểu tượng Đơn hàng */}
<TouchableOpacity
  onPress={() => setIsOrderModalVisible(true)}
  style={styles.iconWrapper} // Đảm bảo chỉ định vùng click đúng
>
  <Image
    source={require('../Data2/donhang2.png')}
    style={styles.icon}
  />
</TouchableOpacity>
</View>



      </View>
      </ImageBackground>

      

      <FlatList
        horizontal
        data={categori}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItemcontainer} onPress={() => {
        if (item.id === 'electronics') {
          navigation.navigate('ElectricScreen'); // Điều hướng tới ElectronicScreen
        } else if (item.id === 'fashion') {
          navigation.navigate('Fashion'); // Điều hướng tới FashionScreen
        } else if (item.id === 'beauty') {
          navigation.navigate('BeautyScreen'); // Điều hướng tới BeautyScreen
        } else if (item.id === 'fresh-food') {
          navigation.navigate('FreshFood'); // Điều hướng tới FreshFoodScreen
        }
      }}>
            <View
              style={[styles.categoryItem, { backgroundColor: item.bgColor }]}>
              <Image source={item.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
<ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 15}}
 showsVerticalScrollIndicator={false} >
      <View style={styles.topBanner}>
        <Image
          source={require('../DataElec/jordan.png')}
          style={styles.topBannerImage}
        />
        <View style={styles.topBannerText}>
          <Text style={styles.bannerTitle}>Shoes</Text>
          <Text style={styles.bannerSubtitle}>50% off</Text>
          <TouchableOpacity style={styles.buyButton}  onPress={() => navigation.navigate('Fashion', { selectedCategory: 'Shoe' })}>
            <Text style={styles.buyButtonText}>Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomBannercontainer1}>
        <TouchableOpacity style={styles.smallBanner}  onPress={() => navigation.navigate('Fashion', { selectedCategory: 'Handbag' })}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>30%</Text>
          </View>
          <Image
            source={require('../DataElec/bannertui.png')}
            style={styles.smallBannerImage}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.smallBanner} onPress={() => navigation.navigate('ElectricScreen', { selectedCategory: 'Laptop' })}>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>30%</Text>
          </View>
          <Image
            source={require('../DataElec/macbanner.png')}
            style={styles.smallBannerImage}
          />
        </TouchableOpacity>
      </View>

      
        <View>
        {/* Header của danh sách sản phẩm */}
        <View style={styles.headerRow}>
  <Text style={styles.recommendationTitle}>Recommended for you</Text>
  <TouchableOpacity onPress={() => setShowAllProducts(!showAllProducts)}>
    <Text style={styles.viewAllText}>
      {showAllProducts ? 'View less' : 'View all'}
    </Text>
  </TouchableOpacity>
</View>


        {/* Danh sách sản phẩm */}
        <FlatList
        horizontal
        data={productsToDisplay}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ElectricScreen')}>
            {/* Hình ảnh sản phẩm */}
            <Image source={item.image} style={styles.productImage} />
            
            {/* Tên sản phẩm */}
            <Text style={styles.productName}>{item.name}</Text>
            
            {/* Giá và đánh giá sản phẩm */}
            <View style={styles.productInfo}>
              <View style={styles.starRating}>
                <Icon name="star" size={14} color="#FFD700" />
                <Text style={styles.sao}>4.5</Text>
              </View>
              <Text style={styles.productPrice}>${item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false} // Ẩn thanh cuộn ngang
      />
        
      </View>

        
</ScrollView>

<Snackbar
    visible={snackbarVisible}
    onDismiss={() => setSnackbarVisible(false)} // Đóng Snackbar sau khi hiển thị
    duration={1500} // Hiển thị trong 1 giây
    style={{ backgroundColor: '#4CAF50', marginBottom: 550, }} // Màu nền xanh lá thành công
  >
    {snackbarMessage}
  </Snackbar>
  
      <View style={styles.footer}>
{['Home', 'Search', 'Favorites', 'Inbox', 'Account'].map((item, index) => (
  <TouchableOpacity
    key={index}
    onPress={() => {
      if (item === 'Account') {
        setModalVisible(true); // Mở Modal nếu chọn "Account"
      } else if (item === 'Inbox') {
        setInboxAlertVisible(true); // Hiển thị thông báo khi nhấn "Inbox"
      } else {
        setSelectedFooter(item); // Đổi trạng thái footer được chọn
      }
    }}>
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
            : 'person-outline' // Icon cho "Account"
        }
        size={24}
        color={selectedFooter === item ? '#1E90FF' : '#808080'} // Đổi màu khi được chọn
      />
      <Text
        style={[
          styles.footerText,
          selectedFooter === item && styles.footerTextActive, // Đổi màu text khi được chọn
        ]}>
        {item}
      </Text>
    </View>
  </TouchableOpacity>
))}
</View>

<Modal
visible={inboxAlertVisible}
animationType="slide"
transparent={true}
onRequestClose={() => setInboxAlertVisible(false)}
>
<View style={styles.inboxModalOverlay}>
  <View style={styles.inboxModalContent}>
    <Text style={styles.inboxModalHeader}>Hotline</Text>
    <Text style={styles.inboxModalMessage}>
      If you need support, please contact hotline "1900-0000" for support from staff.
    </Text>
    <TouchableOpacity
      style={styles.inboxModalButton}
      onPress={() => setInboxAlertVisible(false)}
    >
      <Text style={styles.inboxModalButtonText}>Close</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>



      {/* Modal for Account Menu */}
<Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => setModalVisible(false)} // Close the modal when tapping outside
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeader}>Account</Text>

      {/* Option to Edit Account */}
<TouchableOpacity
style={[styles.modalButton, { backgroundColor: 'green' }]}
onPress={() => {
  setModalVisible(false); // Đóng modal chính
  openEditAccountModal(); // Gọi hàm mở modal Edit Account
}}
>
<Text style={styles.modalButtonText}>Edit Account</Text>
</TouchableOpacity>



      {/* Option to View Account Information */}
      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: 'blue' }]}
        onPress={() => {
          setModalVisible(false); // Close the main modal
          setEditModalVisible(true); // Open the account information modal
        }}
      >
        <Text style={styles.modalButtonText}>Information Account</Text>
      </TouchableOpacity>

      {/* Option to Log Out */}
      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: 'orange' }]}
        onPress={handleLogout} // Trigger logout functionality
      >
        <Text style={styles.modalButtonText}>Log out</Text>
      </TouchableOpacity>

      {/* Close Modal Button */}
      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: 'red' }]}
        onPress={() => setModalVisible(false)}
      >
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{/* Modal to Display Account Information */}
<Modal
  animationType="slide"
  transparent={true}
  visible={editModalVisible}
  onRequestClose={() => setEditModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeader}>Account Information</Text>

      {/* Display User Information */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Name:</Text>
        <Text style={styles.infoText}>{userName}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Email:</Text>
        <Text style={styles.infoText}>{userEmail}</Text>
      </View>
      <View style={styles.infoRow}>
<Text style={styles.infoLabel}>Password:</Text>
<View style={styles.passwordContainer}>
  {/* Hiển thị mật khẩu hoặc dấu sao */}
  <Text style={styles.infoText}>
    {passwordVisible ? userPassword : '********'}
  </Text>
  {/* Biểu tượng mắt */}
  <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
    <Icon
      name={passwordVisible ? 'eye-off-outline' : 'eye-outline'} // Mắt mở hoặc nhắm
      size={20}
      color="gray"
      style={{ marginLeft: 10 }}
    />
  </TouchableOpacity>
</View>
</View>

      {/* Close Account Information Modal */}
      <TouchableOpacity
        style={[styles.modalButton, { backgroundColor: 'red' }]}
        onPress={() => setEditModalVisible(false)}
      >
        <Text style={styles.modalButtonText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

{/* Modal Edit Account */}
<Modal
animationType="slide"
transparent={true}
visible={editAccountModalVisible}
onRequestClose={() => setEditAccountModalVisible(false)}
>
<View style={styles.modalContainer}>
  <View style={styles.modalContent}>
    <Text style={styles.modalHeader}>Edit Account</Text>

    {/* Input chỉnh sửa Email */}

      <TextInput
        placeholder="Edit email"
        value={updatedEmail}
        onChangeText={(text) => setUpdatedEmail(text)}
        style={styles.input}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


    {/* Input chỉnh sửa Password */}

      <TextInput
        placeholder="Edit password"
        value={updatedPassword}
        onChangeText={(text) => setUpdatedPassword(text)}
        style={styles.input}
        secureTextEntry={!passwordVisible}
      />
      <TouchableOpacity
        onPress={() => setPasswordVisible(!passwordVisible)} 
        style={{ position: 'absolute', right: 25, top: 23 }} 
      >
        <Icon
          name={passwordVisible ? "eye-off-outline" : "eye-outline"} 
          size={20}
          color="gray"
        />
      </TouchableOpacity>
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
  

    {/* Nút Save */}
    <TouchableOpacity
      style={[styles.modalButton, { backgroundColor: 'blue' }]}
      onPress={handleSaveEditAccount}
    >
      <Text style={styles.modalButtonText}>Save</Text>
    </TouchableOpacity>

    {/* Nút Close */}
    <TouchableOpacity
      style={[styles.modalButton, { backgroundColor: 'red' }]}
      onPress={() => setEditAccountModalVisible(false)}
    >
      <Text style={styles.modalButtonText}>Close</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>

<Modal
visible={isOrderModalVisible}
animationType="slide"
onRequestClose={() => setIsOrderModalVisible(false)}
>
<View style={styles.modalContainer2}>
  <Text style={styles.modalTitle}>Your Orders</Text>
  
  {/* Thanh tìm kiếm theo thời gian */}
  <TextInput
    style={styles.searchInput}
    placeholder="Search order (DD/MM/YYYY or HH:mm)"
    value={searchDate}
    onChangeText={(text) => setSearchDate(text)}
  />

  {/* Danh sách đơn hàng được lọc */}
  <FlatList
    data={filterOrders()} // Gọi hàm lọc danh sách đơn hàng
    keyExtractor={(item) => item._id}
    renderItem={({ item }) => (
      <View style={styles.orderBlock}>
        <TouchableOpacity
          style={styles.orderDetails}
          onPress={() => setSelectedOrder(item)}
        >
          <Text style={styles.orderDate}>{formatDate(item.createdAt)}</Text>
          <Text style={styles.orderTotal}>Total: ${item.total}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.feedbackButton}
          onPress={() => openFeedbackModal(item._id)}
        >
          <Icon name="chatbubble-outline" size={20} color="blue" />
          <Text style={styles.feedbackText}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteOrderButton}
          onPress={() => openDeleteOrderModal(item._id)}
        >
          <Icon name="trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={{ paddingBottom: 15 }}
  />

  <TouchableOpacity
    style={styles.closeButton}
    onPress={() => setIsOrderModalVisible(false)}
  >
    <Text style={styles.closeButtonText}>Close</Text>
  </TouchableOpacity>
</View>
</Modal>


    <Modal
visible={deleteOrderModalVisible}
animationType="slide"
transparent={true}
onRequestClose={closeDeleteOrderModal}
>
<View style={styles.modalOverlay}>
  <View style={styles.modalContainer3}>
    <Text style={styles.modalTitle2}>Cancel Order</Text>
    <Text style={styles.modalMessage}>
      Are you sure you want to cancel this order? We will refund your payment shortly.
    </Text>

    <View style={styles.modalButtonContainer}>
      <TouchableOpacity
        style={[styles.modalButton1, { backgroundColor: 'green' }]}
        onPress={handleConfirmDeleteOrder}
      >
        <Text style={styles.modalButtonText1}>Yes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.modalButton1, { backgroundColor: 'red' }]}
        onPress={closeDeleteOrderModal}
      >
        <Text style={styles.modalButtonText1}>No</Text>
      </TouchableOpacity>
    </View>
  </View>
</View>
</Modal>


    {/* Order Detail Modal */}
<Modal
visible={selectedOrder !== null}
animationType="slide"
onRequestClose={() => setSelectedOrder(null)}
>
<View style={styles.modalContainer2}>
  {selectedOrder && (
    <>
      <Text style={styles.modalTitle}>Order Details</Text>
      <FlatList
        data={selectedOrder.products}
        keyExtractor={(item, index) => `${selectedOrder._id}-${index}`}
        renderItem={({ item }) => (
          <View style={styles.productRow}>
            <View style={styles.tenvasoluong}>
              <Text style={styles.productName2}>{item.name}</Text>
              <Text style={styles.productQuantity}>x{item.quantity}</Text>
            </View>
            <Text style={styles.productPrice2}>${item.price}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc
        contentContainerStyle={{ paddingBottom: 15 }}
      />

      {/* Add Subtotal and Tax */}
      {/* Add Subtotal and Tax */}
<View style={styles.orderInfo}>
<Text style={styles.orderLabel1}>
  Subtotal: ${selectedOrder.subtotal}, Tax (10%): ${selectedOrder.tax}
</Text>
</View>

      {/* Shipping Method */}
      <View style={styles.orderInfo}>
        <Text style={styles.orderLabel}>Shipping Method:</Text>
        <Text style={styles.orderValue}>{selectedOrder.shippingMethod}</Text>
      </View>

      {/* Address */}
      <View style={styles.orderInfo}>
        <Text style={styles.orderLabel}>Address:</Text>
        <Text style={styles.orderValue}>
          {`${selectedOrder.address.fullName}, ${selectedOrder.address.phone}, ${selectedOrder.address.province}, ${selectedOrder.address.street}`}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setSelectedOrder(null)}
      >
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </>
  )}
</View>
</Modal>



<Modal
visible={feedbackModalVisible}
animationType="slide"
transparent={true}
onRequestClose={closeFeedbackModal}
>
<View style={styles.modalOverlay1}>
  <View style={styles.feedbackModalContainer}>
    {/* Tiêu đề Feedback với gạch dưới */}
    <Text style={styles.modalTitle1}>Feedback</Text>
    <View style={styles.titleUnderline} /> {/* Đường gạch dưới tiêu đề */}

    {/* 3 Mặt trạng thái */}
    <View style={styles.emotionContainer}>
      {['sad-outline', 'remove-outline', 'happy-outline'].map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedEmotion(index)}
        >
          <Icon
            name={icon}
            size={30}
            color={selectedEmotion === index ? '#00C4CC' : '#808080'}
          />
        </TouchableOpacity>
      ))}
    </View>

    {/* Các nút đánh giá dịch vụ */}
    <View style={styles.serviceContainer}>
      {['Service', 'Payment', 'Promotion', 'Quantity', 'Delivery', 'Gift'].map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.serviceButton,
            selectedServices.includes(label) && styles.selectedService,
          ]}
          onPress={() => toggleService(label)}
        >
          <Text
            style={[
              styles.serviceText,
              selectedServices.includes(label) && styles.selectedServiceText,
            ]}
          >
            {label}
          </Text>
          <Text style={styles.toggleIcon}>
            {selectedServices.includes(label) ? '✓' : '+'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    {/* Feedback Input */}
    <TextInput
      style={styles.feedbackInput}
      placeholder="Type your feedback here..."
      value={feedbackText}
      onChangeText={(text) => setFeedbackText(text)}
      multiline
    />

    {/* Rating Section */}
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => handleRatingPress(star)}
        >
          <Icon
            name={star <= rating ? 'star' : 'star-outline'}
            size={30}
            color="#FFD700"
          />
        </TouchableOpacity>
      ))}
    </View>

    {/* Submit Button */}
    <TouchableOpacity
      style={styles.submitButton}
      onPress={handleFeedbackSubmit}
    >
      <Text style={styles.submitButtonText}>Submit</Text>
    </TouchableOpacity>

    {/* Close Button */}
    <TouchableOpacity
      style={styles.closeButton1}
      onPress={closeFeedbackModal}
    >
      <Text style={styles.closeButtonText1}>Close</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>



<Modal
visible={thankYouModalVisible}
animationType="fade"
transparent={true}
onRequestClose={closeThankYouModal}
>
<View style={styles.modalOverlay1}>
  <View style={styles.thankYouModalContainer}>
    <Text style={styles.modalTitle1}>Thank You!</Text>
    <Text style={styles.modalMessage1}>
      Thank you for your review. If the product is defective, please contact
      the hotline in the Inbox for return support!
    </Text>

    <TouchableOpacity
      style={styles.okButton}
      onPress={closeThankYouModal}
    >
      <Text style={styles.okButtonText}>OK</Text>
    </TouchableOpacity>
  </View>
</View>
</Modal>


  
    </View>

  );
};

const styles = StyleSheet.create({
container1: { flex: 1, padding: 15, backgroundColor: '#fff' },
headerBackground: {
  width: '100%',
  height: 100, // Chiều cao phù hợp với phần header
  justifyContent: 'center',
  marginBottom: 10,
  marginTop: -15,
},
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 10,
  paddingHorizontal: 10,
  height: '100%',
  marginTop: -40,
},
headerText: { fontSize: 25, fontWeight: 'bold', color: '#720000', marginTop: 23 },
headerText2: { fontSize: 25, fontWeight: 'bold', color: '#720000', marginTop: -10, marginLeft: 118 }, // Text màu trắng để nổi trên nền
headerIcons: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'flex-end', 
marginLeft: 20,
},
iconWrapper: {
width: 40, // Đặt width chính xác theo biểu tượng
height: 40, // Đặt height chính xác theo biểu tượng
marginLeft: -10,
marginBottom: 20,


},
iconWrapper1: {
width: 40, // Đặt width chính xác theo biểu tượng
height: 40,
marginLeft:3,

},
giohang: {
width: 25, // Kích thước của biểu tượng giỏ hàng
height: 25,
},
icon: {
width: 43, // Kích thước của biểu tượng đơn hàng
height: 43,
},


ten: {
  flexDirection: 'row',
  top: 10,
},
headerText3: {
fontSize: 16, fontWeight: 'bold'
},
headerText4: {
fontSize: 16, 
},

categoryItemcontainer: {
  alignItems: 'center',
  marginHorizontal: 10,
  marginBottom: 65,
},
categoryItem: {
  width: 65,
  height: 65,
  borderRadius: 40,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 5, // Tạo khoảng cách giữa hình ảnh và tên
},
categoryImage: {
  width: 40,
  height: 40,
},
categoryText: {
  fontSize: 12,
  fontWeight: 'bold',
  color: '#000',
  textAlign: 'center',
},

topBanner: {
  flexDirection: 'row',
  backgroundColor: '#F0F8FF',
  borderRadius: 10,
  padding: 15,
  marginBottom: 10, // Giảm khoảng cách giữa FlatList và banner
  alignItems: 'center',
},

topBannerImage: {
  width: 100,
  height: 100,
  resizeMode: 'contain',
},
topBannerText: {
  marginLeft: 10,
  flex: 1,
},
bannerTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#ff745c',
},
bannerSubtitle: {
  fontSize: 16,
  color: '#666',
  marginVertical: 5,
  marginTop: -2,
},
buyButton: {
  backgroundColor: '#000',
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 5,
},
buyButtonText: {
  color: '#FFF',
  fontWeight: 'bold',
},
bottomBannercontainer1: {
  flexDirection: 'row',
  justifyContent: 'space-between',
},
smallBanner: {
  width: '48%',
  backgroundColor: '#FFF',
  borderRadius: 10,
  overflow: 'hidden',
  position: 'relative',
},
smallBannerImage: {
  width: '100%',
  height: 120,
  resizeMode: 'cover',
},
discountBadge: {
  position: 'absolute',
  
  left: 1,
  backgroundColor: 'red',
  paddingHorizontal: 5,
  paddingVertical: 2,
  borderRadius: 9,
  zIndex: 1,
},
discountText: {
  color: '#FFF',
  fontSize: 12,
  fontWeight: 'bold',
},
footer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  paddingVertical: 10,
  borderTopWidth: 1,
  borderTopColor: '#d3d3d3',
  marginTop: 15,
  height: 45,
},
footerItem: { alignItems: 'center' },
footerText: { fontSize: 12, color: '#808080' },
footerTextActive: { color: '#1E90FF' },

headerRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginVertical: 15,
  
},
recommendationTitle: {
  fontSize: 18,
  fontWeight: 'bold',
},
viewAllText: {
  fontSize: 14,
  color: '#1E90FF',
},
productCard: {
  marginRight: 10,
  width: 120,
  alignItems: 'center',
  backgroundColor: '#f8f9fb',
  borderRadius: 8,
  padding: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#C0C0C0',
  shadowColor: '#000',
  shadowOffset: { width: 2, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation: 3,
},
productImage: {
  width: 80,
  height: 80,
  marginBottom: 10,
},
productName: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#333',
  textAlign: 'center',
  marginBottom: 5,
},
productInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
},
starRating: {
  flexDirection: 'row',
},
productPrice: {
  fontSize: 14,
  fontWeight: 'bold',
  color: '#60cadd',
  
},
sao: {
marginLeft: 5,
fontSize:14,
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
padding: 20,
borderRadius: 10,
alignItems: 'center',
},
modalHeader: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 20,
},
modalButton: {
width: '100%',
padding: 15,
borderRadius: 5,
alignItems: 'center',
marginTop: 10,
},
modalButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
infoRow: {
width: '100%',
flexDirection: 'row',
justifyContent: 'space-between',
marginBottom: 10,
},
infoLabel: {
fontSize: 16,
fontWeight: 'bold',
},
infoText: {
fontSize: 16,
color: '#555',
},
passwordContainer: {
flexDirection: 'row',
alignItems: 'center',
},

input: {
width: '100%',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,
marginVertical: 10,
},
errorText: {
color: 'red',
fontSize: 12,
marginTop: -3,
},


modalContainer2: {
  flex: 1,
  padding: 20,
  backgroundColor: 'white',
},
modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 20,
},
orderDate: {
  fontSize: 16,
  color: '#333',
},
orderTotal: {
  fontSize: 14,
  color: '#555',
},
productRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ccc',
},
productName2: {
  fontSize: 16,
  color: '#333',
},
tenvasoluong: {
flexDirection: 'row',
},
productQuantity: {
  fontSize: 14,
  color: '#666',
  marginLeft: 15,
  marginTop: 3,
},
productPrice2: {
  fontSize: 14,
  color: '#000',
},
orderInfo: {
  marginVertical: 10,
},
orderLabel: {
  fontWeight: 'bold',
},
orderValue: {
  marginLeft: 10,
},
closeButton: {
  marginTop: 20,
  padding: 10,
  backgroundColor: 'red',
  borderRadius: 5,
},
closeButtonText: {
  color: 'white',
  textAlign: 'center',
},
orderBlock: {
flexDirection: 'row',
justifyContent: 'space-between',
alignItems: 'center',
padding: 15,
marginVertical: 5,
backgroundColor: '#f2f2f2',
borderRadius: 5,
},
orderDetails: {
flex: 1, // Đảm bảo thông tin chi tiết chiếm toàn bộ chiều ngang trừ nút xóa
},
deleteOrderButton: {
justifyContent: 'center',
alignItems: 'center',
marginTop: 20,
marginLeft: 20,
},

modalOverlay: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContainer3: {
width: '80%',
backgroundColor: '#fff',
padding: 20,
borderRadius: 10,
alignItems: 'center',
},
modalTitle2: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 10,
},
modalMessage: {
fontSize: 14,
textAlign: 'center',
marginBottom: 20,
},
modalButtonContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
width: '100%',
},
modalButton1: {
flex: 1,
padding: 10,
marginHorizontal: 5,
borderRadius: 5,
alignItems: 'center',
},
modalButtonText1: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},

feedbackButton: {
flexDirection: "row",
alignItems: "center",
marginTop:20,
marginLeft: 20,
},
feedbackText: {
marginLeft: 5,
fontSize: 12,
color: "blue",
},
modalOverlay1: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "rgba(0, 0, 0, 0.5)",
},
feedbackModalContainer: {
width: "90%",
backgroundColor: "white",
borderRadius: 10,
padding: 20,
alignItems: "center",
},
modalTitle1: {
fontSize: 20,
fontWeight: "bold",
marginBottom: 10,
},
ratingContainer: {
flexDirection: "row",
marginVertical: 10,
marginBottom: 23,
},
feedbackInput: {
width: "100%",
borderWidth: 1,
borderColor: "#ccc",
borderRadius: 5,
padding: 10,
marginBottom: 20,
textAlignVertical: "top",
height: 80,
},
submitButton: {
backgroundColor: "blue",
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 5,
marginBottom: 10,
},
submitButtonText: {
color: "white",
fontWeight: "bold",
},
closeButton1: {
backgroundColor: "red",
paddingVertical: 10,
paddingHorizontal: 26.5,
borderRadius: 5,
},
closeButtonText1: {
color: "white",
fontWeight: "bold",
},

thankYouModalContainer: {
width: "80%",
backgroundColor: "white",
borderRadius: 10,
padding: 20,
alignItems: "center",
elevation: 5,
},
okButton: {
backgroundColor: "blue",
paddingVertical: 10,
paddingHorizontal: 20,
borderRadius: 5,
marginTop: 20,
},
okButtonText: {
color: "white",
fontWeight: "bold",
},
modalMessage1: {
fontSize: 16,
textAlign: "center",
marginVertical: 15,
},

orderLabel1: {
fontWeight: 'bold',
marginBottom: 5, // Khoảng cách dưới
fontSize: 16, // Kích thước chữ
color: 'red', // Màu chữ
},
emotionContainer: {
flexDirection: 'row',
justifyContent: 'space-between',
marginVertical: 10,
},

serviceContainer: {
flexDirection: 'row',
flexWrap: 'wrap',
justifyContent: 'center',
marginBottom: 20,
},

serviceButton: {
flexDirection: 'row',
alignItems: 'center',
justifyContent: 'space-between',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 15,
paddingHorizontal: 10,
paddingVertical: 5,
margin: 5,
backgroundColor: '#f5f5f5',
},

selectedService: {
backgroundColor: '#e0f7fa',
borderColor: '#00C4CC',
},

serviceText: {
fontSize: 14,
color: '#808080',
},

selectedServiceText: {
color: '#00C4CC',
fontWeight: 'bold',
},

toggleIcon: {
marginLeft: 5,
fontWeight: 'bold',
color: '#808080',
},

titleUnderline: {
  height: 1,
  backgroundColor: '#C0C0C0', 
  width: '100%', 
  marginBottom: 20,
},
inboxModalOverlay: {
flex: 1,
justifyContent: 'center',
alignItems: 'center',
backgroundColor: 'rgba(0, 0, 0, 0.5)', // Làm mờ nền khi hiện modal
},
inboxModalContent: {
width: '80%',
backgroundColor: '#fff',
padding: 20,
borderRadius: 10,
alignItems: 'center',
},
inboxModalHeader: {
fontSize: 18,
fontWeight: 'bold',
marginBottom: 20,
color: '#000',
},
inboxModalMessage: {
fontSize: 14,
textAlign: 'center',
marginBottom: 20,
color: '#555',
},
inboxModalButton: {
padding: 10,
borderRadius: 5,
alignItems: 'center',
width: '100%',
backgroundColor: 'red',
},
inboxModalButtonText: {
color: '#fff',
fontSize: 16,
fontWeight: 'bold',
},
searchInput: {
width: '100%',
borderWidth: 1,
borderColor: '#ccc',
borderRadius: 5,
padding: 10,
marginBottom: 15,
fontSize: 14,
},




});


export default HomeScreen;
