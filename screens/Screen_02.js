import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import CheckBox from "expo-checkbox";
import Ionicons from '@expo/vector-icons/Ionicons'; // Import Ionicons
import axios from "axios";
import validation from "../Vadidation/SigupValidation";

const Screen_02 = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [successVisible, setSuccessVisible] = useState(false); // Success message state

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
  if (!checked) {
    setIsModalVisible(true); // Show the modal if checkbox is not selected
    return;
  }

  setErrors(validation(values));
  setIsSubmitting(true);
};

  useEffect(() => {
  if (
    isSubmitting &&
    errors.name === "" &&
    errors.email === "" &&
    errors.password === ""
  ) {
    axios
      .post("http://localhost:8692/signup", values)
      .then(() => {
        alert("Created Account Successfully"); // Alert for notification
        setSuccessVisible(true); // Show success message on UI
        setTimeout(() => {
          setSuccessVisible(false);
          navigation.navigate("Screen_03"); // Navigate after success
        }, 1000); // 
      })
      .catch((err) => console.log(err))
      .finally(() => setIsSubmitting(false));
  } else setIsSubmitting(false);
}, [errors, isSubmitting, navigation, values]);


  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
      </View>

      {/* Add Image */}
      <Image source={require('../Data2/icondki.png')} style={styles.logo} />

      <Text style={styles.title}>Nice to see you!</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <TextInput
        value={values.name}
        onChangeText={(value) => setValues({ ...values, name: value })}
        placeholder="Enter your user name"
        style={styles.input}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        value={values.email}
        onChangeText={(value) => setValues({ ...values, email: value })}
        placeholder="Enter your email address"
        style={styles.input}
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <View style={styles.passwordContainer}>
        <TextInput
          value={values.password}
          onChangeText={(value) =>
            setValues({ ...values, password: value })
          }
          placeholder="Enter your password"
          style={styles.passwordInput}
          secureTextEntry={!passwordVisible} // Toggle visibility
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

      {/* I agree with Terms & Conditions */}
      <View style={styles.groupCheckBox}>
        <CheckBox
          style={styles.CheckBox}
          value={checked}
          onValueChange={() => setChecked((prev) => !prev)}
        />
        <Text style={styles.agreeText}>I agree with</Text>
        <TouchableOpacity>
          <Text style={styles.termsText}> Terms & Conditions</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>

      {/* Modal for Terms & Conditions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={styles.modalCloseButton}
            >
              <Ionicons name="close-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalText}>
              Please review and accept the Terms & Conditions!
            </Text>
          </View>
        </View>
      </Modal>
      {successVisible && (
  <View style={styles.successBanner}>
    <Text style={styles.successText}>Account Created Successfully!</Text>
  </View>
)}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: '#333',
  },
  logo: {
    width: 120,
    height: 140,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 25,
    backgroundColor: '#fff',

  },

  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: '100%',
    marginBottom: 25,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  eyeIcon: {
    marginLeft: 10,
  },
  groupCheckBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    textAlign: 'left',
    width: '100%',
  },
  agreeText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#666',
  },
  termsText: {
    fontSize: 14,
    color: '#1e90ff',
  },
  button: {
    backgroundColor: '#55acee',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 35,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  modalContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
modalContent: {
  width: '85%',
  padding: 20,
  backgroundColor: '#fff',
  borderRadius: 10,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  position: 'relative',
},
modalCloseButton: {
  position: 'absolute',
  top: 10,
  right: 10,
},
modalText: {
  fontSize: 16,
  color: '#333',
  textAlign: 'center',
  marginVertical: 20,
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

export default Screen_02;
