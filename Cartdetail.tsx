import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("45");

  const productPrice = 2929000;
  const shippingFee = 250000;
  const totalPrice = productPrice * quantity;

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const availableSizes = ["40", "41", "42", "43", "44", "45"];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={{ uri: "../../assets/images/logoshoes.jpg" }}
          style={styles.logo}
        />
        <View style={styles.iconsContainer}>
          <Icon name="search" size={20} color="#000" style={styles.icon} />
          <Icon name="user" size={20} color="#000" style={styles.icon} />
          <Icon name="bars" size={20} color="#000" style={styles.icon} />
        </View>
      </View>

      {/* Product Box */}
      <View style={styles.productBox}>
        <View style={styles.productDetails}>
          <Image
            source={{
              uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
            }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Nike Air Force 1 LE</Text>
          <Text style={styles.productPrice}>{productPrice.toLocaleString()}₫</Text>

          {/* Size Selector */}
          <Text style={styles.sectionLabel}>Chọn size:</Text>
          <View style={styles.sizeSelector}>
            {availableSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.selectedSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === size && styles.selectedSizeButtonText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Summary Section */}
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tổng tiền:</Text>
          <Text style={styles.summaryValue}>{totalPrice.toLocaleString()}₫</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Phí giao hàng ước tính:</Text>
          <Text style={styles.summaryValue}>{shippingFee.toLocaleString()}₫</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.totalLabel}>Tổng cộng:</Text>
          <Text style={styles.totalValue}>
            {(totalPrice + shippingFee).toLocaleString()}₫
          </Text>
        </View>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  logo: {
    width: 50,
    height: 25,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 15,
  },
  productBox: {
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#f7f7f7",
    marginVertical: 15,
  },
  productDetails: {
    alignItems: "center",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sizeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  sizeButton: {
    padding: 8,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#EEE",
  },
  selectedSizeButton: {
    backgroundColor: "#000",
  },
  sizeButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  selectedSizeButtonText: {
    color: "#FFF",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantityButton: {
    backgroundColor: "#EEE",
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  summary: {
    padding: 15,
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#555",
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  checkoutButton: {
    backgroundColor: "#000",
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  checkoutButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
