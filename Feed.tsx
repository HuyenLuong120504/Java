import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Ensure this library is installed

const DATA = [
  {
    id: "1",
    title: "Nike Air Force 1 LE",
    price: "2,419,000 Đ",
    rating: 4.8,
    image: "../../assets/images/giay1.png",
  },
  {
    id: "2",
    title: "Nike Dunk Low",
    price: "2,299,000 Đ",
    rating: 4.9,
    image: "../../assets/images/giay2.png",
  },
  {
    id: "3",
    title: "Nike Dunk Low",
    price: "1,935,199 Đ",
    rating: 4.9,
    image: "../../assets/images/giay3.png",
  },
  {
    id: "4",
    title: "Nike Air Force 1",
    price: "1,875,299 Đ",
    rating: 4.7,
    image: "../../assets/images/giay4.png",
  },
  // Add more products as needed
];

// Banner images data
const BANNER_DATA = [
  {
    id: "1",
    image: "../../assets/images/banner1.jpg",
  },
  {
    id: "2",
    image: "../../assets/images/banner2.jpg",
  },
  {
    id: "3",
    image: "../../assets/images/banner3.png",
  },
];

const Feed = ({ navigation }: { navigation: any }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null); // Reference to FlatList
  const [searchText, setSearchText] = useState(""); // State for search text
  const [filteredData, setFilteredData] = useState(DATA); // State for filtered data

  // Auto-scroll the banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      scrollToNextBanner();
    }, 3000); // 3 seconds interval
    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentBannerIndex]);

  const scrollToNextBanner = () => {
    const nextIndex = (currentBannerIndex + 1) % BANNER_DATA.length; // Cycle through banners
    setCurrentBannerIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const navigateToDetails = ({ item }: { item: any }) => {
    navigation.navigate("Details", { item }); // Navigate to Details screen and pass product data
  };

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  useEffect(() => {
    const newData = DATA.filter((item) =>
      item.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredData(newData);
  }, [searchText]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => navigateToDetails(item)}
      style={styles.productCard}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.ratingContainer}>
        <Icon name="star" size={12} color="#FFD700" />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>+</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderBannerItem = ({ item }: { item: any }) => (
    <View style={styles.bannerContainer}>
      <Image source={{ uri: item.image }} style={styles.bannerImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>LOCATION</Text>
          <Text style={styles.locationValue}>HỒ CHÍ MINH CITY, VIỆT NAM</Text>
        </View>
        <Image
          source={{ uri: "../../assets/images/logoshoes.jpg" }} // Placeholder profile image URL
          style={styles.profileImage}
        />
      </View>

      {/* Search bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm giày..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)} // Update search text
        />
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="search" size={18} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="sliders" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Banner carousel */}
      <FlatList
        ref={flatListRef} // Attach FlatList ref
        data={BANNER_DATA}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScrollToIndexFailed={() => {}} // Handle errors in auto-scrolling
        snapToAlignment="center"
        snapToInterval={Dimensions.get("window").width} // Ensure banners snap correctly
        decelerationRate="fast"
        style={styles.bannerList}
      />

      {/* Categories */}
      <View style={styles.categories}>
        {["All", "JORDAN", "RUNNING", "BASKETBALL", "TENNIS"].map(
          (category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  selectedCategory === category &&
                    styles.selectedCategoryButtonText,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          )
        )}
      </View>

      {/* Product grid */}
      <FlatList
        data={filteredData} // Hiển thị dữ liệu đã lọc
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productGrid}
      />
    </View>
  );
};

export default Feed;

// Styles for the Feed component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F0F0", // Light grey background
    paddingHorizontal: 12,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  locationContainer: {
    flexDirection: "column",
  },
  locationText: {
    fontSize: 12,
    color: "#888",
  },
  locationValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingHorizontal: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
  iconButton: {
    padding: 8,
    backgroundColor: "WHITE",
  },
  bannerList: {
    marginBottom: 20,
  },
  bannerContainer: {
    width: Dimensions.get("window").width, // Full screen width
    height: 200, // Banner height
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  selectedCategoryButton: {
    backgroundColor: "#000000",
  },
  categoryButtonText: {
    color: "#000",
    fontSize: 14,
  },
  selectedCategoryButtonText: {
    color: "#fff",
  },
  productGrid: {
    paddingBottom: 20,
  },
  productCard: {
    backgroundColor: "#EEEEEE",
    margin: 8,
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    padding: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: 180,
    height: 120,
    borderRadius: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#333",
  },
  productTitle: {
    fontSize: 14,
    marginVertical: 5,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: "#181717",
    borderRadius: 20,
    padding: 5,
    paddingHorizontal: 10,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
  },
});
