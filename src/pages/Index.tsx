import { useState, useEffect } from 'react';
import BallotUnit from '@/components/BallotUnit';
import Footer from '@/components/Footer';
import UserInfoForm, { UserInfoData } from '@/components/UserInfoForm';
import { API_ENDPOINTS, apiRequest } from '@/config/api';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';

const Index = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already submitted the form in this session
    const formSubmitted = sessionStorage.getItem('userInfoSubmitted');
    if (!formSubmitted) {
      setShowUserForm(true);
    } else {
      setHasSubmitted(true);
    }
  }, []);

  const handleUserFormSubmit = async (data: UserInfoData) => {
    try {
      await apiRequest(API_ENDPOINTS.SAVE_USER_INFO, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      // Mark form as submitted in session storage
      sessionStorage.setItem('userInfoSubmitted', 'true');
      setHasSubmitted(true);
      
      toast.success('Information Saved Successfully!', {
        description: 'Your information has been saved successfully.',
        icon: (
          <div className="relative flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6 text-green-500 relative z-10 animate-in zoom-in-50 duration-500" />
            <div className="absolute inset-0 bg-green-500/30 rounded-full animate-ping" style={{ animationDuration: '2s', animationIterationCount: '2' }} />
            <div className="absolute inset-0 bg-green-500/20 rounded-full scale-150 animate-pulse" />
          </div>
        ),
        duration: 4000,
      });
    } catch (error) {
      console.error('Failed to save user information:', error);
      toast.error('Error!', {
        description: 'There was a problem saving your information. Please try again.',
      });
      throw error; // Re-throw to let the form handle the error
    }
  };

  const handleSkipForm = () => {
    // Mark as skipped (optional - you might want to track this differently)
    sessionStorage.setItem('userInfoSubmitted', 'skipped');
    setShowUserForm(false);
    setHasSubmitted(true);
  };

  return (
    <>
      <BallotUnit />
      <Footer />
      {showUserForm && !hasSubmitted && (
        <UserInfoForm 
          onClose={handleSkipForm} 
          onSubmit={handleUserFormSubmit}
        />
      )}
    </>
  );
};

export default Index;
