
import React from 'react';
import { Bible } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BibleVerseWidgetProps {
  verse: string;
  reference: string;
}

const BibleVerseWidget: React.FC<BibleVerseWidgetProps> = ({
  verse = "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
  reference = "John 3:16"
}) => {
  return (
    <Card className="border border-church-tan shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2 text-church-copper">
          <Bible size={18} />
          Daily Verse
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-church-darkBrown italic mb-2">"{verse}"</p>
        <p className="text-right text-church-gold font-medium">— {reference}</p>
      </CardContent>
    </Card>
  );
};

export default BibleVerseWidget;
