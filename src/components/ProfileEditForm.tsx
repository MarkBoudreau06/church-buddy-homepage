
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserProfile } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

// Bible data - books, chapters, and sample verses
const bibleBooks = [
  { name: "Genesis", chapters: 50 },
  { name: "Exodus", chapters: 40 },
  { name: "Leviticus", chapters: 27 },
  { name: "Numbers", chapters: 36 },
  { name: "Deuteronomy", chapters: 34 },
  { name: "Joshua", chapters: 24 },
  { name: "Judges", chapters: 21 },
  { name: "Ruth", chapters: 4 },
  { name: "1 Samuel", chapters: 31 },
  { name: "2 Samuel", chapters: 24 },
  { name: "1 Kings", chapters: 22 },
  { name: "2 Kings", chapters: 25 },
  { name: "1 Chronicles", chapters: 29 },
  { name: "2 Chronicles", chapters: 36 },
  { name: "Ezra", chapters: 10 },
  { name: "Nehemiah", chapters: 13 },
  { name: "Esther", chapters: 10 },
  { name: "Job", chapters: 42 },
  { name: "Psalms", chapters: 150 },
  { name: "Proverbs", chapters: 31 },
  { name: "Ecclesiastes", chapters: 12 },
  { name: "Song of Solomon", chapters: 8 },
  { name: "Isaiah", chapters: 66 },
  { name: "Jeremiah", chapters: 52 },
  { name: "Lamentations", chapters: 5 },
  { name: "Ezekiel", chapters: 48 },
  { name: "Daniel", chapters: 12 },
  { name: "Hosea", chapters: 14 },
  { name: "Joel", chapters: 3 },
  { name: "Amos", chapters: 9 },
  { name: "Obadiah", chapters: 1 },
  { name: "Jonah", chapters: 4 },
  { name: "Micah", chapters: 7 },
  { name: "Nahum", chapters: 3 },
  { name: "Habakkuk", chapters: 3 },
  { name: "Zephaniah", chapters: 3 },
  { name: "Haggai", chapters: 2 },
  { name: "Zechariah", chapters: 14 },
  { name: "Malachi", chapters: 4 },
  { name: "Matthew", chapters: 28 },
  { name: "Mark", chapters: 16 },
  { name: "Luke", chapters: 24 },
  { name: "John", chapters: 21 },
  { name: "Acts", chapters: 28 },
  { name: "Romans", chapters: 16 },
  { name: "1 Corinthians", chapters: 16 },
  { name: "2 Corinthians", chapters: 13 },
  { name: "Galatians", chapters: 6 },
  { name: "Ephesians", chapters: 6 },
  { name: "Philippians", chapters: 4 },
  { name: "Colossians", chapters: 4 },
  { name: "1 Thessalonians", chapters: 5 },
  { name: "2 Thessalonians", chapters: 3 },
  { name: "1 Timothy", chapters: 6 },
  { name: "2 Timothy", chapters: 4 },
  { name: "Titus", chapters: 3 },
  { name: "Philemon", chapters: 1 },
  { name: "Hebrews", chapters: 13 },
  { name: "James", chapters: 5 },
  { name: "1 Peter", chapters: 5 },
  { name: "2 Peter", chapters: 3 },
  { name: "1 John", chapters: 5 },
  { name: "2 John", chapters: 1 },
  { name: "3 John", chapters: 1 },
  { name: "Jude", chapters: 1 },
  { name: "Revelation", chapters: 22 }
];

// Sample verses database
const bibleVerses = {
  "John 3:16": "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.",
  "Psalm 23:1": "The LORD is my shepherd; I shall not want.",
  "Genesis 1:1": "In the beginning, God created the heavens and the earth.",
  "Romans 8:28": "And we know that for those who love God all things work together for good, for those who are called according to his purpose.",
  "Jeremiah 29:11": "For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope.",
  "Philippians 4:13": "I can do all things through him who strengthens me.",
  "Matthew 6:33": "But seek first the kingdom of God and his righteousness, and all these things will be added to you.",
  "Isaiah 40:31": "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles; they shall run and not be weary; they shall walk and not faint.",
  "Proverbs 3:5-6": "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
  "Ephesians 2:8-9": "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast."
};

const ProfileEditForm: React.FC = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phoneNumber: userProfile?.phoneNumber || '',
    birthday: userProfile?.birthday || '',
    favoriteVerse: userProfile?.favoriteVerse || '',
    favoriteVerseReference: userProfile?.favoriteVerseReference || '',
  });

  // State for Bible verse reference selection
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<string>("");
  const [selectedVerse, setSelectedVerse] = useState<string>("");
  const [availableChapters, setAvailableChapters] = useState<number[]>([]);
  const [availableVerses, setAvailableVerses] = useState<number[]>([]);

  // Parse current favorite verse reference on component load
  useEffect(() => {
    if (userProfile?.favoriteVerseReference) {
      const parts = userProfile.favoriteVerseReference.split(' ');
      if (parts.length >= 2) {
        const bookName = parts.slice(0, parts.length - 1).join(' ');
        const chapterVerse = parts[parts.length - 1].split(':');
        
        if (chapterVerse.length === 2) {
          setSelectedBook(bookName);
          setSelectedChapter(chapterVerse[0]);
          setSelectedVerse(chapterVerse[1]);
          
          // Set available chapters for the selected book
          const book = bibleBooks.find(b => b.name === bookName);
          if (book) {
            setAvailableChapters(Array.from({ length: book.chapters }, (_, i) => i + 1));
            
            // Set available verses for the chapter (default to 30 verses per chapter)
            setAvailableVerses(Array.from({ length: 30 }, (_, i) => i + 1));
          }
        }
      }
    }
  }, [userProfile]);

  // Update reference when selections change
  useEffect(() => {
    if (selectedBook && selectedChapter && selectedVerse) {
      const reference = `${selectedBook} ${selectedChapter}:${selectedVerse}`;
      setFormData(prev => ({
        ...prev,
        favoriteVerseReference: reference,
        favoriteVerse: bibleVerses[reference] || "Custom verse text would be fetched here in a real app."
      }));
    }
  }, [selectedBook, selectedChapter, selectedVerse]);

  // Update available chapters when book changes
  useEffect(() => {
    const book = bibleBooks.find(b => b.name === selectedBook);
    if (book) {
      setAvailableChapters(Array.from({ length: book.chapters }, (_, i) => i + 1));
      setSelectedChapter("1");
      setSelectedVerse("1");
    } else {
      setAvailableChapters([]);
    }
  }, [selectedBook]);

  // Update available verses when chapter changes
  useEffect(() => {
    if (selectedChapter) {
      // In a real app, you'd fetch the actual number of verses for this chapter
      // For this demo, we'll use 30 as a default
      setAvailableVerses(Array.from({ length: 30 }, (_, i) => i + 1));
      setSelectedVerse("1");
    } else {
      setAvailableVerses([]);
    }
  }, [selectedChapter]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile?.name || '',
      email: userProfile?.email || '',
      phoneNumber: userProfile?.phoneNumber || '',
      birthday: userProfile?.birthday || '',
      favoriteVerse: userProfile?.favoriteVerse || '',
      favoriteVerseReference: userProfile?.favoriteVerseReference || '',
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-md font-semibold text-church-darkBrown">Your Information</h3>
          <Button 
            variant="outline" 
            className="text-church-copper border-church-tan" 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <div>
            <p className="text-sm font-medium text-church-darkBrown">Name:</p>
            <p className="text-sm text-church-brown">{userProfile?.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-church-darkBrown">Email:</p>
            <p className="text-sm text-church-brown">{userProfile?.email}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-church-darkBrown">Phone:</p>
            <p className="text-sm text-church-brown">{userProfile?.phoneNumber}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-church-darkBrown">Birthday:</p>
            <p className="text-sm text-church-brown">{userProfile?.birthday}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-md font-semibold text-church-darkBrown">Edit Your Information</h3>
      
      <div className="space-y-3">
        <div className="space-y-1">
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email" 
            type="email" 
            value={formData.email} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input 
            id="phoneNumber" 
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="birthday">Birthday</Label>
          <Input 
            id="birthday" 
            name="birthday" 
            value={formData.birthday} 
            onChange={handleInputChange} 
          />
        </div>
        
        <div className="space-y-1">
          <Label htmlFor="favoriteVerse">Favorite Bible Verse</Label>
          <Textarea 
            id="favoriteVerse" 
            name="favoriteVerse" 
            value={formData.favoriteVerse} 
            readOnly
            className="min-h-[80px] bg-gray-50"
            placeholder="Select a verse reference below"
          />
        </div>
        
        <div className="space-y-1">
          <Label>Bible Verse Reference</Label>
          
          <div className="grid grid-cols-3 gap-2">
            <Select value={selectedBook} onValueChange={setSelectedBook}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Book" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Old Testament</SelectLabel>
                  {bibleBooks.slice(0, 39).map((book) => (
                    <SelectItem key={book.name} value={book.name}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectGroup>
                  <SelectLabel>New Testament</SelectLabel>
                  {bibleBooks.slice(39).map((book) => (
                    <SelectItem key={book.name} value={book.name}>
                      {book.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select
              value={selectedChapter}
              onValueChange={setSelectedChapter}
              disabled={!selectedBook}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chapter" />
              </SelectTrigger>
              <SelectContent>
                {availableChapters.map((chapter) => (
                  <SelectItem key={chapter} value={chapter.toString()}>
                    {chapter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select
              value={selectedVerse}
              onValueChange={setSelectedVerse}
              disabled={!selectedChapter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Verse" />
              </SelectTrigger>
              <SelectContent>
                {availableVerses.map((verse) => (
                  <SelectItem key={verse} value={verse.toString()}>
                    {verse}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2 justify-end">
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleCancel}
          className="border-church-tan text-church-brown"
        >
          Cancel
        </Button>
        <Button 
          type="submit"
          className="bg-church-gold text-white hover:bg-church-copper"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default ProfileEditForm;
