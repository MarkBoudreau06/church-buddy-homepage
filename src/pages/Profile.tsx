
import React from 'react';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BottomNavbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChurchInfoWidget from '@/components/ChurchInfoWidget';
import BibleVerseWidget from '@/components/BibleVerseWidget';
import ProfileEditForm from '@/components/ProfileEditForm';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen } from 'lucide-react';

const Profile = () => {
  const { isLoggedIn, userProfile, login } = useAuth();
  
  // Church info data
  const churchInfo = {
    name: "Grace Community Church",
    denomination: "Non-denominational",
    address: "123 Faith Avenue, Graceville, CA 90210",
    bannerImageUrl: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80",
    phoneNumber: "(555) 123-4567",
    email: "info@gracecommunity.org"
  };

  // Get attendance bars data based on attendance percentage
  const getAttendanceBars = (attendance: number) => {
    if (attendance >= 70) return { filledBars: 3, color: "bg-green-500" };
    if (attendance >= 40) return { filledBars: 2, color: "bg-yellow-500" };
    return { filledBars: 1, color: "bg-red-500" };
  };

  // Mock attendance data for the profile
  const userAttendance = 75; // Setting a default attendance value
  const attendanceBars = getAttendanceBars(userAttendance);

  const FavoriteVerseCard = () => {
    if (!userProfile?.favoriteVerse) return null;
    
    return (
      <Card className="shadow-md hover:shadow-md transition-shadow border-church-tan overflow-hidden relative h-64 mt-4">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
            alt="Nature background" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>
        
        <CardHeader className="pb-2 relative z-10">
          <CardTitle className="text-md flex items-center gap-2 text-white">
            <BookOpen size={18} />
            Your Favorite Verse
          </CardTitle>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <p className="text-white italic mb-2 text-lg font-medium">"{userProfile.favoriteVerse}"</p>
          <p className="text-right text-church-cream font-medium">
            — {userProfile.favoriteVerseReference || "Unknown reference"}
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-church-lightCream">
      <TopNavbar />
      
      <main className="flex-1 overflow-auto px-4 py-4 flex flex-col items-center bg-church-lightCream">
        {!isLoggedIn ? (
          <div className="flex items-center justify-center w-full h-full">
            <Card className="w-full max-w-md mx-auto">
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-church-gold">Login Required</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 flex flex-col items-center">
                <p className="text-church-darkBrown text-center">
                  Please log in to view your profile information.
                </p>
                <Button onClick={login} className="bg-church-gold text-white hover:bg-church-copper">
                  Login
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={userProfile?.avatarUrl || ""} alt={userProfile?.name} />
                    <AvatarFallback className="bg-church-copper text-white text-lg">
                      {userProfile?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{userProfile?.name}</CardTitle>
                    <p className="text-sm text-church-brown">{userProfile?.role}</p>
                    <p className="text-xs text-church-brown">Member since {userProfile?.memberSince}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="info" className="w-full">
                    <TabsList className="w-full">
                      <TabsTrigger value="info" className="flex-1">Personal Info</TabsTrigger>
                      <TabsTrigger value="edit" className="flex-1">Edit Profile</TabsTrigger>
                      <TabsTrigger value="involvement" className="flex-1">Church Involvement</TabsTrigger>
                    </TabsList>
                    <TabsContent value="info" className="space-y-2 pt-4">
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
                      {userProfile?.favoriteVerseReference && (
                        <div>
                          <p className="text-sm font-medium text-church-darkBrown">Favorite Verse:</p>
                          <p className="text-sm text-church-brown">{userProfile.favoriteVerseReference}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Attendance:</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex gap-1 items-center">
                            {[1, 2, 3].map((bar) => (
                              <div 
                                key={bar} 
                                className={`h-4 w-4 rounded-sm ${
                                  bar <= attendanceBars.filledBars ? attendanceBars.color : 'bg-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="edit" className="pt-4">
                      <ProfileEditForm />
                    </TabsContent>
                    <TabsContent value="involvement" className="space-y-2 pt-4">
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Small Groups:</p>
                        <p className="text-sm text-church-brown">Young Adults, Prayer Warriors</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Serving Teams:</p>
                        <p className="text-sm text-church-brown">Greeting Team, Tech Team</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-church-darkBrown">Leadership:</p>
                        <p className="text-sm text-church-brown">Small Group Leader</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              {/* Display favorite verse below profile info if available */}
              {userProfile?.favoriteVerse && <FavoriteVerseCard />}
            </div>
            
            <div className="space-y-4">
              <ChurchInfoWidget 
                name={churchInfo.name}
                denomination={churchInfo.denomination}
                address={churchInfo.address}
                bannerImageUrl={churchInfo.bannerImageUrl}
                phoneNumber={churchInfo.phoneNumber}
                email={churchInfo.email}
              />
              
              {/* Always display the daily verse widget on the side */}
              <BibleVerseWidget />
            </div>
          </div>
        )}
      </main>
      
      <BottomNavbar />
    </div>
  );
};

export default Profile;
