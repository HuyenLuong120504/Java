import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Cần cài đặt thư viện này
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const ProductDetails = () => {
  const navigation = useNavigation(); // Khởi tạo useNavigation
  const [quantity, setQuantity] = useState(1); // Quản lý số lượng sản phẩm
  const [selectedSize, setSelectedSize] = useState(38); // Quản lý size (đổi thành số)
  const [selectedColor, setSelectedColor] = useState("white"); // Quản lý màu

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Tạo mảng kích thước từ 36 đến 44
  const sizes = Array.from({ length: 8 }, (_, index) => 36 + index); // [36, 37, 38, 39, 40, 41, 42, 43, 44]
  const colors = ["white", "black", "red"]; // Màu sắc sản phẩm

  return (
    <ScrollView style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={20} color="#000" /> {/* Nút quay về */}
        </TouchableOpacity>
        
        <View style={styles.iconsContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="search" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="user" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="shopping-cart" size={20} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="bars" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productName}>Nike Air Force 1 LE</Text>
        <Text style={styles.productType}>Men Shoes</Text>
        <Text style={styles.productPrice}>2,419,000 Đ</Text>

        {/* Highly Rated Badge */}
        <View style={styles.badge}>
          <Icon name="star" size={12} color="#000" />
          <Text style={styles.badgeText}>Highly Rated</Text>
        </View>

        {/* Product Image */}
        <Image
          source={{
            uri: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
          }}
          style={styles.productImage}
        />

        {/* Product Description */}
        <Text style={styles.description}>
          The Nike Air Force 1 LE brings a classic look to your feet. It
          features durable leather, a foam midsole for comfort, and timeless
          Nike branding. Perfect for all-day wear!
        </Text>

        {/* Product Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Đánh giá:</Text>
          <View style={styles.starsContainer}>
            <Icon name="star" size={18} color="#FFD700" />
            <Icon name="star" size={18} color="#FFD700" />
            <Icon name="star" size={18} color="#FFD700" />
            <Icon name="star" size={18} color="#FFD700" />
            <Icon name="star-half" size={18} color="#FFD700" />
          </View>
          <Text style={styles.ratingText}>4.5/5 (120 đánh giá)</Text>
        </View>

        {/* Size Selector */}
        <Text style={styles.sectionLabel}>Chọn size:</Text>
        <View style={styles.sizeSelectorContainer}>
          <View style={styles.sizeSelector}>
            {sizes.map((size) => (
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
                  {size} {/* Hiển thị size như một số */}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Selector */}
        <Text style={styles.sectionLabel}>Chọn màu sắc:</Text>
        <View style={styles.colorSelector}>
          {colors.map((color) => (
            <TouchableOpacity
              key={color}
              style={[
                styles.colorButton,
                { backgroundColor: color },
                selectedColor === color && styles.selectedColorButton,
              ]}
              onPress={() => setSelectedColor(color)}
            />
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

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
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
  backButton: {
    marginRight: 15, // Cách giữa nút quay về và logo
  },
  logo: {
    width: 50,
    height: 25,
    resizeMode: "contain",
  },
  iconsContainer: {
    flexDirection: "row",
  },
  iconButton: {
    marginLeft: 15,
    padding: 10, // Thêm padding để tạo không gian cho nút
    borderRadius: 5, // Thêm góc bo cho nút
    backgroundColor: "#f0f0f0", // Màu nền cho nút
  },
  productDetails: {
    alignItems: "center",
  },
  productName: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productType: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 20,
  },
  badgeText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#000",
  },
  productImage: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginLeft: 10,
  },
  ratingLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ratingText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#888",
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sizeSelectorContainer: {
    marginBottom: 20, // Thêm khoảng cách giữa phần chọn kích thước và các phần khác
  },
  sizeSelector: {
    flexDirection: "row",
    justifyContent: "center",
  },
  sizeButton: {
    padding: 10,
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
  colorSelector: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  colorButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10,
  },
  selectedColorButton: {
    borderWidth: 2,
    borderColor: "#000",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  quantityButton: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#000",
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 30,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
