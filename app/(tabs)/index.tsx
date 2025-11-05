import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchbar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";


export default function Index() {
  const router = useRouter();

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }))

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        {moviesLoading ? (
          <ActivityIndicator size="large" color="#0000FF" className="mt-10 self-center" />
        ) : moviesError ? (
          <Text className="text-red-500">{moviesError?.message}</Text>
        ) : (
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <MovieCard {...item} />
            )}
            showsVerticalScrollIndicator = {false}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: 'flex-start',
              gap: 20,
              paddingRight: 5,
              marginBottom: 10
            }}
            className="mt-2 pb-32"
            scrollEnabled={true}
            ListHeaderComponent={() => (
              <>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
                <View className="mt-5">
                  <SearchBar value="" onPress={() => router.push("/search")} placeholder="Search for a movie" />
                </View>
                <Text className="text-lg text-white font-bold mt-5 mb-3">Latest Movies</Text>
              </>
            )}
          />
        )}
      </View>

    </View>
  );
}
