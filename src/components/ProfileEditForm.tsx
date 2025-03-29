
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth, UserProfile } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ProfileEditForm: React.FC = () => {
  const { userProfile, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    phoneNumber: userProfile?.phoneNumber || '',
    birthday: userProfile?.birthday || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
