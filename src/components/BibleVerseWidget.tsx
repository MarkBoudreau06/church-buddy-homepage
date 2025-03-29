
import React, { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BibleVerseWidgetProps {
  verse: string;
  reference: string;
}

// Fixed daily verse that will be consistent across all pages
const todaysVerse = {
  text: "Trust in the LORD with all your heart, and do not lean on your own understanding.",
  reference: "Proverbs 3:5"
};

const BibleVerseWidget: React.FC<BibleVerseWidgetProps> = ({
  // Use optional props but default to today's verse
  verse = todaysVerse.text,
  reference = todaysVerse.reference
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

  // Use a deterministic selection based on the day of the month instead of random
  const backgroundImage = useMemo(() => {
    const dayOfMonth = new Date().getDate();
    const imageIndex = dayOfMonth % natureImages.length;
    return natureImages[imageIndex];
  }, [natureImages]);

  return (
    <Card className="shadow-md hover:shadow-md transition-shadow border-church-tan overflow-hidden relative h-64">
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={backgroundImage} 
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
