import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons
import axios from "axios";
import validation from "../Vadidation/LoginValidation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Snackbar } from 'react-native-paper';
 import { useAuth } from "./AuthContext";

const Screen_03 = ({ navigation }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false); // Hiển thị thông báo lỗi
const [errorMessage, setErrorMessage] = useState(""); // Nội dung thông báo lỗi
const { setUserId } = useAuth(); 
  
 

  const handleSubmit = () => {
    if (values.email === "admin" && values.password === "123") {
      navigation.navigate("Screen_QuanLy");
      return; // Exit the function early if admin credentials are used
    }
    
    // Validation logic for other users
    const validationErrors = validation(values);
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (isSubmitting && !errors.email && !errors.password) {
      axios
        .post("http://localhost:8692/login", values)
        .then(async (res) => {
          if (res.data.status === "Success") {
            alert("Login Success");
            setSuccessVisible(true);
            setUserId(res.data.userId); // Lưu userId vào Context
            await AsyncStorage.setItem("userEmail", values.email);

            setTimeout(() => {
              setSuccessVisible(false);
              navigation.navigate("HomeScreen");
            }, 500);
          } else {
            setErrorVisible(true);
            setErrorMessage(res.data.status);

            setTimeout(() => {
              setErrorVisible(false);
            }, 1500);
          }
        })
        .catch((err) => {
          console.error(err);
          setErrorVisible(true);
          setErrorMessage("An error occurred. Please try again.");
          setTimeout(() => {
            setErrorVisible(false);
          }, 1500);
        })
        .finally(() => setIsSubmitting(false));
    } else {
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting, values, navigation]);


  return (
    <View style={styles.container}>

      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.navigate('Screen_01')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      <Image source={require('../Data2/bannerlogin2.jpg')} style={styles.image} />
      <Text style={styles.title}>Welcome!</Text>


      <TextInput
        placeholder="Enter email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={values.email}
        onChangeText={(value) => setValues({ ...values, email: value })}
      />

      {errors.email && <Text style={styles.error}>{errors.email}</Text>}




      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Enter password"
          style={styles.passwordInput}
          secureTextEntry={!passwordVisible}
          value={values.password}
          onChangeText={(value) => setValues({ ...values, password: value })}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? "eye-off-outline" : "eye-outline"}
            size={20}
            color="gray"
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}


      <TouchableOpacity onPress={handleSubmit} style={styles.button} >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

       {successVisible && (
  <View style={styles.successBanner}>
    <Text style={styles.successText}>Login Successful!</Text>
  </View>
)}
<Snackbar
  visible={errorVisible}
  onDismiss={() => setErrorVisible(false)} // Đóng Snackbar sau khi hiển thị
  duration={1500} // Hiển thị trong 1.5 giây
  style={{ backgroundColor: '#f44336', marginBottom: 550 }} // Màu nền đỏ báo lỗi
>
  {errorMessage}
</Snackbar>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fec97b',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 5,
  },
  backText: {
    fontSize: 18,
    color: '#333',
  },
  image: {
    width: 360,
    height: 170,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'left',
    width: '100%',
  },
  error: {
    marginVertical: 4,
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 15,
    color: "red",
    fontSize: 13,
    marginTop: -22,
  },
  input: {
    width: '100%',
    paddingVertical: 16,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    width: '100%',
    marginBottom: 25,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#55acee',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  successBanner: {
  position: "absolute",
  top: 20,
  width: "90%",
  backgroundColor: "#28a745",
  padding: 10,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
  zIndex: 10,
},
successText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "bold",
},
});

export default Screen_03;
