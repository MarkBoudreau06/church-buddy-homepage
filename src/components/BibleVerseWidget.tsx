
import React, { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BibleVerseWidgetProps {
  verse: string;
  reference: string;
}

const BibleVerseWidget: React.FC<BibleVerseWidgetProps> = ({
  verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
  reference = "John 3:16"
}) => {
  // Array of nature background images
  const natureImages = useMemo(() => [
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80", // deer in forest
    "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&w=800&q=80", // river mountains
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80", // pine trees
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80", // trees from below
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80", // sunlight through trees
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80", // mountain with sun rays
  ], []);

  // Select a random image from the array
  const randomImage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * natureImages.length);
    return natureImages[randomIndex];
  }, [natureImages]);

  return (
    <Card className="shadow-md hover:shadow-md transition-shadow border-church-tan overflow-hidden relative h-64">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={randomImage} 
          alt="Nature background" 
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
      </div>
      
      <CardHeader className="pb-2 relative z-10">
        <CardTitle className="text-md flex items-center gap-2 text-white">
          <BookOpen size={18} />
          Daily Verse
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <p className="text-white italic mb-2 text-lg font-medium">"{verse}"</p>
        <p className="text-right text-church-cream font-medium">— {reference}</p>
      </CardContent>
    </Card>
  );
};

export default BibleVerseWidget;
