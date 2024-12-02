import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen_01 from './screens/Screen_01';
import Screen_02 from './screens/Screen_02';
import Screen_03 from './screens/Screen_03';
import Screen_QuanLy from './screens/Screen_QuanLy';
import ElectricScreen from './screens/ElectricScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import ReviewScreen from './screens/ReviewScreen';
import ReviewScreen2 from './screens/ReviewScreen2';
import Review3 from './screens/Review3';
import Review4 from './screens/Review4';
import ShoppingCard from './screens/ShoppingCard';
import { CartProvider } from './screens/CartContext'; // Import CartProvider
import OrderInformation from './screens/OrderInformation';
import Payment from './screens/Payment';
import PaymentSuccess from './screens/PaymentSuccess';
import HomeScreen from './screens/HomeScreen';
import Fashion from './screens/Fashion';
import ProductDetailScreen2 from './screens/ProductDetailScreen2';
import FreshFood from './screens/FreshFood';
import BeautyScreen from './screens/BeautyScreen';
import ProductDetail3 from './screens/ProductDetail3';
import ProductDetail4 from './screens/ProductDetail4';
import { AuthProvider } from './screens/AuthContext';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <AuthProvider>
     <CartProvider>
      <NavigationContainer>
      
        <Stack.Navigator initialRouteName="Screen_01">
        <Stack.Screen name="Screen_01" component={Screen_01} options={{ headerShown: false }} />
        <Stack.Screen name="Screen_02" component={Screen_02} options={{ headerShown: false }}/>
        <Stack.Screen name="Screen_03" component={Screen_03} options={{ headerShown: false }}/>
        <Stack.Screen name="Screen_QuanLy" component={Screen_QuanLy} options={{ headerShown: false }} />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề cho HomeScreen
          />
          <Stack.Screen
            name="ElectricScreen"
            component={ElectricScreen}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề cho ElectricScreen
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReviewScreen"
            component={ReviewScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReviewScreen2"
            component={ReviewScreen2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Review3"
            component={Review3}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Review4"
            component={Review4}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShoppingCart"
            component={ShoppingCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderInformation"
            component={OrderInformation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="PaymentSuccess" 
            component={PaymentSuccess} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="Fashion"
            component={Fashion}// Ẩn thanh tiêu đề cho ElectricScreen
            options={{ headerShown: false }} 
          />
          <Stack.Screen
            name="ProductDetailScreen2"
            component={ProductDetailScreen2}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề cho ElectricScreen
          />
          <Stack.Screen
            name="FreshFood"
            component={FreshFood}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề cho ElectricScreen
          />
          <Stack.Screen
            name="BeautyScreen"
            component={BeautyScreen}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề cho ElectricScreen
          />
          <Stack.Screen
            name="ProductDetail3"
            component={ProductDetail3}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề cho ElectricScreen
          />
          <Stack.Screen
            name="ProductDetail4"
            component={ProductDetail4}
            options={{ headerShown: false }} // Ẩn thanh tiêu đề cho ElectricScreen
          />
        </Stack.Navigator>
        
      </NavigationContainer>
      </CartProvider>
             </AuthProvider>

    
  );
}
