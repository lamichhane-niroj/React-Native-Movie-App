import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, View } from "react-native";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7; // 70% of screen width

interface TrendingCardProps {
    movie: {
        movie_id: number;
        title: string;
        poster_url: string;
        vote_average: number;
        release_date: string;
    };
    index: number;
}

const TrendingCard = ({ movie: { movie_id, title, poster_url, vote_average, release_date }, index }: TrendingCardProps) => {
    return (
        <Link href={`/movies/${movie_id}` as any} asChild>
            <View className="mr-4 rounded-2xl overflow-hidden" style={{ width: CARD_WIDTH }}>
                {/* Movie Poster */}
                <Image 
                    source={{ 
                        uri: poster_url 
                            ? poster_url
                            : 'https://via.placeholder.com/780x1170'
                    }}
                    className="w-full h-[220px] rounded-2xl"
                    resizeMode="cover"
                />

                {/* Overlay Gradient & Info */}
                <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/50">
                    <Text className="text-white text-xl font-bold" numberOfLines={1}>
                        {title}
                    </Text>
                    
                    <View className="flex-row justify-between items-center mt-2">
                        <Text className="text-white opacity-80">
                            {new Date(release_date).getFullYear()}
                        </Text>
                        <View className="flex-row items-center">
                            <Text className="text-white font-semibold">
                                {vote_average?.toFixed(1)}
                            </Text>
                            <Text className="text-white opacity-80 ml-1">/ 10</Text>
                        </View>
                    </View>
                </View>
            </View>
        </Link>
    );
};

export default TrendingCard;