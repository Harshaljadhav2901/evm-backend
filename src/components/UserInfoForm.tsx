import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, User, Phone, MapPin, Building2, CheckCircle2 } from 'lucide-react';

interface UserInfoFormProps {
  onClose: () => void;
  onSubmit: (data: UserInfoData) => Promise<void>;
}

export interface UserInfoData {
  userName: string;
  contactNumber: string;
  villageCity: string;
  district: string;
}

const UserInfoForm = ({ onClose, onSubmit }: UserInfoFormProps) => {
  const [formData, setFormData] = useState<UserInfoData>({
    userName: '',
    contactNumber: '',
    villageCity: '',
    district: '',
  });
  const [errors, setErrors] = useState<Partial<UserInfoData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfoData> = {};

    if (!formData.userName.trim()) {
      newErrors.userName = 'नाव आवश्यक आहे';
    }

    if (!formData.contactNumber.trim()) {
      newErrors.contactNumber = 'संपर्क क्रमांक आवश्यक आहे';
    } else if (!/^[0-9]{10}$/.test(formData.contactNumber.trim())) {
      newErrors.contactNumber = 'कृपया वैध 10 अंकी संपर्क क्रमांक प्रविष्ट करा';
    }

    if (!formData.villageCity.trim()) {
      newErrors.villageCity = 'गाव/शहर आवश्यक आहे';
    }

    if (!formData.district.trim()) {
      newErrors.district = 'जिल्हा आवश्यक आहे';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      // You can add a toast notification here if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof UserInfoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-white/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border-2 border-[#1A56A8] animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A56A8] to-[#2B6CB0] px-4 sm:px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg sm:text-xl md:text-2xl">
              User Information / वापरकर्ता माहिती
            </h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-1.5 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-white/90 text-xs sm:text-sm mt-1">
            Please fill in your details / कृपया आपली माहिती भरा
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-5">
          {/* User Name Field */}
          <div className="space-y-2">
            <Label htmlFor="userName" className="text-sm sm:text-base font-semibold text-[#1A56A8] flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Name / नाव</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="userName"
              type="text"
              placeholder="Enter your name"
              value={formData.userName}
              onChange={(e) => handleChange('userName', e.target.value)}
              className={`h-11 text-base ${errors.userName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {errors.userName && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.userName}</p>
            )}
          </div>

          {/* Contact Number Field */}
          <div className="space-y-2">
            <Label htmlFor="contactNumber" className="text-sm sm:text-base font-semibold text-[#1A56A8] flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Contact Number / संपर्क क्रमांक</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="contactNumber"
              type="tel"
              placeholder="Enter 10-digit mobile number"
              value={formData.contactNumber}
              onChange={(e) => handleChange('contactNumber', e.target.value.replace(/\D/g, ''))}
              maxLength={10}
              className={`h-11 text-base ${errors.contactNumber ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.contactNumber}</p>
            )}
          </div>

          {/* Village/City Field */}
          <div className="space-y-2">
            <Label htmlFor="villageCity" className="text-sm sm:text-base font-semibold text-[#1A56A8] flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Village/City / गाव/शहर</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="villageCity"
              type="text"
              placeholder="Enter village or city name"
              value={formData.villageCity}
              onChange={(e) => handleChange('villageCity', e.target.value)}
              className={`h-11 text-base ${errors.villageCity ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {errors.villageCity && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.villageCity}</p>
            )}
          </div>

          {/* District Field */}
          <div className="space-y-2">
            <Label htmlFor="district" className="text-sm sm:text-base font-semibold text-[#1A56A8] flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              <span>District / जिल्हा</span>
              <span className="text-red-500">*</span>
            </Label>
            <Input
              id="district"
              type="text"
              placeholder="Enter district name"
              value={formData.district}
              onChange={(e) => handleChange('district', e.target.value)}
              className={`h-11 text-base ${errors.district ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
            />
            {errors.district && (
              <p className="text-red-500 text-xs sm:text-sm">{errors.district}</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 text-base font-semibold border-2 border-gray-300 hover:bg-gray-100"
              disabled={isSubmitting}
            >
              Skip / वगळा
            </Button>
            <Button
              type="submit"
              className="flex-1 h-11 text-base font-semibold bg-gradient-to-r from-[#1A56A8] to-[#2B6CB0] hover:from-[#2B6CB0] hover:to-[#1A56A8] text-white shadow-lg hover:shadow-xl transition-all"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing... / प्रक्रिया करत आहे...' : 'Submit / सबमिट करा'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfoForm;
