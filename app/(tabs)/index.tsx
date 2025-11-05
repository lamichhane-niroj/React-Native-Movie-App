import MovieCard from "@/components/movieCard";
import SearchBar from "@/components/searchbar";
import TrendingCard from "@/components/trendingCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies, fetchTrendingMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";


export default function Index() {
  const router = useRouter();

  const { data: movies, loading: moviesLoading, error: moviesError } = useFetch(() => fetchMovies({ query: '' }))
  const { data: trendingMovies, loading: trendingMoviesLoading, error: trendingMoviesError } = useFetch(() => fetchTrendingMovies())

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <View className="flex-1 px-5">
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <MovieCard {...item} />
          )}
          showsVerticalScrollIndicator={false}
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

              {/* Trending Movies Section */}
              <Text className="text-lg text-white font-bold mt-5 mb-3">Trending Movies</Text>
              {trendingMoviesLoading ? (
                <ActivityIndicator size="large" color="#0000FF" className="my-3" />
              ) : trendingMoviesError ? (
                <Text className="text-red-500 mb-3">{trendingMoviesError?.message}</Text>
              ) : (
                <FlatList
                  data={trendingMovies}
                  renderItem={({ item, index }) => (
                    <TrendingCard 
                      movie={{
                        movie_id: item.id,
                        title: item.title,
                        poster_url: `https://image.tmdb.org/t/p/w780${item.poster_path}`,
                        vote_average: item.vote_average,
                        release_date: item.release_date
                      }} 
                      index={index}
                    />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => `trending-${item.id}`}
                  contentContainerStyle={{ paddingLeft: 0 }}
                />
              )}

              {/* Popular Movies Section */}
              <Text className="text-lg text-white font-bold mt-5 mb-3">Popular Movies</Text>
              {moviesLoading && <ActivityIndicator size="large" color="#0000FF" className="my-3" />}
              {moviesError && <Text className="text-red-500 mb-3">{moviesError?.message}</Text>}
            </>
          )}
        />
      </View>

    </View>
  );
}
