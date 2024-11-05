import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

// Define a type for cart items
type CartItem = {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
};

const DetailsScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { product } = route.params; // Nhận toàn bộ sản phẩm từ params
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [cartCount, setCartCount] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Đen'); // Default selected color

  // Add color options
  const colorOptions = ['Đen', 'Trắng']; // Only black and white

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        const cartData = JSON.parse(savedCart);
        setCart(cartData);
        const totalItems = cartData.items.reduce(
          (total: number, item: CartItem) => total + item.quantity, 
          0
        );
        setCartCount(totalItems);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async () => {
    try {
      const savedCart = await AsyncStorage.getItem('cart');
      let currentCart = savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };

      const newCartItem = {
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        color: selectedColor, // Ensure selectedColor is included
      };

      // Check for existing item by both ID and color
      const existingItemIndex = currentCart.items.findIndex((item: CartItem) => 
        item.id === newCartItem.id && item.color === newCartItem.color
      );

      if (existingItemIndex >= 0) {
        // If the item exists, update the quantity
        currentCart.items[existingItemIndex].quantity += quantity;
      } else {
        // If the item does not exist, add it to the cart
        currentCart.items.push(newCartItem);
      }

      currentCart.total += parseFloat(product.price) * quantity;

      await AsyncStorage.setItem('cart', JSON.stringify(currentCart));
      setCart(currentCart);

      const newTotalItems = currentCart.items.reduce(
        (total: number, item: CartItem) => total + item.quantity,
        0
      );
      setCartCount(newTotalItems);

      alert(`Đã thêm ${product.name} vào giỏ hàng!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  console.log('Product:', product); // Kiểm tra giá trị của product

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Icon name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Cart', { cart })} 
            style={styles.cartButton}
          >
            <Icon name="cart-outline" size={24} color="black" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <Image source={{ uri: product.image }} style={styles.productImage} />

        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price.toLocaleString()} VND</Text>
          <Text style={styles.productDescription}>{product.description}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Icon name="remove-circle-outline" size={24} color="#4A90E2" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Icon name="add-circle-outline" size={24} color="#4A90E2" />
            </TouchableOpacity>
          </View>

          <View style={styles.colorOptionsContainer}>
            {colorOptions.map((color, index) => (
              <TouchableOpacity 
                key={index} 
                style={[styles.colorOption, { borderColor: selectedColor === color ? '#4A90E2' : '#ddd' }]} 
                onPress={() => setSelectedColor(color)}
              >
                <View style={[styles.colorCircle, { backgroundColor: color === 'Đen' ? 'black' : 'white' }]} />
                <Text style={{ color: selectedColor === color ? '#4A90E2' : 'black' }}>{color}</Text> {/* Display color name */}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.selectedColorText}>Màu đã chọn: {selectedColor}</Text> {/* Display selected color */}

          <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
            <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  iconButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  productImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  productDetails: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  addToCartButton: {
    backgroundColor: '#000000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  addToCartText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  cartButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  colorOption: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  selectedColorText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default DetailsScreen;
